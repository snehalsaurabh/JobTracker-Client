"use client"

import { useState, useEffect, useCallback } from "react"
import { Box, Typography, Alert, AlertTitle, Button, Tabs, Tab, Snackbar, Paper } from "@mui/material"
import { JobForm } from "./JobForm"
import { JobList } from "./JobList"
import { JobFilters } from "./JobFilters"
import { JobStats } from "./JobStats"
import axios from "axios"
import RefreshIcon from "@mui/icons-material/Refresh"

// Define the API URL from environment variable with fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
// Sample mock data for when the API is unavailable
const MOCK_JOBS = [
  {
    _id: "mock1",
    company: "Example Corp",
    role: "Frontend Developer",
    status: "Applied",
    dateApplied: new Date().toISOString(),
    link: "https://example.com/job",
    notes: "This is mock data shown when the API is unavailable.",
  },
  {
    _id: "mock2",
    company: "Tech Solutions",
    role: "React Developer",
    status: "Interview",
    dateApplied: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    link: "https://techsolutions.com/careers",
    notes: "Second round interview scheduled.",
  },
]

export default function JobTracker() {
  const [jobs, setJobs] = useState([])
  const [filteredJobs, setFilteredJobs] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [useMockData, setUseMockData] = useState(false)
  const [tabValue, setTabValue] = useState(0)

  // Toast state
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  })

  // Handle toast close
  const handleCloseToast = () => {
    setToast({ ...toast, open: false });
  };

  // Show toast message
  const showToast = (message, severity = "success") => {
    setToast({
      open: true,
      message,
      severity,
    })
  }

  // Fetch all jobs
  const fetchJobs = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await api.get('/jobs');
      setJobs(response.data);
      setFilteredJobs(response.data);
      setUseMockData(false);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      showToast("Could not fetch your job applications", "error");
      setJobs(MOCK_JOBS);
      setFilteredJobs(MOCK_JOBS);
      setUseMockData(true);
    } finally {
      setIsLoading(false);
    }
  }, []); // Add an empty dependency array here

  // Add a new job
  const addJob = async (job) => {
    try {
      const response = await api.post('/jobs', job);
      setJobs([...jobs, response.data]);
      setFilteredJobs([...jobs, response.data]);
      showToast("Job application added successfully");
      return true;
    } catch (error) {
      console.error("Error adding job:", error);
      showToast("Could not add your job application", "error");
      return false;
    }
  };

  // Update a job
  const updateJob = async (id, updatedJob) => {
    if (useMockData) {
      // If using mock data, just update the local state
      const updatedJobs = jobs.map((job) => (job._id === id ? { ...job, ...updatedJob } : job))
      setJobs(updatedJobs)
      setFilteredJobs(filteredJobs.map((job) => (job._id === id ? { ...job, ...updatedJob } : job)))
      showToast("Job application updated successfully")
      return true
    }

    try {
      await axios.put(`${API_URL}/jobs/${id}`, updatedJob)
      const updatedJobs = jobs.map((job) => (job._id === id ? { ...job, ...updatedJob } : job))
      setJobs(updatedJobs)
      setFilteredJobs(filteredJobs.map((job) => (job._id === id ? { ...job, ...updatedJob } : job)))
      showToast("Job application updated successfully")
      return true
    } catch (error) {
      console.error("Error updating job:", error)
      showToast("Could not update your job application", "error")
      return false
    }
  }

  // Delete a job
  const deleteJob = async (id) => {
    if (useMockData) {
      const updatedJobs = jobs.filter((job) => job._id !== id);
      setJobs(updatedJobs);
      setFilteredJobs(filteredJobs.filter((job) => job._id !== id));
      showToast("Job application deleted successfully");
      return;
    }
  
    try {
      await axios.delete(`${API_URL}/jobs/${id}`);
      const updatedJobs = jobs.filter((job) => job._id !== id);
      setJobs(updatedJobs);
      setFilteredJobs(filteredJobs.filter((job) => job._id !== id));
      showToast("Job application deleted successfully");
    } catch (error) {
      console.error("Error deleting job:", error);
      showToast("Could not delete your job application", "error");
    }
  };

  // Apply filters
  const applyFilters = (statusFilter, dateRange) => {
    let filtered = [...jobs];
  
    // Filter by status
    if (statusFilter.length > 0) {
      filtered = filtered.filter((job) => statusFilter.includes(job.status));
    }
  
    // Filter by date range
    if (dateRange[0] && dateRange[1]) {
      const startDate = new Date(dateRange[0]);
      const endDate = new Date(dateRange[1]);
  
      filtered = filtered.filter((job) => {
        const jobDate = new Date(job.dateApplied);
        return jobDate >= startDate && jobDate <= endDate;
      });
    }
  
    setFilteredJobs(filtered);
  };

  // Reset filters
  const resetFilters = () => {
    setFilteredJobs(jobs);
  };

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Load jobs on component mount
  useEffect(() => {
    fetchJobs()
  }, [fetchJobs])

  // Function to retry API connection
  const retryConnection = () => {
    setUseMockData(false)
    fetchJobs()
  }

  return (
    <Box>
      <Snackbar
        open={toast.open}
        autoHideDuration={6000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseToast} severity={toast.severity} sx={{ width: "100%" }}>
          {toast.message}
        </Alert>
      </Snackbar>

      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Student Job Tracker
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
          Keep track of all your job applications in one place. Add new applications, update their status, and filter to
          find what you need.
        </Typography>
      </Box>

      {useMockData && (
        <Alert
          severity="warning"
          sx={{ mb: 4 }}
          action={
            <Button color="inherit" size="small" startIcon={<RefreshIcon />} onClick={retryConnection}>
              Retry
            </Button>
          }
        >
          <AlertTitle>Using mock data</AlertTitle>
          Could not connect to the backend API. Currently displaying mock data.
        </Alert>
      )}

      <JobStats jobs={jobs} />

      <Box sx={{ mt: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="job tracker tabs">
            <Tab label="View Applications" id="tab-0" />
            <Tab label="Add Application" id="tab-1" />
          </Tabs>
        </Box>

        <Box role="tabpanel" hidden={tabValue !== 0} id="tabpanel-0" sx={{ py: 3 }}>
          {tabValue === 0 && (
            <Paper elevation={2} sx={{ p: 3 }}>
              <JobFilters onApplyFilters={applyFilters} onResetFilters={resetFilters} />
              <JobList jobs={filteredJobs} isLoading={isLoading} onUpdateJob={updateJob} onDeleteJob={deleteJob} />
            </Paper>
          )}
        </Box>

        <Box role="tabpanel" hidden={tabValue !== 1} id="tabpanel-1" sx={{ py: 3 }}>
          {tabValue === 1 && (
            <Paper elevation={2} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
              <Typography variant="h5" component="h2" gutterBottom>
                Add New Application
              </Typography>
              <JobForm onSubmit={addJob} />
            </Paper>
          )}
        </Box>
      </Box>
    </Box>
  )
}
