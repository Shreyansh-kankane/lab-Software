import mongoose,{connection} from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export const connectToDB = async () => {
  if(connection && connection.readyState >= 1){
    return;
  }
  return await mongoose.connect(process.env.MONGODB_URI);
}

export const getSession = async () => {
  const data = await getServerSession(authOptions);
  return data;
}