import { Box, Container, Heading, Text, VStack } from '@chakra-ui/react';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <VStack spacing={8} align="center">
        <Box textAlign="center" mb={4}>
          <Heading as="h1" size="2xl" mb={2}>
            Join Massage Therapy Client Portal
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Create an account to book appointments and manage your information
          </Text>
        </Box>
        
        <RegisterForm />
      </VStack>
    </Container>
  );
};

export default RegisterPage; 