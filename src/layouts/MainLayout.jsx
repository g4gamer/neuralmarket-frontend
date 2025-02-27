import React from 'react';
import logoImage from '../assets/logo.png';
import { useLocation } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  useDisclosure,
  Avatar
} from '@chakra-ui/react';
import {
  Search,
  Bell,
  Sun,
  Moon,
  ChevronDown,
  User,
  Home,
  BarChart2,
  TrendingUp,
  Bookmark,
  BookOpen,
  HelpCircle,
  Clock,
  AlignJustify
} from 'lucide-react';

const MainLayout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const [notifications] = React.useState(3);
  const location = useLocation(); 
  const currentPath = location.pathname; 

  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const sidebarBg = useColorModeValue('white', 'gray.900');
  const sidebarActiveBg = useColorModeValue('green.50', 'gray.700');
  const sidebarActiveColor = useColorModeValue('green.600', 'green.200');

  const navItems = [
    { name: 'Dashboard', icon: Home, path: '/' },
    { name: 'Market Sentiment', icon: BarChart2, path: '/sentiment' },
    { name: 'Companies', icon: TrendingUp, path: '/companies' },
    { name: 'News Feed', icon: BookOpen, path: '/news' },
    { name: 'Watchlist', icon: Bookmark, path: '/watchlist' },
  ];


  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')}>
      {/* Top Navigation Bar */}
      <Flex
        as="header"
        position="fixed"
        w="100%"
        bg={bgColor}
        borderBottomWidth="1px"
        borderColor={borderColor}
        h="60px"
        alignItems="center"
        px={4}
        zIndex="1000"
      >
        {/* Mobile menu button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onOpen}
          variant="ghost"
          size="md"
          aria-label="Open menu"
          icon={<AlignJustify size={24} />}
        />

        {/* Logo */}
        <Flex alignItems="center" ml={{ base: 2, md: 0 }}>
      

          <Box
            w="40px"
            h="40px"
            borderRadius="md"
            overflow="hidden"
            mr={2}
          >
            <img
              src={logoImage}
              alt="Neural Market Logo"
              width="40"
              height="40"
            />
          </Box>
          <Text
            ml={2}
            fontWeight="bold"
            fontSize="lg"
            color={textColor}
            display={{ base: 'none', md: 'block' }}
          >
            Neural Market
          </Text>
        </Flex>

        {/* Search bar */}
        <InputGroup maxW="400px" mx={{ base: 2, md: 12 }} display={{ base: 'none', md: 'block' }}>
          <InputLeftElement pointerEvents="none">
            <Search size={18} color="gray" />
          </InputLeftElement>
          <Input
            placeholder="Search companies, news, or analysis..."
            variant="filled"
            bg={useColorModeValue('gray.100', 'gray.700')}
            _hover={{ bg: useColorModeValue('gray.200', 'gray.600') }}
            borderRadius="full"
          />
        </InputGroup>

        {/* Right navigation items */}
        <HStack ml="auto" spacing={3}>
          {/* Notification bell */}
          <Box position="relative">
            <IconButton
              variant="ghost"
              aria-label="Notifications"
              icon={<Bell size={20} />}
            />
            {notifications > 0 && (
              <Flex
                position="absolute"
                top="0"
                right="0"
                bg="red.500"
                w="18px"
                h="18px"
                borderRadius="full"
                justify="center"
                align="center"
              >
                <Text fontSize="xs" color="white" fontWeight="bold">{notifications}</Text>
              </Flex>
            )}
          </Box>

          {/* Theme toggle */}
          <IconButton
            variant="ghost"
            aria-label="Toggle theme"
            onClick={toggleColorMode}
            icon={colorMode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          />

          {/* User profile menu */}
          <Menu>
            <MenuButton
              as={Button}
              variant="ghost"
              rounded="full"
              cursor="pointer"
              minW={0}
            >
              <HStack>
                <Avatar size="sm" name="Ahmad Tahir" src="https://via.placeholder.com/150" />
                <Text display={{ base: 'none', md: 'block' }}>Ahmad Tahir</Text>
                <ChevronDown size={16} />
              </HStack>
            </MenuButton>
            <MenuList>
              <MenuItem>
                <User size={16} style={{ marginRight: '8px' }} />
                <Text>My Profile</Text>
              </MenuItem>
              <MenuItem>
                <Clock size={16} style={{ marginRight: '8px' }} />
                <Text>Activity Log</Text>
              </MenuItem>
              <MenuDivider />
              <MenuItem>
                <Box style={{ marginRight: '8px' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                    <polyline points="16 17 21 12 16 7"></polyline>
                    <line x1="21" y1="12" x2="9" y2="12"></line>
                  </svg>
                </Box>
                <Text>Sign Out</Text>
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>
      </Flex>

      {/* Mobile Navigation Drawer */}
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent bg={sidebarBg}>
          <DrawerCloseButton color={textColor} />
          <DrawerHeader borderBottomWidth="1px" borderColor={borderColor}>
            <Flex align="center">
              
              <Box
                w="30px"
                h="30px"
                borderRadius="md"
                overflow="hidden"
                mr={2}
              >
                <img
                  src={logoImage}
                  alt="Neural Market Logo"
                  width="30"
                  height="30"
                />
              </Box>
              <Text fontWeight="bold">Neural Market</Text>
            </Flex>
          </DrawerHeader>
          <DrawerBody p={0}>
            <Stack spacing={0}>
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.path}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Flex
                    align="center"
                    p={3}
                    mx={2}
                    borderRadius="md"
                    role="group"
                    cursor="pointer"
                    bg={currentPath === item.path ? sidebarActiveBg : 'transparent'}
                    color={currentPath === item.path ? sidebarActiveColor : textColor}
                    fontWeight={currentPath === item.path ? 'semibold' : 'normal'}
                    _hover={{
                      bg: sidebarActiveBg,
                      color: sidebarActiveColor,
                    }}
                  >
                    <Box mr={3}>
                      {React.createElement(item.icon, { size: 18 })}
                    </Box>
                    <Text>{item.name}</Text>
                  </Flex>
                </Link>
              ))}

              <Box p={4} borderTopWidth="1px" borderColor={borderColor} mt={6}>
                <Text fontSize="sm" fontWeight="semibold" mb={4} color={textColor}>
                  Help & Resources
                </Text>
                <Stack spacing={3}>
                  <Link color={textColor} fontSize="sm">
                    <Flex align="center">
                      <HelpCircle size={14} style={{ marginRight: '8px' }} />
                      <Text>Help Center</Text>
                    </Flex>
                  </Link>
                </Stack>
              </Box>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      {/* Sidebar for desktop */}
      <Box
        display={{ base: 'none', md: 'block' }}
        w="240px"
        position="fixed"
        top="60px"
        h="calc(100vh - 60px)"
        bg={sidebarBg}
        borderRightWidth="1px"
        borderColor={borderColor}
        overflowY="auto"
      >
        <Stack spacing={0} py={4}>
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              _hover={{ textDecoration: 'none' }}
            >
              <Flex
                align="center"
                p={3}
                mx={2}
                borderRadius="md"
                role="group"
                cursor="pointer"
                bg={currentPath === item.path ? sidebarActiveBg : 'transparent'}
                color={currentPath === item.path ? sidebarActiveColor : textColor}
                fontWeight={currentPath === item.path ? 'semibold' : 'normal'}
                _hover={{
                  bg: sidebarActiveBg,
                  color: sidebarActiveColor,
                }}
              >
                <Box mr={3}>
                  {React.createElement(item.icon, { size: 18 })}
                </Box>
                <Text>{item.name}</Text>
              </Flex>
            </Link>
          ))}

          <Box p={4} borderTopWidth="1px" borderColor={borderColor} mt={6}>
            <Text fontSize="sm" fontWeight="semibold" mb={4} color={textColor}>
              Help & Resources
            </Text>
            <Stack spacing={3}>
              <Link color={textColor} fontSize="sm">
                <Flex align="center">
                  <HelpCircle size={14} style={{ marginRight: '8px' }} />
                  <Text>Help Center</Text>
                </Flex>
              </Link>
            </Stack>
          </Box>
        </Stack>
      </Box>

      {/* Main content */}
      <Box
        ml={{ base: 0, md: '240px' }}
        pt="60px"
        minH="100vh"
        bg={useColorModeValue('gray.50', 'gray.900')}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;