import React from "react";
import { FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import {
  FooterSection,
  FooterContainer,
  FooterGrid,
  FooterBrand,
  FooterLogo,
  LogoDot,
  FooterDescription,
  FooterColumn,
  FooterColumnTitle,
  FooterLink,
  FooterBottom,
  FooterCopyright,
  SocialLinks,
  SocialLink,
  CreatorRow,
} from "./styles";

const Footer: React.FC = () => {
  return (
    <FooterSection>
      <FooterContainer>
        <FooterGrid>
          <FooterBrand>
            <FooterLogo>
              <LogoDot />
              Fich
            </FooterLogo>
            <FooterDescription>
              Secure, fast, and streamline crypto trading. Fich makes digital
              asset trading effortless.
            </FooterDescription>
          </FooterBrand>

          <FooterColumn>
            <FooterColumnTitle>Navigation</FooterColumnTitle>
            <FooterLink href="#hero">Why Fich?</FooterLink>
            <FooterLink href="#how-it-works">How it works</FooterLink>
            <FooterLink href="#testimonials">Testimonials</FooterLink>
            <FooterLink href="#pricing">Pricing</FooterLink>
            <FooterLink href="#faq">FAQ</FooterLink>
            <FooterLink href="/contact">Contact</FooterLink>
          </FooterColumn>

          <FooterColumn>
            <FooterColumnTitle>Legal</FooterColumnTitle>
            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
            <FooterLink href="/terms">Terms of Service</FooterLink>
            <FooterLink href="/risk-disclosure">Risk Disclosure</FooterLink>
          </FooterColumn>
        </FooterGrid>

        <FooterBottom>
          <CreatorRow>
            Created by &nbsp;
            <span style={{ fontWeight: 600 }}>Arthur A. Fournier</span>
          </CreatorRow>
          <FooterCopyright>Made in Europe</FooterCopyright>
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
