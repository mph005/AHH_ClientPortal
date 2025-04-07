import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center">
        <Box textAlign="center" mb={4}>
          <Heading as="h1" size="2xl" mb={2}>
            Massage Therapy Client Portal
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Sign in to manage your appointments and client information
          </Text>
        </Box>
        
        <LoginForm />
      </VStack>
    </Container>
  );
};

export default LoginPage; 