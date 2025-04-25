import { Grid, Paper, Typography, Box, LinearProgress } from "@mui/material";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

export function JobStats({ jobs }) {
  const totalJobs = jobs.length;

  const statusCounts = jobs.reduce((acc, job) => {
    acc[job.status] = (acc[job.status] || 0) + 1;
    return acc;
  }, {});

  const getPercentage = (count) => {
    if (totalJobs === 0) return 0;
    return Math.round((count / totalJobs) * 100);
  };

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Grid 
        container 
        spacing={3} 
        sx={{ 
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'stretch',
          justifyContent: 'space-between',
          width: '100%'
        }}
    >
      {[
        {
          title: "Total Applications",
          count: totalJobs,
          icon: <AssessmentIcon color="action" />,
          color: "primary",
          subtitle: "All job applications"
        },
        {
          title: "Interviews",
          count: statusCounts.Interview || 0,
          icon: <AccessTimeIcon sx={{ color: "secondary.main" }} />,
          color: "secondary",
          showProgress: true
        },
        {
          title: "Offers",
          count: statusCounts.Offer || 0,
          icon: <CheckCircleIcon sx={{ color: "success.main" }} />,
          color: "success",
          showProgress: true
        },
        {
          title: "Rejections",
          count: statusCounts.Rejected || 0,
          icon: <CancelIcon sx={{ color: "error.main" }} />,
          color: "error",
          showProgress: true
        }
      ].map((item) => (
        <Grid 
          key={item.title} 
          item 
          xs={12} 
          sm={6} 
          md={3} 
          sx={{ 
            display: 'flex',
            flex: 1,
          }}
        >
          <Paper
            elevation={1}
            sx={{
              p: 3,
              display: "flex",
              flexDirection: "column",
              width: '100%',
              height: '100%',
              minHeight: 200,
              justifyContent: 'space-between',
              '&:hover': {
                boxShadow: 3,
                transition: 'box-shadow 0.3s ease-in-out'
              }
            }}
          >
            <Box sx={{ 
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: 'center',
              mb: 2 
            }}>
              <Typography 
                variant="subtitle2" 
                color="text.secondary"
                sx={{ 
                  fontSize: '1rem',
                  fontWeight: 500
                }}
              >
                {item.title}
              </Typography>
              {item.icon}
            </Box>
            
            <Typography 
              variant="h4" 
              component="div" 
              sx={{ 
                fontSize: '2.5rem',
                fontWeight: 'bold',
                textAlign: 'center',
                my: 2
              }}
            >
              {item.count}
            </Typography>

            {item.subtitle ? (
              <Typography 
                variant="body2" 
                color="text.secondary" 
                sx={{ 
                  mt: 'auto',
                  textAlign: 'center'
                }}
              >
                {item.subtitle}
              </Typography>
            ) : (
              <Box sx={{ 
                display: "flex", 
                alignItems: "center", 
                mt: 'auto',
                width: '100%'
              }}>
                <Box sx={{ flexGrow: 1, mr: 1 }}>
                  <LinearProgress
                    variant="determinate"
                    value={getPercentage(item.count)}
                    color={item.color}
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Typography 
                  variant="body2" 
                  color="text.secondary"
                  sx={{ minWidth: '40px' }}
                >
                  {getPercentage(item.count)}%
                </Typography>
              </Box>
            )}
          </Paper>
        </Grid>
      ))}
    </Grid>
  </Box>
);
}