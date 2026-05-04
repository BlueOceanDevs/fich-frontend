import styled from "styled-components";

// ─────────────────────────────────────────────
// Contact info grid — used by /contact and the Premium-tier
// "Contact Us" landing flow.
//
// The form-related styled-components (ContactForm / ContactInput /
// ContactTextarea / ContactSubmitButton / ContactSuccess / ContactGrid /
// ContactFieldGroup / ContactLabel / ContactSpinner) were removed
// when the contact page was simplified to email-only — no form, no
// backend endpoint. If a real contact form is added back later, the
// shapes can be recovered from git history.
// ─────────────────────────────────────────────

export const ContactInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const ContactInfoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => `${theme.colors.primary}14`};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ContactInfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ContactInfoTitle = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const ContactInfoValue = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;
