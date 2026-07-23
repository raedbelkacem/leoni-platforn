export interface Incident{
  id:string;
  roomId:string;
  source:'CHATBOT'|'SENSOR'|'MANUAL';
  title:string;
  description?:string;
  status:'OPEN'|'IN_PROGRESS'|'BLOCKED'|'RESOLVED';
  assignedTo?:string;
  createdAt:string;
  resolvedAt?:string;
}
