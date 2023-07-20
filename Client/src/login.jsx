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

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleSubmit = () => {
    console.log(email, password);
  };

  const isError = email === "";

  return (
    <Container maxW="lg" centerContent>
      <SimpleCard />
    </Container>
  );
};

export default Login;
