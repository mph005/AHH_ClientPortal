import { useState, useEffect } from 'react';
import { Box, Container, Heading, Spinner, Text, Alert, AlertIcon } from '@chakra-ui/react';
import ClientList from '../../components/clients/ClientList';
import ClientService, { Client } from '../../services/client.service';

const ClientsPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        setLoading(true);
        const clientData = await ClientService.getAllClients();
        setClients(clientData);
        setError(null);
      } catch (err: any) {
        console.error('Error fetching clients:', err);
        setError(err.response?.data?.message || 'Failed to load clients');
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  return (
    <Container maxW="container.xl" py={10}>
      <Box>
        <Heading as="h1" size="xl" mb={4}>Client Management</Heading>
        <Text mb={6} color="gray.600">View and manage your massage therapy clients</Text>

        {loading ? (
          <Box textAlign="center" py={10}>
            <Spinner size="xl" />
            <Text mt={4}>Loading clients...</Text>
          </Box>
        ) : error ? (
          <Alert status="error" mb={6}>
            <AlertIcon />
            {error}
          </Alert>
        ) : (
          <ClientList initialClients={clients} />
        )}
      </Box>
    </Container>
  );
};

export default ClientsPage; 