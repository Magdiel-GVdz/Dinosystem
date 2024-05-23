import React from 'react'
import { useForm } from "react-hook-form-mui";
import { DateTimePickerElement } from "react-hook-form-mui/date-pickers";

const ReportesVentasPage = () => {
const { control } = useForm();
  return (
    <div>ReportesVentasPage

<DateTimePickerElement
            control={control}
            name="start_date"
            views={['day', 'month', 'year', 'hours', 'minutes']}
            label="Fecha inicio"
            required
          />
          <DateTimePickerElement
            control={control}
            name="end_date"
            views={['day', 'month', 'year','hours','minutes']}
            label="Fecha final"
            required
          />




    </div>


  )
}

export default ReportesVentasPage
