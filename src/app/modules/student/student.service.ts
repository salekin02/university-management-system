/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { PaginationHelpers } from '../../../helpers/paginationHelper';
import { IStudent, IStudentFilters } from './student.interface';
import { studentSearchableFields } from './student.constant';
import { Student } from './student.model';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';


const getAllStudents = async (
    filters: IStudentFilters,
    paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IStudent[]>> => {
    const { searchTerm, ...filtersData } = filters;
    const { page, limit, skip, sortBy, sortOrder } =
        PaginationHelpers.calculatePagination(paginationOptions);

    const andConditions = [];

    if (searchTerm) {
        andConditions.push({
            $or: studentSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }

    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }


    const sortConditions: { [key: string]: SortOrder } = {};

    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereConditions =
        andConditions.length > 0 ? { $and: andConditions } : {};

    const result = await Student.find(whereConditions)
        .populate('academicFaculty')
        .populate('academicDepartment')
        .populate('academicSemester')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);

    const total = await Student.countDocuments(whereConditions);

    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
};

const getSingleStudent = async (
    id: string
): Promise<IStudent | null> => {
    const result = await Student.findById(id).populate('academicFaculty')
        .populate('academicDepartment')
        .populate('academicSemester');
    return result;
};

const updateStudent = async (id: string, payload: Partial<IStudent>): Promise<IStudent | null> => {


    const isExist = await Student.findById(id);

    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, 'Student not found');
    }

    const {name, guardian, localGuardian, ...rest} = payload;

    const updatedStudentData: Partial<IStudent> = {...rest};

    if(name && Object.keys(name).length) {
        Object.keys(name).forEach(key => {
            const nameKey = `name.${key}`;
            if(nameKey) {
                (updatedStudentData as any)[nameKey as string] = name[key as keyof typeof name];
            }
        });
    }
    if(guardian && Object.keys(guardian).length) {
        Object.keys(guardian).forEach(key => {
            const guardianKey = `guardian.${key}`;
            if(guardianKey) {
                (updatedStudentData as any)[guardianKey as string] = guardian[key as keyof typeof guardian];
            }
        });
    }
    if(localGuardian && Object.keys(localGuardian).length) {
        Object.keys(localGuardian).forEach(key => {
            const localGuardianKey = `localGuardian.${key}`;
            if(localGuardianKey) {
                (updatedStudentData as any)[localGuardianKey as string] = localGuardian[key as keyof typeof localGuardian];
            }
        });
    }

    const result = await Student.findOneAndUpdate({ id }, updateStudent, {
        new: true,
    });
    return result;
};

const deleteStudent = async (
    id: string
): Promise<IStudent | null> => {
    const result = await Student.findByIdAndDelete(id).populate('academicFaculty')
        .populate('academicDepartment')
        .populate('academicSemester');
    return result;
};

export const StudentService = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent,
};
