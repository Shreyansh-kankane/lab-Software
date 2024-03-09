import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";
import Invoice from "@/models/Invoice";

export async function POST(req,res){
    const d = await req.text(); // Wait for the body to be parsed
    const id = JSON.parse(d).id;
    try {
        connectToDB();
        const invoice = await Invoice.findById(id).populate('Patient Tests');
        console.log(invoice);
        return NextResponse.json(invoice);
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch invoice');
    }
}