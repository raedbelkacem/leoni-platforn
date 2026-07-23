export type UserRole = 'ADMIN' | 'MANAGER' | 'TECHNICIAN' | 'VIEWER';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  assignedRoomIds: string[];
  createdAt: string;
}

export interface Job {
  id: string;
  userId: string;
  title: string;
  description: string;
  roomId: string;
  status: 'PENDING' | 'IN_PROGRESS' | 'DONE';
  dueDate?: string;
}
