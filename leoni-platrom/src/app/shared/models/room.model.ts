export interface ServerRoom {
  id:string;
  code:string;
  name:string;
  location:string;
  alertLevel:'NORMAL'|'WARNING'|'CRITICAL';
  createdAt:string;
}
