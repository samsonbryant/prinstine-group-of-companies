const express = require('express');
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

// Database configuration
const DATABASE_URL = process.env.DATABASE_URL;
let db = null; // Will be set to either PostgreSQL pool or SQLite database

// Use PostgreSQL if DATABASE_URL is provided (production with free database)
// Otherwise use SQLite (local development)
if (DATABASE_URL) {
  // PostgreSQL (for production with Supabase, Neon, etc.)
  const { Pool } = require('pg');
  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('supabase') || DATABASE_URL.includes('neon') || DATABASE_URL.includes('railway')
      ? { rejectUnauthorized: false } 
      : false
  });

  pool.query('SELECT NOW()', (err, res) => {
    if (err) {
      console.error('❌ Error connecting to PostgreSQL:', err.message);
      console.error('Please check your DATABASE_URL environment variable.');
      process.exit(1);
    } else {
      console.log('✅ Connected to PostgreSQL database (persistent)');
      console.log('💾 Using external database - data will persist across restarts');
      db = { type: 'postgres', pool };
      initializeDatabase();
    }
  });
} else {
  // SQLite (for local development)
  const sqlite3 = require('sqlite3').verbose();
  const dbPath = path.join(__dirname, 'prinstine.db');
  console.log(`📁 Using SQLite database (local development)`);
  console.log(`📁 Database path: ${dbPath}`);

  const sqliteDb = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('❌ Error opening database:', err.message);
      process.exit(1);
    } else {
      console.log('✅ Connected to SQLite database');
      console.log('💾 Database location:', dbPath);
      console.log('⚠️  Note: SQLite data is local only. For production, set DATABASE_URL to use PostgreSQL.');
      db = { type: 'sqlite', db: sqliteDb };
      initializeDatabase();
    }
  });
}

// Initialize database tables
async function initializeDatabase() {
  if (db.type === 'postgres') {
    // PostgreSQL initialization
    try {
      await db.pool.query(`
        CREATE TABLE IF NOT EXISTS certificates (
          id SERIAL PRIMARY KEY,
          cert_number TEXT UNIQUE NOT NULL,
          holder_name TEXT NOT NULL,
          issue_date DATE NOT NULL,
          expiry_date DATE,
          status TEXT DEFAULT 'valid'
        )
      `);
      await db.pool.query(`
        CREATE TABLE IF NOT EXISTS inquiries (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          message TEXT NOT NULL,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      await db.pool.query(`
        CREATE TABLE IF NOT EXISTS bank_details (
          id SERIAL PRIMARY KEY,
          account_name TEXT NOT NULL,
          bank_name TEXT NOT NULL,
          account_number TEXT NOT NULL,
          swift_code TEXT
        )
      `);
      console.log('✅ Database tables initialized (PostgreSQL)');
      await insertSampleCertificates();
      await insertSampleBankDetails();
    } catch (err) {
      console.error('Error initializing PostgreSQL:', err.message);
    }
  } else {
    // SQLite initialization
    db.db.run(`CREATE TABLE IF NOT EXISTS certificates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cert_number TEXT UNIQUE NOT NULL,
      holder_name TEXT NOT NULL,
      issue_date DATE NOT NULL,
      expiry_date DATE,
      status TEXT DEFAULT 'valid'
    )`, (err) => {
      if (err) console.error('Error creating certificates table:', err);
    });

    db.db.run(`CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      message TEXT NOT NULL,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
      if (err) console.error('Error creating inquiries table:', err);
    });

    db.db.run(`CREATE TABLE IF NOT EXISTS bank_details (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      account_name TEXT NOT NULL,
      bank_name TEXT NOT NULL,
      account_number TEXT NOT NULL,
      swift_code TEXT
    )`, (err) => {
      if (err) console.error('Error creating bank_details table:', err);
      else {
        insertSampleBankDetails();
      }
    });

    insertSampleCertificates();
  }
}

// Insert sample certificates
async function insertSampleCertificates() {
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

  if (db.type === 'postgres') {
    for (const cert of certificates) {
      try {
        await db.pool.query(
          `INSERT INTO certificates (cert_number, holder_name, issue_date, expiry_date, status) 
           VALUES ($1, $2, $3, $4, $5)
           ON CONFLICT (cert_number) DO NOTHING`,
          [cert.cert_number, cert.holder_name, cert.issue_date, cert.expiry_date, cert.status]
        );
      } catch (err) {
        console.error('Error inserting certificate:', err.message);
      }
    }
  } else {
    certificates.forEach(cert => {
      db.db.run(`INSERT OR IGNORE INTO certificates (cert_number, holder_name, issue_date, expiry_date, status) 
              VALUES (?, ?, ?, ?, ?)`,
        [cert.cert_number, cert.holder_name, cert.issue_date, cert.expiry_date, cert.status],
        (err) => {
          if (err) console.error('Error inserting certificate:', err);
        }
      );
    });
  }
}

