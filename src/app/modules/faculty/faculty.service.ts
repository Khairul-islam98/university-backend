import QueryBuilder from "../../builder/QueryBuilder"
import { FacultySearchableFields } from "./faculty.constant"
import { TFaculty } from "./faculty.interface"
import { Faculty } from "./faculty.model"

const getAllFacultyFromDB = async(query: Record<string, unknown>)=> {
    const facultyQuery = new QueryBuilder(
        Faculty.find(),query
    ).search(FacultySearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields()
    const result = await facultyQuery.modelQuery
    return result
}
const getSingleFacultyFromDB = async(id: string) => {
    const result = await Faculty.findById(id)
    return result
}
const updateSingleFacultyIntoDB = async(id: string, payload: Partial<TFaculty>)=>{
    const {name, ...remainingFacultyData} = payload
    const modifiedUpdateData: Record<string, unknown> = {
        ...remainingFacultyData
    }
    if(name && Object.keys(name).length){
        for(const [key, value] of Object.entries(name)){
            modifiedUpdateData[`name${key}`]= value
        }
    }
    const result= await Faculty.findByIdAndUpdate(id, modifiedUpdateData, {new: true, runValidators: true})
    return result
}

export const FacultyServices = {
    getAllFacultyFromDB,
    getSingleFacultyFromDB,
    updateSingleFacultyIntoDB,
}
