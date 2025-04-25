"use client"

import { useState } from "react"
import {
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Box,
  Divider,
  Link,
} from "@mui/material"
import EditIcon from "@mui/icons-material/Edit"
import DeleteIcon from "@mui/icons-material/Delete"
import MoreVertIcon from "@mui/icons-material/MoreVert"
import CalendarTodayIcon from "@mui/icons-material/CalendarToday"
import OpenInNewIcon from "@mui/icons-material/OpenInNew"
import { format } from "date-fns"
import { JobForm } from "./JobForm"

export function JobList({ jobs, isLoading, onUpdateJob, onDeleteJob }) {
  const [editingJob, setEditingJob] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [jobToDelete, setJobToDelete] = useState(null)
  const [isAlertOpen, setIsAlertOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)
  const [selectedJobId, setSelectedJobId] = useState(null)

  const handleMenuOpen = (event, jobId) => {
    setAnchorEl(event.currentTarget)
    setSelectedJobId(jobId)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    setSelectedJobId(null)
  }

  const handleStatusUpdate = async (id, newStatus) => {
    await onUpdateJob(id, { status: newStatus })
    handleMenuClose()
  }

  const handleEdit = (job) => {
    setEditingJob(job)
    setIsDialogOpen(true)
    handleMenuClose()
  }

  const handleDelete = (id) => {
    setJobToDelete(id)
    setIsAlertOpen(true)
    handleMenuClose()
  }

  const confirmDelete = async () => {
    if (jobToDelete) {
      await onDeleteJob(jobToDelete)
      setJobToDelete(null)
    }
    setIsAlertOpen(false)
  }

  const handleUpdateSubmit = async (data) => {
    if (editingJob) {
      const success = await onUpdateJob(editingJob._id, data)
      if (success) {
        setIsDialogOpen(false)
        setEditingJob(null)
      }
      return success
    }
    return false
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Applied":
        return "primary"
      case "Interview":
        return "secondary"
      case "Offer":
        return "success"
      case "Rejected":
        return "error"
      default:
        return "default"
    }
  }

  if (isLoading) {
    return (
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {[...Array(6)].map((_, i) => (
          <Grid item xs={12} sm={6} md={4} key={i}>
            <Card>
              <CardContent>
                <Skeleton variant="text" width="70%" height={40} />
                <Skeleton variant="text" width="50%" />
                <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
                  <Skeleton variant="circular" width={20} height={20} sx={{ mr: 1 }} />
                  <Skeleton variant="text" width="60%" />
                </Box>
                <Skeleton variant="rounded" width={100} height={30} />
              </CardContent>
              <CardActions>
                <Skeleton variant="rounded" width={100} height={36} />
                <Skeleton variant="rounded" width={80} height={36} sx={{ ml: 1 }} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    )
  }

  if (jobs.length === 0) {
    return (
      <Box sx={{ textAlign: "center", py: 6 }}>
        <Typography variant="h6" gutterBottom>
          No job applications found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Start by adding your first job application using the "Add Application" tab.
        </Typography>
      </Box>
    )
  }

  return (
    <>
      <Grid container spacing={3} sx={{ mt: 2 }}>
        {jobs.map((job) => (
          <Grid item xs={12} sm={6} md={4} key={job._id}>
            <Card variant="outlined" sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <Box>
                    <Typography variant="h6" component="div" noWrap>
                      {job.company}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                      {job.role}
                    </Typography>
                  </Box>
                  <IconButton size="small" onClick={(e) => handleMenuOpen(e, job._id)} aria-label="job options">
                    <MoreVertIcon />
                  </IconButton>
                </Box>

                <Box sx={{ display: "flex", alignItems: "center", mt: 2, mb: 2 }}>
                  <CalendarTodayIcon fontSize="small" sx={{ mr: 1, color: "text.secondary" }} />
                  <Typography variant="body2" color="text.secondary">
                    Applied on {format(new Date(job.dateApplied), "MMM d, yyyy")}
                  </Typography>
                </Box>

                <Chip label={job.status} color={getStatusColor(job.status)} size="small" sx={{ fontWeight: 500 }} />

                {job.notes && (
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mt: 2,
                      display: "-webkit-box",
                      overflow: "hidden",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 2,
                    }}
                  >
                    {job.notes}
                  </Typography>
                )}
              </CardContent>

              <Divider />

              <CardActions sx={{ justifyContent: "space-between" }}>
                <Button size="small" startIcon={<EditIcon />} onClick={() => handleEdit(job)}>
                  Edit
                </Button>

                {job.link && (
                  <Button
                    size="small"
                    endIcon={<OpenInNewIcon />}
                    component={Link}
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Link
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
        <MenuItem disabled>
          <Typography variant="subtitle2">Change Status</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => handleStatusUpdate(selectedJobId, "Applied")}>Applied</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(selectedJobId, "Interview")}>Interview</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(selectedJobId, "Offer")}>Offer</MenuItem>
        <MenuItem onClick={() => handleStatusUpdate(selectedJobId, "Rejected")}>Rejected</MenuItem>
        <Divider />
        <MenuItem onClick={() => handleEdit(jobs.find((job) => job._id === selectedJobId))}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} /> Edit
        </MenuItem>
        <MenuItem onClick={() => handleDelete(selectedJobId)} sx={{ color: "error.main" }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} /> Delete
        </MenuItem>
      </Menu>

      <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} fullWidth maxWidth="md">
        <DialogTitle>Edit Job Application</DialogTitle>
        <DialogContent>
          {editingJob && (
            <JobForm
              onSubmit={handleUpdateSubmit}
              initialData={{
                company: editingJob.company,
                role: editingJob.role,
                status: editingJob.status,
                dateApplied: new Date(editingJob.dateApplied),
                link: editingJob.link,
                notes: editingJob.notes || "",
              }}
              isEditing={true}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={isAlertOpen} onClose={() => setIsAlertOpen(false)}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <Typography>This will permanently delete this job application. This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsAlertOpen(false)}>Cancel</Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
