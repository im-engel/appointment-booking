import React, {useEffect} from 'react';
import _ from "lodash"
import {useAppointmentStore} from '../store/useAppointmentsStore';
import AppointmentHeader from './Components/AppointmentHeader';
import {Stack} from '@mui/material';
import AppointmentTable from './Components/AppointmentTable/Table';

const AppointmentsPage = () => {
    const {sort, setAppointments} = useAppointmentStore()

    useEffect(() => {
        _.delay(() => setAppointments(sort), 2000)
        //setAppointments(sort)
    }, [])

    useEffect(() => {
        setAppointments(sort)
    }, [sort])


    return <div style={{"margin": "20px"}}>
        <Stack>
            <AppointmentHeader/>
            <div style={{marginTop: "20px"}}>
                <AppointmentTable/>
            </div>
        </Stack>
    </div>
}

export default AppointmentsPage