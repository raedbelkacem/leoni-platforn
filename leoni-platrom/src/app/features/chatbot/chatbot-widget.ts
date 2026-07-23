import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-chatbot-widget',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot-widget.html'
})
export class ChatbotWidgetComponent {
  isOpen = false;
  isTyping = false;
  userInput = '';

  messages: { role: 'user' | 'bot'; text: string; time: string }[] = [
    {
      role: 'bot',
      text: 'Hello! I am the Leoni Platform Assistant. I can help you navigate the platform, monitor server rooms, or guide you through incidents. How can I help you today?',
      time: this.getTime()
    }
  ];

  constructor(private http: HttpClient) {}

  toggleChat(): void {
    this.isOpen = !this.isOpen;
  }

  getTime(): string {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  sendMessage(): void {
    if (!this.userInput.trim()) return;

    // add user message
    this.messages.push({
      role: 'user',
      text: this.userInput,
      time: this.getTime()
    });

    const userText = this.userInput;
    this.userInput = '';
    this.isTyping = true;

    // call Claude API
    this.callAI(userText);
  }

  callAI(userMessage: string): void {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-api-key': 'YOUR_ANTHROPIC_API_KEY',
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true'
    });

    const body = {
      model: 'claude-haiku-4-5-20251001',
      max_tokens: 500,
      system: `You are the Leoni Server Rooms Platform assistant.
             You help technicians and managers monitor server rooms: SBTN, TNM, TN4, TN3, MAC, MAE.
             You can guide users through the platform, help with incidents, and answer questions about server room conditions.
             Keep responses concise and professional.`,
      messages: [{ role: 'user', content: userMessage }]
    };

    this.http.post<any>('https://api.anthropic.com/v1/messages', body, { headers }).subscribe({
      next: (res) => {
        this.isTyping = false;
        this.messages.push({
          role: 'bot',
          text: res.content[0].text,
          time: this.getTime()
        });
      },
      error: () => {
        this.isTyping = false;
        this.messages.push({
          role: 'bot',
          text: 'Sorry, I am having trouble connecting. Please try again later.',
          time: this.getTime()
        });
      }
    });
  }

  onEnter(event: any): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
}
