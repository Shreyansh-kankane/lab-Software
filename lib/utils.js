import mongoose,{connection} from "mongoose";

export const connectToDB = async () => {
  if(connection && connection.readyState >= 1){
    return;
  }
  return await mongoose.connect(process.env.MONGODB_URI);
}