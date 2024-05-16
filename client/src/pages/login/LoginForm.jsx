import { Button, Grid, Stack, createTheme } from "@mui/material";
import React, { useContext, useState } from "react";
import {
  FormContainer,
  PasswordElement,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import { useAuth } from "../../provider/AuthProvider";
import LoginIcon from "@mui/icons-material/Login";
import { Navigate } from "react-router-dom";
import { Gradient } from "@mui/icons-material";
import SxProp from "./LoginCss";
const LoginForm = () => {
  const { authenticate, loading, error, token } = useAuth();

  const { handleSubmit, control, watch } = useForm();

  const onSubmit = handleSubmit((e) => {
    if (authenticate && e) {
      authenticate(e.email, e.password)
        .then((data) => {
          console.log("Logged in!", data);
        })
        .catch((err) => {
          console.log("Ops!", err);
        });
    } else {
      console.error(
        `Unexpected null authenticate or form data: ${authenticate} ${e}`
      );
    }
  });

  return (
    <Grid item xs={24} 
     sx={{ 
    position: "absolute",
    top: "250px",
    left: "70px",
    padding: 10,
    height: "50vh",
    width: "40%",
    borderRadius: "15px",
    backgroundColor: "#0C130C",
    }}>
      <FormContainer onSuccess={onSubmit} onError={() => {}}>
        <Stack spacing={5} 
        sx={{
          color: "white",
          fontFamily: "Arial",
          borderRadius: "15px",
          backgroundColor: "#0C130C",
        }}
        >
          <SxProp />
          <TextFieldElement
            name={"email"}
            label={"Email"}
            type={"email"}
            control={control}
            required
            fullWidth
            sx={{
              
              
            }}
          />
          <PasswordElement
            fullWidth
            name={"password"}
            label={"Password"}
            control={control}
            required
            sx={{
              borderBlockColor: "#0C130C",
              color: "white",
              fontFamily: "Arial",
              borderRadius: "15px",
            }}
          />
          <Button
            sx={{ mt: 3, mb: 2 
            ,
           
            backgroundImage: "linear-gradient(to right, #3CE426, #8E2AC1, #641691)",
            color: "#3CE426",
            fontFamily: "Arial",
            borderRadius: "15px",
            "&:hover": {
              color: "#3CE426",
              fontFamily: "Arial",
              borderRadius: "15px",
              boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
              transition: "0.3s",
              cursor: "pointer",
              opacity: [0.9, 0.8, 0.7],
              transform: "translateY(-2px)",
              borderBlockColor: "#3CE426",
            }
            }}
            fullWidth
            startIcon={<LoginIcon />}
            variant={"contained"}
            type={"submit"}
            disabled={loading}
          >
            {loading ? "Loading" : "Submit"}
          </Button>
          {error && <p>{error}</p>}
          {token && <Navigate to="/ventas" />}
          {/* <pre>{JSON.stringify(watch(), null, 2)}</pre> */}
        </Stack>
      </FormContainer>
    </Grid>
  );
};

export default LoginForm;
