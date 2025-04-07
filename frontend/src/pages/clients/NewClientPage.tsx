import { Box, Container, Heading, Text } from '@chakra-ui/react';
import ClientForm from '../../components/clients/ClientForm';

const NewClientPage = () => {
  return (
    <Container maxW="container.xl" py={10}>
      <Box mb={6}>
        <Heading as="h1" size="xl">Add New Client</Heading>
        <Text mt={2} color="gray.600">Create a new client record with their details</Text>
      </Box>
      
      <ClientForm isEdit={false} />
    </Container>
  );
};

export default NewClientPage; 