import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  
  return (
    <Box>
      {/* Hero Section */}
      <Box bg="blue.50" py={20}>
        <Container maxW="container.xl">
          <Flex
            direction={{ base: 'column', md: 'row' }}
            alignItems="center"
            justifyContent="space-between"
            gap={8}
          >
            <VStack alignItems="flex-start" gap={6} maxW="600px">
              <Heading as="h1" size="2xl" lineHeight="1.2">
                Streamline Your Massage Therapy Practice
              </Heading>
              <Text fontSize="xl" color="gray.600">
                A comprehensive client management and appointment scheduling system
                designed specifically for massage therapists.
              </Text>
              <Stack direction={{ base: 'column', sm: 'row' }} gap={4}>
                <Button 
                  size="lg" 
                  colorScheme="blue" 
                  onClick={() => navigate('/register')}
                >
                  Get Started
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  colorScheme="blue" 
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
              </Stack>
            </VStack>
            <Box maxW="500px" w="100%">
              {/* Placeholder for an image */}
              <Box
                bg="gray.300"
                h="300px"
                borderRadius="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="gray.600">Hero Image</Text>
              </Box>
            </Box>
          </Flex>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxW="container.xl" py={20}>
        <VStack gap={16}>
          <VStack gap={4} textAlign="center">
            <Heading as="h2" size="xl">
              Features Designed for Massage Therapists
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="800px">
              Everything you need to manage your practice efficiently and provide
              an exceptional experience for your clients.
            </Text>
          </VStack>

          <Wrap gap={8} justify="center">
            {/* Feature Items */}
            {features.map((feature, index) => (
              <WrapItem key={index} width={{ base: '100%', md: '45%', lg: '30%' }}>
                <Box p={6} borderRadius="lg" borderWidth="1px" h="100%">
                  <VStack gap={4} alignItems="flex-start">
                    <Heading as="h3" size="md">
                      {feature.title}
                    </Heading>
                    <Text color="gray.600">{feature.description}</Text>
                  </VStack>
                </Box>
              </WrapItem>
            ))}
          </Wrap>
        </VStack>
      </Container>

      {/* CTA Section */}
      <Box bg="blue.500" py={16}>
        <Container maxW="container.xl">
          <VStack gap={6} textAlign="center">
            <Heading as="h2" size="xl" color="white">
              Ready to Transform Your Practice?
            </Heading>
            <Text fontSize="lg" color="white" maxW="700px">
              Join thousands of massage therapists who have streamlined their
              business operations and improved client satisfaction.
            </Text>
            <Button
              size="lg"
              bg="white"
              color="blue.500"
              _hover={{ bg: 'gray.100' }}
              mt={4}
              onClick={() => navigate('/register')}
            >
              Sign Up Now
            </Button>
          </VStack>
        </Container>
      </Box>
    </Box>
  );
};

// Feature items
const features = [
  {
    title: 'Client Management',
    description:
      'Store and organize client information, health histories, and treatment preferences in one secure location.',
  },
  {
    title: 'Online Booking',
    description:
      'Allow clients to view your availability and book appointments online, reducing phone calls and administrative work.',
  },
  {
    title: 'Appointment Scheduling',
    description:
      'Manage your schedule efficiently with calendar integration, automated reminders, and appointment history tracking.',
  },
  {
    title: 'Secure Payments',
    description:
      'Process payments securely, collect deposits for bookings, and generate professional invoices automatically.',
  },
  {
    title: 'SOAP Notes',
    description:
      'Create and store treatment notes, track client progress, and maintain detailed session records.',
  },
  {
    title: 'Business Analytics',
    description:
      'Gain insights into your business performance with reports on revenue, client retention, and appointment statistics.',
  },
];

export default HomePage; 