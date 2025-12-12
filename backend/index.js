const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN
  ? process.env.CORS_ORIGIN.split(',').map((o) => o.trim())
  : '*';

// Middleware
app.use(cors({
  origin: CORS_ORIGIN,
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Initialize SQLite database with persistent storage
// On Render, use persistent disk path if available, otherwise use current directory
// Render persistent disk is mounted at /opt/render/project/persistent
const persistentDiskPath = process.env.RENDER_PERSISTENT_DISK_PATH || '/opt/render/project/persistent';
const dbDirectory = process.env.NODE_ENV === 'production' && require('fs').existsSync(persistentDiskPath)
  ? persistentDiskPath
  : __dirname;

// Ensure directory exists
if (!fs.existsSync(dbDirectory)) {
  fs.mkdirSync(dbDirectory, { recursive: true });
}

const dbPath = path.join(dbDirectory, 'prinstine.db');
console.log(`📁 Database path: ${dbPath}`);

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('❌ Error opening database:', err.message);
    console.error('Database path attempted:', dbPath);
  } else {
    console.log('✅ Connected to SQLite database');
    console.log(`💾 Database location: ${dbPath}`);
    initializeDatabase();
  }
});

// Initialize database tables
function initializeDatabase() {
  // Certificates table
  db.run(`CREATE TABLE IF NOT EXISTS certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cert_number TEXT UNIQUE NOT NULL,
    holder_name TEXT NOT NULL,
    issue_date DATE NOT NULL,
    expiry_date DATE,
    status TEXT DEFAULT 'valid'
  )`, (err) => {
    if (err) console.error('Error creating certificates table:', err);
  });

  // Inquiries table
  db.run(`CREATE TABLE IF NOT EXISTS inquiries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  )`, (err) => {
    if (err) console.error('Error creating inquiries table:', err);
  });

  // Bank details table
  db.run(`CREATE TABLE IF NOT EXISTS bank_details (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    account_name TEXT NOT NULL,
    bank_name TEXT NOT NULL,
    account_number TEXT NOT NULL,
    swift_code TEXT
  )`, (err) => {
    if (err) console.error('Error creating bank_details table:', err);
    else {
      // Insert sample bank details
      insertSampleBankDetails();
    }
  });

  // Insert sample certificates
  insertSampleCertificates();
}

// Insert sample certificates
function insertSampleCertificates() {
  const certificates = [
    {
      cert_number: 'PGC-2024-001',
      holder_name: 'John Doe',
      issue_date: '2024-01-15',
      expiry_date: '2025-01-15',
      status: 'valid'
    },
    {
      cert_number: 'PGC-2024-002',
      holder_name: 'Jane Smith',
      issue_date: '2024-02-20',
      expiry_date: '2025-02-20',
      status: 'valid'
    },
    {
      cert_number: 'PGC-2024-003',
      holder_name: 'Michael Johnson',
      issue_date: '2024-03-10',
      expiry_date: '2025-03-10',
      status: 'valid'
    }
  ];

  certificates.forEach(cert => {
    db.run(`INSERT OR IGNORE INTO certificates (cert_number, holder_name, issue_date, expiry_date, status) 
            VALUES (?, ?, ?, ?, ?)`,
      [cert.cert_number, cert.holder_name, cert.issue_date, cert.expiry_date, cert.status],
      (err) => {
        if (err) console.error('Error inserting certificate:', err);
      }
    );
  });
}

// Insert sample bank details
function insertSampleBankDetails() {
  const bankDetails = [
    {
      account_name: 'Prinstine Group of Companies',
      bank_name: 'EcoBank Liberia',
      account_number: '0012345678901',
      swift_code: 'ECOLLRLM'
    },
    {
      account_name: 'Prinstine Academy',
      bank_name: 'United Bank for Africa (UBA)',
      account_number: '0023456789012',
      swift_code: 'UNAFLRLM'
    }
  ];

  bankDetails.forEach(bank => {
    db.run(`INSERT OR IGNORE INTO bank_details (account_name, bank_name, account_number, swift_code) 
            VALUES (?, ?, ?, ?)`,
      [bank.account_name, bank.bank_name, bank.account_number, bank.swift_code],
      (err) => {
        if (err) console.error('Error inserting bank detail:', err);
      }
    );
  });
}

// API Routes

// Get bank details
app.get('/api/bank-details', (req, res) => {
  db.all('SELECT * FROM bank_details', (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(rows);
    }
  });
});

// Submit inquiry
app.post('/api/inquiries', (req, res) => {
  const { name, email, message } = req.body;

  // Validation
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  db.run(
    'INSERT INTO inquiries (name, email, message) VALUES (?, ?, ?)',
    [name, email, message],
    function(err) {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ 
          success: true, 
          message: 'Inquiry submitted successfully',
          id: this.lastID 
        });
      }
    }
  );
});

// Verify certificate
app.post('/api/verify-certificate', (req, res) => {
  const { cert_number } = req.body;

  if (!cert_number) {
    return res.status(400).json({ error: 'Certificate number is required' });
  }

  db.get(
    'SELECT * FROM certificates WHERE cert_number = ?',
    [cert_number],
    (err, row) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else if (!row) {
        res.json({ 
          status: 'invalid',
          message: 'Certificate number not found'
        });
      } else {
        // Check if certificate is expired
        const today = new Date();
        const expiryDate = new Date(row.expiry_date);
        const isExpired = expiryDate < today;

        res.json({
          status: isExpired ? 'expired' : row.status,
          details: {
            cert_number: row.cert_number,
            holder_name: row.holder_name,
            issue_date: row.issue_date,
            expiry_date: row.expiry_date,
            isExpired: isExpired
          },
          message: isExpired 
            ? 'This certificate has expired' 
            : 'Certificate is valid'
        });
      }
    }
  );
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

// Graceful shutdown
const gracefulShutdown = (signal) => {
  console.log(`\n${signal} received. Closing database connection...`);
  db.close((err) => {
    if (err) {
      console.error('❌ Error closing database:', err.message);
      process.exit(1);
    } else {
      console.log('✅ Database connection closed gracefully.');
      process.exit(0);
    }
  });
};

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Handle uncaught errors
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
  gracefulShutdown('unhandledRejection');
});

