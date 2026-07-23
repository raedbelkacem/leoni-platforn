export  interface Notification{
  id:string;
  userId:string;
  title:string;
  message:string;
  level:'INFO'|'WARNING'|'CRITICAL';
  read:boolean;
  createdAt:string;
  relatedIncidentId?:string;
  relatedRoomId?:string;
}
