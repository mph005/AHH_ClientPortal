import {
  Box,
  Container,
  Link,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <Box
      as="footer"
      bg={useColorModeValue('gray.50', 'gray.900')}
      color={useColorModeValue('gray.700', 'gray.200')}
      borderTop="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
    >
      <Container
        as={Stack}
        maxW="container.xl"
        py={4}
        direction={{ base: 'column', md: 'row' }}
        spacing={4}
        justify={{ base: 'center', md: 'space-between' }}
        align={{ base: 'center', md: 'center' }}
      >
        <Text>© {currentYear} Massage Therapy Client Portal. All rights reserved.</Text>
        <Stack direction="row" spacing={6}>
          <Link as={RouterLink} to="/about">About</Link>
          <Link as={RouterLink} to="/privacy">Privacy</Link>
          <Link as={RouterLink} to="/terms">Terms</Link>
          <Link as={RouterLink} to="/contact">Contact</Link>
        </Stack>
      </Container>
    </Box>
  );
};

export default Footer; 