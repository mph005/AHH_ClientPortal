import { useEffect } from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Button,
  VStack,
  HStack,
  Icon,
} from '@chakra-ui/react';
import { useAppSelector } from '../hooks/reduxHooks';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    // Load dashboard data when component mounts
    // This would typically fetch appointments, client data, etc.
  }, []);

  return (
    <Container maxW="container.xl" py={8}>
      <Box mb={8}>
        <Heading as="h1" size="xl" mb={2}>
          Welcome, {user?.firstName || 'User'}!
        </Heading>
        <Text color="gray.600">
          Manage your appointments, clients, and business from your dashboard.
        </Text>
      </Box>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={8}>
        <Card>
          <CardHeader>
            <Heading size="md">Upcoming Appointments</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>Next 7 Days</StatLabel>
              <StatNumber>0</StatNumber>
              <StatHelpText>No upcoming appointments</StatHelpText>
            </Stat>
            <Button colorScheme="blue" size="sm" mt={4}>
              View Calendar
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Clients</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>Total Active Clients</StatLabel>
              <StatNumber>0</StatNumber>
              <StatHelpText>No clients registered yet</StatHelpText>
            </Stat>
            <Button colorScheme="blue" size="sm" mt={4} onClick={() => navigate('/clients')}>
              Manage Clients
            </Button>
          </CardBody>
        </Card>

        <Card>
          <CardHeader>
            <Heading size="md">Services</Heading>
          </CardHeader>
          <CardBody>
            <Stat>
              <StatLabel>Available Services</StatLabel>
              <StatNumber>0</StatNumber>
              <StatHelpText>No services configured</StatHelpText>
            </Stat>
            <Button colorScheme="blue" size="sm" mt={4}>
              Manage Services
            </Button>
          </CardBody>
        </Card>
      </SimpleGrid>

      <Box>
        <Heading as="h2" size="lg" mb={4}>
          Quick Actions
        </Heading>
        <HStack spacing={4} flexWrap="wrap">
          <Button colorScheme="blue">Book Appointment</Button>
          <Button colorScheme="teal" onClick={() => navigate('/clients/new')}>Add New Client</Button>
          <Button colorScheme="purple">View Schedule</Button>
        </HStack>
      </Box>
    </Container>
  );
};

export default DashboardPage; 