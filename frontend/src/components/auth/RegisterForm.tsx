import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Stack,
  Heading,
  Text,
  Link,
  useToast,
  Grid,
  GridItem,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/reduxHooks';
import { loginSuccess } from '../../store/slices/authSlice';
import AuthService, { RegisterCredentials } from '../../services/auth.service';

// Form validation schema
const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup
    .string()
    .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Please confirm your password'),
  phone: yup.string().optional(),
});

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterCredentials & { confirmPassword: string }>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: RegisterCredentials & { confirmPassword: string }) => {
    try {
      setSubmitting(true);
      
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...registerData } = data;
      
      // Set default role to 'client'
      const userData = {
        ...registerData,
        role: 'client' as const,
      };
      
      const response = await AuthService.register(userData);
      
      dispatch(loginSuccess({
        user: response.user,
        token: response.token,
      }));

      toast({
        title: 'Registration successful',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      let errorMessage = 'Registration failed. Please try again.';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      toast({
        title: 'Registration failed',
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
    <Box maxW="2xl" mx="auto" p={8} borderWidth={1} borderRadius="lg" boxShadow="lg">
      <Heading mb={6} textAlign="center">Create an Account</Heading>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4}>
            <GridItem>
              <FormControl isInvalid={!!errors.firstName}>
                <FormLabel htmlFor="firstName">First Name</FormLabel>
                <Input
                  id="firstName"
                  placeholder="First name"
                  {...register('firstName')}
                />
                <FormErrorMessage>{errors.firstName?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            
            <GridItem>
              <FormControl isInvalid={!!errors.lastName}>
                <FormLabel htmlFor="lastName">Last Name</FormLabel>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  {...register('lastName')}
                />
                <FormErrorMessage>{errors.lastName?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>

          <FormControl isInvalid={!!errors.email}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <Input
              id="email"
              type="email"
              placeholder="Your email"
              {...register('email')}
            />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>
          
          <FormControl isInvalid={!!errors.phone}>
            <FormLabel htmlFor="phone">Phone (optional)</FormLabel>
            <Input
              id="phone"
              placeholder="Your phone number"
              {...register('phone')}
            />
            <FormErrorMessage>{errors.phone?.message}</FormErrorMessage>
          </FormControl>
          
          <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }} gap={4}>
            <GridItem>
              <FormControl isInvalid={!!errors.password}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password"
                  {...register('password')}
                />
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
            
            <GridItem>
              <FormControl isInvalid={!!errors.confirmPassword}>
                <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  {...register('confirmPassword')}
                />
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
              </FormControl>
            </GridItem>
          </Grid>

          <Button
            type="submit"
            colorScheme="blue"
            size="lg"
            fontSize="md"
            isLoading={submitting}
            loadingText="Creating account"
            w="100%"
            mt={4}
          >
            Register
          </Button>
        </Stack>
      </form>

      <Text mt={6} textAlign="center">
        Already have an account?{' '}
        <Link as={RouterLink} to="/login" color="blue.500">
          Login
        </Link>
      </Text>
    </Box>
  );
};

export default RegisterForm; 