import React from 'react'
import UsuariosTaple from './UsuariosTable'
import UsuariosModal from './UsuariosModal'
import SuperUserModal from './SuperUserModal'
const UsuariosPage = () => {
  return (
    <div>UsuariosPage
      <UsuariosTaple />
      <UsuariosModal/>
      
      <SuperUserModal/>
    </div>
  )
}

export default UsuariosPage