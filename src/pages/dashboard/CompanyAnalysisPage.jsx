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
  Input,
  InputGroup,
  InputLeftElement,
  Select,
  Stack,
  Stat,
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
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Progress,
  useColorModeValue,
  Avatar
} from '@chakra-ui/react';
import {
  Search,
  TrendingUp,
  TrendingDown,
  Bookmark,
  BookmarkPlus,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  BarChart2,
  PieChart,
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Info
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
  BarChart,
  Bar,
  Area,
  Cell
} from 'recharts';
const CompanyAnalysisPage = () => {
  const [selectedCompany, setSelectedCompany] = useState('PSO');
  const [timeFrame, setTimeFrame] = useState('3M');
  const [isBookmarked, setIsBookmarked] = useState(false);

  const bgCard = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Mock companies data
  const companies = [
    {
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
      logo: '🛢️'
    },
    {
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
      logo: '🏦'
    },
    {
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
      logo: '🏗️'
    },
    {
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
      logo: '💻'
    },
    {
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
      logo: '🛢️'
    },
  ];
  // Sector Performance Mock Data
  const sectorPerformanceData = [
    { sector: 'Banking', performance: 8.5 },
    { sector: 'Energy', performance: -3.2 },
    { sector: 'Technology', performance: 12.7 },
    { sector: 'Cement', performance: 1.5 },
    { sector: 'Pharma', performance: 5.3 },
    { sector: 'Automobile', performance: -6.1 }
  ];

  // Get current company data
  const company = companies.find(c => c.symbol === selectedCompany) || companies[0];

  // Mock sentiment data for selected company
  const sentimentData = [
    { date: 'Jan', positive: 62, neutral: 28, negative: 10, newsCount: 35, price: 128.40 },
    { date: 'Feb', positive: 58, neutral: 32, negative: 10, newsCount: 42, price: 125.75 },
    { date: 'Mar', positive: 60, neutral: 28, negative: 12, newsCount: 38, price: 130.60 },
    { date: 'Apr', positive: 64, neutral: 26, negative: 10, newsCount: 31, price: 132.25 },
    { date: 'May', positive: 57, neutral: 28, negative: 15, newsCount: 45, price: 126.80 },
    { date: 'Jun', positive: 60, neutral: 30, negative: 10, newsCount: 40, price: 129.35 },
    { date: 'Jul', positive: 62, neutral: 28, negative: 10, newsCount: 38, price: 132.90 },
    { date: 'Aug', positive: 65, neutral: 25, negative: 10, newsCount: 42, price: 134.80 },
  ];

  // Mock news data
  const newsItems = [
    {
      title: `${company.name} Reports Strong Quarterly Profit Growth`,
      source: 'Business Recorder',
      time: '2 hours ago',
      sentiment: 'positive',
      summary: `${company.name} has reported a 25% year-on-year increase in quarterly profits, exceeding analyst expectations. The company cited improved operational efficiency and strategic market positioning as key growth drivers.`
    },
    {
      title: `Government Announces New Policy Affecting ${company.sector} Sector`,
      source: 'Dawn News',
      time: '6 hours ago',
      sentiment: 'neutral',
      summary: `The Pakistani government has introduced new regulatory guidelines for the ${company.sector} sector. Analysts have mixed views on how these changes will impact major players like ${company.name} in the medium to long term.`
    },
    {
      title: `${company.name} Faces Supply Chain Challenges Amid Global Disruptions`,
      source: 'The News',
      time: '1 day ago',
      sentiment: 'negative',
      summary: `${company.name} is navigating supply chain disruptions due to global logistics challenges. This might impact the company's ability to meet demand in the coming quarter, according to industry experts.`
    },
    {
      title: `Analysts Upgrade ${company.name} to "Buy" Rating on Strong Fundamentals`,
      source: 'Express Tribune',
      time: '2 days ago',
      sentiment: 'positive',
      summary: `Leading market analysts have upgraded ${company.name} to a "Buy" rating, citing strong fundamentals and positive growth outlook. The target price has been revised upward by 15% based on projected earnings growth.`
    },
  ];

  // Mock peer comparison data
  const peerComparison = [
    {
      name: company.name,
      symbol: company.symbol,
      price: company.price,
      changePercent: company.changePercent,
      sentimentScore: company.sentimentScore,
      sentimentChange: company.sentimentChange,
      marketCap: company.marketCap,
      isCurrent: true
    },
    {
      name: 'Competitor 1',
      symbol: 'COMP1',
      price: 127.35,
      changePercent: -0.85,
      sentimentScore: 58,
      sentimentChange: 2.3,
      marketCap: '45.2B',
      isCurrent: false
    },
    {
      name: 'Competitor 2',
      symbol: 'COMP2',
      price: 89.60,
      changePercent: 1.25,
      sentimentScore: 62,
      sentimentChange: 3.8,
      marketCap: '68.7B',
      isCurrent: false
    },
    {
      name: 'Competitor 3',
      symbol: 'COMP3',
      price: 156.20,
      changePercent: -1.65,
      sentimentScore: 48,
      sentimentChange: -2.5,
      marketCap: '82.3B',
      isCurrent: false
    },
  ];

  // Mock key metrics data
  const keyMetrics = [
    { name: 'P/E Ratio', value: '7.8x' },
    { name: 'EPS', value: 'Rs. 17.25' },
    { name: 'Dividend Yield', value: '5.2%' },
    { name: 'ROE', value: '22.5%' },
    { name: 'Debt to Equity', value: '0.38' },
    { name: 'Revenue Growth (YoY)', value: '12.8%' },
  ];
  // Custom Tooltip for Charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          bg="white"
          p={2}
          borderRadius="md"
          boxShadow="md"
          border="1px solid"
          borderColor={borderColor}
        >
          <Box fontWeight="bold" mb={2}>{label}</Box>
          {payload.map((entry, index) => (
            <Box
              key={`item-${index}`}
              color={entry.color}
              fontSize="sm"
            >
              {`${entry.name}: ${entry.value}${entry.name === 'Price' ? '' : '%'}`}
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };
  // Mock sentiment factors
  const sentimentFactors = [
    { factor: 'Earnings Reports', impact: 'positive', strength: 85, trend: 'improving' },
    { factor: 'Management Changes', impact: 'positive', strength: 72, trend: 'stable' },
    { factor: 'Regulatory Environment', impact: 'negative', strength: 65, trend: 'stable' },
    { factor: 'Competitive Position', impact: 'positive', strength: 78, trend: 'improving' },
    { factor: 'Market Conditions', impact: 'neutral', strength: 50, trend: 'declining' },
  ];

  const timeFrameOptions = ['1M', '3M', '6M', '1Y', 'YTD'];

  const getSentimentColor = (sentiment) => {
    if (typeof sentiment === 'string') {
      switch (sentiment.toLowerCase()) {
        case 'positive': return 'green';
        case 'negative': return 'red';
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
    if (typeof sentiment === 'string') {
      switch (sentiment.toLowerCase()) {
        case 'positive': return <CheckCircle size={18} />;
        case 'negative': return <AlertTriangle size={18} />;
        case 'neutral': return <Info size={18} />;
        default: return <Info size={18} />;
      }
    }
    return <Info size={18} />;
  };

  return (
    <Box p={4}>
      {/* Search and company selector */}
      <Flex justify="space-between" align="center" mb={6} flexWrap="wrap">
        <Heading size="lg" color={textColor} mb={{ base: 4, md: 0 }}>Company Analysis</Heading>

        <InputGroup maxW="300px">
          <InputLeftElement pointerEvents="none">
            <Search size={18} color="gray" />
          </InputLeftElement>
          <Input
            type="text"
            placeholder="Search companies..."
            bg={bgCard}
            onChange={(e) => {
              // Implement search functionality
            }}
          />
        </InputGroup>
      </Flex>

      {/* Company overview card */}
      <Card bg={bgCard} boxShadow="sm" borderRadius="lg" mb={6}>
        <CardBody>
          <Flex justify="space-between" wrap="wrap">
            <Flex align="center" mb={{ base: 4, md: 0 }}>
              <Flex
                align="center"
                justify="center"
                bg={`${company.sentimentScore >= 60 ? 'green' : company.sentimentScore >= 45 ? 'blue' : 'red'}.100`}
                color={`${company.sentimentScore >= 60 ? 'green' : company.sentimentScore >= 45 ? 'blue' : 'red'}.700`}
                borderRadius="md"
                p={2}
                fontSize="2xl"
                mr={4}
                h="50px"
                w="50px"
              >
                <Text>{company.logo}</Text>
              </Flex>

              <Box>
                <Flex align="center">
                  <Heading size="lg" color={textColor}>{company.name}</Heading>
                  <Text
                    ml={2}
                    bg="gray.200"
                    px={2}
                    borderRadius="md"
                    fontSize="sm"
                    fontWeight="bold"
                    color={secondaryTextColor}
                  >
                    {company.symbol}
                  </Text>
                  <Text
                    ml={2}
                    color={secondaryTextColor}
                    fontSize="sm"
                  >
                    {company.sector}
                  </Text>
                </Flex>

                <Flex align="center" mt={1}>
                  <Text fontSize="2xl" fontWeight="bold" color={textColor}>Rs. {company.price.toFixed(2)}</Text>
                  <Flex align="center" ml={3} color={company.change > 0 ? "green.500" : "red.500"}>
                    {company.change > 0 ? (
                      <ArrowUpRight size={20} />
                    ) : (
                      <ArrowDownRight size={20} />
                    )}
                    <Text fontWeight="medium" ml={1}>
                      {company.change > 0 ? '+' : ''}{company.change.toFixed(2)} ({company.change > 0 ? '+' : ''}{company.changePercent.toFixed(2)}%)
                    </Text>
                  </Flex>
                </Flex>

                <Flex align="center" mt={1}>
                  <Text color={secondaryTextColor} fontSize="sm" mr={4}>Market Cap: Rs. {company.marketCap}</Text>
                  <Text color={secondaryTextColor} fontSize="sm">Volume: {(company.volume / 1000000).toFixed(2)}M</Text>
                </Flex>
              </Box>
            </Flex>

            <Flex direction="column" justify="center" align="flex-end">
              <Flex mb={3}>
                <Tag colorScheme={getSentimentColor(company.sentimentScore)} size="lg" mr={2}>
                  <Text>Sentiment: {company.sentimentScore}%</Text>
                </Tag>

                <Flex
                  align="center"
                  color={company.sentimentChange > 0 ? "green.500" : "red.500"}
                  bg={company.sentimentChange > 0 ? "green.50" : "red.50"}
                  px={2}
                  py={1}
                  borderRadius="md"
                >
                  {company.sentimentChange > 0 ? (
                    <ArrowUpRight size={16} />
                  ) : (
                    <ArrowDownRight size={16} />
                  )}
                  <Text fontSize="sm" fontWeight="medium" ml={1}>
                    {company.sentimentChange > 0 ? '+' : ''}{company.sentimentChange.toFixed(1)}%
                  </Text>
                </Flex>
              </Flex>

              <Button
                leftIcon={isBookmarked ? <Bookmark size={18} /> : <BookmarkPlus size={18} />}
                colorScheme={isBookmarked ? "green" : "gray"}
                variant={isBookmarked ? "solid" : "outline"}
                onClick={() => setIsBookmarked(!isBookmarked)}
                mb={2}
              >
                {isBookmarked ? "Watchlisted" : "Add to Watchlist"}
              </Button>

              <Flex>
                <Text fontSize="sm" fontWeight="medium" mr={2}>AI Prediction:</Text>
                <Tag colorScheme={company.sentimentScore >= 60 ? "green" : company.sentimentScore >= 45 ? "blue" : "red"} size="md">
                  <Flex align="center">
                    {company.sentimentScore >= 60 ? (
                      <TrendingUp size={14} style={{ marginRight: '4px' }} />
                    ) : company.sentimentScore >= 45 ? (
                      <ArrowUpRight size={14} style={{ marginRight: '4px' }} />
                    ) : (
                      <TrendingDown size={14} style={{ marginRight: '4px' }} />
                    )}
                    <Text fontWeight="bold">
                      {company.sentimentScore >= 60 ? 'BULLISH' : company.sentimentScore >= 45 ? 'NEUTRAL' : 'BEARISH'}
                    </Text>
                  </Flex>
                </Tag>
              </Flex>
            </Flex>
          </Flex>

          <HStack spacing={2} mt={4}>
            {timeFrameOptions.map((option) => (
              <Button
                key={option}
                size="sm"
                colorScheme={timeFrame === option ? "green" : "gray"}
                variant={timeFrame === option ? "solid" : "outline"}
                onClick={() => setTimeFrame(option)}
              >
                {option}
              </Button>
            ))}
          </HStack>
        </CardBody>
      </Card>

      {/* Main content grid */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        {/* Left column */}
        <Stack spacing={6}>
          {/* Price & Sentiment Chart */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader pb={0}>
              <Heading size="md" color={textColor}>Price & Sentiment Analysis</Heading>
            </CardHeader>
            <CardBody>
              {/* Price Chart */}
              <Box h="200px" mb={6}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={sentimentData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                    <XAxis
                      dataKey="date"
                      stroke={secondaryTextColor}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis
                      stroke={secondaryTextColor}
                      label={{
                        value: 'Price (Rs.)',
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: secondaryTextColor }
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="price"
                      stroke="#3182CE"
                      strokeWidth={2}
                      name="Price"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>

              {/* Sentiment Trend Chart */}
              <Box h="200px">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={sentimentData}
                    margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                    <XAxis
                      dataKey="date"
                      stroke={secondaryTextColor}
                      angle={-45}
                      textAnchor="end"
                    />
                    <YAxis
                      yAxisId="left"
                      stroke={secondaryTextColor}
                      label={{
                        value: 'Sentiment (%)',
                        angle: -90,
                        position: 'insideLeft',
                        style: { textAnchor: 'middle', fill: secondaryTextColor }
                      }}
                    />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      stroke="#805AD5"
                      label={{
                        value: 'News Volume',
                        angle: 90,
                        position: 'insideRight',
                        style: { textAnchor: 'middle', fill: '#805AD5' }
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />

                    {/* Sentiment Areas */}
                    <Area
                      type="monotone"
                      dataKey="positive"
                      yAxisId="left"
                      fill="#D1FAE5"
                      stroke="#38A169"
                      name="Positive"
                    />
                    <Area
                      type="monotone"
                      dataKey="neutral"
                      yAxisId="left"
                      fill="#DBEAFE"
                      stroke="#3182CE"
                      name="Neutral"
                      fillOpacity={0.6}
                    />
                    <Area
                      type="monotone"
                      dataKey="negative"
                      yAxisId="left"
                      fill="#FEE2E2"
                      stroke="#E53E3E"
                      name="Negative"
                      fillOpacity={0.6}
                    />

                    {/* News Volume Line */}
                    <Line
                      type="monotone"
                      dataKey="newsCount"
                      yAxisId="right"
                      stroke="#805AD5"
                      strokeWidth={2}
                      name="News Volume"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>

          {/* News & Analysis Tabs */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardBody>
              <Tabs colorScheme="green" variant="enclosed">
                <TabList mb={4}>
                  <Tab>
                    <Flex align="center">
                      <BookOpen size={16} style={{ marginRight: '8px' }} />
                      <Text>Latest News</Text>
                    </Flex>
                  </Tab>
                  <Tab>
                    <Flex align="center">
                      <BarChart2 size={16} style={{ marginRight: '8px' }} />
                      <Text>Peer Comparison</Text>
                    </Flex>
                  </Tab>
                  <Tab>
                    <Flex align="center">
                      <PieChart size={16} style={{ marginRight: '8px' }} />
                      <Text>Sentiment Factors</Text>
                    </Flex>
                  </Tab>
                </TabList>
                <TabPanels>
                  {/* News Tab */}
                  <TabPanel px={0}>
                    <Stack spacing={4}>
                      {newsItems.map((news, index) => (
                        <Card key={index} variant="outline">
                          <CardBody p={4}>
                            <Flex>
                              <Box
                                mr={4}
                                p={2}
                                borderRadius="md"
                                bg={`${getSentimentColor(news.sentiment)}.50`}
                                color={`${getSentimentColor(news.sentiment)}.500`}
                                alignSelf="flex-start"
                              >
                                {getSentimentIcon(news.sentiment)}
                              </Box>
                              <Box>
                                <Heading size="sm" color={textColor}>{news.title}</Heading>
                                <Flex align="center" mt={1} mb={2}>
                                  <Text fontSize="sm" color={secondaryTextColor}>{news.source}</Text>
                                  <Text mx={2} color={secondaryTextColor}>•</Text>
                                  <Flex align="center">
                                    <Clock size={12} style={{ marginRight: '4px' }} />
                                    <Text fontSize="sm" color={secondaryTextColor}>{news.time}</Text>
                                  </Flex>
                                  <Tag ml={2} size="sm" colorScheme={getSentimentColor(news.sentiment)}>
                                    {news.sentiment}
                                  </Tag>
                                </Flex>
                                <Text fontSize="sm" color={secondaryTextColor}>{news.summary}</Text>
                              </Box>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                      <Button variant="ghost" colorScheme="green" alignSelf="center">
                        View All News
                      </Button>
                    </Stack>
                  </TabPanel>

                  {/* Peer Comparison Tab */}
                  <TabPanel px={0}>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Company</Th>
                          <Th isNumeric>Price (Rs.)</Th>
                          <Th isNumeric>Change</Th>
                          <Th isNumeric>Market Cap</Th>
                          <Th isNumeric>Sentiment</Th>
                          <Th isNumeric>Sent. Change</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {peerComparison.map((peer) => (
                          <Tr key={peer.symbol} bg={peer.isCurrent ? "green.50" : undefined}>
                            <Td fontWeight={peer.isCurrent ? "bold" : "normal"}>
                              <Flex align="center">
                                {peer.isCurrent && <Box as="span" mr={1} fontSize="sm">➤</Box>}
                                {peer.name} ({peer.symbol})
                              </Flex>
                            </Td>
                            <Td isNumeric>{peer.price.toFixed(2)}</Td>
                            <Td isNumeric color={peer.changePercent > 0 ? "green.500" : "red.500"}>
                              <Flex align="center" justify="flex-end">
                                {peer.changePercent > 0 ? (
                                  <ArrowUpRight size={14} style={{ marginRight: '4px' }} />
                                ) : (
                                  <ArrowDownRight size={14} style={{ marginRight: '4px' }} />
                                )}
                                {peer.changePercent > 0 ? '+' : ''}{peer.changePercent.toFixed(2)}%
                              </Flex>
                            </Td>
                            <Td isNumeric>{peer.marketCap}</Td>
                            <Td isNumeric>
                              <Tag colorScheme={getSentimentColor(peer.sentimentScore)}>
                                {peer.sentimentScore}%
                              </Tag>
                            </Td>
                            <Td isNumeric color={peer.sentimentChange > 0 ? "green.500" : "red.500"}>
                              {peer.sentimentChange > 0 ? '+' : ''}{peer.sentimentChange.toFixed(1)}%
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                    <Text fontSize="sm" color={secondaryTextColor} mt={4}>
                      * Comparison is based on companies in the {company.sector} sector
                    </Text>
                  </TabPanel>

                  {/* Sentiment Factors Tab */}
                  <TabPanel px={0}>
                    <Stack spacing={4}>
                      {sentimentFactors.map((factor, index) => (
                        <Box key={index} p={3} borderRadius="md" borderLeft="4px solid" borderColor={`${getSentimentColor(factor.impact)}.500`}>
                          <Flex justify="space-between" align="flex-start">
                            <Box>
                              <Heading size="sm" color={textColor}>{factor.factor}</Heading>
                              <Flex align="center" mt={1}>
                                <Tag colorScheme={getSentimentColor(factor.impact)} size="sm" mr={2}>
                                  {factor.impact}
                                </Tag>
                                <Text fontSize="sm" color={secondaryTextColor}>
                                  Trend: <Text as="span" fontWeight="medium" color={
                                    factor.trend === 'improving' ? 'green.500' :
                                      factor.trend === 'declining' ? 'red.500' : 'blue.500'
                                  }>
                                    {factor.trend}
                                  </Text>
                                </Text>
                              </Flex>
                            </Box>
                            <Box textAlign="right">
                              <Text fontWeight="bold" color={`${getSentimentColor(factor.impact)}.500`}>{factor.strength}%</Text>
                              <Text fontSize="xs" color={secondaryTextColor}>impact strength</Text>
                            </Box>
                          </Flex>
                          <Progress
                            value={factor.strength}
                            colorScheme={getSentimentColor(factor.impact)}
                            size="sm"
                            borderRadius="full"
                            mt={2}
                          />
                        </Box>
                      ))}
                      <Card variant="outline" p={3} bg="gray.50">
                        <Flex align="center">
                          <Info size={16} color="gray" style={{ marginRight: '8px' }} />
                          <Text fontSize="sm" color={secondaryTextColor}>
                            Sentiment factors are calculated based on news analysis and market indicators
                          </Text>
                        </Flex>
                      </Card>
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </Stack>

        {/* Right column */}
        <Stack spacing={6}>
          {/* Sentiment Summary */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="md" color={textColor}>Sentiment Summary</Heading>
            </CardHeader>
            <CardBody>
              <Box mb={6}>
                <Flex justify="center" mb={4}>
                  <Box
                    w="120px"
                    h="120px"
                    borderRadius="full"
                    bg={`${getSentimentColor(company.sentimentScore)}.50`}
                    color={`${getSentimentColor(company.sentimentScore)}.500`}
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <Text fontSize="3xl" fontWeight="bold">{company.sentimentScore}%</Text>
                    <Text fontSize="sm">Sentiment Score</Text>
                  </Box>
                </Flex>

                <Flex justify="center" align="center" mb={2}>
                  <Text fontSize="sm" color={secondaryTextColor} mr={2}>vs. Previous Period:</Text>
                  <Flex
                    align="center"
                    color={company.sentimentChange > 0 ? "green.500" : "red.500"}
                  >
                    {company.sentimentChange > 0 ? (
                      <ArrowUpRight size={14} style={{ marginRight: '4px' }} />
                    ) : (
                      <ArrowDownRight size={14} style={{ marginRight: '4px' }} />
                    )}
                    <Text fontWeight="medium">
                      {company.sentimentChange > 0 ? '+' : ''}{company.sentimentChange.toFixed(1)}%
                    </Text>
                  </Flex>
                </Flex>

                <Flex justify="center" mb={6}>
                  <Text fontSize="sm" color={secondaryTextColor}>Based on {sentimentData.reduce((acc, item) => acc + item.newsCount, 0)} news articles</Text>
                </Flex>

                <Box mb={4}>
                  <Text fontWeight="medium" mb={2} color={textColor}>Sentiment Breakdown</Text>
                  <Flex align="center" mb={2}>
                    <Box w="100px" textAlign="right" mr={3}>
                      <Text fontSize="sm" color={secondaryTextColor}>Positive</Text>
                    </Box>
                    <Box flex="1" bg="gray.100" h={3} borderRadius="full">
                      <Box bg="green.500" h="100%" w={`${sentimentData[sentimentData.length - 1].positive}%`} borderRadius="full"></Box>
                    </Box>
                    <Box w="40px" textAlign="right" ml={3}>
                      <Text fontSize="sm" fontWeight="bold" color="green.500">{sentimentData[sentimentData.length - 1].positive}%</Text>
                    </Box>
                  </Flex>

                  <Flex align="center" mb={2}>
                    <Box w="100px" textAlign="right" mr={3}>
                      <Text fontSize="sm" color={secondaryTextColor}>Neutral</Text>
                    </Box>
                    <Box flex="1" bg="gray.100" h={3} borderRadius="full">
                      <Box bg="blue.500" h="100%" w={`${sentimentData[sentimentData.length - 1].neutral}%`} borderRadius="full"></Box>
                    </Box>
                    <Box w="40px" textAlign="right" ml={3}>
                      <Text fontSize="sm" fontWeight="bold" color="blue.500">{sentimentData[sentimentData.length - 1].neutral}%</Text>
                    </Box>
                  </Flex>

                  <Flex align="center">
                    <Box w="100px" textAlign="right" mr={3}>
                      <Text fontSize="sm" color={secondaryTextColor}>Negative</Text>
                    </Box>
                    <Box flex="1" bg="gray.100" h={3} borderRadius="full">
                      <Box bg="red.500" h="100%" w={`${sentimentData[sentimentData.length - 1].negative}%`} borderRadius="full"></Box>
                    </Box>
                    <Box w="40px" textAlign="right" ml={3}>
                      <Text fontSize="sm" fontWeight="bold" color="red.500">{sentimentData[sentimentData.length - 1].negative}%</Text>
                    </Box>
                  </Flex>
                </Box>

                <Card
                  variant="outline"
                  bg={useColorModeValue('gray.50', 'gray.700')}
                  borderColor={borderColor}
                >
                  <CardBody p={3}>
                    <Heading size="xs" mb={2} color={textColor}>AI Insight</Heading>
                    <Text fontSize="sm" color={secondaryTextColor}>
                      {company.sentimentScore >= 60 ?
                        `${company.name} shows strong positive sentiment indicators, with improving trends in recent news coverage. This often correlates with positive price movement in the next 1-2 weeks.` :
                        company.sentimentScore >= 45 ?
                          `${company.name} exhibits balanced sentiment with mixed news coverage. Market performance typically follows sector trends in such cases.` :
                          `${company.name} is facing negative sentiment pressures based on recent news analysis. Exercise caution and monitor key developments closely.`
                      }
                    </Text>
                  </CardBody>
                </Card>
              </Box>
            </CardBody>
          </Card>

          {/* Key Metrics */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="md" color={textColor}>Key Metrics</Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Table variant="simple" size="sm">
                <Tbody>
                  {keyMetrics.map((metric, index) => (
                    <Tr key={index}>
                      <Td pl={0} borderColor={borderColor}>
                        <Text color={secondaryTextColor}>{metric.name}</Text>
                      </Td>
                      <Td isNumeric pr={0} borderColor={borderColor}>
                        <Text fontWeight="medium" color={textColor}>{metric.value}</Text>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            </CardBody>
          </Card>

          {/* Sector Performance */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Flex justify="space-between" align="center">
                <Heading size="md" color={textColor}>Sector Performance</Heading>
                <Tag colorScheme={getSentimentColor(company.sentimentScore)}>
                  {company.sector}
                </Tag>
              </Flex>
            </CardHeader>
            <CardBody pt={0}>
              <Box mb={4}>
                <Text color={secondaryTextColor} mb={3}>
                  {company.name} is in the {company.sector} sector, which currently shows
                  {company.sentimentScore >= 60 ?
                    ' strong positive sentiment indicators.' :
                    company.sentimentScore >= 45 ?
                      ' neutral sentiment indicators.' :
                      ' negative sentiment pressure.'
                  }
                </Text>

                <Flex align="center" justify="space-between" mb={3}>
                  <Text fontSize="sm" fontWeight="medium" color={textColor}>Sector Sentiment Score:</Text>
                  <Tag colorScheme={getSentimentColor(company.sentimentScore)}>
                    {company.sentimentScore >= 5 ? company.sentimentScore - 5 : company.sentimentScore + 5}%
                  </Tag>
                </Flex>

                <Flex align="center" justify="space-between">
                  <Text fontSize="sm" fontWeight="medium" color={textColor}>Company vs. Sector:</Text>
                  <Tag colorScheme="green">
                    Outperforming
                  </Tag>
                </Flex>
              </Box>

              <ResponsiveContainer width="100%" height={150}>
                <BarChart
                  data={sectorPerformanceData}
                  margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke={borderColor} vertical={false} />
                  <XAxis
                    dataKey="sector"
                    stroke={secondaryTextColor}
                    tick={{ fontSize: 10 }}
                  />
                  <YAxis
                    stroke={secondaryTextColor}
                    tick={{ fontSize: 10 }}
                    label={{
                      value: 'Performance (%)',
                      angle: -90,
                      position: 'insideLeft',
                      style: { textAnchor: 'middle', fill: secondaryTextColor, fontSize: 10 }
                    }}
                  />
                  <Tooltip
                    content={({ active, payload, label }) => {
                      if (active && payload && payload.length) {
                        return (
                          <Box
                            bg="white"
                            p={2}
                            borderRadius="md"
                            boxShadow="md"
                            border="1px solid"
                            borderColor={borderColor}
                          >
                            <Box fontWeight="bold" mb={2}>{label}</Box>
                            <Box color={payload[0].value > 0 ? 'green.500' : 'red.500'}>
                              Performance: {payload[0].value.toFixed(2)}%
                            </Box>
                          </Box>
                        );
                      }
                      return null;
                    }}
                  />
                  <Bar dataKey="performance">
                    {sectorPerformanceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.performance >= 0 ? '#38A169' : '#E53E3E'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              <Text fontSize="xs" color={secondaryTextColor} textAlign="center">
                Sector performance data updated daily
              </Text>
            </CardBody>
          </Card>
        </Stack>
      </Grid>
    </Box>
  );
};

export default CompanyAnalysisPage;
