import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Container,
  Box,
  Button,
} from "@chakra-ui/react";
import { Form } from "react-router-dom";
import SimpleCard from "./components/loginForm";

const Login = ({ setEmail }) => {
  return (
    <Container maxW="lg" centerContent>
      <SimpleCard setEmail={setEmail} />
    </Container>
  );
};

export default Login;
