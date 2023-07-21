import { Box, Flex, Heading } from "@chakra-ui/react";
import { Link, Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <Box>
      <Box bg="#333" p={4} position="fixed" top={0} left={0} right={0} zIndex="1">
        <Flex align="center" justify="left"> {/* Set justify="left" */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Heading as="h1" color="white" cursor="pointer">
              Blogging App
            </Heading>
          </Link>
        </Flex>
      </Box>
      <Box pt="70px">
        <Outlet />
      </Box>
    </Box>
  );
}
