import Patient from "@/models/Patient";
import LabTest from "@/models/LabTest";
import { connectToDB } from "./utils";
import { ITEM_PER_PAGE } from "@/lib/constants";
import Hospital from "@/models/Hospitals";
import Doctor from "@/models/Doctor";
import User from "@/models/User";

export const cards = [
    {
      id: 1,
      title: "Total Users",
      number: 10.928,
      change: 12,
    },
    {
      id: 2,
      title: "Stock",
      number: 8.236,
      change: -2,
    },
    {
      id: 3,
      title: "Revenue",
      number: 6.642,
      change: 18,
    },
  ];
  
export const fetchPatients = async (q,page) => {
  const regex = new RegExp(q, "i");
    try {
        connectToDB();
        const count = await Patient.countDocuments({Name: regex});
        const patients = await Patient.find({Name: {$regex: regex}}).limit(ITEM_PER_PAGE).skip((page-1)*ITEM_PER_PAGE);
        return {count, patients};
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch patients');
    }
}

export const fetchTests = async (q,page) => {
  const regex = new RegExp(q, "i");
    try {
        connectToDB();
        const count = await LabTest.countDocuments({Name: regex});
        const tests = await LabTest.find({Name: {$regex: regex}}).limit(ITEM_PER_PAGE).skip((page-1)*ITEM_PER_PAGE);
        return {count, tests};
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch patients');
    }
}

export const fetchHospitals = async (q,page) => {
    const regex = new RegExp(q, "i");
    try {
        connectToDB();
        const count = await Hospital.countDocuments({Name: regex});
        const hospitals = await Hospital.find({Name: {$regex: regex}}).limit(ITEM_PER_PAGE).skip((page-1)*ITEM_PER_PAGE);
        return {count, hospitals};
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch patients');
    }
}

export const fetchDoctors = async (q,page) => {
    const regex = new RegExp(q, "i");
    try {
        connectToDB();
        const count = await Doctor.countDocuments({Name: regex});
        const doctors = await Doctor.find({Name: {$regex: regex}}).limit(ITEM_PER_PAGE).skip((page-1)*ITEM_PER_PAGE);
        return {count, doctors};
    } catch (error) {
        console.log(error);
        throw new Error('Failed to fetch patients');
    }
}

export const fetchUser = async (role,q,page) => {
  const regex = new RegExp(q, "i");
  try{
    connectToDB();
    const count = await User.countDocuments({Role: role, Name: regex});
    const users = await User.find({Role: role}).limit(ITEM_PER_PAGE).skip((page-1)*ITEM_PER_PAGE);
    return {count, users};
  }
  catch (error) {
    console.log(error);
    throw new Error('Failed to fetch users');
  }    
}

export const fetchAllTest = async () => {
  try {
    await connectToDB();
    const tests = await LabTest.find({});
    return tests;
  } catch (error) {
      console.log(error.message);
  }
}