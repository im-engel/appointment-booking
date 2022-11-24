import React, {useState} from "react"
import {IconButton, TableCell, TableRow} from "@mui/material"
import {KeyboardArrowDown, KeyboardArrowUp} from "@mui/icons-material"
import SubTable from "./SubTable";

const Row = (props: any) => {
    const {row, onDelete} = props
    const [open, setOpen] = useState(false);

    return <TableRow sx={{'& > *': {borderBottom: 'unset'}}}>
        <TableCell>
            <IconButton onClick={() => setOpen(!open)}>
                {open ? <KeyboardArrowUp/> : <KeyboardArrowDown/>}
            </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
            {row.header}
        </TableCell>
        <SubTable open={open} details={row.details} onDelete={onDelete}/>
    </TableRow>
}

export default Row