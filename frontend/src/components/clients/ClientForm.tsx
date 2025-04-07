import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  VStack,
  Heading,
  Flex,
  useColorModeValue,
  Text,
  Textarea,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useAppSelector } from '../../hooks/reduxHooks';
import ClientService, { Client, ClientFormData } from '../../services/client.service';

interface ClientFormProps {
  isEdit?: boolean;
}

// Form validation schema
const schema = yup.object().shape({
  userId: yup.number().required('User ID is required'),
  address: yup.string().optional(),
  city: yup.string().optional(),
  state: yup.string().optional(),
  zipCode: yup.string().optional(),
  dateOfBirth: yup.string().optional(),
  emergencyContactName: yup.string().optional(),
  emergencyContactPhone: yup.string().optional(),
  notes: yup.string().optional(),
});

const ClientForm = ({ isEdit = false }: ClientFormProps) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAppSelector((state) => state.auth);
  const bgColor = useColorModeValue('white', 'gray.700');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      userId: user?.id || 0,
    },
  });

  useEffect(() => {
    if (isEdit && id) {
      const fetchClient = async () => {
        try {
          setLoading(true);
          const clientData = await ClientService.getClientById(parseInt(id));
          // Reset form with fetched client data
          reset({
            userId: clientData.userId,
            address: clientData.address,
            city: clientData.city,
            state: clientData.state,
            zipCode: clientData.zipCode,
            dateOfBirth: clientData.dateOfBirth,
            emergencyContactName: clientData.emergencyContactName,
            emergencyContactPhone: clientData.emergencyContactPhone,
            notes: clientData.notes,
          });
          setError(null);
        } catch (err: any) {
          setError(err.response?.data?.message || 'Failed to fetch client');
          console.error('Error fetching client:', err);
        } finally {
          setLoading(false);
        }
      };

      fetchClient();
    }
  }, [isEdit, id, reset]);

  const onSubmit = async (data: ClientFormData) => {
    try {
      setLoading(true);
      
      if (isEdit && id) {
        // Update existing client
        await ClientService.updateClient(parseInt(id), data);
        navigate(`/clients/${id}`);
      } else {
        // Create new client
        const newClient = await ClientService.createClient(data);
        navigate(`/clients/${newClient.id}`);
      }
      
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to save client');
      console.error('Error saving client:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box p={4} bg={bgColor} rounded="md" shadow="sm">
      <Heading size="lg" mb={6}>
        {isEdit ? 'Edit Client Information' : 'Create New Client'}
      </Heading>

      {error && (
        <Text color="red.500" mb={4}>
          {error}
        </Text>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack gap={4} align="start">
          <Input 
            type="hidden" 
            {...register('userId')} 
          />

          <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }} gap={4} width="100%">
            <GridItem>
              <FormControl isInvalid={!!errors.address}>
                <FormLabel>Address</FormLabel>
                <Input 
                  type="text" 
                  placeholder="Enter address" 
                  {...register('address')} 
                />
                {errors.address && (
                  <FormErrorMessage>{errors.address.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.city}>
                <FormLabel>City</FormLabel>
                <Input 
                  type="text" 
                  placeholder="Enter city" 
                  {...register('city')} 
                />
                {errors.city && (
                  <FormErrorMessage>{errors.city.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.state}>
                <FormLabel>State</FormLabel>
                <Input 
                  type="text" 
                  placeholder="Enter state" 
                  {...register('state')} 
                />
                {errors.state && (
                  <FormErrorMessage>{errors.state.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.zipCode}>
                <FormLabel>Zip Code</FormLabel>
                <Input 
                  type="text" 
                  placeholder="Enter zip code" 
                  {...register('zipCode')} 
                />
                {errors.zipCode && (
                  <FormErrorMessage>{errors.zipCode.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.dateOfBirth}>
                <FormLabel>Date of Birth</FormLabel>
                <Input 
                  type="date" 
                  {...register('dateOfBirth')} 
                />
                {errors.dateOfBirth && (
                  <FormErrorMessage>{errors.dateOfBirth.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.emergencyContactName}>
                <FormLabel>Emergency Contact Name</FormLabel>
                <Input 
                  type="text" 
                  placeholder="Enter emergency contact name" 
                  {...register('emergencyContactName')} 
                />
                {errors.emergencyContactName && (
                  <FormErrorMessage>{errors.emergencyContactName.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>

            <GridItem>
              <FormControl isInvalid={!!errors.emergencyContactPhone}>
                <FormLabel>Emergency Contact Phone</FormLabel>
                <Input 
                  type="tel" 
                  placeholder="Enter emergency contact phone" 
                  {...register('emergencyContactPhone')} 
                />
                {errors.emergencyContactPhone && (
                  <FormErrorMessage>{errors.emergencyContactPhone.message}</FormErrorMessage>
                )}
              </FormControl>
            </GridItem>
          </Grid>

          <FormControl isInvalid={!!errors.notes} width="100%">
            <FormLabel>Notes</FormLabel>
            <Textarea 
              placeholder="Enter any additional notes" 
              {...register('notes')} 
              rows={4}
            />
            {errors.notes && (
              <FormErrorMessage>{errors.notes.message}</FormErrorMessage>
            )}
          </FormControl>

          <Flex gap={4} mt={4}>
            <Button
              type="submit"
              colorScheme="blue"
              isLoading={loading}
            >
              {isEdit ? 'Update Client' : 'Create Client'}
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate('/clients')}
            >
              Cancel
            </Button>
          </Flex>
        </VStack>
      </form>
    </Box>
  );
};

export default ClientForm; 