import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";
import Invoice from "@/models/Invoice";
import { revalidatePath } from "next/cache";

export async function POST(req,res){
   
    const d = await req.text(); // Wait for the body to be parsed
    const data = JSON.parse(d);

    try{
        connectToDB();
        const due = data.TotalAmount - data.PaidAmount;
        const invoiceData = {
            ...data,
            DueAmount: due,
            Status: due > 0 ? 'Pending' : 'Paid',
        }
        const invoice = new Invoice(invoiceData);
        await invoice.save();
        revalidatePath('/dashboard');
        return NextResponse.json({message:'Invoice Created Successfully'},{status:200});
    }catch(error){
      console.log(error);
      throw new Error('Failed to create invoice');
    }
}