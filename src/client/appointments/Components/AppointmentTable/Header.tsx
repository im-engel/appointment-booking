import React, {useEffect, useState} from "react"
import {TableCell, TableHead, TableRow} from "@mui/material"
import {useAppointmentStore} from "../../../store/useAppointmentsStore"

const headerCaption = (caption: string) => {
    switch (caption) {
        case "date":
            return "Date"
        case "clinician_name" :
            return "Clinician Name"
        default:
            return "";
    }
}

const Header = () => {
    const {sort} = useAppointmentStore()
    const [columnHeader, setColumnHeader] = useState<string>(headerCaption(sort));

    useEffect(() => {
        setColumnHeader(headerCaption(sort))
    }, [sort])

    return <TableHead>
        <TableRow>
            <TableCell/>
            <TableCell>{columnHeader}</TableCell>
        </TableRow>
    </TableHead>
}

export default Header