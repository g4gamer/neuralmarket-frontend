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
  useColorModeValue,
  Progress
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
  Area
} from 'recharts';
import { TrendingUp, ArrowUpRight, ArrowDownRight, BarChart2, BookOpen } from 'lucide-react';

const DashboardPage = () => {
  const [timeFilter, setTimeFilter] = useState('7d');
  
  const bgCard = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

  // Mock data for charts
  const sentimentTrendData = [
    { date: 'Mon', positive: 65, neutral: 25, negative: 10, price: 100 },
    { date: 'Tue', positive: 59, neutral: 30, negative: 11, price: 98 },
    { date: 'Wed', positive: 40, neutral: 40, negative: 20, price: 95 },
    { date: 'Thu', positive: 51, neutral: 32, negative: 17, price: 97 },
    { date: 'Fri', positive: 75, neutral: 20, negative: 5, price: 102 },
    { date: 'Sat', positive: 70, neutral: 20, negative: 10, price: 105 },
    { date: 'Sun', positive: 68, neutral: 22, negative: 10, price: 104 },
  ];

  const marketOverview = [
    { name: 'Banking', value: 42, sentiment: 'positive', change: 2.5 },
    { name: 'Energy', value: 28, sentiment: 'negative', change: -1.8 },
    { name: 'Tech', value: 15, sentiment: 'neutral', change: 0.3 },
    { name: 'Pharma', value: 15, sentiment: 'positive', change: 3.1 },
  ];

  const topNews = [
    { title: 'State Bank of Pakistan Announces New Policy Rate', sentiment: 'neutral', source: 'Business Recorder', time: '2 hours ago' },
    { title: 'PSX Gains 800 Points Amid Positive Economic Indicators', sentiment: 'positive', source: 'Dawn News', time: '3 hours ago' },
    { title: 'Oil & Gas Sector Faces Regulatory Challenges', sentiment: 'negative', source: 'The News', time: '5 hours ago' },
    { title: 'Tech Companies Report Strong Q2 Earnings', sentiment: 'positive', source: 'Express Tribune', time: '6 hours ago' },
  ];

  const todaySentimentData = [
    { name: 'Positive', value: 65, color: '#38A169' },
    { name: 'Neutral', value: 25, color: '#3182CE' },
    { name: 'Negative', value: 10, color: '#E53E3E' },
  ];

  const sectorAnalysisData = [
    { name: 'Banking', positive: 72, neutral: 18, negative: 10 },
    { name: 'Energy', positive: 42, neutral: 28, negative: 30 },
    { name: 'Tech', positive: 85, neutral: 10, negative: 5 },
    { name: 'Pharma', positive: 68, neutral: 22, negative: 10 },
    { name: 'Auto', positive: 38, neutral: 22, negative: 40 },
  ];

  const marketDistributionData = [
    { name: 'Banking', value: 35, color: '#38A169' },
    { name: 'Energy', value: 25, color: '#E53E3E' },
    { name: 'Tech', value: 15, color: '#3182CE' },
    { name: 'Pharma', value: 15, color: '#805AD5' },
    { name: 'Auto', value: 10, color: '#DD6B20' },
  ];

  const getSentimentColor = (sentiment) => {
    switch(sentiment.toLowerCase()) {
      case 'positive': return 'green';
      case 'negative': return 'red';
      case 'neutral': return 'blue';
      default: return 'gray';
    }
  };

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p={2} borderRadius="md" boxShadow="md" border="1px solid" borderColor={borderColor}>
          <Text fontWeight="bold">{label}</Text>
          {payload.map((entry, index) => (
            <Text key={`item-${index}`} color={entry.color} fontSize="sm">
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
        <Heading size="lg" color={textColor}>Market Dashboard</Heading>
        <Select value={timeFilter} onChange={(e) => setTimeFilter(e.target.value)} width="120px" bg={bgCard}>
          <option value="24h">24 Hours</option>
          <option value="7d">7 Days</option>
          <option value="30d">30 Days</option>
          <option value="90d">90 Days</option>
        </Select>
      </Flex>

      {/* Stats Overview Row */}
      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={6} mb={6}>
        <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
          <CardBody>
            <Stat>
              <StatLabel color={secondaryTextColor}>Market Sentiment</StatLabel>
              <Flex align="center" mt={2}>
                <StatNumber color="green.500" fontSize="2xl">68%</StatNumber>
                <Tag ml={2} colorScheme="green" variant="subtle" borderRadius="full" px={2}>
                  <Flex align="center">
                    <Box as="span" mr={1}>↑</Box>
                    <Text>5.2%</Text>
                  </Flex>
                </Tag>
              </Flex>
              <StatHelpText mb={0} color={secondaryTextColor}>Positive sentiment trending up</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
        
        <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
          <CardBody>
            <Stat>
              <StatLabel color={secondaryTextColor}>News Volume</StatLabel>
              <Flex align="center" mt={2}>
                <StatNumber color={textColor} fontSize="2xl">428</StatNumber>
                <Tag ml={2} colorScheme="blue" variant="subtle" borderRadius="full" px={2}>
                  <Flex align="center">
                    <Box as="span" mr={1}>↑</Box>
                    <Text>12%</Text>
                  </Flex>
                </Tag>
              </Flex>
              <StatHelpText mb={0} color={secondaryTextColor}>Articles in the last 24 hours</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
          <CardBody>
            <Stat>
              <StatLabel color={secondaryTextColor}>KSE-100 Prediction</StatLabel>
              <Flex align="center" mt={2}>
                <StatNumber color="green.500" fontSize="2xl">+1.2%</StatNumber>
                <Box ml={1}>
                  <ArrowUpRight size={18} color="green" />
                </Box>
              </Flex>
              <StatHelpText mb={0} color={secondaryTextColor}>Based on sentiment analysis</StatHelpText>
            </Stat>
          </CardBody>
        </Card>

        <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
          <CardBody>
            <Stat>
              <StatLabel color={secondaryTextColor}>AI Confidence</StatLabel>
              <StatNumber color={textColor} fontSize="2xl">83%</StatNumber>
              <Box mt={2}>
                <Progress value={83} colorScheme="green" size="sm" borderRadius="full" />
              </Box>
              <StatHelpText mb={0} color={secondaryTextColor}>Model prediction confidence</StatHelpText>
            </Stat>
          </CardBody>
        </Card>
      </Grid>

      {/* Main Content Grid */}
      <Grid templateColumns={{ base: "1fr", lg: "2fr 1fr" }} gap={6}>
        {/* Left Column */}
        <Stack spacing={6}>
          {/* Sentiment Trend Chart */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader pb={0}>
              <Flex justify="space-between" align="center">
                <Heading size="md" color={textColor}>Sentiment Trend</Heading>
                <TrendingUp size={20} color="green" />
              </Flex>
            </CardHeader>
            <CardBody>
              <Box h="300px">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={sentimentTrendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={borderColor} />
                    <XAxis dataKey="date" stroke={secondaryTextColor} />
                    <YAxis stroke={secondaryTextColor} />
                    <RechartsTooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="positive" 
                      name="Positive" 
                      stroke="#38A169" 
                      strokeWidth={2} 
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="neutral" 
                      name="Neutral" 
                      stroke="#3182CE" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="negative" 
                      name="Negative" 
                      stroke="#E53E3E" 
                      strokeWidth={2}
                      dot={{ r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardBody>
          </Card>

          {/* Tabs Section */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardBody>
              <Tabs colorScheme="green" isFitted variant="enclosed">
                <TabList mb={4}>
                  <Tab>
                    <Flex align="center">
                      <BarChart2 size={16} style={{ marginRight: '8px' }} />
                      <Text>Sector Analysis</Text>
                    </Flex>
                  </Tab>
                  <Tab>
                    <Flex align="center">
                      <Box as="span" mr={2}>📊</Box>
                      <Text>Market Capital</Text>
                    </Flex>
                  </Tab>
                  <Tab>
                    <Flex align="center">
                      <BookOpen size={16} style={{ marginRight: '8px' }} />
                      <Text>Latest News</Text>
                    </Flex>
                  </Tab>
                </TabList>
                <TabPanels>
                  {/* Sector Analysis Tab */}
                  <TabPanel px={0}>
                    <Box h="300px">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart 
                          data={sectorAnalysisData} 
                          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                          layout="vertical"
                        >
                          <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                          <XAxis type="number" stroke={secondaryTextColor} />
                          <YAxis 
                            dataKey="name" 
                            type="category" 
                            width={70} 
                            stroke={secondaryTextColor}
                          />
                          <RechartsTooltip content={<CustomTooltip />} />
                          <Legend />
                          <Bar dataKey="positive" name="Positive" stackId="a" fill="#38A169" />
                          <Bar dataKey="neutral" name="Neutral" stackId="a" fill="#3182CE" />
                          <Bar dataKey="negative" name="Negative" stackId="a" fill="#E53E3E" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </TabPanel>

                  {/* Market Distribution Tab */}
                  <TabPanel px={0}>
                    <Box h="300px">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                          <Pie
                            data={marketDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            nameKey="name"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {marketDistributionData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </TabPanel>

                  {/* Latest News Tab */}
                  <TabPanel px={0}>
                    <Stack spacing={4}>
                      {topNews.map((news, index) => (
                        <Flex 
                          key={index} 
                          p={3}
                          borderRadius="md"
                          border="1px solid"
                          borderColor={borderColor}
                          _hover={{ bg: "gray.50" }}
                        >
                          <Box mr={3} mt={1}>
                            {news.sentiment === 'positive' && <Box as="span" fontSize="lg">✅</Box>}
                            {news.sentiment === 'negative' && <Box as="span" fontSize="lg">⚠️</Box>}
                            {news.sentiment === 'neutral' && <Box as="span" fontSize="lg">ℹ️</Box>}
                          </Box>
                          <Box>
                            <Text fontWeight="medium" color={textColor}>{news.title}</Text>
                            <Flex mt={1} align="center">
                              <Text fontSize="sm" color={secondaryTextColor}>{news.source}</Text>
                              <Text fontSize="sm" color={secondaryTextColor} mx={2}>•</Text>
                              <Text fontSize="sm" color={secondaryTextColor}>{news.time}</Text>
                              <Tag ml={2} colorScheme={getSentimentColor(news.sentiment)} borderRadius="full">
                                {news.sentiment}
                              </Tag>
                            </Flex>
                          </Box>
                        </Flex>
                      ))}
                    </Stack>
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </CardBody>
          </Card>
        </Stack>

        {/* Right Column */}
        <Stack spacing={6}>
          {/* Market Overview */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="md" color={textColor}>Market Overview</Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Stack spacing={4}>
                {marketOverview.map((sector, index) => (
                  <Flex 
                    key={index} 
                    justify="space-between" 
                    align="center" 
                    p={3}
                    borderRadius="md"
                    bg={useColorModeValue(`${sector.sentiment === 'positive' ? 'green.50' : sector.sentiment === 'negative' ? 'red.50' : 'blue.50'}`, 'gray.700')}
                  >
                    <Box>
                      <Text fontWeight="medium" color={textColor}>{sector.name}</Text>
                      <Tag colorScheme={getSentimentColor(sector.sentiment)}>
                        {sector.sentiment}
                      </Tag>
                    </Box>
                    <Flex align="center">
                      <Text fontWeight="bold" color={sector.change > 0 ? 'green.500' : sector.change < 0 ? 'red.500' : 'blue.500'}>
                        {sector.change > 0 ? '+' : ''}{sector.change}%
                      </Text>
                      {sector.change > 0 ? (
                        <ArrowUpRight size={16} color="green" style={{ marginLeft: '4px' }} />
                      ) : sector.change < 0 ? (
                        <ArrowDownRight size={16} color="red" style={{ marginLeft: '4px' }} />
                      ) : (
                        <Box as="span" ml={1}>➡️</Box>
                      )}
                    </Flex>
                  </Flex>
                ))}
              </Stack>
            </CardBody>
          </Card>

          {/* Top News */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="md" color={textColor}>Top News</Heading>
            </CardHeader>
            <CardBody pt={0}>
              <Stack spacing={4}>
                {topNews.map((news, index) => (
                  <Box 
                    key={index} 
                    p={3}
                    borderRadius="md"
                    borderLeft="4px solid"
                    borderColor={`${getSentimentColor(news.sentiment)}.500`}
                    bg={useColorModeValue('gray.50', 'gray.700')}
                  >
                    <Text fontWeight="medium" color={textColor}>{news.title}</Text>
                    <Flex mt={1} align="center">
                      <Text fontSize="sm" color={secondaryTextColor}>{news.source}</Text>
                      <Text fontSize="sm" color={secondaryTextColor} mx={2}>•</Text>
                      <Text fontSize="sm" color={secondaryTextColor}>{news.time}</Text>
                    </Flex>
                  </Box>
                ))}
                <Flex justify="center" mt={2}>
                  <Text color="green.500" fontWeight="medium" cursor="pointer">View All News</Text>
                </Flex>
              </Stack>
            </CardBody>
          </Card>

          {/* Sentiment Distribution */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="md" color={textColor}>Today's Sentiment</Heading>
            </CardHeader>
            <CardBody>
              <Box h="180px">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={todaySentimentData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      fill="#8884d8"
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {todaySentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Flex justify="center" mt={4}>
                <Flex align="center" mx={3}>
                  <Box w={3} h={3} bg="green.500" borderRadius="full" mr={2}></Box>
                  <Text fontSize="sm" color={secondaryTextColor}>Positive (65%)</Text>
                </Flex>
                <Flex align="center" mx={3}>
                  <Box w={3} h={3} bg="blue.500" borderRadius="full" mr={2}></Box>
                  <Text fontSize="sm" color={secondaryTextColor}>Neutral (25%)</Text>
                </Flex>
                <Flex align="center" mx={3}>
                  <Box w={3} h={3} bg="red.500" borderRadius="full" mr={2}></Box>
                  <Text fontSize="sm" color={secondaryTextColor}>Negative (10%)</Text>
                </Flex>
              </Flex>
            </CardBody>
          </Card>

          {/* KSE-100 Price Chart */}
          <Card bg={bgCard} boxShadow="sm" borderRadius="lg">
            <CardHeader>
              <Heading size="md" color={textColor}>KSE-100 Index</Heading>
            </CardHeader>
            <CardBody>
              <Box h="150px">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={sentimentTrendData}
                    margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="date" hide={true} />
                    <YAxis domain={['dataMin - 5', 'dataMax + 5']} hide={true} />
                    <RechartsTooltip 
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          return (
                            <Box bg="white" p={2} borderRadius="md" boxShadow="sm">
                              <Text fontWeight="bold">{payload[0].payload.date}</Text>
                              <Text color="green.500">Price: {payload[0].value}</Text>
                            </Box>
                          );
                        }
                        return null;
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#10B981" 
                      fillOpacity={1} 
                      fill="url(#colorPrice)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
              <Flex justify="space-between" align="center" mt={2}>
                <Text fontSize="sm" color={secondaryTextColor}>Last 7 days</Text>
                <Text fontWeight="bold" color="green.500">45,620 <Text as="span" fontWeight="normal" fontSize="sm">+4.2%</Text></Text>
              </Flex>
            </CardBody>
          </Card>
        </Stack>
      </Grid>
    </Box>
  );
};

export default DashboardPage;
