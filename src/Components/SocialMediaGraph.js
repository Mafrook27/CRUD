import { Card, Typography, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';

const SocialMediaGraphStyled = styled(Card)(({ theme }) => ({
  backgroundColor: '#ffffff',
  color: theme.palette.text.primary,
  padding: 0, 
  borderRadius: theme.spacing(0.5),
  height: '180px',
  width:"280px",
  display: 'flex',
  flexDirection: 'column',
  boxShadow: theme.shadows[3],
}));



const SocialMediaGraph = ({ IconComponent, primarytxt, primaryUnit, secondarytxt, secondaryUnit }) => {
  return (
    <SocialMediaGraphStyled>
 
      <Box
        flex={1}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{ backgroundColor: '#e0e0e0',padding:'20px', }}
      >

          <IconComponent size={40} color="black" />

      </Box>
      
 
      <Box 
        display="flex" 
        alignItems="center" 
        justifyContent="space-between"
        sx={{ padding: '16px' }} 
      >
        <Box textAlign="center" flex={1}>
          <Typography variant="h6" fontWeight="bold">{primarytxt}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.75, textTransform: 'uppercase' }}>
            {primaryUnit}
          </Typography>
        </Box>
        
        <Divider
          orientation="vertical"
          flexItem
          sx={{
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            width: '1px',
            height: '40px',
            mx: 1
          }}
        />
        
        <Box textAlign="center" flex={1}>
          <Typography variant="h6" fontWeight="bold">{secondarytxt}</Typography>
          <Typography variant="caption" sx={{ opacity: 0.75, textTransform: 'uppercase' }}>
            {secondaryUnit}
          </Typography>
        </Box>
      </Box>
    </SocialMediaGraphStyled>
  );
};

export default SocialMediaGraph;