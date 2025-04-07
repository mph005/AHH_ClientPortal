import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Heading,
  Text,
  useToast,
  Textarea,
  SimpleGrid,
  GridItem,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import ClientService from '../../services/client.service';
import { useAppSelector } from '../../hooks/reduxHooks';

// Form validation schema
const schema = yup.object().shape({
  address: yup.string().nullable(),
  city: yup.string().nullable(),
  state: yup.string().nullable(),
  zipCode: yup.string().nullable(),
  dateOfBirth: yup.string().nullable(),
  emergencyContactName: yup.string().nullable(),
  emergencyContactPhone: yup.string().nullable(),
  notes: yup.string().nullable(),
});

// Form data type
type FormData = {
  address?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  dateOfBirth?: string;
  emergencyContactName?: string;
  emergencyContactPhone?: string;
  notes?: string;
};

const NewClientPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!user) {
      toast({
        title: 'Authentication error',
        description: 'You must be logged in to create a client',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try {
      setSubmitting(true);
      setError(null);
      
      // Add the userId to the client data
      const clientData = {
        ...data,
        userId: user.id,
      };
      
      await ClientService.createClient(clientData);
      
      toast({
        title: 'Client created',
        description: 'New client was successfully created',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to clients list
      navigate('/clients');
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Failed to create client. Please try again.';
      setError(errorMessage);
      
      toast({
        title: 'Error',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container maxW="container.xl" py={10}>
      <Box mb={6}>
        <Heading as="h1" size="xl">Add New Client</Heading>
        <Text mt={2} color="gray.600">Create a new client record with their details</Text>
      </Box>
      
      {error && (
        <Alert status="error" mb={6}>
          <AlertIcon />
          {error}
        </Alert>
      )}
      
      <Box p={6} borderWidth={1} borderRadius="lg" boxShadow="md">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={6}>
            <Heading as="h2" size="md">Contact Information</Heading>
            
            <FormControl isInvalid={!!errors.address}>
              <FormLabel>Address</FormLabel>
              <Input id="address" {...register('address')} />
              <FormErrorMessage>{errors.address?.message}</FormErrorMessage>
            </FormControl>
            
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
              <GridItem colSpan={{ base: 1, md: 1 }}>
                <FormControl isInvalid={!!errors.city}>
                  <FormLabel>City</FormLabel>
                  <Input id="city" {...register('city')} />
                  <FormErrorMessage>{errors.city?.message}</FormErrorMessage>
                </FormControl>
              </GridItem>
              
              <GridItem colSpan={{ base: 1, md: 1 }}>
                <FormControl isInvalid={!!errors.state}>
                  <FormLabel>State</FormLabel>
                  <Input id="state" {...register('state')} />
                  <FormErrorMessage>{errors.state?.message}</FormErrorMessage>
                </FormControl>
              </GridItem>
              
              <GridItem colSpan={{ base: 1, md: 1 }}>
                <FormControl isInvalid={!!errors.zipCode}>
                  <FormLabel>ZIP Code</FormLabel>
                  <Input id="zipCode" {...register('zipCode')} />
                  <FormErrorMessage>{errors.zipCode?.message}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </SimpleGrid>
            
            <FormControl isInvalid={!!errors.dateOfBirth}>
              <FormLabel>Date of Birth</FormLabel>
              <Input id="dateOfBirth" type="date" {...register('dateOfBirth')} />
              <FormErrorMessage>{errors.dateOfBirth?.message}</FormErrorMessage>
            </FormControl>
            
            <Heading as="h2" size="md" mt={4}>Emergency Contact</Heading>
            
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
              <GridItem>
                <FormControl isInvalid={!!errors.emergencyContactName}>
                  <FormLabel>Name</FormLabel>
                  <Input id="emergencyContactName" {...register('emergencyContactName')} />
                  <FormErrorMessage>{errors.emergencyContactName?.message}</FormErrorMessage>
                </FormControl>
              </GridItem>
              
              <GridItem>
                <FormControl isInvalid={!!errors.emergencyContactPhone}>
                  <FormLabel>Phone</FormLabel>
                  <Input id="emergencyContactPhone" {...register('emergencyContactPhone')} />
                  <FormErrorMessage>{errors.emergencyContactPhone?.message}</FormErrorMessage>
                </FormControl>
              </GridItem>
            </SimpleGrid>
            
            <FormControl isInvalid={!!errors.notes}>
              <FormLabel>Notes</FormLabel>
              <Textarea id="notes" rows={4} {...register('notes')} />
              <FormErrorMessage>{errors.notes?.message}</FormErrorMessage>
            </FormControl>
            
            <Flex justify="space-between" mt={6}>
              <Button variant="outline" onClick={() => navigate('/clients')}>
                Cancel
              </Button>
              
              <Button
                type="submit"
                colorScheme="blue"
                isLoading={submitting}
                loadingText="Saving"
              >
                Save Client
              </Button>
            </Flex>
          </Stack>
        </form>
      </Box>
    </Container>
  );
};

export default NewClientPage; 