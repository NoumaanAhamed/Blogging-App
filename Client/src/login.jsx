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

const Login = ({ setIsLoggedIn }) => {
  return (
    <Container maxW="lg" centerContent>
      <SimpleCard setIsLoggedIn={setIsLoggedIn} />
    </Container>
  );
};

export default Login;
