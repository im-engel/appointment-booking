import React, {useState} from 'react';
import {Autocomplete, Button, Stack, TextField} from '@mui/material';
import constants from '../../utils/constants';
import {useAppointmentStore} from '../../store/useAppointmentsStore';

const AppointmentHeader = () => {
    const {setSort, sort, addAppointment, setAppointments} = useAppointmentStore()
    const [value, setValue] = useState<string>(constants.SORT_OPTIONS[0]);
    const [inputValue, setInputValue] = useState<string>('');

    const onSortChange = (event: any, newValue: string) => {
        setValue(newValue);
        setSort(newValue)
    }

    const onInputSortChange = (event: any, newInputValue: string) => {
        setInputValue(newInputValue);
    }

    const onAddClick = async () => {
        await addAppointment();
        await setAppointments(sort)
    }

    return <Stack direction="row">
        <Autocomplete
            disableClearable
            value={value}
            onChange={onSortChange}
            inputValue={inputValue}
            onInputChange={onInputSortChange}
            options={constants.SORT_OPTIONS}
            sx={{width: 300}}
            renderInput={(params) => <TextField {...params} label="Sort Order"/>}
        />
        <div style={{width: "100%"}}>
            <Button variant="contained" style={{width: "150px", height: "100%", float: "right"}}
                    onClick={onAddClick}>Add</Button>
        </div>
    </Stack>
}

export default AppointmentHeader