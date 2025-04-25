"use client"

import { useState } from "react"
import { Box, TextField, Button, Grid, MenuItem, FormControl, InputLabel, Select, InputAdornment } from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import LinkIcon from "@mui/icons-material/Link"

export function JobForm({ onSubmit, initialData, isEditing = false }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    company: initialData?.company || "",
    role: initialData?.role || "",
    status: initialData?.status || "Applied",
    dateApplied: initialData?.dateApplied ? new Date(initialData.dateApplied) : new Date(),
    link: initialData?.link || "",
    notes: initialData?.notes || "",
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      })
    }
  }

  const handleDateChange = (newDate) => {
    setFormData({
      ...formData,
      dateApplied: newDate,
    })
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.company.trim()) {
      newErrors.company = "Company name is required"
    }

    if (!formData.role.trim()) {
      newErrors.role = "Job role is required"
    }

    if (formData.link && !isValidUrl(formData.link)) {
      newErrors.link = "Please enter a valid URL"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const isValidUrl = (string) => {
    if (!string.trim()) return true // Empty strings are valid (optional field)
    try {
      new URL(string)
      return true
    } catch {
      return false
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Format the date to ISO string for the API
    const formattedData = {
      ...formData,
      dateApplied: formData.dateApplied.toISOString(),
    }

    const success = await onSubmit(formattedData)
    if (success && !isEditing) {
      setFormData({
        company: "",
        role: "",
        status: "Applied",
        dateApplied: new Date(),
        link: "",
        notes: "",
      })
    }
    setIsSubmitting(false)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="company"
              name="company"
              label="Company"
              value={formData.company}
              onChange={handleChange}
              error={!!errors.company}
              helperText={errors.company}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              required
              fullWidth
              id="role"
              name="role"
              label="Role"
              value={formData.role}
              onChange={handleChange}
              error={!!errors.role}
              helperText={errors.role}
              variant="outlined"
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel id="status-label">Status</InputLabel>
              <Select
                labelId="status-label"
                id="status"
                name="status"
                value={formData.status}
                label="Status"
                onChange={handleChange}
              >
                <MenuItem value="Applied">Applied</MenuItem>
                <MenuItem value="Interview">Interview</MenuItem>
                <MenuItem value="Offer">Offer</MenuItem>
                <MenuItem value="Rejected">Rejected</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={6}>
            <DatePicker
              label="Date Applied"
              value={formData.dateApplied}
              onChange={handleDateChange}
              slotProps={{
                textField: {
                  fullWidth: true,
                  variant: "outlined",
                },
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="link"
              name="link"
              label="Application Link"
              value={formData.link}
              onChange={handleChange}
              error={!!errors.link}
              helperText={errors.link || "Link to the job posting or application portal"}
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LinkIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              id="notes"
              name="notes"
              label="Notes"
              value={formData.notes}
              onChange={handleChange}
              multiline
              rows={4}
              variant="outlined"
              placeholder="Add any additional notes about this application"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" fullWidth variant="contained" disabled={isSubmitting} size="large">
              {isSubmitting ? "Saving..." : isEditing ? "Update Application" : "Add Application"}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </LocalizationProvider>
  )
}
