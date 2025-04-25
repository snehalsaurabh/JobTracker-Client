"use client"

import { useState } from "react"
import {
  Box,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  Divider,
} from "@mui/material"
import { DatePicker } from "@mui/x-date-pickers/DatePicker"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore"
import FilterListIcon from "@mui/icons-material/FilterList"

export function JobFilters({ onApplyFilters, onResetFilters }) {
  const [statusFilter, setStatusFilter] = useState([])
  const [dateRange, setDateRange] = useState([null, null])
  const [expanded, setExpanded] = useState(false)

  const handleAccordionChange = (event, isExpanded) => {
    setExpanded(isExpanded)
  }

  const handleStatusChange = (status) => {
    setStatusFilter((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status)
      } else {
        return [...prev, status]
      }
    })
  }

  const handleStartDateChange = (newDate) => {
    setDateRange([newDate, dateRange[1]])
  }

  const handleEndDateChange = (newDate) => {
    setDateRange([dateRange[0], newDate])
  }

  const handleApplyFilters = () => {
    onApplyFilters(statusFilter, dateRange)
  }

  const handleResetFilters = () => {
    setStatusFilter([])
    setDateRange([null, null])
    onResetFilters()
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Accordion expanded={expanded} onChange={handleAccordionChange}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="filter-panel-content" id="filter-panel-header">
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <FilterListIcon sx={{ mr: 1 }} />
            <Typography>Filter Applications</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Filter by Status
              </Typography>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusFilter.includes("Applied")}
                      onChange={() => handleStatusChange("Applied")}
                    />
                  }
                  label="Applied"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusFilter.includes("Interview")}
                      onChange={() => handleStatusChange("Interview")}
                    />
                  }
                  label="Interview"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={statusFilter.includes("Offer")} onChange={() => handleStatusChange("Offer")} />
                  }
                  label="Offer"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={statusFilter.includes("Rejected")}
                      onChange={() => handleStatusChange("Rejected")}
                    />
                  }
                  label="Rejected"
                />
              </FormGroup>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>
                Filter by Date Range
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <DatePicker
                  label="Start Date"
                  value={dateRange[0]}
                  onChange={handleStartDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                    },
                  }}
                />
                <DatePicker
                  label="End Date"
                  value={dateRange[1]}
                  onChange={handleEndDateChange}
                  slotProps={{
                    textField: {
                      fullWidth: true,
                      size: "small",
                    },
                  }}
                />
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 3 }} />

          <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
            <Button variant="outlined" onClick={handleResetFilters}>
              Reset Filters
            </Button>
            <Button variant="contained" onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
    </LocalizationProvider>
  )
}
