import React from 'react';
import  DevolucionesForm from './DevolucionesForm'
import DevolucionesTable from './DevolucionesTable';
import DevolucionesProvider from '../../provider/DevolucionesProvider';
const DevolucionesPage = () => {
  return (
    <div>DevolucionesPage
    < DevolucionesProvider>
      <DevolucionesForm />
      <DevolucionesTable />
    </ DevolucionesProvider>
    </div>
  )
}

export default DevolucionesPage