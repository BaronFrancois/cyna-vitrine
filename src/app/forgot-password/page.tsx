"use client";

import AppLayoutRegLog from "@/layout/AppLayoutRegLog";
import api from "@/lib/api";
import React, { useState } from "react";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    alert("test");
    e.preventDefault();

    api().post("/auth/forgot-password", { email })

    try {
      // Exemple : appel à ton API backend
    //   const response = await fetch("/api/forgot-password", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify({ email }),
    //   });

      if (response.ok) {
        setMessage("Un email de réinitialisation a été envoyé !");
      } else {
        setMessage("Erreur : impossible d’envoyer l’email.");
      }
    } catch (error) {
      setMessage("Une erreur est survenue.");
    }
  };

  return (
    <AppLayoutRegLog>
      <h2>Mot de passe oublié</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Adresse email :
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Envoyer</button>
      </form>
      {message && <p>{message}</p>}
    </AppLayoutRegLog>
  );
}

export default ForgotPassword;
