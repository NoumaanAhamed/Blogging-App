import {
  Button,
  Container,
  Flex,
  Link,
  Stack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

import CreateBlog from "./components/createBlog";

import { Link as RouterLink } from "react-router-dom";

import React, { useEffect, useState } from "react";
import SimpleCard from "./components/loginForm";
import axios from "axios";
import BlogPostWithImage from "./components/Blog";
import MyBlogPostWithImage from "./components/myBlog";
import { AddIcon } from "@chakra-ui/icons";

const Dashboard = ({ email, setEmail }) => {
  const [blogs, setBlogs] = useState([]);
  const [myBlogs, setMyBlogs] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    // Create an object with the blog data
    const blogData = {
      title: title,
      body: body,
    };

    // Make a POST request to your backend API
    axios
      .post("http://localhost:3000/blog", blogData, {
        withCredentials: true,
      })
      .then((response) => {
        console.log("Blog submitted successfully!", response.data);
        onClose(); // Close the modal after successful submission
      })
      .catch((error) => {
        console.error("Error submitting blog:", error);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:3000/blog", {
        withCredentials: true,
      })
      .then((res) => {
        setBlogs(res.data.blogs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function fetchMyBlogs() {
    axios
      .get("http://localhost:3000/blog/me", {
        withCredentials: true,
      })
      .then((res) => {
        setMyBlogs(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (email) {
      fetchMyBlogs();

      setInterval(() => {
        fetchMyBlogs();
      }, 3000);
    }
  }, [email]);

  // line,enclosed, enclosed-colored, soft-rounded, solid-rounded, and unstyled
  return (
    // <Container>
    <>
      {email ? (
        <Tabs size="lg" align="center" variant="enclosed" colorScheme="pink">
          <TabList mb="1em">
            <Tab>
              {" "}
              <Text fontSize={"2xl"}>All Blogs</Text>
            </Tab>
            <Tab>
              <Text fontSize={"2xl"}>My Blogs</Text>{" "}
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Flex gap={"10"} flexWrap={"wrap"} justifyContent={"center"}>
                {blogs.map((i) => {
                  return (
                    <>
                      <BlogPostWithImage
                        title={i.title}
                        body={i.body}
                        createdAt={i.createdAt}
                        createdBy={i.createdBy}
                        coverImageURL={i.coverImageURL}
                        id={i._id}
                        key={i._id}
                      />
                    </>
                  );
                })}
              </Flex>
            </TabPanel>
            <TabPanel>
              <Stack direction={"row-reverse"} spacing={4}>
                <CreateBlog
                  onOpen={onOpen}
                  isOpen={isOpen}
                  onClose={onClose}
                  title={title}
                  setTitle={setTitle}
                  body={body}
                  setBody={setBody}
                  handleSubmit={handleSubmit}
                />
              </Stack>
              <Flex gap={"10"} flexWrap={"wrap"} justifyContent={"center"}>
                {myBlogs.length !== 0 ? (
                  myBlogs.map((i) => {
                    return (
                      <>
                        <MyBlogPostWithImage
                          title={i.title}
                          body={i.body}
                          createdAt={i.createdAt}
                          createdBy={i.createdBy}
                          coverImageURL={i.coverImageURL}
                          id={i._id}
                          key={i._id}
                        />
                      </>
                    );
                  })
                ) : (
                  <Text fontSize={"xl"} mt={5}>
                    You have no blogs, Want to start writing your own blogs?
                    <Link> Click here!</Link>
                  </Text>
                )}
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <Flex gap={"10"} flexWrap={"wrap"} justifyContent={"center"}>
          {blogs.map((i) => {
            return (
              <>
                <BlogPostWithImage
                  title={i.title}
                  body={i.body}
                  createdAt={i.createdAt}
                  createdBy={i.createdBy}
                  coverImageURL={i.coverImageURL}
                  id={i._id}
                  key={i._id}
                />
              </>
            );
          })}
        </Flex>
      )}
    </>

    //{" "}
    // </Container>
  );
};

export default Dashboard;
