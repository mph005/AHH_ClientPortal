import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Heading,
  Text,
  Flex,
  Spinner,
  VStack,
  Stack,
  Alert,
  AlertIcon,
  Code
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import ClientService, { Client } from '../../services/client.service';

interface ClientListProps {
  initialClients?: Client[];
}

const ClientList = ({ initialClients = [] }: ClientListProps) => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [loading, setLoading] = useState<boolean>(initialClients.length === 0);
  const [error, setError] = useState<string | null>(null);
  const [debug, setDebug] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // If we already have clients from props, don't fetch again
    if (initialClients.length > 0) {
      setClients(initialClients);
      setLoading(false);
      return;
    }

    const fetchClients = async () => {
      try {
        setLoading(true);
        console.log('ClientList: Fetching clients...');
        const clientData = await ClientService.getAllClients();
        console.log('ClientList: Client data received:', clientData);
        
        // Handle potential empty response properly
        if (Array.isArray(clientData)) {
          setClients(clientData);
          console.log(`ClientList: Successfully loaded ${clientData.length} clients`);
        } else {
          console.error('ClientList: Received non-array client data:', clientData);
          setClients([]);
          setError('Received invalid data format from server');
        }
      } catch (err: any) {
        console.error('ClientList: Error fetching clients:', err);
        setError(err.response?.data?.message || 'Failed to fetch clients');
        setDebug({
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          message: err.message
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, [initialClients]);

  const handleViewClient = (id: number) => {
    navigate(`/clients/${id}`);
  };

  const handleAddClient = () => {
    navigate('/clients/new');
  };

  if (loading) {
    return (
      <Box textAlign="center" py={10}>
        <Spinner size="xl" />
        <Text mt={4}>Loading clients...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box>
        <Alert status="error" mb={4}>
          <AlertIcon />
          <VStack align="start" spacing={2} width="100%">
            <Text fontWeight="bold">{error}</Text>
            <Text>No clients found. This could be due to:</Text>
            <Text ml={4}>• Your user role doesn't have permission to view clients</Text>
            <Text ml={4}>• The server encountered an error processing the request</Text>
            <Text ml={4}>• No client records exist in the database</Text>
            
            {debug && (
              <Box mt={4} p={3} bg="gray.50" borderRadius="md" width="100%" overflowX="auto">
                <Text fontWeight="bold" mb={2}>Debug Information:</Text>
                <Code p={2} width="100%">
                  Status: {debug.status || 'N/A'}<br />
                  Status Text: {debug.statusText || 'N/A'}<br />
                  {debug.data && `Message: ${JSON.stringify(debug.data)}`}
                </Code>
              </Box>
            )}
            
            <Button 
              mt={4}
              colorScheme="blue"
              onClick={() => window.location.reload()}
            >
              Retry
            </Button>
          </VStack>
        </Alert>
      </Box>
    );
  }

  if (clients.length === 0) {
    return (
      <Box textAlign="center" py={6}>
        <Alert status="info" mb={6}>
          <AlertIcon />
          <VStack align="start" spacing={2} width="100%">
            <Text>No clients found in the database.</Text>
            <Text size="sm">If you believe this is an error, check:</Text>
            <Text ml={4} size="sm">• You're logged in with the correct account</Text>
            <Text ml={4} size="sm">• Your account has the correct permissions</Text>
            <Button 
              mt={4}
              colorScheme="blue"
              onClick={handleAddClient}
            >
              Add Your First Client
            </Button>
          </VStack>
        </Alert>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Flex justifyContent="space-between" alignItems="center" mb={6}>
        <Heading as="h1" size="xl">
          Clients
        </Heading>
        <Button colorScheme="blue" onClick={handleAddClient}>
          Add New Client
        </Button>
      </Flex>

      <VStack align="stretch" gap={4}>
        {clients.map((client) => (
          <Box key={client.id} p={4} borderWidth="1px" borderRadius="lg">
            <Flex justify="space-between" align="center">
              <Heading size="md">
                {client.user?.firstName} {client.user?.lastName}
              </Heading>
              <Box bg={client.user?.active ? 'green.100' : 'red.100'} color={client.user?.active ? 'green.700' : 'red.700'} px={2} borderRadius="full">
                {client.user?.active ? 'Active' : 'Inactive'}
              </Box>
            </Flex>
            <Box borderBottomWidth="1px" my={2} />
            <Stack gap={2}>
              <Flex>
                <Text fontWeight="bold" width="100px">Email:</Text>
                <Text>{client.user?.email}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold" width="100px">Phone:</Text>
                <Text>{client.user?.phone || 'N/A'}</Text>
              </Flex>
              <Flex>
                <Text fontWeight="bold" width="100px">Location:</Text>
                <Text>
                  {client.city && client.state
                    ? `${client.city}, ${client.state}`
                    : 'N/A'}
                </Text>
              </Flex>
            </Stack>
            <Button
              mt={4}
              colorScheme="blue"
              size="sm"
              onClick={() => handleViewClient(client.id)}
            >
              View Details
            </Button>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default ClientList; 