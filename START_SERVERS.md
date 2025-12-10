# Starting the Servers

## Quick Start

### Option 1: Start Both Servers Manually

**Terminal 1 - Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Frontend:**
```bash
cd prinstine-website
npm run dev
```

### Option 2: Use the Start Script

You can create a simple script to start both servers:

```bash
# Start backend in background
cd backend && npm start &

# Start frontend
cd prinstine-website && npm run dev
```

## Server URLs

- **Frontend**: http://localhost:3007
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

## Verify Servers are Running

Check if servers are running:
```bash
# Check backend
lsof -ti:5000

# Check frontend
lsof -ti:3007
```

## Troubleshooting

### Port Already in Use
If you get a "port already in use" error:
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Kill process on port 3007
lsof -ti:3007 | xargs kill -9
```

### Database Issues
The SQLite database (`prinstine.db`) is created automatically when you start the backend server. If you need to reset it, delete the `backend/prinstine.db` file and restart the server.

## Development Notes

- Backend must be running before frontend can make API calls
- Frontend proxy is configured to route `/api/*` requests to backend
- Database is initialized with sample data on first run
- Hot reload is enabled for both frontend and backend (with nodemon)

