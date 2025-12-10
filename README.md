# Prinstine Group of Companies Website

A modern, full-stack website built with React.js, Tailwind CSS, Framer Motion, and SQLite.

## Features

- ✅ Single Page Application (SPA) with React Router
- ✅ Modern UI with Tailwind CSS
- ✅ Smooth animations with Framer Motion
- ✅ Dark mode support
- ✅ Responsive design (mobile-first)
- ✅ Certificate verification system
- ✅ Contact form with backend integration
- ✅ Bank details display
- ✅ Partnership inquiry form

## Tech Stack

### Frontend
- React.js 19
- Vite (build tool)
- React Router DOM
- Tailwind CSS
- Framer Motion
- jQuery
- Axios

### Backend
- Node.js
- Express.js
- SQLite3
- CORS
- Body Parser

## Project Structure

```
prinstinegroupofcompanies/
├── prinstine-website/     # Frontend React app
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── pages/        # Page components
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # Entry point
│   └── package.json
├── backend/              # Backend server
│   ├── index.js         # Express server
│   └── package.json
└── README.md
```

## Setup Instructions

### 1. Install Frontend Dependencies

```bash
cd prinstine-website
npm install
```

### 2. Install Backend Dependencies

```bash
cd ../backend
npm install
```

### 3. Start Backend Server

```bash
cd backend
npm start
```

The backend server will run on `http://localhost:5000`

### 4. Start Frontend Development Server

In a new terminal:

```bash
cd prinstine-website
npm run dev
```

The frontend will run on `http://localhost:3000`

## API Endpoints

- `GET /api/health` - Health check
- `GET /api/bank-details` - Get bank details
- `POST /api/inquiries` - Submit inquiry form
- `POST /api/verify-certificate` - Verify certificate

## Database Schema

The SQLite database (`prinstine.db`) includes:

- **certificates** - Certificate verification data
- **inquiries** - Contact form submissions
- **bank_details** - Bank account information

## Pages

1. **Home** (`/`) - Hero, subsidiaries, CEO spotlight, core values, contact form
2. **About** (`/about`) - Company story, subsidiaries details, CEO bio, timeline
3. **Services** (`/services`) - Tabbed services for Consults, Academy, Microfinance
4. **What We Do** (`/what-we-do`) - Integrated services, statistics, testimonials
5. **Partners** (`/partners`) - Partner showcase, partnership inquiry form
6. **Bank Details** (`/bank-details`) - Display bank account information
7. **Certificate Verification** (`/certificate-verification`) - Verify certificate authenticity

## Environment

- Frontend: Port 3000
- Backend: Port 5000
- Database: SQLite (prinstine.db)

## Build for Production

### Frontend
```bash
cd prinstine-website
npm run build
```

### Backend
The backend runs with Node.js directly. For production, consider using PM2 or similar process manager.

## Notes

- Dark mode preference is saved in localStorage
- Sample certificates are pre-populated in the database
- All forms include validation
- Responsive design works on all screen sizes
- Animations are optimized for performance

## Deployment

This project is configured for deployment on Render.

### Quick Deploy

See **[RENDER_DEPLOYMENT.md](./RENDER_DEPLOYMENT.md)** for detailed step-by-step instructions.

**Quick Summary:**
1. Deploy **Backend** as a **Web Service** (Root: `backend`, Build: `npm ci`, Start: `npm start`)
2. Deploy **Frontend** as a **Static Site** (Root: `prinstine-website`, Build: `npm ci && npm run build`, Publish: `prinstine-website/dist`)
3. Set `VITE_API_BASE` environment variable in frontend to your backend URL
4. Configure custom domain `prinstinegroup.org` in Render

### Render Blueprint

You can use the included `render.yaml` file for automated deployment, or configure manually using the guide above.

## License

© 2025 Prinstine Group of Companies. All rights reserved.

# prinstine-group-of-companies
