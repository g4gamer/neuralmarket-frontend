import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    Flex,
    Grid,
    Heading,
    HStack,
    Select,
    Stack,
    Stat,
    StatArrow,
    StatGroup,
    StatHelpText,
    StatLabel,
    StatNumber,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Tag,
    Text,
    Tooltip,
    useColorModeValue,
  } from '@chakra-ui/react';
import { User, Mail, Lock, Eye, EyeOff, ChevronRight, CheckCircle, Briefcase, Phone } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    investorType: '',
    agreeTerms: false
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);
  
  const toast = useToast();
  
  const formBackground = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear error when field is changed
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData.investorType) {
      newErrors.investorType = 'Please select your investor type';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'You must agree to the terms and conditions';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const nextStep = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };
  
  const prevStep = () => {
    setStep(1);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (step === 2 && validateStep2()) {
      setIsSubmitting(true);
      
      try {
        // Simulate API call to register user
        // In production, this would be a fetch or axios call to your Django backend
        // const response = await axios.post('/api/auth/register', formData);
        
        // Simulate successful registration
        setTimeout(() => {
          console.log('Registration form submitted:', formData);
          
          toast({
            title: 'Account created!',
            description: "We've created your account. You can now login.",
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
          
          // Redirect to login page after successful registration
          // window.location.href = '/login';
          
          setIsSubmitting(false);
        }, 1500);
        
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Something went wrong. Please try again.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        
        setIsSubmitting(false);
      }
    }
  };
  
  const investorTypes = [
    { value: 'individual', label: 'Individual Investor' },
    { value: 'professional', label: 'Professional Trader' },
    { value: 'institutional', label: 'Institutional Investor' },
    { value: 'student', label: 'Student/Learning' },
    { value: 'other', label: 'Other' }
  ];
  
  // Render steps
  const renderStep1 = () => (
    <Stack spacing={4}>
      <Heading size="md" color={textColor}>Personal Information</Heading>
      
      <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={4}>
        <FormControl isInvalid={!!errors.firstName}>
          <FormLabel>First Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <User size={18} color="gray" />
            </InputLeftElement>
            <Input
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
            />
          </InputGroup>
          {errors.firstName && <FormErrorMessage>{errors.firstName}</FormErrorMessage>}
        </FormControl>
        
        <FormControl isInvalid={!!errors.lastName}>
          <FormLabel>Last Name</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <User size={18} color="gray" />
            </InputLeftElement>
            <Input
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
            />
          </InputGroup>
          {errors.lastName && <FormErrorMessage>{errors.lastName}</FormErrorMessage>}
        </FormControl>
      </Grid>
      
      <FormControl isInvalid={!!errors.email}>
        <FormLabel>Email Address</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Mail size={18} color="gray" />
          </InputLeftElement>
          <Input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john.doe@example.com"
          />
        </InputGroup>
        {errors.email ? (
          <FormErrorMessage>{errors.email}</FormErrorMessage>
        ) : (
          <FormHelperText>We'll never share your email with anyone else.</FormHelperText>
        )}
      </FormControl>
      
      <FormControl isInvalid={!!errors.phone}>
        <FormLabel>Phone Number</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Phone size={18} color="gray" />
          </InputLeftElement>
          <Input
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+92 300 1234567"
          />
        </InputGroup>
        {errors.phone && <FormErrorMessage>{errors.phone}</FormErrorMessage>}
      </FormControl>
      
      <Button
        colorScheme="green"
        size="lg"
        mt={4}
        onClick={nextStep}
        rightIcon={<ChevronRight size={18} />}
      >
        Continue
      </Button>
    </Stack>
  );
  
  const renderStep2 = () => (
    <Stack spacing={4}>
      <Heading size="md" color={textColor}>Account Setup</Heading>
      
      <FormControl isInvalid={!!errors.password}>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Lock size={18} color="gray" />
          </InputLeftElement>
          <Input
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
          />
          <InputRightElement width="3rem">
            <Box 
              as="button" 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              bg="transparent"
              border="none"
              cursor="pointer"
            >
              {showPassword ? (
                <EyeOff size={18} color="gray" />
              ) : (
                <Eye size={18} color="gray" />
              )}
            </Box>
          </InputRightElement>
        </InputGroup>
        {errors.password ? (
          <FormErrorMessage>{errors.password}</FormErrorMessage>
        ) : (
          <FormHelperText>At least 8 characters with letters and numbers</FormHelperText>
        )}
      </FormControl>
      
      <FormControl isInvalid={!!errors.confirmPassword}>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Lock size={18} color="gray" />
          </InputLeftElement>
          <Input
            name="confirmPassword"
            type={showConfirmPassword ? 'text' : 'password'}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="••••••••"
          />
          <InputRightElement width="3rem">
            <Box 
              as="button" 
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              bg="transparent"
              border="none"
              cursor="pointer"
            >
              {showConfirmPassword ? (
                <EyeOff size={18} color="gray" />
              ) : (
                <Eye size={18} color="gray" />
              )}
            </Box>
          </InputRightElement>
        </InputGroup>
        {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
      </FormControl>
      
      <FormControl isInvalid={!!errors.investorType}>
        <FormLabel>Investor Type</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Briefcase size={18} color="gray" />
          </InputLeftElement>
          <Select
            name="investorType"
            value={formData.investorType}
            onChange={handleChange}
            placeholder="Select investor type"
            pl={10}
          >
            {investorTypes.map(type => (
              <option key={type.value} value={type.value}>{type.label}</option>
            ))}
          </Select>
        </InputGroup>
        {errors.investorType && <FormErrorMessage>{errors.investorType}</FormErrorMessage>}
      </FormControl>
      
      <FormControl isInvalid={!!errors.agreeTerms}>
        <Checkbox
          name="agreeTerms"
          isChecked={formData.agreeTerms}
          onChange={handleChange}
          colorScheme="green"
        >
          <Text fontSize="sm">
            I agree to the <Link color="green.500">Terms of Service</Link> and <Link color="green.500">Privacy Policy</Link>
          </Text>
        </Checkbox>
        {errors.agreeTerms && <FormErrorMessage>{errors.agreeTerms}</FormErrorMessage>}
      </FormControl>
      
      <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mt={4}>
        <Button
          variant="outline"
          onClick={prevStep}
          flex={{ md: 1 }}
        >
          Back
        </Button>
        
        <Button
          colorScheme="green"
          size="lg"
          type="submit"
          flex={{ md: 2 }}
          isLoading={isSubmitting}
          loadingText="Creating Account"
        >
          Create Account
        </Button>
      </Stack>
    </Stack>
  );
  
  return (
    <Box minH="100vh" bg="gray.50" py={12}>
      <Container maxW="md">
        <Stack spacing={8}>
          {/* Logo and heading */}
          <Stack align="center">
            <Box 
              w={16} 
              h={16} 
              borderRadius="lg" 
              bg="green.500" 
              display="flex" 
              alignItems="center" 
              justifyContent="center"
              mb={2}
            >
              <ChevronRight size={32} color="white" />
            </Box>
            <Heading size="lg" color={textColor}>Create your StockSense account</Heading>
            <Text color={mutedTextColor}>AI-powered sentiment analysis for PSX</Text>
          </Stack>
          
          {/* Step indicator */}
          <Flex justify="center" mb={4}>
            <Flex 
              align="center" 
              justify="center" 
              w={10} 
              h={10} 
              borderRadius="full" 
              bg={step >= 1 ? "green.500" : "gray.200"}
              color="white"
              fontWeight="bold"
            >
              {step > 1 ? <CheckCircle size={20} /> : 1}
            </Flex>
            
            <Box w={10} h={1} bg={step >= 2 ? "green.500" : "gray.200"} />
            
            <Flex 
              align="center" 
              justify="center" 
              w={10} 
              h={10} 
              borderRadius="full" 
              bg={step >= 2 ? "green.500" : "gray.200"}
              color="white"
              fontWeight="bold"
            >
              2
            </Flex>
          </Flex>
          
          {/* Registration form */}
          <Box
            as="form"
            onSubmit={handleSubmit}
            bg={formBackground}
            boxShadow="sm"
            borderRadius="lg"
            p={8}
            borderWidth="1px"
            borderColor={borderColor}
          >
            {step === 1 ? renderStep1() : renderStep2()}
          </Box>
          
          {/* Login link */}
          <Flex align="center" justify="center">
            <Text color={mutedTextColor} mr={1}>Already have an account?</Text>
            <Link color="green.500" fontWeight="medium">
              Sign in
            </Link>
          </Flex>
        </Stack>
      </Container>
    </Box>
  );
};

export default RegisterPage;