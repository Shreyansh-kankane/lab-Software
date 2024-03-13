import { connectToDB } from "@/lib/utils";
import { NextResponse } from "next/server";

import LabTest from "@/models/LabTest";

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