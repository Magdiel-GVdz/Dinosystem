import React from 'react'
import { Stack, TextField } from '@mui/material'
import { DatePicker } from '@mui/x-date-pickers'
import { useState } from 'react'

export const Muipicker = () => {
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    console.log(selectedDate)
    return (
        <Stack spacing={4} sx={{ width: '250px' }}>

            <DatePicker label= 'Data Picker'
            renderInput={(params) => <TextField {...params} />}
            value={selectedDate}
            onChange={(newValue) => {
                setSelectedDate(newValue);
            }}
            />
        </Stack>
      )
}
  

