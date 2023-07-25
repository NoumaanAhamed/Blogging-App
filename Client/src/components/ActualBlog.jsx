import React from "react";
import {
  Box,
  Flex,
  Image,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";

const Blog = ({ title, body, coverImage }) => {
  return (
    <Box
      maxW="md"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      shadow="md"
      bg={useColorModeValue("white", "gray.700")}
    >
      <Image
        src={coverImage}
        alt={title}
        h="200px"
        w="100%"
        objectFit="cover"
      />

      <Box p={6}>
        <Heading fontSize="xl" mb={4}>
          {title}
        </Heading>
        <Text color={useColorModeValue("gray.800", "white")}>{body}</Text>
      </Box>
    </Box>
  );
};

export default Blog;
