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
  InputRightElement,
  Menu,
  Progress,
  Link,
  MenuButton,
  MenuList,
  MenuItem,
  Select,
  Stack,
  Tag,
  Text,
  useColorModeValue,
  Divider,
  Badge,
  Avatar,
  Tooltip,
  Skeleton
} from '@chakra-ui/react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Share, 
  Bookmark, 
  BookmarkPlus, 
  ChevronDown, 
  X, 
  Clock, 
  ArrowUp, 
  ArrowDown,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';

const NewsFeedPage = () => {
  const [newsItems, setNewsItems] = useState([]);
  const [filterSentiment, setFilterSentiment] = useState([]);
  const [filterSources, setFilterSources] = useState([]);
  const [filterDateRange, setFilterDateRange] = useState('7d');
  const [filterCompany, setFilterCompany] = useState('');
  const [filterSector, setFilterSector] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');
  const [isLoading, setIsLoading] = useState(true);
  const [activeFilters, setActiveFilters] = useState(0);

  const bgCard = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');
  
  useEffect(() => {
    // Simulate API call to fetch news
    setTimeout(() => {
      setNewsItems(mockNews);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Mock data for news articles
  const mockNews = [
    {
      id: 1,
      title: 'State Bank of Pakistan cuts interest rate by 100 basis points amid improving economic outlook',
      summary: 'The State Bank of Pakistan has cut the benchmark interest rate by 100 basis points to 19% in its latest monetary policy committee meeting, citing improving economic indicators and easing inflation.',
      source: 'Business Recorder',
      date: '2025-02-26T10:30:00',
      sentiment: 'positive',
      sentimentScore: 0.78,
      keywords: ['SBP', 'interest rate', 'monetary policy', 'inflation'],
      companies: ['State Bank of Pakistan'],
      sectors: ['Banking', 'Economy'],
      url: '#',
      saved: false,
      author: 'Jamal Khan',
      readingTime: '4 min'
    },
    {
      id: 2,
      title: 'PSX gains 800 points as investor confidence grows following positive economic data',
      summary: 'The Pakistan Stock Exchange (PSX) benchmark KSE-100 index surged by 800 points, reaching 65,500 level as investors reacted positively to latest economic indicators and corporate results.',
      source: 'Dawn News',
      date: '2025-02-26T09:15:00',
      sentiment: 'positive',
      sentimentScore: 0.85,
      keywords: ['PSX', 'KSE-100', 'market rally', 'investor confidence'],
      companies: ['Pakistan Stock Exchange'],
      sectors: ['Market', 'Economy'],
      url: '#',
      saved: true,
      author: 'Sara Ahmed',
      readingTime: '3 min'
    },
    {
      id: 3,
      title: 'Oil companies face regulatory challenges amid changing government policies',
      summary: 'Major oil companies operating in Pakistan are navigating through regulatory challenges as the government revises its energy sector policies. This might impact profitability in the coming quarters.',
      source: 'The News',
      date: '2025-02-25T14:45:00',
      sentiment: 'negative',
      sentimentScore: -0.62,
      keywords: ['oil', 'regulation', 'energy policy', 'profitability'],
      companies: ['Pakistan State Oil', 'Shell Pakistan', 'Attock Petroleum'],
      sectors: ['Energy', 'Oil & Gas'],
      url: '#',
      saved: false,
      author: 'Fahad Malik',
      readingTime: '6 min'
    },
    {
      id: 4,
      title: 'Tech sector emerges as new growth driver for Pakistani economy with record investments',
      summary: 'The technology sector in Pakistan has seen record investments in the past quarter, with startups raising over $100 million. Experts suggest this could be a new growth driver for the economy.',
      source: 'Express Tribune',
      date: '2025-02-25T08:30:00',
      sentiment: 'positive',
      sentimentScore: 0.91,
      keywords: ['tech', 'startups', 'investment', 'growth'],
      companies: ['Systems Limited', 'TRG Pakistan', 'Netsol Technologies'],
      sectors: ['Technology', 'Economy'],
      url: '#',
      saved: false,
      author: 'Hira Imran',
      readingTime: '5 min'
    },
    {
      id: 5,
      title: 'Rupee continues to depreciate against dollar despite central bank interventions',
      summary: 'The Pakistani Rupee has continued its downward trend against the US Dollar, reaching Rs. 285 despite multiple interventions by the State Bank of Pakistan to stabilize the currency.',
      source: 'ARY News',
      date: '2025-02-24T16:20:00',
      sentiment: 'negative',
      sentimentScore: -0.75,
      keywords: ['rupee', 'dollar', 'currency', 'depreciation'],
      companies: ['State Bank of Pakistan'],
      sectors: ['Banking', 'Economy', 'Currency'],
      url: '#',
      saved: false,
      author: 'Ali Raza',
      readingTime: '4 min'
    },
    {
      id: 6,
      title: 'Banking sector reports 15% increase in quarterly profits led by major banks',
      summary: 'The banking sector in Pakistan has reported a 15% year-on-year increase in profits for the last quarter, with major banks like HBL and MCB leading the growth amid higher interest rates.',
      source: 'Pakistan Today',
      date: '2025-02-24T11:10:00',
      sentiment: 'neutral',
      sentimentScore: 0.35,
      keywords: ['banking', 'profits', 'quarterly results', 'interest rates'],
      companies: ['HBL', 'MCB Bank', 'United Bank Limited'],
      sectors: ['Banking', 'Finance'],
      url: '#',
      saved: true,
      author: 'Zainab Memon',
      readingTime: '5 min'
    },
    {
      id: 7,
      title: 'Cement manufacturers announce price increase due to rising input costs',
      summary: 'Major cement manufacturers in Pakistan have announced a price increase of PKR 55-60 per bag citing rising coal prices and transportation costs. This move could impact construction activity.',
      source: 'Business Recorder',
      date: '2025-02-23T13:25:00',
      sentiment: 'negative',
      sentimentScore: -0.58,
      keywords: ['cement', 'price hike', 'construction', 'inflation'],
      companies: ['Lucky Cement', 'DG Khan Cement', 'Maple Leaf Cement'],
      sectors: ['Cement', 'Construction'],
      url: '#',
      saved: false,
      author: 'Tahir Hussain',
      readingTime: '4 min'
    },
    {
      id: 8,
      title: 'Government unveils new incentives for IT exporters to boost foreign exchange reserves',
      summary: 'The Pakistani government has introduced a comprehensive package of incentives for IT exporters, including tax breaks and simplified forex regulations to boost technology exports and address foreign exchange challenges.',
      source: 'Dawn News',
      date: '2025-02-23T09:45:00',
      sentiment: 'positive',
      sentimentScore: 0.82,
      keywords: ['IT exports', 'incentives', 'forex', 'technology'],
      companies: ['Systems Limited', 'NetSol Technologies', 'TRG Pakistan'],
      sectors: ['Technology', 'Economy', 'Exports'],
      url: '#',
      saved: false,
      author: 'Naveed Khan',
      readingTime: '6 min'
    },
  ];

  // Data for filters
  const sources = ['Business Recorder', 'Dawn News', 'The News', 'Express Tribune', 'ARY News', 'Pakistan Today'];
  const sentiments = ['positive', 'neutral', 'negative'];
  const sectors = ['Banking', 'Economy', 'Technology', 'Energy', 'Oil & Gas', 'Finance', 'Currency', 'Market', 'Cement', 'Construction', 'Exports'];
  const companies = [
    'State Bank of Pakistan', 
    'Pakistan Stock Exchange', 
    'Pakistan State Oil', 
    'Shell Pakistan', 
    'Attock Petroleum',
    'Systems Limited', 
    'TRG Pakistan', 
    'Netsol Technologies',
    'HBL', 
    'MCB Bank', 
    'United Bank Limited',
    'Lucky Cement',
    'DG Khan Cement',
    'Maple Leaf Cement'
  ];
  
  const dateRanges = [
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
    { value: '90d', label: 'Last 90 Days' },
    { value: 'custom', label: 'Custom Range' }
  ];
  
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'relevance', label: 'Relevance' },
    { value: 'sentiment_pos', label: 'Most Positive' },
    { value: 'sentiment_neg', label: 'Most Negative' }
  ];

  // Helper functions
  const handleSentimentFilter = (sentiment) => {
    if (filterSentiment.includes(sentiment)) {
      setFilterSentiment(filterSentiment.filter(s => s !== sentiment));
    } else {
      setFilterSentiment([...filterSentiment, sentiment]);
    }
    updateActiveFilters();
  };

  const handleSourceFilter = (source) => {
    if (filterSources.includes(source)) {
      setFilterSources(filterSources.filter(s => s !== source));
    } else {
      setFilterSources([...filterSources, source]);
    }
    updateActiveFilters();
  };

  const handleSaveNews = (id) => {
    setNewsItems(newsItems.map(item => 
      item.id === id ? { ...item, saved: !item.saved } : item
    ));
  };

  const updateActiveFilters = () => {
    setActiveFilters(
      filterSentiment.length + 
      filterSources.length + 
      (filterCompany ? 1 : 0) + 
      (filterSector ? 1 : 0)
    );
  };

  const clearAllFilters = () => {
    setFilterSentiment([]);
    setFilterSources([]);
    setFilterDateRange('7d');
    setFilterCompany('');
    setFilterSector('');
    setSearchQuery('');
    setActiveFilters(0);
  };

  const getSentimentColor = (sentiment) => {
    if (typeof sentiment === 'string') {
      switch(sentiment.toLowerCase()) {
        case 'positive': return 'green';
        case 'negative': return 'red';
        case 'neutral': return 'blue';
        default: return 'gray';
      }
    } else if (typeof sentiment === 'number') {
      if (sentiment > 0.6) return 'green';
      if (sentiment > 0.3) return 'blue';
      return 'red';
    }
    return 'gray';
  };

  const getSentimentIcon = (sentiment) => {
    if (typeof sentiment === 'string') {
      switch(sentiment.toLowerCase()) {
        case 'positive': return <CheckCircle size={16} />;
        case 'negative': return <AlertTriangle size={16} />;
        case 'neutral': return <Info size={16} />;
        default: return <Info size={16} />;
      }
    }
    return <Info size={16} />;
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffTime / (1000 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }
  };

  // Apply filters to news items
  const filteredNews = newsItems.filter(item => {
    // Apply sentiment filter
    if (filterSentiment.length > 0 && !filterSentiment.includes(item.sentiment)) {
      return false;
    }
    
    // Apply source filter
    if (filterSources.length > 0 && !filterSources.includes(item.source)) {
      return false;
    }
    
    // Apply company filter
    if (filterCompany && !item.companies.includes(filterCompany)) {
      return false;
    }
    
    // Apply sector filter
    if (filterSector && !item.sectors.includes(filterSector)) {
      return false;
    }
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      if (!item.title.toLowerCase().includes(query) && 
          !item.summary.toLowerCase().includes(query) &&
          !item.keywords.some(k => k.toLowerCase().includes(query))) {
        return false;
      }
    }
    
    return true;
  });
  
  // Apply sorting
  const sortedNews = [...filteredNews].sort((a, b) => {
    switch(sortBy) {
      case 'newest':
        return new Date(b.date) - new Date(a.date);
      case 'oldest':
        return new Date(a.date) - new Date(b.date);
      case 'sentiment_pos':
        return b.sentimentScore - a.sentimentScore;
      case 'sentiment_neg':
        return a.sentimentScore - b.sentimentScore;
      case 'relevance':
      default:
        return new Date(b.date) - new Date(a.date);
    }
  });

  // Calculate sentiment distribution
  const sentimentDistribution = {
    positive: newsItems.filter(item => item.sentiment === 'positive').length,
    neutral: newsItems.filter(item => item.sentiment === 'neutral').length,
    negative: newsItems.filter(item => item.sentiment === 'negative').length,
  };

  // Trending topics based on keywords
  const keywordCount = {};
  newsItems.forEach(item => {
    item.keywords.forEach(keyword => {
      keywordCount[keyword] = (keywordCount[keyword] || 0) + 1;
    });
  });
  
  const trendingTopics = Object.entries(keywordCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .slice(0, 6)
    .map(([keyword, count]) => ({ keyword, count }));

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap">
        <Heading size="lg" color={textColor} mb={{ base: 4, md: 0 }}>News Feed</Heading>
        
        <Flex>
          <Menu closeOnSelect={false}>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDown size={16} />}
              leftIcon={<Filter size={16} />}
              variant="outline"
              mr={2}
            >
              Filters
              {activeFilters > 0 && (
                <Badge ml={1} colorScheme="green" borderRadius="full" fontSize="xs">
                  {activeFilters}
                </Badge>
              )}
            </MenuButton>
            <MenuList p={4} maxH="400px" overflowY="auto" minW="300px">
              <Flex justify="space-between" align="center" mb={3}>
                <Text fontWeight="bold" color={textColor}>Filters</Text>
                <Button size="xs" variant="ghost" onClick={clearAllFilters}>Clear All</Button>
              </Flex>
              
              <Box mb={4}>
                <Text fontWeight="medium" mb={2} color={textColor}>Sentiment</Text>
                <Flex wrap="wrap" gap={2}>
                  {sentiments.map(sentiment => (
                    <Tag 
                      key={sentiment}
                      size="md"
                      variant={filterSentiment.includes(sentiment) ? "solid" : "outline"}
                      colorScheme={getSentimentColor(sentiment)}
                      cursor="pointer"
                      onClick={() => handleSentimentFilter(sentiment)}
                    >
                      {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                    </Tag>
                  ))}
                </Flex>
              </Box>
              
              <Box mb={4}>
                <Text fontWeight="medium" mb={2} color={textColor}>Sources</Text>
                <Flex direction="column" gap={1}>
                  {sources.map(source => (
                    <Checkbox 
                      key={source}
                      isChecked={filterSources.includes(source)}
                      onChange={() => handleSourceFilter(source)}
                      colorScheme="green"
                    >
                      <Text fontSize="sm">{source}</Text>
                    </Checkbox>
                  ))}
                </Flex>
              </Box>
              
              <Box mb={4}>
                <Text fontWeight="medium" mb={2} color={textColor}>Companies</Text>
                <Select 
                  value={filterCompany} 
                  onChange={e => {
                    setFilterCompany(e.target.value);
                    updateActiveFilters();
                  }}
                  placeholder="Select company"
                  size="sm"
                >
                  {companies.map(company => (
                    <option key={company} value={company}>{company}</option>
                  ))}
                </Select>
              </Box>
              
              <Box>
                <Text fontWeight="medium" mb={2} color={textColor}>Sectors</Text>
                <Select 
                  value={filterSector} 
                  onChange={e => {
                    setFilterSector(e.target.value);
                    updateActiveFilters();
                  }}
                  placeholder="Select sector"
                  size="sm"
                >
                  {sectors.map(sector => (
                    <option key={sector} value={sector}>{sector}</option>
                  ))}
                </Select>
              </Box>
            </MenuList>
          </Menu>
          
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDown size={16} />}
              leftIcon={<Calendar size={16} />}
              variant="outline"
              mr={2}
            >
              {dateRanges.find(range => range.value === filterDateRange)?.label || 'Date Range'}
            </MenuButton>
            <MenuList>
              {dateRanges.map(range => (
                <MenuItem 
                  key={range.value}
                  onClick={() => setFilterDateRange(range.value)}
                  fontWeight={filterDateRange === range.value ? "bold" : "normal"}
                >
                  {range.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          
          <Menu>
            <MenuButton 
              as={Button} 
              rightIcon={<ChevronDown size={16} />}
              variant="outline"
            >
              {sortOptions.find(option => option.value === sortBy)?.label || 'Sort By'}
            </MenuButton>
            <MenuList>
              {sortOptions.map(option => (
                <MenuItem 
                  key={option.value}
                  onClick={() => setSortBy(option.value)}
                  fontWeight={sortBy === option.value ? "bold" : "normal"}
                >
                  {option.label}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      
      {/* News content grid */}
      <Grid templateColumns={{ base: "1fr", xl: "3fr 1fr" }} gap={6}>
        <Stack spacing={6}>
          {/* Search Bar */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardBody>
              <InputGroup size="lg">
                <InputLeftElement pointerEvents="none">
                  <Search size={20} color="gray" />
                </InputLeftElement>
                <Input 
                  placeholder="Search news by keyword, company, or topic..." 
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  pr={searchQuery ? "4.5rem" : undefined}
                />
                {searchQuery && (
                  <InputRightElement width="4.5rem">
                    <Button h="1.75rem" size="sm" onClick={() => setSearchQuery('')}>
                      <X size={16} />
                    </Button>
                  </InputRightElement>
                )}
              </InputGroup>
            </CardBody>
          </Card>
          
          {/* Active Filters */}
          {activeFilters > 0 && (
            <Flex wrap="wrap" gap={2} mb={2}>
              {filterSentiment.map(sentiment => (
                <Tag
                  key={sentiment}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme={getSentimentColor(sentiment)}
                >
                  <Flex align="center">
                    <Text>Sentiment: {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}</Text>
                    <IconButton
                      size="xs"
                      ml={1}
                      icon={<X size={12} />}
                      colorScheme={getSentimentColor(sentiment)}
                      variant="ghost"
                      onClick={() => handleSentimentFilter(sentiment)}
                      aria-label={`Remove ${sentiment} filter`}
                    />
                  </Flex>
                </Tag>
              ))}
              
              {filterSources.map(source => (
                <Tag
                  key={source}
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="gray"
                >
                  <Flex align="center">
                    <Text>Source: {source}</Text>
                    <IconButton
                      size="xs"
                      ml={1}
                      icon={<X size={12} />}
                      colorScheme="gray"
                      variant="ghost"
                      onClick={() => handleSourceFilter(source)}
                      aria-label={`Remove ${source} filter`}
                    />
                  </Flex>
                </Tag>
              ))}
              
              {filterCompany && (
                <Tag
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="purple"
                >
                  <Flex align="center">
                    <Text>Company: {filterCompany}</Text>
                    <IconButton
                      size="xs"
                      ml={1}
                      icon={<X size={12} />}
                      colorScheme="purple"
                      variant="ghost"
                      onClick={() => {
                        setFilterCompany('');
                        updateActiveFilters();
                      }}
                      aria-label="Remove company filter"
                    />
                  </Flex>
                </Tag>
              )}
              
              {filterSector && (
                <Tag
                  size="md"
                  borderRadius="full"
                  variant="solid"
                  colorScheme="orange"
                >
                  <Flex align="center">
                    <Text>Sector: {filterSector}</Text>
                    <IconButton
                      size="xs"
                      ml={1}
                      icon={<X size={12} />}
                      colorScheme="orange"
                      variant="ghost"
                      onClick={() => {
                        setFilterSector('');
                        updateActiveFilters();
                      }}
                      aria-label="Remove sector filter"
                    />
                  </Flex>
                </Tag>
              )}
            </Flex>
          )}
          
          {/* Results Summary */}
          <Flex justify="space-between" align="center">
            <Text color={secondaryTextColor}>
              Showing {sortedNews.length} {sortedNews.length === 1 ? 'result' : 'results'}
              {filteredNews.length !== newsItems.length && ` (filtered from ${newsItems.length})`}
            </Text>
          </Flex>
          
          {/* News List */}
          <Stack spacing={4}>
            {isLoading ? (
              // Loading skeletons
              Array(4).fill(0).map((_, index) => (
                <Card key={index} bg={bgCard} boxShadow="sm" borderRadius="lg">
                  <CardBody>
                    <Flex>
                      <Skeleton height="50px" width="50px" borderRadius="md" mr={4} />
                      <Box flex="1">
                        <Skeleton height="24px" width="80%" mb={2} />
                        <Skeleton height="16px" width="60%" mb={3} />
                        <Skeleton height="80px" mb={3} />
                        <Flex>
                          <Skeleton height="20px" width="100px" mr={2} />
                          <Skeleton height="20px" width="80px" mr={2} />
                          <Skeleton height="20px" width="120px" />
                        </Flex>
                      </Box>
                      <Skeleton height="80px" width="100px" ml={4} />
                    </Flex>
                  </CardBody>
                </Card>
              ))
            ) : sortedNews.length > 0 ? (
              sortedNews.map(item => (
                <Card 
                  key={item.id} 
                  bg={bgCard} 
                  boxShadow="sm" 
                  borderRadius="lg" 
                  borderLeft="4px solid" 
                  borderColor={`${getSentimentColor(item.sentiment)}.500`}
                  _hover={{ boxShadow: "md", transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                >
                  <CardBody>
                    <Grid templateColumns={{ base: "1fr", md: "1fr auto" }} gap={4}>
                      <Box>
                        <Flex mb={2} align="center">
                          <Tag size="sm" colorScheme={getSentimentColor(item.sentiment)} mr={2} borderRadius="full">
                            <Flex align="center">
                              <Box mr={1}>{getSentimentIcon(item.sentiment)}</Box>
                              <Text>{item.sentiment.charAt(0).toUpperCase() + item.sentiment.slice(1)}</Text>
                            </Flex>
                          </Tag>
                          <Text fontSize="sm" color={secondaryTextColor} mr={2}>{item.source}</Text>
                          <Flex align="center" fontSize="sm" color={secondaryTextColor}>
                            <Clock size={14} style={{ marginRight: '4px' }} />
                            {formatDate(item.date)}
                          </Flex>
                        </Flex>
                        
                        <Heading size="md" mb={2} color={textColor}>
                          <Link href={item.url}>{item.title}</Link>
                        </Heading>
                        
                        <Text mb={3} color={secondaryTextColor}>{item.summary}</Text>
                        
                        <Flex align="center" mb={3} flexWrap="wrap">
                          <Flex align="center" mr={4}>
                            <Avatar size="xs" mr={1} name={item.author} />
                            <Text fontSize="sm" color={secondaryTextColor}>{item.author}</Text>
                          </Flex>
                          <Flex align="center" fontSize="sm" color={secondaryTextColor} mr={4}>
                            <Clock size={12} style={{ marginRight: '4px' }} />
                            <Text>{item.readingTime} read</Text>
                          </Flex>
                        </Flex>
                        
                        <Flex wrap="wrap" gap={2} mb={3}>
                          {item.keywords.map(keyword => (
                            <Tag key={keyword} size="sm" colorScheme="gray" variant="subtle" borderRadius="full">
                              {keyword}
                            </Tag>
                          ))}
                        </Flex>
                        
                        <Flex wrap="wrap" gap={2}>
                          {item.companies.map(company => (
                            <Tag key={company} size="sm" colorScheme="purple" variant="subtle" borderRadius="full">
                              {company}
                            </Tag>
                          ))}
                          
                          {item.sectors.map(sector => (
                            <Tag key={sector} size="sm" colorScheme="orange" variant="subtle" borderRadius="full">
                              {sector}
                            </Tag>
                          ))}
                        </Flex>
                      </Box>
                      
                      <Flex direction="column" align="center" justify="space-between" minW="100px">
                        <Box 
                          mb={3} 
                          p={3} 
                          borderRadius="full" 
                          bg={`${getSentimentColor(item.sentiment)}.50`}
                          color={`${getSentimentColor(item.sentiment)}.500`}
                          fontWeight="bold"
                          fontSize="xl"
                          w="70px"
                          h="70px"
                          display="flex"
                          alignItems="center"
                          justifyContent="center"
                        >
                          {Math.abs(item.sentimentScore * 100).toFixed(0)}%
                        </Box>
                        
                        <Flex>
                          <IconButton
                            icon={item.saved ? <Bookmark size={18} /> : <BookmarkPlus size={18} />}
                            aria-label={item.saved ? "Remove from saved" : "Save article"}
                            colorScheme={item.saved ? "green" : "gray"}
                            variant={item.saved ? "solid" : "outline"}
                            onClick={() => handleSaveNews(item.id)}
                            mr={2}
                          />
                          
                          <IconButton
                            icon={<Share size={18} />}
                            aria-label="Share article"
                            variant="outline"
                          />
                        </Flex>
                      </Flex>
                    </Grid>
                  </CardBody>
                </Card>
              ))
            ) : (
              // Empty state
              <Card bg={bgCard} boxShadow="sm" borderRadius="lg" p={8} textAlign="center">
                <Box mb={4}>
                  <Search size={48} style={{ margin: '0 auto', color: '#A0AEC0' }} />
                </Box>
                <Heading size="md" mb={2} color={textColor}>No News Found</Heading>
                <Text color={secondaryTextColor} mb={4}>
                  We couldn't find any news matching your filters. Try adjusting your search criteria.
                </Text>
                <Button colorScheme="green" onClick={clearAllFilters}>Clear All Filters</Button>
              </Card>
            )}
          </Stack>
          
          {/* Load More Button */}
          {!isLoading && sortedNews.length > 0 && (
            <Flex justify="center" mt={4}>
              <Button 
                colorScheme="green" 
                leftIcon={<ArrowDown size={16} />} 
                size="lg"
                isLoading={isLoading}
              >
                Load More News
              </Button>
            </Flex>
          )}
        </Stack>
        
        {/* Right Sidebar */}
        <Stack spacing={6}>
          {/* Sentiment Distribution */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="md" color={textColor}>Sentiment Distribution</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={4}>
                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    <Box p={2} bg="green.50" borderRadius="md" mr={3}>
                      <CheckCircle size={20} color="green" />
                    </Box>
                    <Text fontWeight="medium">Positive</Text>
                  </Flex>
                  <Text fontWeight="bold" color="green.500">
                    {sentimentDistribution.positive} articles
                  </Text>
                </Flex>
                <Progress value={(sentimentDistribution.positive / newsItems.length) * 100} colorScheme="green" size="sm" borderRadius="full" />
                
                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    <Box p={2} bg="blue.50" borderRadius="md" mr={3}>
                      <Info size={20} color="blue" />
                    </Box>
                    <Text fontWeight="medium">Neutral</Text>
                  </Flex>
                  <Text fontWeight="bold" color="blue.500">
                    {sentimentDistribution.neutral} articles
                  </Text>
                </Flex>
                <Progress value={(sentimentDistribution.neutral / newsItems.length) * 100} colorScheme="blue" size="sm" borderRadius="full" />
                
                <Flex align="center" justify="space-between">
                  <Flex align="center">
                    <Box p={2} bg="red.50" borderRadius="md" mr={3}>
                      <AlertTriangle size={20} color="red" />
                    </Box>
                    <Text fontWeight="medium">Negative</Text>
                  </Flex>
                  <Text fontWeight="bold" color="red.500">
                    {sentimentDistribution.negative} articles
                  </Text>
                </Flex>
                <Progress value={(sentimentDistribution.negative / newsItems.length) * 100} colorScheme="red" size="sm" borderRadius="full" />
              </Stack>
            </CardBody>
          </Card>
          
          {/* Trending Topics */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="md" color={textColor}>Trending Topics</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={3}>
                {trendingTopics.map((topic, index) => (
                  <Flex 
                    key={topic.keyword} 
                    justify="space-between" 
                    align="center"
                    p={3}
                    borderRadius="md"
                    _hover={{ bg: hoverBg }}
                    cursor="pointer"
                    onClick={() => setSearchQuery(topic.keyword)}
                  >
                    <Flex align="center">
                      <Box 
                        w="24px" 
                        h="24px" 
                        borderRadius="full" 
                        bg={index < 3 ? "green.100" : "gray.100"} 
                        color={index < 3 ? "green.700" : "gray.700"}
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontWeight="bold"
                        fontSize="xs"
                        mr={3}
                      >
                        {index + 1}
                      </Box>
                      <Text fontWeight="medium">{topic.keyword}</Text>
                    </Flex>
                    <Flex align="center">
                      <Text fontSize="sm" color={secondaryTextColor} mr={2}>{topic.count} articles</Text>
                      {index === 0 && (
                        <Tag size="sm" colorScheme="red">
                          <Flex align="center">
                            <TrendingUp size={12} style={{ marginRight: '4px' }} />
                            <Text>Hot</Text>
                          </Flex>
                        </Tag>
                      )}
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            </CardBody>
          </Card>
          
          {/* Saved Articles */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Flex justify="space-between" align="center">
                <Heading size="md" color={textColor}>Saved Articles</Heading>
                <Tag colorScheme="green" size="sm">{newsItems.filter(item => item.saved).length}</Tag>
              </Flex>
            </CardHeader>
            <CardBody>
              {newsItems.filter(item => item.saved).length > 0 ? (
                <Stack spacing={4}>
                  {newsItems.filter(item => item.saved).map(item => (
                    <Flex 
                      key={item.id} 
                      p={3} 
                      borderRadius="md" 
                      borderLeft="3px solid" 
                      borderColor={`${getSentimentColor(item.sentiment)}.500`}
                      bg={hoverBg}
                      _hover={{ bg: `${getSentimentColor(item.sentiment)}.50` }}
                    >
                      <Box>
                        <Heading size="sm" color={textColor}>{item.title}</Heading>
                        <Flex align="center" mt={1}>
                          <Text fontSize="xs" color={secondaryTextColor}>{item.source}</Text>
                          <Text fontSize="xs" color={secondaryTextColor} mx={2}>•</Text>
                          <Text fontSize="xs" color={secondaryTextColor}>{formatDate(item.date)}</Text>
                        </Flex>
                      </Box>
                    </Flex>
                  ))}
                </Stack>
              ) : (
                <Box textAlign="center" py={4}>
                  <Bookmark size={40} style={{ margin: '0 auto 16px', color: '#A0AEC0' }} />
                  <Text color={secondaryTextColor}>
                    No saved articles yet. Click the bookmark icon to save articles for later.
                  </Text>
                </Box>
              )}
            </CardBody>
          </Card>
          
          {/* Top Sources */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="md" color={textColor}>Top Sources</Heading>
            </CardHeader>
            <CardBody>
              <Stack spacing={3}>
                {sources.slice(0, 5).map(source => {
                  const count = newsItems.filter(item => item.source === source).length;
                  return (
                    <Flex key={source} justify="space-between" align="center">
                      <Text fontWeight="medium">{source}</Text>
                      <Tag size="sm" colorScheme="gray">{count} articles</Tag>
                    </Flex>
                  );
                })}
              </Stack>
            </CardBody>
          </Card>
        </Stack>
      </Grid>
      
      {/* Back to Top Button */}
      <Tooltip label="Back to top">
        <IconButton
          position="fixed"
          bottom="20px"
          right="20px"
          icon={<ArrowUp size={20} />}
          colorScheme="green"
          borderRadius="full"
          boxShadow="lg"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
          size="lg"
        />
      </Tooltip>
    </Box>
  );
};

export default NewsFeedPage;