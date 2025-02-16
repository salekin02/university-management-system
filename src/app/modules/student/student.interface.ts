import { Model, Types } from "mongoose";
import { IAcademicFaculty } from "../academicFaculty/academicFaculty.interfaces";
import { IAcademicDepartment } from "../academicDepartment/academicDepartment.interfaces";
import { IAcademicSemester } from "../academicSemester/academicSemester.interface";


export type UserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type Guardian = {
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
    address: string;
}

export type LocalGuardian = {
    name: string;
    contactNo: string;
    relationship: string;
}

export type IStudent = {
    id: string;
    name: UserName;
    email: string;
    dateOfBirth: string;
    gender: 'male' | 'female' | 'other';
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    contactNo: string;
    emergencyContactNo: string;
    guardian: Guardian;
    localGuardian: LocalGuardian;
    academicFaculty: Types.ObjectId | IAcademicFaculty;
    academicDepartment: Types.ObjectId | IAcademicDepartment;
    academicSemester: Types.ObjectId | IAcademicSemester;
    profileImage: string;
}

export type StudentModel = Model<IStudent, Record<string, unknown>>

export type IStudentFilters = {
    searchTerm?: string;
    id?: string;
    email?: string;
    bloodGroup?: string;
};