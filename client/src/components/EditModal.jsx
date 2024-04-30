import { Box, Button, Modal, Typography } from '@mui/material'
import React, { useState } from 'react'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'

const EditModal = ({ open, handleClose, handleCancel, handleAccept, label, value }) => {
  const [editValue, setEditValue] = useState(value)
  console.log("edit" ,editValue);
  return (
    
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="edit-modal-title"
      aria-describedby="edit-modal-description"
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
        <Typography id="edit-modal-title" variant="h6" component="h2">
          Editar
        </Typography>
        <FormContainer  onSuccess={handleAccept}>
          <TextFieldElement
            name="name"
            label={label}
            defaultValue={editValue}
          />
        <Box sx={{ mt: 2 }}>
          <Button onClick={handleCancel}>Cancelar</Button>
          <Button type="submit" sx={{ ml: 1 }}>Aceptar</Button>
        </Box>
        </FormContainer>
      </Box>
    </Modal>
  )
}

export default EditModal