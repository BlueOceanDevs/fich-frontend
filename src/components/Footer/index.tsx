import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  FooterSection,
  FooterContainer,
  FooterGrid,
  FooterBrand,
  FooterLogo,
  FooterDescription,
  FooterColumn,
  FooterColumnTitle,
  FooterLink,
  FooterBottom,
  SocialLinks,
  SocialLink,
} from "./styles";

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <FooterGrid>
          <FooterBrand>
            <FooterLogo>fich</FooterLogo>
            <FooterDescription>
              Secure, fast, and streamline crypto trading. Fich makes digital
              asset trading effortless.
            </FooterDescription>
          </FooterBrand>

          <FooterColumn>
            <FooterColumnTitle>Navigation</FooterColumnTitle>
            {/* All anchor-style links must use the absolute "/#x"
                form, NOT bare "#x". Bare hash links resolve relative
                to the current path — clicking "Pricing" from /contact
                used to land on "/contact#pricing" (no-op). The "/"
                prefix forces the browser to navigate to the homepage
                first, then scroll to the anchor. */}
            <FooterLink href="/#why-fich">Why Fich?</FooterLink>
            <FooterLink href="/#how-it-works">How it works</FooterLink>
            {/* WAITLIST MODE — Pricing footer link hidden. Restore
                when plans launch. */}
            {/* <FooterLink href="/#pricing">Pricing</FooterLink> */}
            {/* FAQ has its own dedicated page now, not a homepage
                anchor — match the navbar. */}
            <FooterLink href="/faq">FAQ</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterColumnTitle>Legal</FooterColumnTitle>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms and Conditions</FooterLink>
            <FooterLink href="/risk-disclosure">Disclaimer</FooterLink>
          </FooterColumn>
        </FooterGrid>

        <FooterBottom>
          <SocialLinks>
            <SocialLink href="#" aria-label="Twitter">
              <FaTwitter size={16} />
            </SocialLink>
            <SocialLink href="#" aria-label="Instagram">
              <FaInstagram size={16} />
            </SocialLink>
            <SocialLink href="#" aria-label="LinkedIn">
              <FaLinkedin size={16} />
            </SocialLink>
          </SocialLinks>
        </FooterBottom>
      </FooterContainer>
    </FooterSection>
  );
};

export default Footer;
