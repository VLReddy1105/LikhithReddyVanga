import { useRef, useState, type FormEvent } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Github,
  Linkedin,
  LoaderCircle,
  Mail,
} from "lucide-react";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";
import "./research-contact.css";

const EMAIL = "reddylikhith10@gmail.com";
const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };
type ContactFields = typeof EMPTY_FORM;
type FieldErrors = Partial<Record<keyof ContactFields, string>>;
const SERVICE_ERROR =
  "Your message could not be confirmed. Please try again or email me directly.";

export default function ContactSection() {
  const [form, setForm] = useState<ContactFields>(EMPTY_FORM);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const formRef = useRef<HTMLFormElement>(null);
  const submissionInFlight = useRef(false);
  const sending = status === "sending";

  function updateField(field: keyof ContactFields, value: string) {
    setForm(previous => ({ ...previous, [field]: value }));
    setErrors(previous => ({ ...previous, [field]: undefined }));
    if (status === "success") {
      setStatus("idle");
      setStatusMessage("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submissionInFlight.current) return;
    const payload = {
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };
    const validation: FieldErrors = {};
    if (!payload.name) validation.name = "Please enter your name.";
    if (!payload.email) validation.email = "Please enter your email address.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email))
      validation.email = "Please enter a valid email address.";
    if (!payload.message) validation.message = "Please include a message.";
    setErrors(validation);
    const firstError = Object.keys(validation)[0] as
      | keyof ContactFields
      | undefined;
    if (firstError) {
      setStatus("error");
      setStatusMessage("Please check the highlighted fields before sending.");
      formRef.current
        ?.querySelector<HTMLElement>(`#contact-${firstError}`)
        ?.focus();
      return;
    }
    submissionInFlight.current = true;
    setStatus("sending");
    setStatusMessage("Sending your message…");
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });
      const result: unknown = await response.json().catch(() => null);
      const body =
        result && typeof result === "object"
          ? (result as { success?: unknown; error?: unknown })
          : null;
      if (!response.ok || body?.success !== true) {
        const validationError =
          response.status >= 400 &&
          response.status < 500 &&
          typeof body?.error === "string"
            ? body.error
            : null;
        throw new Error(validationError || SERVICE_ERROR);
      }
      setForm(EMPTY_FORM);
      setStatus("success");
      setStatusMessage(
        "Thanks — your message has been received. I’ll get back to you by email."
      );
    } catch (error) {
      setStatus("error");
      setStatusMessage(
        error instanceof Error &&
          error.message !== "Failed to fetch" &&
          error.name !== "AbortError" &&
          error.name !== "TypeError"
          ? error.message
          : SERVICE_ERROR
      );
    } finally {
      window.clearTimeout(timeout);
      submissionInFlight.current = false;
    }
  }
  const errorProps = (field: keyof ContactFields) => ({
    "aria-invalid": !!errors[field],
    "aria-describedby": errors[field] ? `contact-${field}-error` : undefined,
  });

  return (
    <section
      id="contact"
      className="portfolio-section contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <Reveal>
          <SectionHeading
            title="Let’s build something useful."
          />
        </Reveal>
        <div className="contact-layout">
          <Reveal className="contact-details">
            
            <h3 id="contact-heading">Good work starts with a conversation.</h3>
            <p>
              Tell me what you’re exploring and where I can help. You can use
              the form or reach me directly by email.
            </p>
            <a className="contact-email" href={`mailto:${EMAIL}`}>
              <Mail size={22} aria-hidden="true" />
              <span>{EMAIL}</span>
              <ArrowUpRight size={19} aria-hidden="true" />
            </a>
            
            <div className="contact-socials">
              <a
                href="https://github.com/VLReddy1105"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github size={19} aria-hidden="true" />
                GitHub<span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
              <a
                href="https://www.linkedin.com/in/likhithreddyvanga/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin size={19} aria-hidden="true" />
                LinkedIn<span className="sr-only"> (opens in a new tab)</span>
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <form
              ref={formRef}
              className="contact-form"
              onSubmit={handleSubmit}
              noValidate
              aria-busy={sending}
            >
              <div className="contact-form-heading">
                <h3>Send a message</h3>
                <p>Fields marked * are required.</p>
              </div>
              <fieldset disabled={sending}>
                <legend className="sr-only">
                  Your contact details and message
                </legend>
                <div className="contact-form-row">
                  <div className="contact-field">
                    <label htmlFor="contact-name">
                      Name <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      required
                      maxLength={120}
                      value={form.name}
                      onChange={event =>
                        updateField("name", event.target.value)
                      }
                      placeholder="Your name"
                      {...errorProps("name")}
                    />
                    {errors.name && (
                      <p
                        className="contact-field-error"
                        id="contact-name-error"
                      >
                        {errors.name}
                      </p>
                    )}
                  </div>
                  <div className="contact-field">
                    <label htmlFor="contact-email">
                      Email <span aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      value={form.email}
                      onChange={event =>
                        updateField("email", event.target.value)
                      }
                      placeholder="you@example.com"
                      {...errorProps("email")}
                    />
                    {errors.email && (
                      <p
                        className="contact-field-error"
                        id="contact-email-error"
                      >
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-subject">
                    Subject <span className="contact-optional">(optional)</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    maxLength={160}
                    value={form.subject}
                    onChange={event =>
                      updateField("subject", event.target.value)
                    }
                    placeholder="What would you like to discuss?"
                  />
                </div>
                <div className="contact-field">
                  <label htmlFor="contact-message">
                    Message <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    required
                    maxLength={5000}
                    rows={5}
                    value={form.message}
                    onChange={event =>
                      updateField("message", event.target.value)
                    }
                    placeholder="A little context about your idea or opportunity…"
                    {...errorProps("message")}
                  />
                  {errors.message && (
                    <p
                      className="contact-field-error"
                      id="contact-message-error"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>
                <button
                  className="button-primary contact-submit"
                  type="submit"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <LoaderCircle
                        className="contact-spinner"
                        size={18}
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight size={18} aria-hidden="true" />
                    </>
                  )}
                </button>
              </fieldset>
              {statusMessage && (
                <div
                  className={`contact-status contact-status-${status}`}
                  role={status === "error" ? "alert" : "status"}
                >
                  {status === "success" && (
                    <CheckCircle2 size={19} aria-hidden="true" />
                  )}
                  <p>
                    {statusMessage}
                    {status === "error" && (
                      <>
                        {" "}
                        <a href={`mailto:${EMAIL}`}>
                          Email me directly{" "}
                          <ArrowUpRight size={13} aria-hidden="true" />
                        </a>
                      </>
                    )}
                  </p>
                </div>
              )}
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
