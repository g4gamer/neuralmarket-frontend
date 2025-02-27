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
} from '@chakra-ui/react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart2, 
  PieChart as PieChartIcon, 
  Calendar, 
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  CheckCircle, 
  Info,
  Clock
} from 'lucide-react';

const SentimentAnalysisPage = () => {
  const [timeFrame, setTimeFrame] = useState('7d');
  const [selectedTab, setSelectedTab] = useState(0);
  
  const bgCard = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const hoverBg = useColorModeValue('gray.50', 'gray.700');

  // Mock data for overall sentiment
  const overallSentiment = {
    positive: 62,
    neutral: 28,
    negative: 10,
    change: 4.5,
    newsCount: 385,
    confidence: 88
  };

  // Mock data for sector sentiments
  const sectorSentiments = [
    { name: 'Banking', positive: 72, neutral: 18, negative: 10, change: 8.2 },
    { name: 'Energy', positive: 42, neutral: 28, negative: 30, change: -12.5 },
    { name: 'Technology', positive: 85, neutral: 10, negative: 5, change: 15.3 },
    { name: 'Cement', positive: 54, neutral: 36, negative: 10, change: -3.1 },
    { name: 'Pharma', positive: 68, neutral: 22, negative: 10, change: 5.4 },
    { name: 'Automobile', positive: 35, neutral: 25, negative: 40, change: -18.7 },
  ];

  // Mock data for historical sentiment
  const historicalSentiment = [
    { month: 'Jan', positive: 58, neutral: 32, negative: 10, kse100: 45200, marketChange: 1.2 },
    { month: 'Feb', positive: 56, neutral: 30, negative: 14, kse100: 44800, marketChange: -0.9 },
    { month: 'Mar', positive: 53, neutral: 33, negative: 14, kse100: 44200, marketChange: -1.3 },
    { month: 'Apr', positive: 52, neutral: 35, negative: 13, kse100: 43900, marketChange: -0.7 },
    { month: 'May', positive: 55, neutral: 30, negative: 15, kse100: 44500, marketChange: 1.4 },
    { month: 'Jun', positive: 60, neutral: 28, negative: 12, kse100: 46200, marketChange: 3.8 },
    { month: 'Jul', positive: 58, neutral: 30, negative: 12, kse100: 45800, marketChange: -0.9 },
    { month: 'Aug', positive: 62, neutral: 28, negative: 10, kse100: 47100, marketChange: 2.8 },
  ];

  // Mock data for sentiment drivers
  const sentimentDrivers = [
    { topic: 'Interest Rate Policy', impact: 'high', sentiment: 'positive', recentNews: 42 },
    { topic: 'Foreign Investment', impact: 'high', sentiment: 'positive', recentNews: 38 },
    { topic: 'Energy Crisis', impact: 'high', sentiment: 'negative', recentNews: 55 },
    { topic: 'IMF Bailout Program', impact: 'medium', sentiment: 'neutral', recentNews: 32 },
    { topic: 'Tax Reforms', impact: 'medium', sentiment: 'negative', recentNews: 28 },
    { topic: 'Tech Sector Growth', impact: 'medium', sentiment: 'positive', recentNews: 35 },
    { topic: 'Infrastructure Projects', impact: 'low', sentiment: 'positive', recentNews: 24 },
  ];

  // Mock data for keyword clusters
  const keywordClusters = [
    { 
      category: 'Economy', 
      keywords: ['GDP', 'inflation', 'interest rates', 'economic growth', 'recession', 'trade deficit'],
      sentimentScore: 58,
      trend: 'improving'
    },
    { 
      category: 'Corporate', 
      keywords: ['earnings', 'profits', 'dividends', 'quarterly results', 'mergers', 'acquisitions'],
      sentimentScore: 72,
      trend: 'stable'
    },
    { 
      category: 'Regulation', 
      keywords: ['SECP', 'regulatory', 'compliance', 'SBP policy', 'taxation', 'legal'],
      sentimentScore: 45,
      trend: 'declining'
    },
    { 
      category: 'Global', 
      keywords: ['international markets', 'foreign investment', 'export', 'import', 'global economy'],
      sentimentScore: 62,
      trend: 'improving'
    },
  ];

  const timeFrameOptions = ['24h', '7d', '30d', '90d', '1y'];

  const getSentimentColor = (sentiment) => {
    if (typeof sentiment === 'string') {
      switch(sentiment.toLowerCase()) {
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
      switch(sentiment.toLowerCase()) {
        case 'positive': return <CheckCircle size={18} />;
        case 'negative': return <AlertTriangle size={18} />;
        case 'neutral': return <Info size={18} />;
        default: return <Info size={18} />;
      }
    } else if (typeof sentiment === 'number') {
      if (sentiment >= 60) return <CheckCircle size={18} />;
      if (sentiment >= 45) return <Info size={18} />;
      return <AlertTriangle size={18} />;
    }
    return <Info size={18} />;
  };

  const getTrendIcon = (trend) => {
    switch(trend.toLowerCase()) {
      case 'improving': return <TrendingUp size={16} color="green" />;
      case 'declining': return <TrendingDown size={16} color="red" />;
      case 'stable': return <ArrowRight size={16} color="blue" />;
      default: return <Info size={16} color="gray" />;
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p={2} borderRadius="md" boxShadow="md" border="1px solid" borderColor={borderColor}>
          <Text fontWeight="bold">{label}</Text>
          {payload.map((entry, index) => (
            <Text key={`item-${index}`} color={entry.color || entry.stroke || entry.fill} fontSize="sm">
              {`${entry.name}: ${entry.value}${entry.unit || ''}`}
            </Text>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Box p={4}>
      <Flex justify="space-between" align="center" mb={6}>
        <Heading size="lg" color={textColor}>Market Sentiment Analysis</Heading>
        <HStack>
          <Text fontSize="sm" color={secondaryTextColor} mr={2}>Time Period:</Text>
          <Select 
            value={timeFrame} 
            onChange={(e) => setTimeFrame(e.target.value)} 
            width="120px" 
            size="sm" 
            bg={bgCard}
          >
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </Select>
        </HStack>
      </Flex>

      {/* Overall Sentiment Section */}
      <Card bg={bgCard} boxShadow="sm" borderRadius="lg" mb={6}>
        <CardHeader pb={0}>
          <Heading size="md" color={textColor}>Overall Market Sentiment</Heading>
        </CardHeader>
        <CardBody>
          <Grid templateColumns={{ base: "1fr", md: "3fr 1fr" }} gap={6}>
            <Box>
              <Flex direction={{ base: "column", sm: "row" }} mb={6}>
                <Stat flex="1">
                  <StatLabel color={secondaryTextColor}>Positive Sentiment</StatLabel>
                  <Flex align="center">
                    <StatNumber color="green.500">{overallSentiment.positive}%</StatNumber>
                    <Tag ml={2} colorScheme="green" variant="subtle" borderRadius="full" px={2}>
                      <Flex align="center">
                        <Box as="span" mr={1}>↑</Box>
                        <Text>{overallSentiment.change}%</Text>
                      </Flex>
                    </Tag>
                  </Flex>
                  <StatHelpText color={secondaryTextColor}>vs. previous period</StatHelpText>
                </Stat>

                <Stat flex="1">
                  <StatLabel color={secondaryTextColor}>Neutral Sentiment</StatLabel>
                  <StatNumber color="blue.500">{overallSentiment.neutral}%</StatNumber>
                  <StatHelpText color={secondaryTextColor}>Balanced coverage</StatHelpText>
                </Stat>

                <Stat flex="1">
                  <StatLabel color={secondaryTextColor}>Negative Sentiment</StatLabel>
                  <StatNumber color="red.500">{overallSentiment.negative}%</StatNumber>
                  <StatHelpText color={secondaryTextColor}>Risk indicators</StatHelpText>
                </Stat>
              </Flex>

              <Box mb={4}>
                <Text fontWeight="medium" mb={2} color={textColor}>Sentiment Breakdown</Text>
                <Flex align="center" mb={2}>
                  <Box w="100px" textAlign="right" mr={3}>
                    <Text fontSize="sm" color={secondaryTextColor}>Positive</Text>
                  </Box>
                  <Box flex="1" bg="gray.100" h={3} borderRadius="full">
                    <Box bg="green.500" h="100%" w={`${overallSentiment.positive}%`} borderRadius="full"></Box>
                  </Box>
                  <Box w="40px" textAlign="right" ml={3}>
                    <Text fontSize="sm" fontWeight="bold" color="green.500">{overallSentiment.positive}%</Text>
                  </Box>
                </Flex>
                
                <Flex align="center" mb={2}>
                  <Box w="100px" textAlign="right" mr={3}>
                    <Text fontSize="sm" color={secondaryTextColor}>Neutral</Text>
                  </Box>
                  <Box flex="1" bg="gray.100" h={3} borderRadius="full">
                    <Box bg="blue.500" h="100%" w={`${overallSentiment.neutral}%`} borderRadius="full"></Box>
                  </Box>
                  <Box w="40px" textAlign="right" ml={3}>
                    <Text fontSize="sm" fontWeight="bold" color="blue.500">{overallSentiment.neutral}%</Text>
                  </Box>
                </Flex>
                
                <Flex align="center">
                  <Box w="100px" textAlign="right" mr={3}>
                    <Text fontSize="sm" color={secondaryTextColor}>Negative</Text>
                  </Box>
                  <Box flex="1" bg="gray.100" h={3} borderRadius="full">
                    <Box bg="red.500" h="100%" w={`${overallSentiment.negative}%`} borderRadius="full"></Box>
                  </Box>
                  <Box w="40px" textAlign="right" ml={3}>
                    <Text fontSize="sm" fontWeight="bold" color="red.500">{overallSentiment.negative}%</Text>
                  </Box>
                </Flex>
              </Box>
            </Box>

            <Box>
              <Card variant="outline">
                <CardBody>
                  <Heading size="sm" mb={4} color={textColor}>AI Market Prediction</Heading>
                  
                  <Flex 
                    direction="column" 
                    align="center" 
                    justify="center" 
                    bg="green.50" 
                    p={4} 
                    borderRadius="md"
                    mb={3}
                  >
                    <TrendingUp size={24} color="green" />
                    <Text fontWeight="bold" fontSize="lg" color="green.600" mt={2}>BULLISH</Text>
                    <Text fontSize="sm" color="gray.600">Next 7-14 days</Text>
                  </Flex>
                  
                  <Flex align="center" justify="space-between" mb={1}>
                    <Text fontSize="sm" color={secondaryTextColor}>AI Confidence:</Text>
                    <Text fontWeight="bold" color={textColor}>{overallSentiment.confidence}%</Text>
                  </Flex>
                  <Progress value={overallSentiment.confidence} colorScheme="green" size="sm" borderRadius="full" mb={3} />
                  
                  <Flex align="center" justify="space-between">
                    <Text fontSize="sm" color={secondaryTextColor}>Based on:</Text>
                    <Text fontSize="sm" color={textColor}>{overallSentiment.newsCount} news articles</Text>
                  </Flex>
                </CardBody>
              </Card>
            </Box>
          </Grid>
        </CardBody>
      </Card>

      {/* Tabs Section */}
      <Card bg={bgCard} boxShadow="sm" borderRadius="lg" mb={6}>
        <CardBody>
          <Tabs index={selectedTab} onChange={setSelectedTab} colorScheme="green" variant="enclosed">
            <TabList mb={4}>
              <Tab>
                <Flex align="center">
                  <BarChart2 size={16} style={{ marginRight: '8px' }} />
                  <Text>Sector Analysis</Text>
                </Flex>
              </Tab>
              <Tab>
                <Flex align="center">
                  <Calendar size={16} style={{ marginRight: '8px' }} />
                  <Text>Historical Trends</Text>
                </Flex>
              </Tab>
              <Tab>
                <Flex align="center">
                  <Box as="span" mr={2}>📊</Box>
                  <Text>Sentiment Drivers</Text>
                </Flex>
              </Tab>
            </TabList>
            <TabPanels>
              {/* Sector Analysis Tab */}
              <TabPanel px={0}>
                <Stack spacing={4}>
                  {sectorSentiments.map((sector) => (
                    <Card key={sector.name} variant="outline" borderRadius="md">
                      <CardBody p={4}>
                        <Flex 
                          justify="space-between" 
                          align={{ base: "flex-start", md: "center" }}
                          direction={{ base: "column", md: "row" }}
                          gap={{ base: 2, md: 0 }}
                        >
                          <Flex align="center">
                            <Box 
                              p={2} 
                              borderRadius="md" 
                              bg={`${getSentimentColor(sector.positive)}.50`}
                              color={`${getSentimentColor(sector.positive)}.500`}
                              mr={3}
                            >
                              {getSentimentIcon(sector.positive)}
                            </Box>
                            <Box>
                              <Text fontWeight="bold" fontSize="lg">{sector.name}</Text>
                              <Flex align="center">
                                <Tag colorScheme={sector.change >= 0 ? "green" : "red"} size="sm" mr={2}>
                                  {sector.change >= 0 ? "+" : ""}{sector.change}%
                                </Tag>
                                <Text fontSize="sm" color={secondaryTextColor}>vs. previous period</Text>
                              </Flex>
                            </Box>
                          </Flex>
                          
                          <HStack spacing={6} mt={{ base: 2, md: 0 }}>
                            <Stat textAlign={{ base: "left", md: "right" }} size="sm">
                              <StatLabel color={secondaryTextColor} fontSize="xs">Positive</StatLabel>
                              <StatNumber fontSize="md" color="green.500">{sector.positive}%</StatNumber>
                            </Stat>
                            <Stat textAlign={{ base: "left", md: "right" }} size="sm">
                              <StatLabel color={secondaryTextColor} fontSize="xs">Neutral</StatLabel>
                              <StatNumber fontSize="md" color="blue.500">{sector.neutral}%</StatNumber>
                            </Stat>
                            <Stat textAlign={{ base: "left", md: "right" }} size="sm">
                              <StatLabel color={secondaryTextColor} fontSize="xs">Negative</StatLabel>
                              <StatNumber fontSize="md" color="red.500">{sector.negative}%</StatNumber>
                            </Stat>
                          </HStack>
                        </Flex>
                        
                        <Box mt={4}>
                          <Progress 
                            value={100} 
                            size="md" 
                            borderRadius="md"
                            sx={{
                              '& > div': {
                                background: `linear-gradient(to right, 
                                  #38A169 0%, #38A169 ${sector.positive}%, 
                                  #3182CE ${sector.positive}%, #3182CE ${sector.positive + sector.neutral}%, 
                                  #E53E3E ${sector.positive + sector.neutral}%, #E53E3E 100%)`
                              }
                            }}
                          />
                        </Box>
                      </CardBody>
                    </Card>
                  ))}

                  <Card variant="outline" p={3} bg="gray.50">
                    <Flex align="center" justify="center">
                      <Info size={16} color="gray" style={{ marginRight: '8px' }} />
                      <Text fontSize="sm" color={secondaryTextColor}>
                        Sector sentiment is calculated from {overallSentiment.newsCount} news articles using FinBERT model
                      </Text>
                    </Flex>
                  </Card>
                </Stack>
              </TabPanel>

              {/* Historical Trends Tab */}
              <TabPanel px={0}>
                <Card variant="outline" mb={4}>
                  <CardBody>
                    <Heading size="sm" mb={4} color={textColor}>8-Month Sentiment Trend</Heading>
                    <Box h="300px">
                      <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={historicalSentiment} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                          <XAxis dataKey="month" stroke={secondaryTextColor} />
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
                            domain={[42000, 48000]}
                            stroke="#805AD5"
                            label={{ 
                              value: 'KSE-100 Index', 
                              angle: 90, 
                              position: 'insideRight',
                              style: { textAnchor: 'middle', fill: '#805AD5' }
                            }}
                          />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Legend />
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
                          <Line 
                            type="monotone" 
                            dataKey="kse100" 
                            yAxisId="right"
                            stroke="#805AD5" 
                            strokeWidth={2}
                            name="KSE-100 Index"
                            dot={{ r: 4 }}
                            activeDot={{ r: 6 }}
                          />
                        </ComposedChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardBody>
                </Card>

                <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={4}>
                  <Card variant="outline">
                    <CardBody>
                      <Flex align="center" mb={3}>
                        <TrendingUp size={18} color="green" style={{ marginRight: '8px' }} />
                        <Heading size="sm" color={textColor}>Positive Trend</Heading>
                      </Flex>
                      <Text color={secondaryTextColor} mb={3}>
                        Positive sentiment has increased by {overallSentiment.change}% over the selected time period.
                      </Text>
                      <HStack>
                        <Tag colorScheme="green">Banking</Tag>
                        <Tag colorScheme="green">Technology</Tag>
                        <Tag colorScheme="green">Pharma</Tag>
                      </HStack>
                    </CardBody>
                  </Card>

                  <Card variant="outline">
                    <CardBody>
                      <Flex align="center" mb={3}>
                        <TrendingDown size={18} color="red" style={{ marginRight: '8px' }} />
                        <Heading size="sm" color={textColor}>Negative Trend</Heading>
                      </Flex>
                      <Text color={secondaryTextColor} mb={3}>
                        Negative sentiment is highest in Energy and Automobile sectors.
                      </Text>
                      <HStack>
                        <Tag colorScheme="red">Energy</Tag>
                        <Tag colorScheme="red">Automobile</Tag>
                      </HStack>
                    </CardBody>
                  </Card>

                  <Card variant="outline">
                    <CardBody>
                      <Flex align="center" mb={3}>
                        <Clock size={18} color="blue" style={{ marginRight: '8px' }} />
                        <Heading size="sm" color={textColor}>Response Time</Heading>
                      </Flex>
                      <Text color={secondaryTextColor} mb={3}>
                        Market typically responds to sentiment shifts within 3-5 trading days.
                      </Text>
                      <Progress value={68} size="sm" colorScheme="blue" borderRadius="full" />
                    </CardBody>
                  </Card>
                </Grid>
              </TabPanel>

              {/* Sentiment Drivers Tab */}
              <TabPanel px={0}>
                <Grid templateColumns={{ base: "1fr", md: "3fr 2fr" }} gap={6}>
                  <Box>
                    <Heading size="sm" mb={4} color={textColor}>Key Sentiment Drivers</Heading>
                    <Table variant="simple" size="sm">
                      <Thead>
                        <Tr>
                          <Th>Topic</Th>
                          <Th>Sentiment</Th>
                          <Th isNumeric>News Volume</Th>
                          <Th>Market Impact</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {sentimentDrivers.map((driver) => (
                          <Tr key={driver.topic}>
                            <Td fontWeight="medium">{driver.topic}</Td>
                            <Td>
                              <Tag colorScheme={getSentimentColor(driver.sentiment)}>
                                <Flex align="center">
                                  <Box mr={1}>
                                    {getSentimentIcon(driver.sentiment)}
                                  </Box>
                                  <Text>{driver.sentiment}</Text>
                                </Flex>
                              </Tag>
                            </Td>
                            <Td isNumeric>{driver.recentNews}</Td>
                            <Td>
                              <Tag 
                                colorScheme={
                                  driver.impact === 'high' ? 'purple' : 
                                  driver.impact === 'medium' ? 'blue' : 'gray'
                                }
                              >
                                {driver.impact}
                              </Tag>
                            </Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                  </Box>

                  <Box>
                    <Heading size="sm" mb={4} color={textColor}>Keyword Clusters</Heading>
                    <Stack spacing={3}>
                      {keywordClusters.map((cluster) => (
                        <Card key={cluster.category} variant="outline">
                          <CardBody p={3}>
                            <Flex justify="space-between" mb={2}>
                              <Heading size="xs" color={textColor}>{cluster.category}</Heading>
                              <Flex align="center">
                                {getTrendIcon(cluster.trend)}
                                <Text fontSize="xs" ml={1} color={
                                  cluster.trend === 'improving' ? 'green.500' : 
                                  cluster.trend === 'declining' ? 'red.500' : 'blue.500'
                                }>
                                  {cluster.trend}
                                </Text>
                              </Flex>
                            </Flex>
                            <Flex wrap="wrap" gap={1} mb={2}>
                              {cluster.keywords.map((keyword, idx) => (
                                <Tag key={idx} size="sm" variant="subtle" colorScheme="gray">
                                  {keyword}
                                </Tag>
                              ))}
                            </Flex>
                            <Flex justify="space-between" align="center">
                              <Text fontSize="xs" color={secondaryTextColor}>Sentiment Score:</Text>
                              <Tag 
                                colorScheme={getSentimentColor(cluster.sentimentScore)}
                                size="sm"
                              >
                                {cluster.sentimentScore}%
                              </Tag>
                            </Flex>
                          </CardBody>
                        </Card>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </CardBody>
      </Card>

      {/* AI Insights */}
      <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
        <CardHeader pb={0}>
          <Flex justify="space-between" align="center">
            <Heading size="md" color={textColor}>AI Sentiment Insights</Heading>
            <Tag colorScheme="green" size="md">Updated 2 hours ago</Tag>
          </Flex>
        </CardHeader>
        <CardBody>
          <Grid templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }} gap={6}>
            <Card variant="outline">
              <CardBody>
                <Flex align="center" mb={3}>
                  <Box 
                    p={2} 
                    borderRadius="md" 
                    bg="green.50" 
                    color="green.500"
                    mr={3}
                  >
                    <CheckCircle size={18} />
                  </Box>
                  <Heading size="sm" color={textColor}>Positive Sentiment Leaders</Heading>
                </Flex>
                <Text color={secondaryTextColor} mb={3}>
                  Technology and Banking sectors show the strongest positive sentiment indicators in recent news.
                </Text>
                <Text fontSize="sm" color={textColor}>
                  <strong>Key insight:</strong> The positive trend in tech sector is closely correlated with foreign investment news and startup funding announcements.
                </Text>
              </CardBody>
            </Card>

            <Card variant="outline">
              <CardBody>
                <Flex align="center" mb={3}>
                  <Box 
                    p={2} 
                    borderRadius="md" 
                    bg="red.50" 
                    color="red.500"
                    mr={3}
                  >
                    <AlertTriangle size={18} />
                  </Box>
                  <Heading size="sm" color={textColor}>Negative Sentiment Alerts</Heading>
                </Flex>
                <Text color={secondaryTextColor} mb={3}>
                  Energy and Automobile sectors continue to face negative sentiment with declining trends.
                </Text>
                <Text fontSize="sm" color={textColor}>
                  <strong>Key insight:</strong> Regulatory challenges and supply chain issues are the primary drivers of negative sentiment in these sectors.
                </Text>
              </CardBody>
            </Card>

            <Card variant="outline">
              <CardBody>
                <Flex align="center" mb={3}>
                  <Box 
                    p={2} 
                    borderRadius="md" 
                    bg="purple.50" 
                    color="purple.500"
                    mr={3}
                  >
                    <Box as="span" fontSize="xl">🔮</Box>
                  </Box>
                  <Heading size="sm" color={textColor}>Market Prediction</Heading>
                </Flex>
                <Text color={secondaryTextColor} mb={3}>
                  Based on current sentiment patterns, our AI predicts a moderately bullish market in the coming weeks.
                </Text>
                <Text fontSize="sm" color={textColor}>
                  <strong>Success rate:</strong> Our sentiment-based predictions have shown 72% accuracy over the past 6 months.
                </Text>
              </CardBody>
            </Card>
          </Grid>
        </CardBody>
      </Card>
    </Box>
  );
};

export default SentimentAnalysisPage;