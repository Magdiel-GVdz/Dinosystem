import { Button, Stack, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { AutocompleteElement, FormContainer, TextFieldElement, useForm } from 'react-hook-form-mui'
import NuevoAutoresModal from './NuevoAutoresModal';
import NuevoGeneroModal from './NuevoGeneroModal';
import NuevoEditorialModal from './NuevoEditorialModal';
import { useBook } from '../../hooks/useBook';

function LibrosForm() {
    const {getAuthors,getPublishers,getGenres} = useBook();
    const [authorsData, setAuthorsData] = useState([]);

    useEffect(() => {
        getAuthors().then((newData) => setAuthorsData(newData));
        getPublishers().then((newData) => setPublishersData(newData));
        getGenres().then((newData) => setGenresData(newData));
    }, [getAuthors,getPublishers,getGenres]);

    const {handleSubmit, control} = useForm();
    const onSuccess = handleSubmit((e)=>{console.log(e)})
  return (
    <FormContainer onSuccess={onSuccess} >
        <Stack spacing={2}>
        <Typography variant="h6">Nuevo Libro</Typography>  
        <TextFieldElement name="Titulo" label="Titulo del Libro" required control={control}/>
        <AutocompleteElement name="Autores" label="Autor(es)" required multiple control={control} options={authorsData.map(a => ({label: `${a.name} ${a.last_name}`, value: `${a.name} ${a.last_name}`, id: a.id}))}/>
        <NuevoAutoresModal/>
        <AutocompleteElement name="Editorial" label="Editorial" control={control} required options={[
          {label:"Editorial 1", value:"Editorial 1",id:1},
          {label:"Editorial 2", value:"Editorial 2",id:2},
          {label:"Editorial 3", value:"Editorial 3",id:3},
          {label:"Editorial 4", value:"Editorial 4",id:4},
        ]}/>
        <NuevoEditorialModal/>
        <TextFieldElement name="ISBN" label="ISBN" required control={control} />
        <AutocompleteElement name="Generos" label="Genero(s)" control={control} required multiple options={[
          {label:"Genero 1", value:"Genero 1",id:1},
          {label:"Genero 2", value:"Genero 2",id:2},
          {label:"Genero 3", value:"Genero 3",id:3},
          {label:"Genero 4", value:"Genero 4",id:4},
        ]}/>
        <NuevoGeneroModal/>
        <Button variant="contained" type='submit'>Añadir</Button>
        </Stack>
    </FormContainer>
  )
}

export default LibrosForm