import { Box } from '@mui/material';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaCalendarAlt } from 'react-icons/fa';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ValueComponent from './ValueComponent';
import SocialMediaGraph from './SocialMediaGraph';
import "./Css/nav.css";

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

  
 {
    title: 'Traffic by Device',
    value: '65K',
    change: '12.3%',
    chartType: 'bar',
    barOrientation: 'horizontal', 
    showXAxis: true,
    chartData: {
      labels: ["Mon", "Tue", "Wed"],
      datasets: [
        { label: "Mobile", data: [10, 20, 30], backgroundColor: "#10B981" },
        { label: "Desktop", data: [5, 15, 25], backgroundColor: "#3B82F6" }
      ]
    }
  },
   
   {
    title: 'Device Performance (Vertical)',
    value: '85K',
    change: '18.4%',
    chartType: 'bar',
    barOrientation: 'vertical',
    showXAxis: true,
    chartData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        { label: "Mobile", data: [25, 35, 30, 40, 45], backgroundColor: "#10B981" },
        { label: "Desktop", data: [20, 25, 35, 30, 40], backgroundColor: "#3B82F6" },
        { label: "Tablet", data: [10, 15, 12, 18, 22], backgroundColor: "#F59E0B" }
      ]
    }
  },

 
  {
    title: 'Device Performance (Horizontal)',
    value: '92K',
    change: '22.1%',
    chartType: 'bar',
    barOrientation: 'horizontal',
    showXAxis: true,
    chartData: {
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
      datasets: [
        { label: "Mobile", data: [25, 35,40, 45], backgroundColor: "#10B981" },
        { label: "Desktop", data: [20, 25, 35, 30, 40], backgroundColor: "#3B82F6" },
        { label: "Tablet", data: [10, 15, 12, 18, 22], backgroundColor: "#F59E0B" }
      ]
    }
  }






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
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 },pt:{xs:2,sm:2}, backgroundColor: '#ffffff', minHeight: '100vh' }} className="page">
  <Box sx={{ maxWidth: '1200px', mx: 'auto', display: 'flex', flexDirection: 'column', gap: "24px" ,alignItems: "center"}}>
        {/* Main container */}
        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
          gap: { xs: "12px", sm: "16px", md: "24px" }, 
          justifyContent: 'center' 
        }}>
          {metricData.map((metric, idx) => (
            <ValueComponent
              key={idx}
              title={metric.title}
              value={metric.value}
              change={metric.change}
              chartType={metric.chartType}
                 barOrientation={metric.barOrientation}
            

    showXAxis={metric.showXAxis}
              chartData={metric.chartData}
              MoreIcon={MoreVertIcon}
            />
          ))}
        </Box>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
           gap: { xs: "12px", sm: "16px", md: "24px" }, 
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