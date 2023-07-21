import { Box, Container, Heading, Image, SimpleGrid, Text } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3000/blog/").then((response) => {
      setBlogs(response.data.blogs);
    });
  }, []);

  return (
    <Container maxW="container.lg">
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={6}>
        {blogs.map((blog) => (
          <Box key={blog._id} borderWidth="1px" borderRadius="md" p={4}>
            <Heading as="h2" size="lg" mb={2}>
              {blog.title}
            </Heading>
            <Image src={blog.coverImageURL} alt={blog.title} mb={4} />
            <Text>{blog.body}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Blogs;
