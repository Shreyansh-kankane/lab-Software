"use server";
import {revalidatePath} from "next/cache";
import { redirect } from "next/navigation";
import { connectToDB } from "./utils";
import Patient from "@/models/Patient";
import LabTest from "@/models/LabTest";
import Hospital from "@/models/Hospitals";
import Doctor from "@/models/Doctor";
import User from "@/models/User";
import Invoice from "@/models/Invoice";
import {signIn} from "next-auth/react"
import {signOut} from "next-auth/react"


export const addPatient = async (formData,RegisteredBy)=>{
    const {Name, Email,Age, Gender,PRO,Hospital,Doctor,Associate,MobileNo, Address} = Object.fromEntries(formData);

    try {
        connectToDB();

        const patient = new Patient({
            Name,
            Age,
            Gender,
            RegisteredBy,
            Email: Email || "",
            MobileNo: MobileNo || "",
            Address: Address || "",
            PRO: PRO || "",
            Hospital: Hospital || "",
            Doctor: Doctor || "",
            Associate: Associate || "",
            Address: Address || "",
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
    redirect('/dashboard/users');
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


  export const createInvoice = async (data) => {
    try{
        connectToDB();
        const due = data.TotalAmount - data.PaidAmount;
        const invoiceData = {
            ...data,
            DueAmount: due,
            Status: due > 0 ? 'Pending' : 'Paid',
        }
        const invoice = new Invoice(invoiceData);
        const patient = await Patient.findById(data.Patient);
        patient.Tests = data.Tests;
        patient.Invoices.push(invoice._id);

        await invoice.save();
        await patient.save();
        revalidatePath('/dashboard/invoices');

    }catch(error){
      console.log(error);
      throw new Error('Failed to create invoice');
    }
  }


  export const updatePatient = async (data) => {
    const { _id, Email, MobileNo, Address, Hospital,Center,Doctor,Associate, PRO,ReferType } = Object.fromEntries(data);
    
    const regex = /\(\w+\)/;
    const hospital = Hospital && regex.exec(Hospital)[0].slice(1,-1);
    const doctor = Doctor && regex.exec(Doctor)[0].slice(1,-1);
    const associate =  Associate && regex.exec(Associate)[0].slice(1,-1);
    const pro = PRO && regex.exec(PRO)[0].slice(1,-1);

    try {
        connectToDB();
        const patient = await Patient.findById(_id);
        if(!patient) throw new Error('Patient not found');

        if(Email) patient.Email = Email;
        if(MobileNo) patient.MobileNo = MobileNo;
        if(Address) patient.Address = Address;
        if(Hospital) patient.Hospital = hospital;
        if(Center) patient.Center = Center;
        if(Doctor) patient.Doctor = doctor;
        if(Associate) patient.Associate = associate;
        if(PRO) patient.PRO = pro;
        if(ReferType) patient.ReferType = ReferType;

        console.log(patient)
       
        await patient.save();
        revalidatePath('/dashboard/patients');
        redirect('/dashboard/patients');

        return;
    } catch (error) {
        console.log(error);
        throw new Error('Failed to update patient');
    }
  }