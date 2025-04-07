import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { logout } from '../../store/slices/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={10}
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      px={4}
      boxShadow="sm"
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <HStack spacing={8} alignItems="center">
          <Box>
            <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
              <Text fontSize="xl" fontWeight="bold" color="blue.500">
                MT Client Portal
              </Text>
            </Link>
          </Box>
          <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
            <Link as={RouterLink} to="/services" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }}>
              Services
            </Link>
            {isAuthenticated && (
              <>
                <Link as={RouterLink} to="/dashboard" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }}>
                  Dashboard
                </Link>
                <Link as={RouterLink} to="/appointments" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'gray.100' }}>
                  Appointments
                </Link>
              </>
            )}
          </HStack>
        </HStack>

        <HStack spacing={4}>
          {isAuthenticated ? (
            <Menu>
              <MenuButton as={Button} rounded="full" variant="link" cursor="pointer" minW={0}>
                <Text>{user?.firstName}</Text>
              </MenuButton>
              <MenuList>
                <MenuItem as={RouterLink} to="/profile">
                  Profile
                </MenuItem>
                <MenuItem as={RouterLink} to="/dashboard">
                  Dashboard
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <>
              <Button as={RouterLink} to="/login" variant="ghost">
                Sign In
              </Button>
              <Button as={RouterLink} to="/register" colorScheme="blue">
                Sign Up
              </Button>
            </>
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navbar; 