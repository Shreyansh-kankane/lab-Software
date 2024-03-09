import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";
import Invoice from "@/models/Invoice";

export async function POST(req,res){
    const d = await req.text();
    const id = JSON.parse(d).id;
    try {
        connectToDB();
        const invoice = await Invoice.findById(id).populate('Patient Tests');
        return NextResponse.json({invoice:invoice},{status:200});
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch invoice');
    }
}