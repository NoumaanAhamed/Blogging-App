import { ReactNode, useEffect } from "react";
import {
  Heading,
  Highlight,
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  IconButton,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  Spacer,
  useToast,
} from "@chakra-ui/react";

import {
  ArrowForwardIcon,
  HamburgerIcon,
  MoonIcon,
  SunIcon,
} from "@chakra-ui/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const NavLink = ({ children }) => (
  <Link
    px={2}
    py={2}
    rounded={"md"}
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("gray.200", "gray.700"),
    }}
    href={"#"}
  >
    {children}
  </Link>
);

export default function Navbar({ isLoggedIn, setIsLoggedIn, email, setEmail }) {
  const navigate = useNavigate();
  const toast = useToast();

  const { colorMode, toggleColorMode } = useColorMode();
  const {
    isOpen: isMobileMenuOpen,
    onOpen: openMobileMenu,
    onClose: closeMobileMenu,
  } = useDisclosure();

  const handleLogOut = () => {
    axios
      .get("http://localhost:3000/user/logout", { withCredentials: true }) //!cookies work only with get
      .then((res) => {
        console.log(res.data.message);
        toast({
          title: "Logged Out Successfully",
          status: "success",
          duration: 1500,
        });
        setIsLoggedIn(false);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Box>
            <Heading>
              <Text
                bgGradient="linear(to-l, #7928CA, #FF0080)"
                bgClip="text"
                _hover={{ bgGradient: "linear(to-r, red.500, yellow.500)" }}
                cursor={"pointer"}
              >
                DevDairies.
              </Text>
            </Heading>
          </Box>
          <Flex display={{ base: "block", md: "none" }}>
            <Button onClick={toggleColorMode} mr={2}>
              {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <IconButton
              // Display only on smaller screens (base) and hide on larger screens (md)
              icon={<HamburgerIcon />}
              aria-label="Open Menu"
              onClick={openMobileMenu}
            />
          </Flex>

          <Flex alignItems={"center"} display={{ base: "none", md: "flex" }}>
            <Stack direction={"row"} spacing={7}>
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {isLoggedIn ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"link"}
                    cursor={"pointer"}
                    minW={0}
                  >
                    <Avatar size={"sm"} src={"../public/defaultProfile.avif"} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar
                        size={"2xl"}
                        src={
                          "https://avatars.dicebear.com/api/male/username.svg"
                        }
                      />
                    </Center>
                    <br />
                    <Center>
                      <p>{email}</p>
                    </Center>
                    <br />
                    <MenuDivider />
                    <MenuItem>Your Servers</MenuItem>
                    <MenuItem>Account Settings</MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <Flex gap={3}>
                  <Button colorScheme="pink">
                    <Link to={"/register"}>Register </Link>
                  </Button>
                  <Button
                    rightIcon={<ArrowForwardIcon />}
                    colorScheme="teal"
                    variant="outline"
                  >
                    <Link to={"/login"}>Sign In </Link>
                  </Button>
                </Flex>
              )}
            </Stack>
          </Flex>

          <Drawer
            isOpen={isMobileMenuOpen}
            placement="right"
            onClose={closeMobileMenu}
          >
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Your Menu</DrawerHeader>
              <DrawerBody>
                <Stack spacing={4}>
                  {/* Add more menu items as needed */}
                  {isLoggedIn ? (
                    <>
                      <Button>Home</Button>
                      <Button colorScheme="red" onClick={handleLogOut}>
                        Logout
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button colorScheme="pink">Register</Button>
                      <Button
                        rightIcon={<ArrowForwardIcon />}
                        colorScheme="teal"
                        variant="outline"
                      >
                        Sign In
                      </Button>
                    </>
                  )}
                </Stack>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </Flex>
      </Box>
    </>
  );
}
