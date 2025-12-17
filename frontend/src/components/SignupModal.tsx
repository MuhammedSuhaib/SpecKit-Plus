"use client"
import { useState } from "react";
import { authClient } from '../lib/auth-client';
import UserBackgroundForm from './personalize';

export default function SignupModal({ open, onClose }: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [bg, setBg] = useState({
    software: "",
    hardware: "",
    goal: ""
  });
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await authClient.signUp.email({ email, password, name });
    if (!res.error) {
      const session = await authClient.getSession();
      const userId = session?.data?.user?.id;

      if (userId) {
        await fetch("http://localhost:8000/api/user-background", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            user_id: userId,
            background: bg
          }),
        });
      }
      onClose();
    }
    setLoading(false);
  };

  const overlay = {
    position: "fixed" as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
  };

  const modal = {
    position: "relative" as const,
    backgroundColor: "white",
    padding: "24px",
    borderRadius: "8px",
    width: "90%",
    maxWidth: "500px",
    maxHeight: "90vh",
    overflowY: "auto" as const,
  };

  const close = {
    position: "absolute" as const,
    top: "8px",
    right: "8px",
    background: "none",
    border: "none",
    fontSize: "20px",
    cursor: "pointer",
  };

  return (
    <div style={overlay}>
      <div style={modal}>
        <button onClick={onClose} style={close}>×</button>

        <h2>Create account</h2>

        <form onSubmit={submit} style={{ display: "grid", gap: "12px" }}>
          <input
            placeholder="Name"
            onChange={e => setName(e.target.value)}
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            placeholder="Email"
            type="email"
            onChange={e => setEmail(e.target.value)}
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />
          <input
            type="password"
            placeholder="Password"
            onChange={e => setPassword(e.target.value)}
            required
            style={{ padding: "8px", borderRadius: "4px", border: "1px solid #ccc" }}
          />

          <div style={{ marginTop: "16px" }}>
            <h3 style={{ marginBottom: "8px" }}>Tell us about yourself:</h3>
            <UserBackgroundForm value={bg} onChange={setBg} />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              padding: "12px",
              backgroundColor: loading ? "#ccc" : "#007cba",
              color: "white",
              border: "none",
              borderRadius: "4px",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "16px"
            }}
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}