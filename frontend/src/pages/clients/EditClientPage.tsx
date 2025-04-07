import { Box, Container, Heading, Text } from '@chakra-ui/react';
import ClientForm from '../../components/clients/ClientForm';
import { useParams } from 'react-router-dom';

const EditClientPage = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <Container maxW="container.xl" py={10}>
      <Box mb={6}>
        <Heading as="h1" size="xl">Edit Client</Heading>
        <Text mt={2} color="gray.600">Update client information</Text>
      </Box>
      
      <ClientForm isEdit={true} />
    </Container>
  );
};

export default EditClientPage; 