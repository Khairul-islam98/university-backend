import QueryBuilder from "../../builder/QueryBuilder"
import { FacultySearchableFields } from "./faculty.constant"
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

export const FacultyServices = {
    getAllFacultyFromDB,
}
