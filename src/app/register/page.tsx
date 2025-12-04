import AppLayout from "@/src/layout/AppLayout";

function Register() {

    return (
        <AppLayout>
            T
        </AppLayout>
    );
}

// Layout.jsx
import React from "react";
// import SignupPage from "./SignupPage"; // importe ta page d'inscription

function Layout() {
  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>Mon Site</h1>
      </header>

      <main style={styles.main}>
        {/* Ici on intègre directement la page d'inscription */}
        <SignupPage />
      </main>

      <footer style={styles.footer}>
        <small>© 2025 Mon Site</small>
      </footer>
    </div>
  );
}

const styles = {
  container: { minHeight: "100vh", display: "flex", flexDirection: "column" },
  header: { background: "#2563eb", color: "#fff", padding: "1rem" },
  main: { flex: 1, padding: "2rem", background: "#f9fafb" },
  footer: { background: "#e5e7eb", textAlign: "center", padding: "1rem" },
};

// App.jsx
// import React from "react";
// import Layout from "./Layout";

export default function App() {
  return <Layout />;
}
