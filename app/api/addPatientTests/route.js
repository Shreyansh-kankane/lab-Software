import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";
import Patient from "@/models/Patient";

export async function POST(req,res){
    const data= await req.text();
    const {id,Tests} = JSON.parse(data);
    try {
        connectToDB();
        const patient = await Patient.findByIdAndUpdate(id,{Tests:Tests},{new:true});
        await patient.save();
        console.log(patient);
        return NextResponse.json({message:'Tests added successfully'},{status:200});
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}