import {
    Alert,
    AlertIcon,
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
} from '@chakra-ui/react';
import React, { useState } from 'react';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    // Replace this with your login logic (e.g., API call)
    // For demonstration purposes, we'll show a simple error if email or password is empty

        // const response = await axios.post('http://localhost:3000/admin/login', { email, password })
        // .then(function(response){
        //     console.log(response);
        // })
        // .catch(function (error) {
        //     console.log('error');
        // });
        // If login is successful, you can redirect the user to the dashboard or some other page
        // For example: history.push('/dashboard');
        try {
            const response = await fetch('http://localhost:3000/admin/login', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ email, password }),
            });
        
            if (!response.ok) {
              throw new Error('Login failed');
            }
        
            const data = await response.json();
            console.log(data);
        
            // If login is successful, you can redirect the user to the dashboard or some other page
            // For example: history.push('/dashboard');
          } catch (error) {
            console.log('Error:', error.message);
          }
  };

  return (
    <Box
      maxW="400px"
      mx="auto"
      mt={8}
      p={4}
      borderWidth={1}
      borderRadius="md"
      boxShadow="lg"
    >
      <Heading textAlign="center" mb={4}>
        Admin Login
      </Heading>

      {error && (
        <Alert status="error" mb={4}>
          <AlertIcon />
          {error}
        </Alert>
      )}

      <FormControl id="email" mb={4}>
        <FormLabel>Email address</FormLabel>
        <Input
          type="email"
          placeholder="admin@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl id="password" mb={4}>
        <FormLabel>Password</FormLabel>
        <Input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormControl>

      <Button colorScheme="blue" size="lg" onClick={handleLogin} w="100%">
        Log in
      </Button>
    </Box>
  );
};

export default AdminLogin;
