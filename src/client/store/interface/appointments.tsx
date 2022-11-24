export interface AppointmentsState {
    loading: boolean,
    appointments: any,
    sort: string

    setLoading: (payload: boolean) => void;
    setSort: (payload: string) => void;
    setAppointments: (payload: string) => void;
    deleteAppointment: (id: string) => void;
    addAppointment: () => void;
}