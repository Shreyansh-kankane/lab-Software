import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";
import Patient from "@/models/Patient";

export async function POST(req,res){
    const d = await req.text();
    const id = JSON.parse(d).id;
    try {
        connectToDB();
        const patient = await Patient.findById(id).populate('Tests');
        return NextResponse.json({patient:patient},{status:200});
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}