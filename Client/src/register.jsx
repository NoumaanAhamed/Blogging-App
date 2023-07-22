import React, { useState } from "react";
import { Container } from "@chakra-ui/react";

import SimpleCardRegister from "./components/registerForm";

const Register = ({ setIsLoggedIn }) => {
  return (
    <Container maxW="lg" centerContent>
      <SimpleCardRegister setIsLoggedIn={setIsLoggedIn} />
    </Container>
  );
};

export default Register;
