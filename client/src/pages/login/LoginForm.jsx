import { Button, Grid, Stack } from '@mui/material'
import React, { useContext, useState } from 'react'
import { FormContainer, PasswordElement, TextFieldElement, useForm } from 'react-hook-form-mui'
import { UserContext } from '../../context/UserProvider';
import LoginIcon from '@mui/icons-material/Login';

const LoginForm = () => {
    const { authenticate, loading } = useContext(UserContext);

    const { handleSubmit, control, watch } = useForm();
  
    const onSubmit = handleSubmit((e) => {
      authenticate(e.email, e.password)
        .then((data) => {
          console.log("Logged in!", data);
        })
        .catch((err) => {
          console.log("Ops!", err);
        });
    });

  return (
    <Grid item xs={12}>
        <FormContainer onSuccess={onSubmit} onError={()=>{}}>
          <Stack spacing={2}>
            <TextFieldElement
              name={"email"}
              label={"Email"}
              type={"email"}
              control={control}
              required
              fullWidth
            />
            <PasswordElement
              fullWidth
              name={"password"}
              label={"Password"}
              control={control}
              required
            />
            <Button
              sx={{ mt: 3, mb: 2 }}
              fullWidth
              startIcon={<LoginIcon />}
              variant={"contained"}
              type={"submit"}
              disabled={loading}
            >
              {loading ? "Loading" : "Submit"}
            </Button>
            {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
          </Stack>
        </FormContainer>
      </Grid>
  )
}

export default LoginForm