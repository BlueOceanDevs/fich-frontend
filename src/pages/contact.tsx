import React, { useState } from "react";
import Head from "next/head";
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import Layout from "@/components/Layout";
import {
  LegalSection,
  LegalContainer,
  LegalTitle,
  LegalBody,
  SectionHeading,
  Paragraph,
  ContactCard,
  ContactLabel,
  ContactValue,
} from "@/components/Legal/styles";
import {
  ContactGrid,
  ContactForm,
  ContactFieldGroup,
  ContactLabel as FormLabel,
  ContactInput,
  ContactTextarea,
  ContactSubmitButton,
  ContactSpinner,
  ContactSuccess,
  ContactInfoGrid,
  ContactInfoItem,
  ContactInfoIcon,
  ContactInfoText,
  ContactInfoTitle,
  ContactInfoValue as InfoValue,
} from "@/components/Legal/contactStyles";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !message.trim()) {
      setError("Email and message are required.");
      return;
    }

    setSending(true);

    // Simulate send — replace with actual API call when backend is ready
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      setSent(true);
      setName("");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch {
      setError("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact - Fich</title>
        <meta
          name="description"
          content="Get in touch with the Fich team for support, questions, or feedback."
        />
      </Head>
      <Layout>
        <LegalSection>
          <LegalContainer>
            <LegalTitle>Contact Us</LegalTitle>
            <Paragraph style={{ marginBottom: 40 }}>
              Have a question, need help, or want to share feedback? We&apos;d
              love to hear from you.
            </Paragraph>

            <LegalBody>
              <ContactInfoGrid>
                <ContactInfoItem>
                  <ContactInfoIcon>
                    <FaEnvelope size={18} />
                  </ContactInfoIcon>
                  <ContactInfoText>
                    <ContactInfoTitle>Email</ContactInfoTitle>
                    <InfoValue href="mailto:support@fich.ai">
                      support@fich.ai
                    </InfoValue>
                  </ContactInfoText>
                </ContactInfoItem>

                <ContactInfoItem>
                  <ContactInfoIcon>
                    <FaMapMarkerAlt size={18} />
                  </ContactInfoIcon>
                  <ContactInfoText>
                    <ContactInfoTitle>Location</ContactInfoTitle>
                    <span style={{ fontSize: 14, color: "inherit" }}>
                      Europe
                    </span>
                  </ContactInfoText>
                </ContactInfoItem>
              </ContactInfoGrid>

              <section>
                <SectionHeading>Send Us a Message</SectionHeading>

                {sent ? (
                  <ContactSuccess>
                    <FaPaperPlane size={20} />
                    Thank you for your message! We&apos;ll get back to you as
                    soon as possible.
                  </ContactSuccess>
                ) : (
                  <ContactForm onSubmit={handleSubmit}>
                    <ContactGrid>
                      <ContactFieldGroup>
                        <FormLabel htmlFor="contact-name">
                          Name (optional)
                        </FormLabel>
                        <ContactInput
                          id="contact-name"
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                        />
                      </ContactFieldGroup>

                      <ContactFieldGroup>
                        <FormLabel htmlFor="contact-email">Email</FormLabel>
                        <ContactInput
                          id="contact-email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          autoComplete="email"
                        />
                      </ContactFieldGroup>
                    </ContactGrid>

                    <ContactFieldGroup>
                      <FormLabel htmlFor="contact-subject">
                        Subject (optional)
                      </FormLabel>
                      <ContactInput
                        id="contact-subject"
                        type="text"
                        placeholder="What is this about?"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                      />
                    </ContactFieldGroup>

                    <ContactFieldGroup>
                      <FormLabel htmlFor="contact-message">Message</FormLabel>
                      <ContactTextarea
                        id="contact-message"
                        placeholder="Your message..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={6}
                        required
                      />
                    </ContactFieldGroup>

                    {error && (
                      <Paragraph style={{ color: "#ef4444", fontSize: 13 }}>
                        {error}
                      </Paragraph>
                    )}

                    <ContactSubmitButton type="submit" disabled={sending}>
                      {sending && <ContactSpinner />}
                      {sending ? "Sending..." : "Send Message"}
                    </ContactSubmitButton>
                  </ContactForm>
                )}
              </section>
            </LegalBody>
          </LegalContainer>
        </LegalSection>
      </Layout>
    </>
  );
}
