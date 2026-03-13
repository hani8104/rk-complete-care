# RK - The Complete Care Physiotherapy Centre

A professional healthcare management system for RK Physiotherapy Centre, featuring a patient-facing booking system and an administrative dashboard.

## Project Structure

```
rk-complete-care/
├── client/          # frontend React application (Vite)
├── server/          # backend Express API (Node.js)
├── .gitignore       # root level git ignore
└── README.md        # project documentation
```

## Tech Stack

- **Frontend**: React.js, Vite, Framer Motion, Axios
- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Styling**: Vanilla CSS, Tailwind CSS (for newer components)

## Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB (running locally or via Atlas)

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install root dependencies (if any)
   npm install
   
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies
   cd ../server
   npm install
   ```

### Running the App

1. **Start the Server**:
   ```bash
   cd server
   npm start
   ```
   The server runs on `http://localhost:5001`.

2. **Start the Client**:
   ```bash
   cd client
   npm run dev
   ```
   The application will be available at `http://localhost:5173`.

## Features
- Online Appointment Booking
- Video Consultation Support
- WhatsApp Notifications
- Admin Dashboard for appointment management
- Dynamic Banner and Testimonial management
