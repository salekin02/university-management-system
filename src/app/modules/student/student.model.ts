import { model, Schema } from "mongoose";
import { IStudent, StudentModel } from "./student.interface";

export const StudentSchema = new Schema<IStudent, StudentModel>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: {
            firstname: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            }
        },
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    dateOfBirth: {
        type: String
    },
    gender: {
        type: String,
        enum: ['male', 'female', 'other'],
    },
    bloodGroup: {
        type: String,
        enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']
    },
    contactNo: {
        type: String,
        required: true,
        unique: true
    },
    emergencyContactNo: {
        type: String,
        required: true
    },
    presentAddress: {
        type: String
    },
    permanentAddress: {
        type: String
    },
    guardian: {
        fatherName: {
            type: String,
            required: true
        },
        motherName: {
            type: String,
            required: true
        },
        fatherContactNo: {
            type: String,
            required: true
        },
        motherContactNo: {
            type: String,
            required: true
        },
        fatherOccupation: {
            type: String,
            required: true
        },
        motherOccupation: {
            type: String,
            required: true
        }
    },
    localGuardian: {
        name: {
            type: String,
            required: true
        },
        contactNo: {
            type: String,
            required: true
        },
        relationship: {
            type: String,
            required: true
        }
    },
    profileImage: {
        type: String,
        required: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: true
    },
    academicDepartment: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicDepartment',
        required: true
    },
    academicSemester: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicSemester',
        required: true
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    }
});

export const Student = model<IStudent, StudentModel>('Student', StudentSchema);