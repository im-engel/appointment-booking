import React from "react";
import {Delete} from "@mui/icons-material";
import {Box, Collapse, IconButton, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

const SubTable = (props: any) => {
    const {open, details, onDelete} = props

    return <TableRow>
        <TableCell style={{paddingBottom: 0, paddingTop: 0}} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
                <Box sx={{margin: 1}}>
                    <Typography variant="h6" gutterBottom component="div">
                        Appointments
                    </Typography>
                    <Table size="small" aria-label="purchases">
                        <TableHead>
                            <TableRow>
                                <TableCell>Start Date</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>Duration</TableCell>
                                <TableCell>Clinician Name</TableCell>
                                <TableCell>Patient Name</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {details.map((detail: any, index: number) => {
                                const moreThanAnHour = (detail?.duration ?? "").includes("hour(s)")
                                const backgroundColor = moreThanAnHour ? "indianred" : "white"
                                const fontColor = moreThanAnHour ? "white" : "black"
                                return (
                                    <TableRow key={index} style={{background: backgroundColor}}>
                                        <TableCell component="th" scope="row"
                                                   style={{color: fontColor}}>{detail.startDate}</TableCell>
                                        <TableCell style={{color: fontColor}}>{detail.startTime}</TableCell>
                                        <TableCell style={{color: fontColor}}>{detail.duration}</TableCell>
                                        <TableCell style={{color: fontColor}}>{detail.clinicianName}</TableCell>
                                        <TableCell style={{color: fontColor}}>{detail.patient.name}</TableCell>
                                        <TableCell align="right" style={{color: fontColor}}>
                                            <IconButton onClick={() => onDelete(detail.id)}>
                                                <Delete/>
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                )
                            })}
                        </TableBody>
                    </Table>
                </Box>
            </Collapse>
        </TableCell>
    </TableRow>
}

export default SubTable