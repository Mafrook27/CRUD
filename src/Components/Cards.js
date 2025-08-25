
import { Card, CardContent, Typography, Box } from "@mui/material";

const getColor = (perf) => {
  if (perf > 60) return "#4caf50";
  if (perf < 45) return "#f44336"; 
  if (perf >= 46 && perf <= 50) return "#ff9800"; 
  return "#2196f3";
};

export default function Cards({ name, salary, performance }) {
  const color = getColor(performance);

  return (
    <Card
      elevation={4}
      sx={{
        borderRadius: 2,
        borderLeft: `6px solid ${color}`,
        p: 2,
        transition: "transform 0.2s",
        '&:hover': {
          transform: "translateY(-5px)",
        },
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Salary: ₹{salary}
        </Typography>
        <Box sx={{ mt: 1, height: 8, borderRadius: 1, bgcolor: "#e0e0e0" }}>
          <Box
            sx={{
              height: "100%",
              width: `${performance}%`,
              bgcolor: color,
              borderRadius: 1,
            }}
          />
        </Box>
      </CardContent>
    </Card>
  );
}