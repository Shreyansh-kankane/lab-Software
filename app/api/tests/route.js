import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

import LabTest from "@/models/LabTest";
import Patient from "@/models/Patient";

export async function GET(req,res){
    try {
        connectToDB();
        const tests = await LabTest.find({Status:'Active',Available:"Yes"});
        return NextResponse.json({tests:tests},{status:200});
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

export async function POST(req,res){
    const d = await req.text(); 
    const id = JSON.parse(d).id;

    try {
        connectToDB();
        const tests = await Patient.find({_id:id}).populate('Tests')
        return NextResponse.json({tests:tests},{status:200});
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}