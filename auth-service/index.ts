import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { jwt } from "better-auth/plugins";
import { db } from "./db";
import * as schema from "./db/schema";
import dotenv from "dotenv";

dotenv.config();

// 1. Initialize Better Auth
const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  // Enable JWT plugin to generate keys and store them in the 'jwks' table
  plugins: [
    jwt({
      jwks: {
        enabled: true,
        // better-auth defaults will use the 'jwks' table defined in schema
      }
    }),
  ],
  trustedOrigins: [process.env.ALLOWED_ORIGIN || "http://localhost:3000"],
});

const app = new Hono();

// 2. Setup CORS (Allow Docusaurus frontend)
app.use("/*", cors({
  origin: process.env.ALLOWED_ORIGIN || "http://localhost:3000",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["POST", "GET", "OPTIONS"],
  exposeHeaders: ["Content-Length"],
  maxAge: 600,
  credentials: true,
}));

// 3. Better Auth Route Handler
// This handles /api/auth/signin, /api/auth/signup, etc.
app.on(["POST", "GET"], "/api/auth/*", (c) => {
  return auth.handler(c.req.raw);
});

// 4. JWKS Endpoint (Adapted from your Guide for Hono)
// This is what the Python Backend calls to verify tokens
app.get("/.well-known/jwks.json", async (c) => {
  try {
    // A. Fetch all JWKS keys from database
    const keys = await db.select().from(schema.jwks);

    // B. Format as JWKS (JSON Web Key Set)
    const jwksResponse = {
      keys: keys.map((key) => {
        // The publicKey is stored as a JSON string in the DB
        const publicKey = JSON.parse(key.publicKey);
        return {
          ...publicKey,
          kid: key.id, // Key ID used for matching
        };
      }),
    };

    // C. Return with caching headers
    return c.json(jwksResponse, 200, {
      "Cache-Control": "public, max-age=3600",
    });
  } catch (error) {
    console.error("Error serving JWKS:", error);
    return c.json({ error: "Internal Server Error" }, 500);
  }
});

// 5. Start Server
const port = 4000;
console.log(`Auth Server running on http://localhost:${port}`);

serve({
  fetch: app.fetch,
  port,
});