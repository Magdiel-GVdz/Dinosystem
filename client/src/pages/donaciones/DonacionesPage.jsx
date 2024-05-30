import React from 'react'
import DonacionesForm from './DonacionesForm'
import DonacionesTable from './DonacionesTable'
import DonationsProvider from '../../provider/DonationsProvider'
const DonacionesPage = () => {
  return (
    <div>Donaciones
      <DonationsProvider>
        <DonacionesForm />
        <DonacionesTable />
      </DonationsProvider>
    </div>
  )
}

export default DonacionesPage