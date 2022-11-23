import create from "zustand";
import {AppointmentsState} from "./interface/appointments"
import constants from "../utils/constants";
import commonFunctions from "../utils/commonFunctions";

export const useAppointmentStore = create<AppointmentsState>((set) => ({
    loading: false,
    appointments: [],
    sort: "clinician_name",

    setLoading: (payload) => {
        set(() => ({ loading: payload }));
    },

    setSort: (payload) => {
        const updatedSort = payload.replace(" ", "_").toLowerCase()
        set(() => ({ sort: updatedSort }));
    },

    setAppoinments: async (sort) => {
        try {
            set(() => ({ loading: true }));
            const response = await fetch(`${constants.API_URL}/appointments/list/${sort}`)
            const appointmentData = await response.json();
            set(() => ({ appointments: appointmentData ?? [] }));
        } catch (error) {
            console.log(error)
        } finally {
            set(() => ({ loading: false }));
        }
    },

    deleteAppointment: async (id: string) => {
        try {
            set(() => ({ loading: true }));
            const response = await fetch(`${constants.API_URL}/appointments/delete/${id}`, {method: "DELETE"})
            await response.json();
        } catch (error) {
            console.log(error)
        } finally {
            set(() => ({ loading: false }));
        }
    },

    addAppointment: async () => {
        try {
            set(() => ({ loading: true }));
            const requestBody = {
                startDate: new Date(),
                endDate: commonFunctions.addHours(new Date(), commonFunctions.randomHour()),
                clinicianName: "John Lennon",
                patient: "Random Patient"
            }
            const response = await fetch(`${constants.API_URL}/appointments/add`, {
                method: "POST",
                headers: { 'Content-Type': 'application/json' }, 
                body:JSON.stringify(requestBody)
            })
            await response.json();
        } catch (error) {
            console.log(error)
        } finally {
            set(() => ({ loading: false }));
        }
    }
}))