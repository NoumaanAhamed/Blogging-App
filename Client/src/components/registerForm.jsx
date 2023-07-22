import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Link,
  Button,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

import { Toast } from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";

import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { CloseIcon } from "@chakra-ui/icons";

export default function SimpleCardRegister({ setIsLoggedIn }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleUserLogin = () => {
    axios
      .post(
        "http://localhost:3000/user/register",
        {
          username,
          email,
          password,
        },
        { withCredentials: true }
      )
      .then((res) => {
        console.log(res.data.message);
        // Cookies.set("token", res.data.token);
        setIsLoggedIn(true);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <Box ml="auto" position="absolute" top="20" right="10">
        <Link as={RouterLink} to={"/dashboard"}>
          <CloseIcon cursor="pointer" />
        </Link>
      </Box>
      <Flex
        minH={"90vh"}
        align={"center"}
        justify={"center"}
        //   bg={useColorModeValue("gray.50", "gray.800")}
      >
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Create a new account</Heading>
            <Text fontSize={"lg"} color={"gray.600"}>
              to enjoy all of our cool <Link color={"blue.400"}>features</Link>{" "}
              ✌️
            </Text>
          </Stack>
          <Box
            rounded={"lg"}
            bg={useColorModeValue("white", "gray.700")}
            boxShadow={"lg"}
            p={8}
          >
            <Stack spacing={4}>
              <FormControl id="username">
                <FormLabel>Username</FormLabel>
                <Input
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input
                  name="email"
                  type="text"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: "column", sm: "row" }}
                  align={"start"}
                  justify={"space-between"}
                >
                  <Link as={RouterLink} to={"/login"} color={"blue.400"}>
                    Already Registered? Sign In
                  </Link>
                </Stack>
                <Button
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{
                    bg: "blue.500",
                  }}
                  type="submit"
                  onClick={handleUserLogin}
                >
                  Register
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    </>
  );
}
