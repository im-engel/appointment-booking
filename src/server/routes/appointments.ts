const {v4} = require("uuid")
import express, { Request, Response } from "express";
import _ from "lodash"
import commonFunctions from "../utils/commonFunctions";
import appointmentService from "../services/appointment.service";
import errorResponse from "../utils/error";
import constants from "../utils/constants";
const getAppointmentRoutes = () => {
    const router = express.Router();
    router.get("/list/:sort", getAllAppointmentsController);
    router.post("/add", addAppointmentsController);
    router.delete("/delete/:id", deleteAppointmentController);

    return router;
}

const groupAppointments = (sort: string, data: any) => {
    const groupedData = _.chain(data.filter((d :any) => d.status === "ACTIVE"))
            .groupBy(sort)
            .map((value, key) => ({ header: key, details: value.sort((a,b) => (a.startDateRaw > b.startDateRaw) ? 1 : ((b.startDateRaw > a.startDateRaw) ? -1 : 0)) }))
            .value()
            
    if (sort === "date") {
        return groupedData.sort((a,b) => (new Date(a.header) > new Date(b.header)) ? 1 : ((new Date(b.header) > new Date(a.header)) ? -1 : 0));
    }

    return groupedData.sort((a,b) => (a.header > b.header) ? 1 : ((b.header > a.header) ? -1 : 0));
}

const getAllAppointmentsController = async(req: Request, res: Response) =>  {
    try {
        const sort = constants.APPOINTMENT_SORT[req.params?.sort]
        const data : any = await appointmentService.getAllAppointments();

        if (sort) {
            const sortedData = groupAppointments(sort, data)
            return res.json(sortedData);
        }

        return res.json(data);
    } catch (error) {
        errorResponse(res, error.message)
    }
}

const addAppointmentsController = async(req: Request, res: Response) =>  {
    const details = req.body

    const newAppointment = {
        id: v4(),
        clinicianName: details.clinicianName,
        patient: { id: v4(), name: details.patient},
        status: "ACTIVE",
        startDateRaw: details.startDate,
        startDate: commonFunctions.formatDateToString(new Date(details.startDate)),
        startTime: commonFunctions.formatTimeToString(new Date(details.startDate)),
        date: commonFunctions.formatDateToString(new Date(details.startDate)),
        duration: commonFunctions.getDifferenceInMinutes(details.startDate, details.endDate)
    }
    const result = await appointmentService.addAppointments(newAppointment)

    return res.json(result);
}

const deleteAppointmentController = async(req: Request, res: Response) =>  {
    try {
        const id = req.params.id
        const result = await appointmentService.deleteAppointment(id)

        return res.json(result);
    } catch (error) {
        errorResponse(res, error.message)
    }
}
export default getAppointmentRoutes