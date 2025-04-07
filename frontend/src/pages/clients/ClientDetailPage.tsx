import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  Button,
  Flex,
  Spinner,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Badge,
  Divider,
  VStack,
  HStack,
  Grid,
  GridItem,
  useToast,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import ClientService, { Client } from '../../services/client.service';

const ClientDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();
  const [client, setClient] = useState<Client | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClient = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const clientData = await ClientService.getClientById(parseInt(id));
        setClient(clientData);
        setError(null);
      } catch (err: any) {
        setError(err.response?.data?.message || 'Failed to fetch client details');
        console.error('Error fetching client:', err);
        
        toast({
          title: 'Error',
          description: 'Failed to load client details',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClient();
  }, [id, toast]);

  const handleEdit = () => {
    navigate(`/clients/${id}/edit`);
  };

  const handleBack = () => {
    navigate('/clients');
  };

  if (loading) {
    return (
      <Box textAlign="center" py={20}>
        <Spinner size="xl" />
        <Text mt={4}>Loading client details...</Text>
      </Box>
    );
  }

  if (error || !client) {
    return (
      <Container maxW="container.xl" py={10}>
        <Box textAlign="center" py={10}>
          <Text color="red.500">
            {error || 'Client not found'}
          </Text>
          <Button mt={4} onClick={handleBack}>
            Back to Clients
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxW="container.xl" py={10}>
      <Flex justify="space-between" align="center" mb={6}>
        <Box>
          <Button variant="outline" size="sm" mb={2} onClick={handleBack}>
            ← Back to Clients
          </Button>
          <Heading as="h1" size="xl">
            {client.firstName && client.lastName 
              ? `${client.firstName} ${client.lastName}`
              : client.user?.firstName && client.user?.lastName 
                ? `${client.user.firstName} ${client.user.lastName}`
                : 'Client Details'}
          </Heading>
          <HStack mt={2}>
            <Badge colorScheme={client.userId ? (client.user?.active ? "green" : "red") : "yellow"}>
              {client.userId ? (client.user?.active ? "Active" : "Inactive") : "No User Account"}
            </Badge>
            <Text color="gray.500">Client since {new Date(client.createdAt).toLocaleDateString()}</Text>
          </HStack>
        </Box>
        <Button colorScheme="blue" onClick={handleEdit}>
          Edit Client
        </Button>
      </Flex>

      <Tabs colorScheme="blue" mt={6}>
        <TabList>
          <Tab>Information</Tab>
          <Tab>Appointments</Tab>
          <Tab>Notes</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <Box bg="white" p={6} borderRadius="md" shadow="md">
              <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={8}>
                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box>
                      <Heading as="h3" size="md" mb={2}>
                        Contact Information
                      </Heading>
                      <Divider mb={4} />
                      <Stack spacing={3}>
                        <Flex>
                          <Text fontWeight="bold" width="100px">Email:</Text>
                          <Text>{client.email}</Text>
                        </Flex>
                        <Flex>
                          <Text fontWeight="bold" width="100px">Phone:</Text>
                          <Text>{client.phone || client.user?.phone || 'N/A'}</Text>
                        </Flex>
                      </Stack>
                    </Box>

                    <Box width="100%" mt={6}>
                      <Heading as="h3" size="md" mb={2}>
                        Address
                      </Heading>
                      <Divider mb={4} />
                      <Stack spacing={3}>
                        <Flex>
                          <Text fontWeight="bold" width="100px">Street:</Text>
                          <Text>{client.address || 'N/A'}</Text>
                        </Flex>
                        <Flex>
                          <Text fontWeight="bold" width="100px">City:</Text>
                          <Text>{client.city || 'N/A'}</Text>
                        </Flex>
                        <Flex>
                          <Text fontWeight="bold" width="100px">State:</Text>
                          <Text>{client.state || 'N/A'}</Text>
                        </Flex>
                        <Flex>
                          <Text fontWeight="bold" width="100px">ZIP Code:</Text>
                          <Text>{client.zipCode || 'N/A'}</Text>
                        </Flex>
                      </Stack>
                    </Box>
                  </VStack>
                </GridItem>

                <GridItem>
                  <VStack align="start" spacing={4}>
                    <Box width="100%">
                      <Heading as="h3" size="md" mb={2}>
                        Personal Information
                      </Heading>
                      <Divider mb={4} />
                      <Stack spacing={3}>
                        <Flex>
                          <Text fontWeight="bold" width="100px">Birth Date:</Text>
                          <Text>
                            {client.dateOfBirth 
                              ? new Date(client.dateOfBirth).toLocaleDateString() 
                              : 'N/A'}
                          </Text>
                        </Flex>
                      </Stack>
                    </Box>

                    <Box width="100%" mt={6}>
                      <Heading as="h3" size="md" mb={2}>
                        Emergency Contact
                      </Heading>
                      <Divider mb={4} />
                      <Stack spacing={3}>
                        <Flex>
                          <Text fontWeight="bold" width="100px">Name:</Text>
                          <Text>{client.emergencyContactName || 'N/A'}</Text>
                        </Flex>
                        <Flex>
                          <Text fontWeight="bold" width="100px">Phone:</Text>
                          <Text>{client.emergencyContactPhone || 'N/A'}</Text>
                        </Flex>
                      </Stack>
                    </Box>
                  </VStack>
                </GridItem>
              </Grid>
            </Box>
          </TabPanel>

          <TabPanel>
            <Box bg="white" p={6} borderRadius="md" shadow="md" textAlign="center">
              <Text fontSize="lg" color="gray.500">
                No appointments found for this client.
              </Text>
              <Button colorScheme="blue" mt={4}>
                Schedule New Appointment
              </Button>
            </Box>
          </TabPanel>

          <TabPanel>
            <Box bg="white" p={6} borderRadius="md" shadow="md">
              <Heading as="h3" size="md" mb={4}>Client Notes</Heading>
              <Box p={4} bg="gray.50" borderRadius="md" minHeight="200px">
                {client.notes ? (
                  <Text whiteSpace="pre-line">{client.notes}</Text>
                ) : (
                  <Text color="gray.500" textAlign="center">No notes available for this client.</Text>
                )}
              </Box>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Container>
  );
};

export default ClientDetailPage; 