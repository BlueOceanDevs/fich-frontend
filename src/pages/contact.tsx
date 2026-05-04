import React from "react";
import Head from "next/head";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Layout from "@/components/Layout";
import {
  LegalSection,
  LegalContainer,
  LegalTitle,
  LegalBody,
  Paragraph,
} from "@/components/Legal/styles";
import {
  ContactInfoGrid,
  ContactInfoItem,
  ContactInfoIcon,
  ContactInfoText,
  ContactInfoTitle,
  ContactInfoValue as InfoValue,
} from "@/components/Legal/contactStyles";

/**
 * Public `/contact` route — email-only contact page. No form, no
 * backend endpoint. The "Contact Us" navbar link, the footer link,
 * and the Premium-tier pricing CTA all route here. Users who want
 * to reach the team click the email link, which opens their default
 * mail client with `support@fich.ai` pre-filled.
 */
export default function ContactPage() {
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
              Have a question, need help, or want to share feedback?
              Email us directly and we&apos;ll get back to you as soon as
              possible.
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
            </LegalBody>
          </LegalContainer>
        </LegalSection>
      </Layout>
    </>
  );
}
