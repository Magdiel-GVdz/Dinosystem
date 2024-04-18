import { Box, Button, Modal, Typography } from '@mui/material'
import React from 'react'

const ConfirmModal = ({ open, handleClose, handleCancel, handleAccept }) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}
      >
        <Typography id="confirm-modal-title" variant="h6" component="h2">
          ¿Esta seguro de realizar esta accion?
        </Typography>
        <Box sx={{ mt: 2 }}>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button onClick={handleAccept} sx={{ ml: 1 }}>Aceptar</Button>
        </Box>
      </Box>
    </Modal>
  )
}

export default ConfirmModal