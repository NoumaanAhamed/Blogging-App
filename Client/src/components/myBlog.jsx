import {
  Image,
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";

export default function MyBlogPostWithImage({
  title,
  body,
  createdAt,
  createdBy,
  coverImageURL,
}) {
  return (
    <Center py={6}>
      <Box
        maxW={"350px"}
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={useColorModeValue("2xl", "outline")}
        rounded={"md"}
        p={6}
        overflow={"hidden"}
      >
        <Box
          h={"200px"}
          bg={"gray.100"}
          mt={-6}
          mx={-6}
          mb={6}
          pos={"relative"}
        >
          <Image src={coverImageURL} layout={"fill"} />
        </Box>
        <Stack>
          <Text
            color={"green.500"}
            textTransform={"uppercase"}
            fontWeight={800}
            fontSize={"sm"}
            letterSpacing={1.1}
            bgGradient="linear(to-l, #7928CA, #FF0080)"
            bgClip="text"
          >
            My Blog
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"}>{body}</Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={createdBy.profilePic} alt={"Author"} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text fontWeight={600}>{createdBy.email}</Text>
            <Text color={"gray.500"}>
              published at {createdAt.slice(0, 10)}
            </Text>
          </Stack>
        </Stack>
        <ButtonGroup gap={1} mt={2}>
          <Button variant={"outline"} colorScheme="pibk">
            View
          </Button>
          <Button variant={"outline"} colorScheme="purple">
            Publish
          </Button>
        </ButtonGroup>
        <ButtonGroup gap={1} mt={2}>
          <Button variant={"outline"} colorScheme="cyan" pl={5} pr={5}>
            Edit
          </Button>
          <Button variant={"outline"} colorScheme="red" pl={5} pr={6}>
            Delete
          </Button>
        </ButtonGroup>
      </Box>
    </Center>
  );
}
