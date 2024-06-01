import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { FacultyServices } from "./faculty.service";
import httpStatus from 'http-status'


const getAllFaculty = catchAsync(async(req,res)=>{
    const result = await FacultyServices.getAllFacultyFromDB(req.query)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty are retrieved succesfully',
        data: result
    })
})
const getSingleFaculty = catchAsync(async(req,res)=> {
    const {id: facultyId} = req.params
    const result = await FacultyServices.getSingleFacultyFromDB(facultyId)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is retrived succesfully',
        data: result
    })
})
const updateSingleFaculty = catchAsync(async(req, res)=> {
    const {id: facultyId} = req.payload
    const faculty = req.body
    const result = await FacultyServices.updateSingleFacultyIntoDB(facultyId, faculty)
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is updated succesfully',
        data: result
    })
})
export const FacultyControllers = {
    getAllFaculty,
    getSingleFaculty,
    updateSingleFaculty
}