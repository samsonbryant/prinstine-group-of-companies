import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Determine the dist directory path
const distPath = join(__dirname, 'dist');
const indexPath = join(distPath, 'index.html');

// Check if dist directory exists
if (!existsSync(distPath)) {
  console.error('Error: dist directory not found. Please run "npm run build" first.');
  process.exit(1);
}

// Serve static files from the dist directory
app.use(express.static(distPath));

// Handle all routes by serving index.html (SPA routing)
// This ensures that refreshing on any route works correctly
app.get('*', (req, res) => {
  try {
    if (!existsSync(indexPath)) {
      return res.status(500).send('Error: index.html not found. Please rebuild the application.');
    }
    const indexHtml = readFileSync(indexPath, 'utf-8');
    res.setHeader('Content-Type', 'text/html');
    res.send(indexHtml);
  } catch (error) {
    console.error('Error serving index.html:', error);
    res.status(500).send('Error loading the application');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Serving static files from: ${distPath}`);
});

