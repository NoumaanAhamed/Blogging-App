import { DeleteIcon, DownloadIcon, EditIcon, ViewIcon } from "@chakra-ui/icons";
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
import axios from "axios";
import Blog from "./ActualBlog";
import { useState } from "react";

export default function MyBlogPostWithImage({
  title,
  body,
  createdAt,
  createdBy,
  coverImageURL,
  id,
}) {
  const [showBlog, setShowBlog] = useState(false);

  function handleView(id) {
    setShowBlog(true);
    // console.log(id);
  }

  function handleUpdate() {}

  function handleDelete(id) {
    axios
      .delete(`http://localhost:3000/blog/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  }

  function handlePublish(id) {
    axios
      .put(
        `http://localhost:3000/blog/publish/${id}`,
        { sample: "Hello" },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log(err);
      });
  }

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
          <Button
            variant={"ghost"}
            colorScheme="pink"
            onClick={() => {
              handleView(id);
            }}
          >
            <ViewIcon />
          </Button>
          <Button
            variant={"ghost"}
            colorScheme="purple"
            onClick={() => {
              handlePublish(id);
            }}
          >
            <DownloadIcon />
          </Button>

          <Button
            variant={"ghost"}
            colorScheme="cyan"
            onClick={() => {
              handleUpdate();
            }}
          >
            <EditIcon />
          </Button>
          <Button
            variant={"ghost"}
            colorScheme="red"
            onClick={() => {
              handleDelete(id);
            }}
          >
            <DeleteIcon />
          </Button>
        </ButtonGroup>
      </Box>
    </Center>
  );
}
