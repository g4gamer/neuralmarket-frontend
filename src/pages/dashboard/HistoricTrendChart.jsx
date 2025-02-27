import React from 'react';
import {
  Box,
  Card,
  CardBody,
  useColorModeValue,
} from '@chakra-ui/react';
import { 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  Legend, 
  ResponsiveContainer,
  ComposedChart
} from 'recharts';

const HistoricalTrendChart = () => {
  const textColor = useColorModeValue('gray.800', 'white');
  const secondaryTextColor = useColorModeValue('gray.600', 'gray.400');
  const borderColor = useColorModeValue('gray.200', 'gray.700');

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

  // Custom tooltip for charts
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box bg="white" p={2} borderRadius="md" boxShadow="md" border="1px solid" borderColor={borderColor}>
          <Box fontWeight="bold">{label}</Box>
          {payload.map((entry, index) => (
            <Box 
              key={`item-${index}`} 
              color={entry.color || entry.stroke || entry.fill} 
              fontSize="sm"
            >
              {`${entry.name}: ${entry.value}${entry.unit || ''}`}
            </Box>
          ))}
        </Box>
      );
    }
    return null;
  };

  return (
    <Card variant="outline" mb={4}>
      <CardBody>
        <Box h="400px">
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
  );
};

export default HistoricalTrendChart;