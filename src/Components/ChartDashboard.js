import { Box } from '@mui/material';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaCalendarAlt } from 'react-icons/fa';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ValueComponent from './ValueComponent';
import SocialMediaGraph from './SocialMediaGraph';


const metricData = [
  {
    title: 'Users',
    value: '26K',
    change: '-12.4%',
    chartType: 'line',
 
   showXAxis: true,
    chartData:{
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [15, 18, 30, 30, 26, 80, 28],
    },
  },
  {
    title: 'Income',
    value: '$6,200',
    change: '40.9%',
    chartType: 'line',
   
  showXAxis: true,
    chartData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [15, 18, 22, 30, 26, 32, 28],
    },
  },
  {
    title: 'Conversion Rate',
    value: '2.49',
    change: '94.7%',
    chartType: 'doughnut',
    chartData: {
      labels: ['Direct', 'Social', 'Referral', 'Email', 'Organic'],
      values: [35, 25, 20, 12, 8],
    },
  },
  {
    title: 'Sessions',
    value: '44K',
    change: '-23.6%',
    chartType: 'bar',
 showXAxis: true,
    chartData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      values: [50, 60, 45, 70, 55, 40, 30],
    },
  },


];



const socialData = [
  {
    icon: FaFacebookF,
    primaryValue: '89K',
    primaryLabel: 'FRIENDS',
    secondaryValue: '459',
    secondaryLabel: 'FEEDS',
  },
  {
    icon: FaTwitter,
    primaryValue: '973K',
    primaryLabel: 'FOLLOWERS',
    secondaryValue: '1,792',
    secondaryLabel: 'TWEETS',
  },
  {
    icon: FaLinkedinIn,
    primaryValue: '500',
    primaryLabel: 'CONTACTS',
    secondaryValue: '1,292',
    secondaryLabel: 'FEEDS',
  },
  {
    icon: FaCalendarAlt,
    primaryValue: '12+',
    primaryLabel: 'EVENTS',
    secondaryValue: '4',
    secondaryLabel: 'MEETINGS',
  },

];

const ChartDashboard = () => {
  return (
    <Box sx={{ p: 3, backgroundColor: '#ffffff', minHeight: '100vh' }}>
      <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: "24px" ,alignItems: "center"}}>
        {/* Main container */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
          gap: "24px",
          justifyContent: 'center' 
        }}>
          {metricData.map((metric, idx) => (
            <ValueComponent
              key={idx}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              chartType={metric.chartType}
            

    showXAxis={metric.showXAxis}
              chartData={metric.chartData}
              MoreIcon={MoreVertIcon}
            />
          ))}
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
          gap: "24px",
          justifyContent: 'center'  
        }}>
          {socialData.map((social, idx) => (
            <SocialMediaGraph
              key={idx}
              IconComponent={social.icon}
              primarytxt={social.primaryValue}
              primaryUnit={social.primaryLabel}
              secondarytxt={social.secondaryValue}
              secondaryUnit={social.secondaryLabel}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ChartDashboard;