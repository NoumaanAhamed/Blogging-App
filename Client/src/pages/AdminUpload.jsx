import { Box, Button, Center, Text } from "@chakra-ui/react";
import React from "react";

const UploadPage = () => {
  const handleFileUpload = (event) => {
    // Add your file upload logic here
    const file = event.target.files[0];
    console.log("File uploaded:", file);
  };

  return (
    <Center height="100vh">
      <Box p={4} borderWidth="1px" borderRadius="lg" width="400px">
        <Text fontSize="xl" fontWeight="bold" mb={4}>
          Upload Blog Post
        </Text>
        <input type="file" onChange={handleFileUpload} mb={4} />
        <Button colorScheme="teal" width="full">
          Upload
        </Button>
      </Box>
    </Center>
  );
};

export default UploadPage;
