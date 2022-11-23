import React, {useEffect, useState} from "react"
import { Paper, Table, TableBody, TableContainer } from "@mui/material"
import Header from "./Header"
import Row from "./Row"
import { useAppointmentStore } from "../../../store/useAppointmentsStore"

const AppointmentTable = () => {
    const {appointments, sort, deleteAppointment, setAppoinments} = useAppointmentStore()

    const onAppointmentDelete = async (id: string) => { 
        await deleteAppointment(id)
         setAppoinments(sort)
    }

    return <TableContainer component={Paper}>
        <Table>
            <Header/>
            <TableBody>
                {
                    appointments.map((app: any, index: number) => (
                        <Row key={index} row={app} onDelete={onAppointmentDelete}/>
                    ))
                }
            </TableBody>
        </Table>
    </TableContainer>
}

export default AppointmentTable