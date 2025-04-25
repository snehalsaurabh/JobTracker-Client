import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"
import Container from "@mui/material/Container"
import JobTracker from "./components/JobTracker"

// Create a custom theme (optional - you can customize colors)
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Normalizes CSS */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <JobTracker />
      </Container>
    </ThemeProvider>
  )
}

export default App
