import {promises as fs} from 'fs';
import NodeCache from "node-cache";
import constants from "../utils/constants";
import commonFunctions from '../utils/commonFunctions';

const cache = new NodeCache({stdTTL: 15});
const cacheId = "appointments"

const formatAppointmentData = (appointments: any) => {
    return appointments.map(
        (data: any) => (
            {
                ...data,
                startDateRaw: data.startDate,
                startDate: commonFunctions.formatDateToString(new Date(data.startDate)),
                startTime: commonFunctions.formatTimeToString(new Date(data.startDate)),
                date: commonFunctions.formatDateToString(new Date(data.startDate)),
                duration: commonFunctions.getDifferenceInMinutes(data.startDate, data.endDate)
            }
        )
    )
}

const getAllAppointments = async () => {
    if (cache.has(cacheId)) {
        return cache.get(cacheId)
    }

    const data = await fs.readFile(constants.DATA_FILE);
    const parsedData = JSON.parse(data.toString())
    const dataWithDuration = formatAppointmentData(parsedData)

    cache.set(cacheId, dataWithDuration)

    return dataWithDuration
}

const deleteAppointment = async (id: string) => {
    if (cache.has(cacheId)) {
        const appointments: any = cache.get(cacheId)
        const indexToDelete = appointments.findIndex((app: any) => app.id === id)

        if (indexToDelete > -1) {
            appointments.splice(indexToDelete, 1)
            cache.set(cacheId, appointments)
            return true
        }
    }

    throw new Error("Invalid request")
}

const addAppointments = async (details: any) => {
    if (cache.has(cacheId)) {
        const appointments: any = cache.get(cacheId)
        appointments.push(details)

        cache.set(cacheId, appointments)
        return true
    }

    throw new Error("Invalid request")
}

export default {getAllAppointments, deleteAppointment, addAppointments}