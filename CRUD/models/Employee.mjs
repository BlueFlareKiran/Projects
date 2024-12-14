import { Schema, model } from 'mongoose';
const employeeSchema = new Schema({
    name:String,
    salary:Number,
    language:String,
    city:String,
    isManager:Boolean
  });

  const Employee = model('Employee', employeeSchema);

 export default Employee;
 