"use server";
import {revalidatePath} from "next/cache";
import { redirect } from "next/navigation";
import { connectToDB } from "./utils";
import Patient from "@/models/Patient";
import LabTest from "@/models/LabTest";
import Hospital from "@/models/Hospitals";
import Doctor from "@/models/Doctor";
import User from "@/models/User";
import {signIn} from "next-auth/react"


export const addPatient = async (formData)=>{
    const {Name, Age, Gender, MobileNo, Address} = Object.fromEntries(formData);

    try {
        connectToDB();

        const patient = new Patient({
            Name,
            Age,
            Gender,
            MobileNo,
            Address,
            RegisteredBy: "ADMIN"
        })
        await patient.save();
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add patient');
    }
    revalidatePath('/dashboard/patients');
    redirect('/dashboard/patients');
}


export const addTest = async (formData)=>{
    const {TestCode,Name,LabName,Type,Status,Available,Price,NormalRange} = Object.fromEntries(formData);
    
    try {
        connectToDB();

        const test = new LabTest({
            TestCode,
            Name,
            LabName,
            Type,
            Status,
            Available,
            Price,
            NormalRange,
        })
        await test.save();
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add test');
    }
    revalidatePath('/dashboard/tests');
    redirect('/dashboard/tests');
}

export const addHospital = async (formData)=>{
    const {Name,Address,Contact,email} = Object.fromEntries(formData);
    try {
        connectToDB();
        const hospital = new Hospital({
            Name,
            Address,
            Contact,
            email,
        })
        await hospital.save();
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add hospital');
    }
    revalidatePath('/dashboard/hospitals');
    redirect('/dashboard/hospitals');
}

export const addDoctor = async (formData)=>{
    const {Name,Hospital,Contact,SpecialistAt} = Object.fromEntries(formData);
    try {
        connectToDB();
        const doctor = new Doctor({
            Name,
            Hospital,
            Contact,
            SpecialistAt,
        })
        await doctor.save();
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add doctors');
    }
    revalidatePath('/dashboard/doctors');
    redirect('/dashboard/doctors');
}

export const addUser = async (formData)=>{
    const {Name,Contact,email,password,gender,address,Role} = Object.fromEntries(formData);
    try {
        connectToDB();
        const user = new User({
            Name,
            Contact,
            email,
            password,
            gender,
            address,
            Role
        })
        await user.save();
        
    } catch (error) {
        console.log(error);
        throw new Error('Failed to add user');
    }
    revalidatePath('/dashboard/users');
}

export const authenticate = async (prevState, formData) => {
    const { Email, Password } = Object.fromEntries(formData);
  
    try {
      await signIn("credentials", { Email, Password,redirect: false});
    } catch (err) {
      if (err.message.includes("CredentialsSignin")) {
        return "Wrong Credentials";
      }
      throw err;
    }
  };