import { Card, CardContent, Typography, Box, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import { FiArrowUp as Up, FiArrowDown as Down } from "react-icons/fi";
import { Line, Bar, Pie, Doughnut, PolarArea } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale
);

// Styled Card
const ValueComponentStyled = styled(Card)(({ theme }) => ({
  backgroundColor: "#ffffff",
  color: theme.palette.text.primary,
  padding: theme.spacing(2),
  borderRadius: theme.spacing(1.5),
  height: "200px",
  width: "280px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  boxShadow: theme.shadows[3],
}));

const ValueComponent = ({
  title,
  value,
  change,
  MoreIcon,
  chartData,
  chartType,
  showXAxis = true,
  pieRadius = "90%",
  doughnutCutout = "60%",
}) => {
  // Determine if change is negative for color logic
  const isNegative = Number(change?.replace("%", "") || 0) < 0;
  const chartColor = isNegative ? "#EF4444" : "#10B981";

  // Check if the chart type is circular
  const isCircular = ["pie", "doughnut", "polarArea"].includes(chartType);

  // Prepare chart data
  const data = isCircular
    ? {
        labels: chartData?.labels || [],
        datasets: [
          {
            data: chartData?.values || [],
            backgroundColor: ["#10B981", "#3B82F6", "#F59E0B", "#EF4444"],
            borderWidth: 1,
          },
        ],
      }
    : {
        labels: chartData?.labels || [],
        datasets: [
          {
            label: title,
            data: chartData?.values || [],
            borderColor: "#1976D2", 
            backgroundColor: chartType === "bar" ? "#1976D2" : "#1976D233", // Solid for bar, translucent for others
            fill: chartType === "line",
            tension: chartType === "line" ? 0.4 : 0,
            pointRadius: 1,
          },
        ],
      };

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true },
    },
    scales: isCircular
      ? {}
      : {
          x: {
            display: showXAxis,
            grid: { display: false },
          },
          y: {
            display: false,
            grid: { display: false },
          },
        },
    radius: pieRadius,
    cutout: chartType === "doughnut" ? doughnutCutout : undefined,
    animation: false,
  };

  const renderChart = () => {
    if (
      !chartData ||
      !chartData.values ||
      !Array.isArray(chartData.values) ||
      chartData.values.length === 0
    ) {
      return (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="110px"
          sx={{ opacity: 0.6 }}
        >
          <Typography variant="body2" color="text.primary" textAlign="center">
            No data available
          </Typography>
        </Box>
      );
    }

    try {
      switch (chartType) {
        case "bar":
          return <Bar data={data} options={options} />;
        case "pie":
          return <Pie data={data} options={options} />;
        case "doughnut":
          return <Doughnut data={data} options={options} />;
        case "polarArea":
          return <PolarArea data={data} options={options} />;
        case "line":
        default:
          return <Line data={data} options={options} />;
      }
    } catch (err) {
      console.error("Chart rendering error:", err);
      return (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="110px"
          sx={{ opacity: 0.6 }}
        >
          <Typography variant="body2" color="text.primary">
            Failed to load chart
          </Typography>
        </Box>
      );
    }
  };

  return (
    <Box>
      <ValueComponentStyled>
        <CardContent
          sx={{
            padding: 0,
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Value + Change */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Box>
              <Box display="flex" alignItems="center" gap={1} mb={0.5}>
                <Typography
                  component="h6"
                  variant="h6"
                  fontWeight="bold"
                  aria-label={`Value: ${value || 0}`}
                >
                  {value || 0}
                </Typography>
                <Typography
                  component="span"
                  variant="caption"
                  sx={{
                    color: chartColor,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                  }}
                  aria-label={`Change: ${change || "0%"}`}
                >
                  ({change || "0%"}
                  <span style={{ marginBottom: 2 }}>
                    {isNegative ? <Down size={15} /> : <Up size={15} />}
                  </span>
                  )
                </Typography>
              </Box>
              <Typography
                component="p"
                variant="body2"
                sx={{ opacity: 0.8 }}
                aria-label={`Title: ${title}||"title"`}
              >
                {title}
              </Typography>
            </Box>
            <IconButton
              size="small"
              sx={{ color: "text.primary", opacity: 0.6 }}
              aria-label="More options"
            >
              <MoreIcon size={16} />
            </IconButton>
          </Box>

          {/* Chart */}
          <Box
            className="chrt-Container"
            sx={{
              mt: 1,
              overflow: "hidden",
              width: "100%",
              height: "110px",
            }}
          >
            {renderChart()}
          </Box>
        </CardContent>
      </ValueComponentStyled>
    </Box>
  );
};

export default ValueComponent;
