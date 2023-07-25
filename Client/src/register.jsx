import React, { useState } from "react";
import { Container } from "@chakra-ui/react";

import SimpleCardRegister from "./components/registerForm";

const Register = ({ setEmail }) => {
  return (
    <Container maxW="lg" centerContent>
      <SimpleCardRegister setEmail={setEmail} />
    </Container>
  );
};

export default Register;
