export interface Sensor {
  id:string;
  roomId:string;
  type:string;
  label:string;
  unit:string;
  thresholdMin:number;
  thresholdMax:number;
}
export  interface SensorReading {
  sensorId:string;
  roomId:string;
  type:string;
  value:number;
  unit:string;
  timestamp:string;
}
