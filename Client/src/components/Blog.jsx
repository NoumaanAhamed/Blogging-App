import { ViewIcon } from "@chakra-ui/icons";
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
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function BlogPostWithImage({
  id,
  title,
  body,
  createdAt,
  createdBy,
  coverImageURL,
}) {
  const navigate = useNavigate();

  function handleView(id) {
    navigate(`/${id}`);
  }

  return (
    <Center py={6}>
      <Box
        minW={"300px"}
        maxW={"400px"} // Increase the maximum width here
        w={"full"}
        h={"450px"}
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
            Blog
          </Text>
          <Heading
            color={useColorModeValue("gray.700", "white")}
            fontSize={"2xl"}
            fontFamily={"body"}
          >
            {title}
          </Heading>
          <Text color={"gray.500"}>
            {body.length < 25 ? body : body.slice(0, 25) + "..."}
          </Text>
        </Stack>
        <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
          <Avatar src={createdBy.profilePic} alt={"Author"} />
          <Stack direction={"column"} spacing={0} fontSize={"sm"}>
            <Text textAlign={"left"} fontWeight={600}>
              {createdBy.email}
            </Text>
            <Text color={"gray.500"}>
              published at {createdAt.slice(0, 10)}
            </Text>
          </Stack>
        </Stack>
        <Center mt={2}>
          <Button
            onClick={() => {
              handleView(id);
            }}
            // rightIcon={<ViewIcon />}
            colorScheme="pink"
            // bgGradient="linear(to-l, #7928CA, #FF0080)"
            variant="solid"
          >
            View
          </Button>
        </Center>
      </Box>
    </Center>
  );
}
