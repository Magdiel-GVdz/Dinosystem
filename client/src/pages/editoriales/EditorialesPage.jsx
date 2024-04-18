import React from 'react'
import EditorialesTable from './EditorialesTable'
import NuevoEditorialModal from '../libros/NuevoEditorialModal'

function EditorialesPage() {
  return (
    <div>EditorialesPage
      <EditorialesTable />
      <NuevoEditorialModal />
    </div>
  )
}

export default EditorialesPage