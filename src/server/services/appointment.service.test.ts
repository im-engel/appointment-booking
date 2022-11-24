const {v4} = require("uuid")
import appointmentService from "./appointment.service"
import NodeCache from "node-cache";
import commonFunctions from "../utils/commonFunctions";

const cache = new NodeCache({stdTTL: 15});
const cacheId = "appointments"

describe('Appointment Service', function () {
    test("Should list appointments", async () => {
        const result: any = await appointmentService.getAllAppointments()

        expect(result).toBeInstanceOf(Array)
        expect(result.length).toBe(10)
    })
    test("Should delete an appointment", async () => {
        const result: any = await appointmentService.deleteAppointment("5b992323-2c91-4e55-9759-d2a345629a33")
        expect(result).toBe(true)
    })
    test("Should add an appointment", async () => {
        const date = new Date()
        const newAppointment = {
            id: v4(),
            clinicianName: "jest clinicianName",
            patient: {id: v4(), name: "jest patient"},
            status: "ACTIVE",
            startDateRaw: date,
            startDate: commonFunctions.formatDateToString(new Date(date)),
            startTime: commonFunctions.formatTimeToString(new Date(date)),
            date: commonFunctions.formatDateToString(new Date(date)),
            duration: commonFunctions.getDifferenceInMinutes(date, date)
        }

        const result: any = await appointmentService.addAppointments(newAppointment)
        expect(result).toBe(true)
    })
});
