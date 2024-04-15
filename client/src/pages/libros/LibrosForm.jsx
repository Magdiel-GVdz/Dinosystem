import { Button, Stack } from '@mui/material'
import React from 'react'
import { AutocompleteElement, FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui'

function LibrosForm() {
    const {handleSubmit, control, watch} = useForm();
    const onSuccess = handleSubmit((e)=>{console.log(e)})
  return (
    <FormContainer onSuccess={onSuccess} >
        <Stack spacing={2}>
        <TextFieldElement name="Titulo" label="Titulo del Libro" required control={control}/>
        <AutocompleteElement name="Autores" label="Autor(es)" required multiple control={control} options={[
          {label:"Autor 1", value:"Autor 1",id:1},
          {label:"Autor 2", value:"Autor 2",id:2},
          {label:"Autor 3", value:"Autor 3",id:3},
          {label:"Autor 4", value:"Autor 4",id:4},
        ]}/>
        <AutocompleteElement name="Editorial" label="Editorial" control={control} required options={[
          {label:"Editorial 1", value:"Editorial 1",id:1},
          {label:"Editorial 2", value:"Editorial 2",id:2},
          {label:"Editorial 3", value:"Editorial 3",id:3},
          {label:"Editorial 4", value:"Editorial 4",id:4},
        ]}/>
        
        <TextFieldElement name="ISBN" label="ISBN" required control={control} />
        <AutocompleteElement name="Generos" label="Genero(s)" control={control} required multiple options={[
          {label:"Genero 1", value:"Genero 1",id:1},
          {label:"Genero 2", value:"Genero 2",id:2},
          {label:"Genero 3", value:"Genero 3",id:3},
          {label:"Genero 4", value:"Genero 4",id:4},
        ]}/>
        <Button variant="contained" type='submit'>Añadir</Button>
        </Stack>
    </FormContainer>
  )
}

export default LibrosForm