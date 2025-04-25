# Job Tracking Frontend

A modern, responsive React application for tracking job applications. Built with Vite and Material-UI, this application provides an intuitive interface for managing your job search process effectively.

Looking for the **backend repository**? Find it here:  
[Job Tracking Backend Repository](https://github.com/snehalsaurabh/JobTracker-Server)

---

## Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Setup](#environment-setup)
  - [Development](#development)
- [Application Structure](#application-structure)
- [Key Components](#key-components)
- [Contributing](#contributing)

---

## Overview

The Job Tracking Frontend provides a user-friendly interface for:
- Managing job applications in one centralized location
- Tracking application statuses (Applied, Interview, Offer, Rejected)
- Filtering and searching through applications
- Viewing application statistics and insights

---

## Features

- 📊 **Dashboard Overview**: Visual representation of application statistics
- 📝 **Application Management**: Add, edit, and delete job applications
- 🔍 **Search & Filter**: Find applications by company, role, or status
- 📈 **Status Tracking**: Monitor application progress
- 📱 **Responsive Design**: Seamless experience across all devices
- 🎨 **Material Design**: Modern and intuitive user interface

---

## Tech Stack

- **React 18**: Frontend framework
- **Vite**: Build tool and development server
- **Material-UI**: Component library
- **Axios**: HTTP client
- **date-fns**: Date manipulation
- **React Router**: Navigation
- **Context API**: State management

---

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Access to the backend API

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/job-tracking-frontend.git
cd job-tracking-frontend
```

2. Install dependencies:
```bash
npm install
```

### Environment Setup

Create a `.env` file in the root directory:
```properties
VITE_API_URL=http://localhost:5000/api
```

### Development

1. Start the development server:
```bash
npm run dev
```

2. Build for production:
```bash
npm run build
```

3. Preview production build:
```bash
npm run preview
```

---

## Application Structure

```
frontend/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── JobForm/      # Job application form
│   │   ├── JobList/      # List of job applications
│   │   ├── JobStats/     # Statistics dashboard
│   │   └── JobFilters/   # Search and filter controls
│   ├── contexts/         # React Context providers
│   ├── hooks/            # Custom React hooks
│   ├── utils/            # Helper functions
│   ├── App.jsx          # Root component
│   └── main.jsx         # Entry point
├── public/              # Static assets
└── index.html          # HTML template
```

---

## Key Components

### JobTracker
The main component that orchestrates the application's functionality:
- Manages state for job applications
- Handles API communication
- Controls filtering and sorting

### JobStats
Displays visual statistics about your job applications:
- Total applications
- Applications by status
- Success rate
- Interview conversion rate

### JobForm
A form component for adding/editing job applications:
- Company details
- Role information
- Application status
- Notes and links

### JobList
Displays job applications in a responsive grid:
- Status indicators
- Quick actions
- Sorting capabilities
- Search functionality

---

## Contributing

We welcome contributions! Here's how you can help:

1. Fork the repository
2. Create your feature branch:
```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes:
```bash
git commit -m 'Add amazing feature'
```

4. Push to the branch:
```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request

---

For questions or support, please open an issue in the repository.