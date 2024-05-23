import { Button, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  AutocompleteElement,
  FormContainer,
  TextFieldElement,
  useForm,
} from "react-hook-form-mui";
import NuevoAutoresModal from "./NuevoAutoresModal";
import NuevoGeneroModal from "./NuevoGeneroModal";
import NuevoEditorialModal from "./NuevoEditorialModal";
import { useBook } from "../../hooks/useBook";
import { generatePath } from "react-router-dom";
import EditLibroModal from "./EditLibroModal";


