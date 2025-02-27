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
import { ChevronRight, Eye, EyeOff, Lock, Mail } from 'lucide-react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const formBackground = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  const handleLogin = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Reset error state and set loading
    setError('');
    setLoading(true);
    
    try {
      // Simulate API call to backend
      // In production, this would be a fetch or axios call to your Django backend
      // const response = await axios.post('/api/auth/login', { email, password });
      
      setTimeout(() => {
        console.log('Login submitted:', { email, password });
        // Here you would normally handle the token returned from the backend
        // localStorage.setItem('token', response.data.token);
        
        // Simulate successful login
        window.location.href = '/dashboard';
        
        setLoading(false);
      }, 1500);
      
    } catch (error) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    }
  };

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
            <Heading size="lg" color={textColor}>Welcome to StockSense</Heading>
            <Text color={mutedTextColor}>AI-powered sentiment analysis for PSX</Text>
          </Stack>

          {/* Login form */}
          <Box
            as="form"
            onSubmit={handleLogin}
            bg={formBackground}
            boxShadow="sm"
            borderRadius="lg"
            p={8}
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Stack spacing={4}>
              {/* Error alert */}
              {error && (
                <Alert status="error" borderRadius="md">
                  <AlertIcon />
                  {error}
                </Alert>
              )}

              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <InputGroup>
                  <Input
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    pr="4.5rem"
                  />
                  <InputRightElement width="3rem">
                    <Mail size={18} color="gray" />
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    pr="4.5rem"
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
              </FormControl>

              <Stack direction="row" justify="space-between" align="center" pt={2}>
                <Checkbox colorScheme="green">Remember me</Checkbox>
                <Link color="green.500" fontWeight="medium" fontSize="sm">
                  Forgot password?
                </Link>
              </Stack>

              <Button
                type="submit"
                colorScheme="green"
                size="lg"
                fontSize="md"
                isLoading={loading}
                loadingText="Signing in"
              >
                Sign in
              </Button>

              <Divider />

              <Flex align="center" justify="center">
                <Text color={mutedTextColor} mr={1}>Don't have an account?</Text>
                <Link color="green.500" fontWeight="medium">
                  Sign up
                </Link>
              </Flex>
            </Stack>
          </Box>

          {/* Features showcase */}
          <Box
            bg={formBackground}
            boxShadow="sm"
            borderRadius="lg"
            p={4}
            borderWidth="1px"
            borderColor={borderColor}
          >
            <Stack spacing={3}>
              <Heading size="sm" color={textColor}>Why StockSense?</Heading>

              <Flex align="center">
                <Box 
                  bg="green.100" 
                  p={2} 
                  borderRadius="md" 
                  color="green.500" 
                  mr={3}
                >
                  <Lock size={16} />
                </Box>
                <Box>
                  <Text fontWeight="medium" fontSize="sm" color={textColor}>AI-Powered Sentiment Analysis</Text>
                  <Text fontSize="xs" color={mutedTextColor}>Get real-time insights on market sentiment for PSX stocks</Text>
                </Box>
              </Flex>

              <Flex align="center">
                <Box 
                  bg="green.100" 
                  p={2} 
                  borderRadius="md" 
                  color="green.500" 
                  mr={3}
                >
                  <Lock size={16} />
                </Box>
                <Box>
                  <Text fontWeight="medium" fontSize="sm" color={textColor}>Real-time News Scraping</Text>
                  <Text fontSize="xs" color={mutedTextColor}>Stay informed with the latest financial news affecting your investments</Text>
                </Box>
              </Flex>

              <Flex align="center">
                <Box 
                  bg="green.100" 
                  p={2} 
                  borderRadius="md" 
                  color="green.500" 
                  mr={3}
                >
                  <Lock size={16} />
                </Box>
                <Box>
                  <Text fontWeight="medium" fontSize="sm" color={textColor}>Data-Driven Insights</Text>
                  <Text fontSize="xs" color={mutedTextColor}>Make informed investment decisions based on historical trends</Text>
                </Box>
              </Flex>
            </Stack>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default LoginPage;