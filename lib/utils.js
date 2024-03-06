import mongoose,{connection} from "mongoose";

export const connectToDB = async () => {
  if(connection && connection.readyState >= 1){
    return;
  }
  return await mongoose.connect('mongodb://0.0.0.0:27017/lab',
  {useNewUrlParser: true,
  useUnifiedTopology: true,}
  );
}