import pg from "pg";

const { Pool } = pg;

const DATABASE_URL = process.env.POSTGRES_URL || process.env.DATABASE_URL;

const globalForPg = globalThis;

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(body));
}

function getPool() {
  if (!DATABASE_URL) {
    return null;
  }

  if (!globalForPg.__contactPool) {
    globalForPg.__contactPool = new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
      max: 1,
    });
  }

  return globalForPg.__contactPool;
}

async function ensureTable(pool) {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id BIGSERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT,
      message TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );
  `);
}

function clean(value, maxLength) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function parseBody(req) {
  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  if (typeof req.body === "string") {
    return JSON.parse(req.body);
  }

  return {};
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return json(res, 405, { success: false, error: "Method not allowed." });
  }

  let body;
  try {
    body = parseBody(req);
  } catch {
    return json(res, 400, { success: false, error: "Invalid JSON request body." });
  }

  const name = clean(body.name, 120);
  const email = clean(body.email, 254).toLowerCase();
  const subject = clean(body.subject, 160);
  const message = clean(body.message || body.description, 5000);

  if (!name) {
    return json(res, 400, { success: false, error: "Name is required." });
  }

  if (!email) {
    return json(res, 400, { success: false, error: "Email is required." });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json(res, 400, { success: false, error: "Please enter a valid email address." });
  }

  if (!message) {
    return json(res, 400, { success: false, error: "Message is required." });
  }

  const pool = getPool();
  if (!pool) {
    return json(res, 500, {
      success: false,
      error: "Contact storage is not configured. Set POSTGRES_URL or DATABASE_URL.",
    });
  }

  try {
    await ensureTable(pool);
    await pool.query(
      `
        INSERT INTO contact_messages (name, email, subject, message)
        VALUES ($1, $2, $3, $4)
      `,
      [name, email, subject || null, message]
    );

    return json(res, 200, { success: true, message: "Thanks, your message was sent." });
  } catch (error) {
    console.error("Contact form submission failed:", error?.code || error?.name || "database_error");
    return json(res, 500, { success: false, error: "Unable to save your message right now." });
  }
}
