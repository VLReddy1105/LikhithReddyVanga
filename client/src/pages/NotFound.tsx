import { ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Navbar />
      <main
        id="main-content"
        tabIndex={-1}
        className="container"
        style={{
          minHeight: "75vh",
          paddingTop: "11rem",
          paddingBottom: "6rem",
        }}
      >
        <p className="eyebrow">404 · Page not found</p>
        <h1
          tabIndex={-1}
          style={{
            fontSize: "clamp(2rem, 5vw, 4rem)",
            color: "var(--text-primary)",
            marginBottom: "1.5rem",
          }}
        >
          Let’s get you back to the work.
        </h1>
        <p
          style={{
            color: "var(--text-muted)",
            marginBottom: "2rem",
            lineHeight: 1.7,
          }}
        >
          This page could not be found. Explore the projects or get in touch.
        </p>
        <Link href="/#work" className="button-primary">
          <ArrowLeft size={17} aria-hidden="true" /> View selected work
        </Link>
      </main>
      <Footer />
    </>
  );
}
