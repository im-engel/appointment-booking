export interface AppointmentsState {
    loading: boolean,
    appointments: any,
    sort: string

    setLoading: (payload: boolean) => void;
    setSort: (payload: string) => void;
    setAppoinments: (payload: string) => void;
    deleteAppointment: (id: string) => void;
    addAppointment: () => void;
}