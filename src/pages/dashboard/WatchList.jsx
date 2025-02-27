import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Flex,
  Grid,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Stack,
  Tag,
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tooltip,
  Skeleton,
  Badge,
  Avatar,
  Divider,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from '@chakra-ui/react';
import { 
  Search, 
  Trash2, 
  Eye, 
  ChevronDown, 
  Grid as GridIcon, 
  List, 
  TrendingUp, 
  TrendingDown, 
  ArrowUpRight, 
  ArrowDownRight, 
  Bookmark, 
  BookmarkPlus,
  CheckCircle,
  AlertTriangle,
  Info,
  Bell,
  Plus
} from 'lucide-react';

const WatchlistPage = () => {
  const [watchlistItems, setWatchlistItems] = useState([]);
  const [filterSector, setFilterSector] = useState('');
  const [filterSentiment, setFilterSentiment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [viewMode, setViewMode] = useState('grid');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  const bgCard = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  useEffect(() => {
    // Simulate API call to fetch watchlist items
    setTimeout(() => {
      setWatchlistItems(mockWatchlistItems);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Mock watchlist data
  const mockWatchlistItems = [
    { 
      id: 1,
      symbol: 'PSO', 
      name: 'Pakistan State Oil',
      sector: 'Energy',
      price: 134.80,
      change: 2.45,
      changePercent: 1.85,
      volume: 3245678,
      marketCap: '58.4B',
      sentimentScore: 65,
      sentimentChange: 4.2,
      aiPrediction: 'bullish',
      addedOn: '2025-02-15',
      alerts: [
        { type: 'price', condition: 'above', value: 140, enabled: true },
        { type: 'sentiment', condition: 'below', value: 50, enabled: true }
      ],
      logo: '🛢️'
    },
    { 
      id: 2,
      symbol: 'HBL', 
      name: 'Habib Bank Limited',
      sector: 'Banking',
      price: 78.50,
      change: 1.25,
      changePercent: 1.62,
      volume: 1542367,
      marketCap: '115.2B',
      sentimentScore: 72,
      sentimentChange: 6.5,
      aiPrediction: 'bullish',
      addedOn: '2025-02-20',
      alerts: [
        { type: 'price', condition: 'below', value: 75, enabled: false }
      ],
      logo: '🏦'
    },
    { 
      id: 3,
      symbol: 'LUCK', 
      name: 'Lucky Cement',
      sector: 'Cement',
      price: 642.30,
      change: -8.75,
      changePercent: -1.34,
      volume: 945267,
      marketCap: '207.8B',
      sentimentScore: 54,
      sentimentChange: -2.1,
      aiPrediction: 'neutral',
      addedOn: '2025-01-30',
      alerts: [],
      logo: '🏗️'
    },
    { 
      id: 4,
      symbol: 'SYS', 
      name: 'Systems Limited',
      sector: 'Technology',
      price: 358.25,
      change: 12.55,
      changePercent: 3.63,
      volume: 758965,
      marketCap: '45.6B',
      sentimentScore: 84,
      sentimentChange: 8.7,
      aiPrediction: 'bullish',
      addedOn: '2025-02-10',
      alerts: [
        { type: 'sentiment', condition: 'below', value: 70, enabled: true }
      ],
      logo: '💻'
    },
    { 
      id: 5,
      symbol: 'OGDC', 
      name: 'Oil & Gas Development Company',
      sector: 'Energy',
      price: 87.20,
      change: -1.35,
      changePercent: -1.52,
      volume: 2365489,
      marketCap: '376.5B',
      sentimentScore: 42,
      sentimentChange: -5.3,
      aiPrediction: 'bearish',
      addedOn: '2025-02-05',
      alerts: [
        { type: 'price', condition: 'below', value: 85, enabled: true }
      ],
      logo: '🛢️'
    },
    { 
      id: 6,
      symbol: 'MCB', 
      name: 'MCB Bank Limited',
      sector: 'Banking',
      price: 165.75,
      change: 3.20,
      changePercent: 1.97,
      volume: 1254789,
      marketCap: '196.3B',
      sentimentScore: 68,
      sentimentChange: 3.5,
      aiPrediction: 'bullish',
      addedOn: '2025-02-18',
      alerts: [],
      logo: '🏦'
    },
  ];

  // Unique sectors for filter
  const sectors = [...new Set(mockWatchlistItems.map(item => item.sector))];
  
  // Sentiment options for filter
  const sentimentOptions = [
    { value: 'positive', label: 'Positive (60+)' },
    { value: 'neutral', label: 'Neutral (45-60)' },
    { value: 'negative', label: 'Negative (<45)' }
  ];
  
  // Sort options
  const sortOptions = [
    { value: 'name', label: 'Company Name' },
    { value: 'price', label: 'Current Price' },
    { value: 'changePercent', label: 'Price Change %' },
    { value: 'sentimentScore', label: 'Sentiment Score' },
    { value: 'sentimentChange', label: 'Sentiment Change' },
    { value: 'addedOn', label: 'Date Added' }
  ];

  // Helper functions
  const handleRemoveFromWatchlist = (id) => {
    setWatchlistItems(watchlistItems.filter(item => item.id !== id));
    onClose();
  };

  const confirmDelete = (item) => {
    setSelectedItem(item);
    onOpen();
  };

  const getSentimentColor = (sentiment) => {
    if (typeof sentiment === 'string') {
      switch(sentiment.toLowerCase()) {
        case 'positive': case 'bullish': return 'green';
        case 'negative': case 'bearish': return 'red';
        case 'neutral': return 'blue';
        default: return 'gray';
      }
    } else if (typeof sentiment === 'number') {
      if (sentiment >= 60) return 'green';
      if (sentiment >= 45) return 'blue';
      return 'red';
    }
    return 'gray';
  };

  const getSentimentIcon = (sentiment) => {
    if (sentiment === 'bullish' || (typeof sentiment === 'number' && sentiment >= 60)) {
      return <TrendingUp size={16} />;
    } else if (sentiment === 'bearish' || (typeof sentiment === 'number' && sentiment < 45)) {
      return <TrendingDown size={16} />;
    } else {
      return <ChevronDown size={16} />;
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    }).format(date);
  };

  // Apply filters and sorting
  const filteredItems = watchlistItems.filter(item => {
    // Filter by sector
    if (filterSector && item.sector !== filterSector) {
      return false;
    }
    
    // Filter by sentiment
    if (filterSentiment) {
      if (filterSentiment === 'positive' && item.sentimentScore < 60) {
        return false;
      } else if (filterSentiment === 'neutral' && (item.sentimentScore < 45 || item.sentimentScore >= 60)) {
        return false;
      } else if (filterSentiment === 'negative' && item.sentimentScore >= 45) {
        return false;
      }
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        item.name.toLowerCase().includes(query) ||
        item.symbol.toLowerCase().includes(query) ||
        item.sector.toLowerCase().includes(query)
      );
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedItems = [...filteredItems].sort((a, b) => {
    let valueA = a[sortBy];
    let valueB = b[sortBy];
    
    // Handle string values
    if (typeof valueA === 'string' && typeof valueB === 'string') {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }
    
    // Handle date values
    if (sortBy === 'addedOn') {
      valueA = new Date(valueA);
      valueB = new Date(valueB);
    }
    
    if (valueA < valueB) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (valueA > valueB) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  // Group items by sector for grouped view
  const groupedItems = {};
  filteredItems.forEach(item => {
    if (!groupedItems[item.sector]) {
      groupedItems[item.sector] = [];
    }
    groupedItems[item.sector].push(item);
  });

  // Get summary metrics
  const watchlistMetrics = {
    totalCompanies: watchlistItems.length,
    positiveCompanies: watchlistItems.filter(item => item.sentimentScore >= 60).length,
    negativeCompanies: watchlistItems.filter(item => item.sentimentScore < 45).length,
    bullishPredictions: watchlistItems.filter(item => item.aiPrediction === 'bullish').length,
    averageSentiment: watchlistItems.length > 0 
      ? Math.round(watchlistItems.reduce((sum, item) => sum + item.sentimentScore, 0) / watchlistItems.length) 
      : 0,
    activeAlerts: watchlistItems.reduce((count, item) => 
      count + item.alerts.filter(alert => alert.enabled).length, 0
    )
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap">
        <Heading size="md" color={textColor} mb={{ base: 4, md: 0 }}>My Watchlist</Heading>
        
        <Flex>
          {/* Search */}
          <InputGroup maxW="250px" mr={3}>
            <InputLeftElement pointerEvents="none">
              <Search size={18} color="gray" />
            </InputLeftElement>
            <Input 
              placeholder="Search symbols, names..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              bg={bgCard}
              size="md"
            />
          </InputGroup>
          
          {/* Sector Filter */}
          <Select 
            placeholder="All Sectors" 
            value={filterSector}
            onChange={e => setFilterSector(e.target.value)}
            maxW="150px"
            mr={3}
            bg={bgCard}
            size="md"
          >
            {sectors.map(sector => (
              <option key={sector} value={sector}>{sector}</option>
            ))}
          </Select>
          
          {/* Sentiment Filter */}
          <Select 
            placeholder="All Sentiments" 
            value={filterSentiment}
            onChange={e => setFilterSentiment(e.target.value)}
            maxW="150px"
            mr={3}
            bg={bgCard}
            size="md"
          >
            {sentimentOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </Select>
          
          {/* Sort By */}
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDown size={16} />} mr={3} size="md">
              Sort: {sortOptions.find(option => option.value === sortBy)?.label}
            </MenuButton>
            <MenuList>
              {sortOptions.map(option => (
                <MenuItem 
                  key={option.value} 
                  onClick={() => {
                    if (sortBy === option.value) {
                      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
                    } else {
                      setSortBy(option.value);
                      setSortOrder('asc');
                    }
                  }}
                >
                  <Flex align="center" justify="space-between" width="100%">
                    <Text>{option.label}</Text>
                    {sortBy === option.value && (
                      <Text>{sortOrder === 'asc' ? '↑' : '↓'}</Text>
                    )}
                  </Flex>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          
          {/* View Mode Toggle */}
          <Flex bg={bgCard} borderRadius="md" borderWidth="1px" borderColor={borderColor}>
            <IconButton
              icon={<GridIcon size={18} />}
              aria-label="Grid view"
              variant={viewMode === 'grid' ? 'solid' : 'ghost'}
              colorScheme={viewMode === 'grid' ? 'green' : 'gray'}
              onClick={() => setViewMode('grid')}
              borderRadius="md"
              size="md"
            />
            <IconButton
              icon={<List size={18} />}
              aria-label="List view"
              variant={viewMode === 'list' ? 'solid' : 'ghost'}
              colorScheme={viewMode === 'list' ? 'green' : 'gray'}
              onClick={() => setViewMode('list')}
              borderRadius="md"
              size="md"
            />
          </Flex>
        </Flex>
      </Flex>
      
      {/* Watchlist Overview Cards */}
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={6}>
        <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
          <CardBody>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="sm" color={secondaryTextColor}>Total Companies</Text>
                <Text fontSize="2xl" fontWeight="bold" color={textColor}>{watchlistMetrics.totalCompanies}</Text>
              </Box>
              <Box p={3} bg="purple.50" borderRadius="full">
                <Bookmark size={24} color="#805AD5" />
              </Box>
            </Flex>
          </CardBody>
        </Card>
        
        <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
          <CardBody>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="sm" color={secondaryTextColor}>Average Sentiment</Text>
                <Text fontSize="2xl" fontWeight="bold" color={getSentimentColor(watchlistMetrics.averageSentiment) + '.500'}>
                  {watchlistMetrics.averageSentiment}%
                </Text>
              </Box>
              <Box p={3} bg={`${getSentimentColor(watchlistMetrics.averageSentiment)}.50`} borderRadius="full">
                {getSentimentIcon(watchlistMetrics.averageSentiment)}
              </Box>
            </Flex>
          </CardBody>
        </Card>
        
        <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
          <CardBody>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="sm" color={secondaryTextColor}>Bullish Predictions</Text>
                <Text fontSize="2xl" fontWeight="bold" color="green.500">
                  {watchlistMetrics.bullishPredictions}/{watchlistMetrics.totalCompanies}
                </Text>
              </Box>
              <Box p={3} bg="green.50" borderRadius="full">
                <TrendingUp size={24} color="green" />
              </Box>
            </Flex>
          </CardBody>
        </Card>
        
        <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
          <CardBody>
            <Flex justify="space-between" align="center">
              <Box>
                <Text fontSize="sm" color={secondaryTextColor}>Active Alerts</Text>
                <Text fontSize="2xl" fontWeight="bold" color="blue.500">{watchlistMetrics.activeAlerts}</Text>
              </Box>
              <Box p={3} bg="blue.50" borderRadius="full">
                <Bell size={24} color="#3182CE" />
              </Box>
            </Flex>
          </CardBody>
        </Card>
      </Grid>
      
      {isLoading ? (
        // Loading skeletons
        <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
          {Array(6).fill(0).map((_, index) => (
            <Card key={index} bg={bgCard} boxShadow="sm" borderRadius="lg">
              <CardBody>
                <Skeleton height="24px" width="50%" mb={4} />
                <Skeleton height="16px" width="30%" mb={2} />
                <Skeleton height="32px" width="40%" mb={4} />
                <Skeleton height="8px" width="100%" mb={4} />
                <Flex justify="space-between">
                  <Skeleton height="16px" width="30%" />
                  <Skeleton height="16px" width="20%" />
                </Flex>
              </CardBody>
            </Card>
          ))}
        </Grid>
      ) : sortedItems.length === 0 ? (
        // Empty state
        <Card bg={bgCard} boxShadow="sm" borderRadius="lg" p={8} textAlign="center">
          <Box mb={4}>
            <Bookmark size={48} style={{ margin: '0 auto', color: '#A0AEC0' }} />
          </Box>
          <Heading size="md" mb={2} color={textColor}>No Companies in Watchlist</Heading>
          <Text color={secondaryTextColor} mb={4}>
            {searchQuery || filterSector || filterSentiment ? 
              'No companies match your current filters. Try adjusting your search criteria.' :
              'Start adding companies to your watchlist to track their sentiment and price movements.'
            }
          </Text>
          {searchQuery || filterSector || filterSentiment ? (
            <Button colorScheme="green" onClick={() => {
              setSearchQuery('');
              setFilterSector('');
              setFilterSentiment('');
            }}>
              Clear Filters
            </Button>
          ) : (
            <Button 
              colorScheme="green" 
              leftIcon={<Plus size={16} />}
              onClick={() => {/* Navigate to add companies page */}}
            >
              Add Companies
            </Button>
          )}
        </Card>
      ) : (
        <>
          {/* Grid View */}
          {viewMode === 'grid' && (
            <Grid templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }} gap={6}>
              {sortedItems.map(item => (
                <Card 
                  key={item.id} 
                  bg={bgCard} 
                  boxShadow="sm" 
                  borderRadius="lg" 
                  borderTop="4px solid" 
                  borderColor={`${getSentimentColor(item.sentimentScore)}.500`}
                  transition="all 0.2s"
                  _hover={{ transform: "translateY(-4px)", boxShadow: "md" }}
                >
                  <CardBody>
                    <Flex justify="space-between" mb={3}>
                      <Flex align="center">
                        <Flex
                          align="center"
                          justify="center"
                          bg={`${getSentimentColor(item.sentimentScore)}.100`}
                          color={`${getSentimentColor(item.sentimentScore)}.700`}
                          borderRadius="md"
                          p={2}
                          fontSize="xl"
                          mr={3}
                          h="40px"
                          w="40px"
                        >
                          <Text>{item.logo}</Text>
                        </Flex>
                        <Box>
                          <Heading size="md" color={textColor}>{item.symbol}</Heading>
                          <Text fontSize="sm" color={secondaryTextColor}>{item.name}</Text>
                        </Box>
                      </Flex>
                      <IconButton
                        icon={<Trash2 size={16} />}
                        aria-label="Remove from watchlist"
                        variant="ghost"
                        colorScheme="red"
                        size="sm"
                        onClick={() => confirmDelete(item)}
                      />
                    </Flex>
                    
                    <Flex justify="space-between" mb={4}>
                      <Box>
                        <Text fontSize="sm" color={secondaryTextColor}>Current Price</Text>
                        <Flex align="center">
                          <Text fontSize="xl" fontWeight="bold" color={textColor}>Rs. {item.price.toFixed(2)}</Text>
                          <Flex 
                            align="center" 
                            ml={2} 
                            color={item.change > 0 ? "green.500" : "red.500"}
                          >
                            {item.change > 0 ? (
                              <ArrowUpRight size={16} />
                            ) : (
                              <ArrowDownRight size={16} />
                            )}
                            <Text fontSize="sm" fontWeight="medium">
                              {item.change > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>
                      
                      <Box textAlign="right">
                        <Text fontSize="sm" color={secondaryTextColor}>Sentiment</Text>
                        <Flex align="center" justify="flex-end">
                          <Text 
                            fontSize="xl" 
                            fontWeight="bold"
                            color={`${getSentimentColor(item.sentimentScore)}.500`}
                          >
                            {item.sentimentScore}%
                          </Text>
                          <Flex 
                            align="center" 
                            ml={2} 
                            color={item.sentimentChange > 0 ? "green.500" : "red.500"}
                          >
                            {item.sentimentChange > 0 ? (
                              <ArrowUpRight size={16} />
                            ) : (
                              <ArrowDownRight size={16} />
                            )}
                            <Text fontSize="sm" fontWeight="medium">
                              {item.sentimentChange > 0 ? '+' : ''}{item.sentimentChange.toFixed(1)}
                            </Text>
                          </Flex>
                        </Flex>
                      </Box>
                    </Flex>
                    
                    <Divider mb={4} />
                    
                    <Flex justify="space-between" align="center" mb={4}>
                      <Tag size="sm" colorScheme="purple">{item.sector}</Tag>
                      <Tag size="sm" colorScheme={getSentimentColor(item.aiPrediction)}>
                        <Flex align="center">
                          {getSentimentIcon(item.aiPrediction)}
                          <Text ml={1}>{item.aiPrediction.toUpperCase()}</Text>
                        </Flex>
                      </Tag>
                    </Flex>
                    
                    <Flex justify="space-between" align="center">
                      <Text fontSize="xs" color={secondaryTextColor}>Added: {formatDate(item.addedOn)}</Text>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        colorScheme="green"
                        rightIcon={<Eye size={14} />}
                      >
                        View Details
                      </Button>
                    </Flex>
                    
                    {item.alerts.filter(alert => alert.enabled).length > 0 && (
                      <Flex mt={3} p={2} bg="blue.50" borderRadius="md" align="center">
                        <Bell size={14} color="#3182CE" style={{ marginRight: '8px' }} />
                        <Text fontSize="xs" color="blue.700">
                          {item.alerts.filter(alert => alert.enabled).length} active alert{item.alerts.filter(alert => alert.enabled).length > 1 ? 's' : ''}
                        </Text>
                      </Flex>
                    )}
                  </CardBody>
                </Card>
              ))}
            </Grid>
          )}
          
          {/* List View */}
          {viewMode === 'list' && (
            <Card bg={bgCard} boxShadow="sm" borderRadius="lg" overflow="hidden">
              <CardBody p={0}>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Company</Th>
                      <Th isNumeric>Price</Th>
                      <Th isNumeric>Change</Th>
                      <Th isNumeric>Sentiment</Th>
                      <Th>Prediction</Th>
                      <Th>Alerts</Th>
                      <Th>Actions</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {sortedItems.map(item => (
                      <Tr key={item.id} _hover={{ bg: hoverBg }}>
                        <Td>
                          <Flex align="center">
                            <Flex
                              align="center"
                              justify="center"
                              bg={`${getSentimentColor(item.sentimentScore)}.100`}
                              color={`${getSentimentColor(item.sentimentScore)}.700`}
                              borderRadius="md"
                              p={1}
                              fontSize="lg"
                              mr={3}
                              h="32px"
                              w="32px"
                            >
                              <Text>{item.logo}</Text>
                            </Flex>
                            <Box>
                              <Flex align="center">
                                <Text fontWeight="bold">{item.symbol}</Text>
                                <Tag size="sm" ml={2} colorScheme="purple">{item.sector}</Tag>
                              </Flex>
                              <Text fontSize="sm" color={secondaryTextColor}>{item.name}</Text>
                            </Box>
                          </Flex>
                        </Td>
                        <Td isNumeric>
                          <Text fontWeight="medium">Rs. {item.price.toFixed(2)}</Text>
                        </Td>
                        <Td isNumeric>
                          <Flex align="center" justify="flex-end" color={item.change > 0 ? "green.500" : "red.500"}>
                            {item.change > 0 ? (
                              <ArrowUpRight size={16} style={{ marginRight: '4px' }} />
                            ) : (
                              <ArrowDownRight size={16} style={{ marginRight: '4px' }} />
                            )}
                            <Text fontWeight="medium">
                              {item.change > 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                            </Text>
                          </Flex>
                        </Td>
                        <Td isNumeric>
                          <Flex align="center" justify="flex-end">
                            <Text 
                              fontWeight="bold"
                              color={`${getSentimentColor(item.sentimentScore)}.500`}
                              mr={2}
                            >
                              {item.sentimentScore}%
                            </Text>
                            <Tag size="sm" colorScheme={item.sentimentChange > 0 ? "green" : "red"}>
                              {item.sentimentChange > 0 ? '+' : ''}{item.sentimentChange.toFixed(1)}
                            </Tag>
                          </Flex>
                        </Td>
                        <Td>
                          <Tag colorScheme={getSentimentColor(item.aiPrediction)}>
                            <Flex align="center">
                              {getSentimentIcon(item.aiPrediction)}
                              <Text ml={1}>{item.aiPrediction.toUpperCase()}</Text>
                            </Flex>
                          </Tag>
                        </Td>
                        <Td>
                          {item.alerts.filter(alert => alert.enabled).length > 0 ? (
                            <Badge colorScheme="blue" borderRadius="full">
                              {item.alerts.filter(alert => alert.enabled).length}
                            </Badge>
                          ) : (
                            <Text fontSize="sm" color={secondaryTextColor}>None</Text>
                          )}
                        </Td>
                        <Td>
                          <Flex>
                            <IconButton
                              icon={<Eye size={16} />}
                              aria-label="View details"
                              variant="ghost"
                              colorScheme="green"
                              size="sm"
                              mr={2}
                              onClick={() => {/* Navigate to company details */}}
                            />
                            <IconButton
                              icon={<Trash2 size={16} />}
                              aria-label="Remove from watchlist"
                              variant="ghost"
                              colorScheme="red"
                              size="sm"
                              onClick={() => confirmDelete(item)}
                            />
                          </Flex>
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </CardBody>
            </Card>
          )}
        </>
      )}
      
      {/* Add Companies Button */}
      <Flex justify="center" mt={8}>
        <Button 
          colorScheme="green" 
          leftIcon={<Plus size={16} />}
          size="lg"
          onClick={() => {/* Navigate to add companies page */}}
        >
          Add More Companies
        </Button>
      </Flex>
      
      {/* Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Remove from Watchlist
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to remove {selectedItem?.name} ({selectedItem?.symbol}) from your watchlist?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={() => handleRemoveFromWatchlist(selectedItem?.id)} ml={3}>
                Remove
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default WatchlistPage;