// Insert sample bank details
async function insertSampleBankDetails() {
  const bankDetails = [
    {
      account_name: 'Prinstine Group of Companies',
      bank_name: 'EcoBank Liberia',
      account_number: '6102243542',
      swift_code: 'ECOLLRLM'
    },
    {
      account_name: 'Prinstine Academy Inc.',
      bank_name: 'EcoBank Liberia',
      account_number: '6102243552',
      swift_code: 'ECOLLRLM'
    },
    {
      account_name: 'Prinstine Group of Companies Inc',
      bank_name: 'Bloom Bank',
      account_number: '00210306847013',
      swift_code: null
    }
  ];

  if (db.type === 'postgres') {
    for (const bank of bankDetails) {
      try {
        const existing = await db.pool.query(
          'SELECT * FROM bank_details WHERE account_name = $1 AND bank_name = $2 AND account_number = $3',
          [bank.account_name, bank.bank_name, bank.account_number]
        );
        if (existing.rows.length === 0) {
          await db.pool.query(
            `INSERT INTO bank_details (account_name, bank_name, account_number, swift_code) 
             VALUES ($1, $2, $3, $4)`,
            [bank.account_name, bank.bank_name, bank.account_number, bank.swift_code]
          );
        }
      } catch (err) {
        console.error('Error inserting bank detail:', err.message);
      }
    }
  } else {
    bankDetails.forEach(bank => {
      db.db.run(`INSERT OR IGNORE INTO bank_details (account_name, bank_name, account_number, swift_code) 
              VALUES (?, ?, ?, ?)`,
        [bank.account_name, bank.bank_name, bank.account_number, bank.swift_code],
        (err) => {
          if (err) console.error('Error inserting bank detail:', err);
        }
      );
    });
  }
}

// API Routes

// Get bank details
app.get('/api/bank-details', async (req, res) => {
  try {
    if (db.type === 'postgres') {
      const result = await db.pool.query('SELECT * FROM bank_details ORDER BY id');
      res.json(result.rows);
    } else {
      db.db.all('SELECT * FROM bank_details', (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json(rows);
        }
      });
    }
  } catch (err) {
    console.error('Error fetching bank details:', err);
    res.status(500).json({ error: err.message });
  }
});

// Submit inquiry
app.post('/api/inquiries', async (req, res) => {
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

  try {
    if (db.type === 'postgres') {
      const result = await db.pool.query(
        'INSERT INTO inquiries (name, email, message) VALUES ($1, $2, $3) RETURNING id',
        [name, email, message]
      );
      res.json({ 
        success: true, 
        message: 'Inquiry submitted successfully',
        id: result.rows[0].id 
      });
    } else {
      db.db.run(
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
    }
  } catch (err) {
    console.error('Error inserting inquiry:', err);
    res.status(500).json({ error: err.message });
  }
});

// Verify certificate
app.post('/api/verify-certificate', async (req, res) => {
  const { cert_number } = req.body;

  if (!cert_number) {
    return res.status(400).json({ error: 'Certificate number is required' });
  }

  try {
    if (db.type === 'postgres') {
      const result = await db.pool.query(
        'SELECT * FROM certificates WHERE cert_number = $1',
        [cert_number]
      );

      if (result.rows.length === 0) {
        return res.json({ 
          status: 'invalid',
          message: 'Certificate number not found'
        });
      }

      const row = result.rows[0];
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
    } else {
      db.db.get(
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
    }
  } catch (err) {
    console.error('Error verifying certificate:', err);
    res.status(500).json({ error: err.message });
  }
});

// Health check
app.get('/api/health', async (req, res) => {
  try {
    if (db.type === 'postgres') {
      await db.pool.query('SELECT 1');
      res.json({ 
        status: 'ok', 
        message: 'Server is running',
        database: 'PostgreSQL (connected)'
      });
    } else {
      res.json({ 
        status: 'ok', 
        message: 'Server is running',
        database: 'SQLite (local)'
      });
    }
  } catch (err) {
    res.json({ 
      status: 'error', 
      message: 'Database connection failed',
      error: err.message
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});

// Graceful shutdown
const gracefulShutdown = async (signal) => {
  console.log(`\n${signal} received. Closing database connection...`);
  try {
    if (db && db.type === 'postgres') {
      await db.pool.end();
    } else if (db && db.db) {
      db.db.close((err) => {
        if (err) {
          console.error('❌ Error closing database:', err.message);
          process.exit(1);
        }
      });
    }
    console.log('✅ Database connection closed gracefully.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error closing database:', err.message);
    process.exit(1);
  }
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

