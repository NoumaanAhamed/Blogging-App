import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Box,
  Image,
  Heading,
  Text,
  Flex,
  Avatar,
  IconButton,
  Stack,
  Container,
  Link as Redirect,
  useColorModeValue,
} from "@chakra-ui/react";
// import { FaHeart, FaComment } from "react-icons/fa";

const BlogPage = () => {
  const { id } = useParams();

  const [blog, setBlog] = useState("");
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/blog/${id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setBlog(res.data.blog);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function parseBodyWithHeadingsAndLinks(body) {
    const linkRegex = /(?:(?:https?|ftp):\/\/|www\.)[^\s/$.?#].[^\s]*/gi;
    const headingRegex = /(#+)(.*)/g;
    const parts = body.split(linkRegex);

    return parts.map((part, index) => {
      const headingMatch = headingRegex.exec(part);

      if (headingMatch) {
        const headingText = headingMatch[2].trim();
        return (
          <Text
            key={index}
            as="h1"
            fontSize="2xl"
            mt={4}
            mb={2}
            fontWeight="extrabold"
            color={"GrayText"}
          >
            {headingText}
          </Text>
        );
      } else if (body.match(linkRegex) && body.match(linkRegex)[index]) {
        return (
          <Redirect
            key={index}
            color="teal.500"
            href={body.match(linkRegex)[index]}
            isExternal
          >
            {body.match(linkRegex)[index]}
          </Redirect>
        );
      }

      return (
        <Text
          key={index}
          fontSize="xl"
          fontWeight={"semibold"}
          color={useColorModeValue("rgba(0, 0, 0, 0.75)", "#F7FAFC")}
        >
          {part}
        </Text>
      );
    });
  }

  return (
    <Container maxW="container.md" mt="8">
      {/* Cover Image */}
      <Image src="" alt="Blog Cover Image" />

      <Box p="6">
        {/* Blog Title */}
        <Heading as="h3" size="lg" mb="2">
          {blog.title}
        </Heading>

        {/* Blog Text */}
        {blog.body?.split("\n").map((paragraph, index) => (
          <Text key={index} fontSize="md" color="gray.600" mb="4">
            {parseBodyWithHeadingsAndLinks(paragraph)}
          </Text>
        ))}

        {/* Author Info */}
        <Flex align="center" mb="4">
          <Avatar
            src="https://example.com/author-avatar.jpg"
            size="sm"
            mr="2"
          />
          <Text fontWeight="bold">{blog.createdBy?.email}</Text>
        </Flex>

        {/* Likes and Comments */}
        <Flex align="center" justify="space-between">
          {/* Likes */}
          <Stack direction="row" spacing="2" align="center">
            <IconButton
              //   icon={<FaHeart />}
              aria-label="Like"
              variant="ghost"
              size="sm"
              isRound
            />
            <Text fontSize="sm">{blog.likes?.length} Likes</Text>
          </Stack>

          {/* Comments */}
          <Stack direction="row" spacing="2" align="center">
            <IconButton
              //   icon={<FaComment />}
              aria-label="Comment"
              variant="ghost"
              size="sm"
              isRound
            />
            <Text fontSize="sm">{blog.comments?.length} Comments</Text>
          </Stack>
        </Flex>
      </Box>
    </Container>
  );
};

export default BlogPage;
