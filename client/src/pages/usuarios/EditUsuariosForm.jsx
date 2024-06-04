import { Button, Stack, Typography } from "@mui/material";
import react, { useEffect, useState } from "react";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useUser } from "../../hooks/useUser";


function transformarFormato(entrada) {

  
    // Crear el objeto en el nuevo formato
    const salida = {
      id: entrada.id,
      email: entrada.email,
      password: entrada.password,
      confirm_password: entrada.confirm_password,
      name: entrada.name,
      last_name: entrada.last_name,
      middle_name: entrada.middle_name,
      phone: entrada.phone,
      address: entrada.address,
    };
    console.log(salida);
    return salida;
  }
function EditUsersForm({id}) {

  const {
   getUsers,
   postUsers,
   updateUser,
  } = useUser();

  const [user, setUser] = useState({});

  useEffect(() => {
    getUsers(id).then((data) => setUser(data));
  }, [id]);

  const { handleSubmit, control } = useForm({
    defaultValues: user,
  });

  const onSuccess = handleSubmit((entrada) => {
    console.log(entrada);
    console.log("onSuccess");
    const data = transformarFormato({...entrada, id});
    console.log(data);
    updateUser(data)
      .then(() => {
        console.log("se edito el usuario");
      })
      .catch((error) => {
        console.error(error);
        console.log("no se edito el usuario");
      });
  });

  return (
    <>
      <FormContainer onSuccess={onSuccess}>
        <Stack spacing={2}>
          <Typography variant="h6">Nuevo Usuario</Typography>
          <TextFieldElement
            name="email"
            label="Correo"
            required
            control={control}
          />
         
          <TextFieldElement
            name="name"
            label="nombre"
            required
            control={control}
            
          />
          <TextFieldElement
            name="last_name"
            label="apellido"
            required
            control={control}
           
          />
          <TextFieldElement
            name="middle_name"
            label="segundo nombre"
            control={control}
            
            
          />
          <TextFieldElement
            name="phone"
            label="numero de celular"
            control={control}
            required
            type={"number"}
            
          />
           <TextFieldElement
            name="address"
            label="domicilio"
            required
            control={control}
            
          />
          <Button variant="contained" type="submit">
            Guardar
          </Button>
        </Stack>
      </FormContainer>
    </>
  );
}

export default EditUsersForm;
