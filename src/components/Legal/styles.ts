import styled from "styled-components";

export const LegalSection = styled.section`
  padding: 140px 24px 88px;
  background:
    radial-gradient(
      circle at top,
      ${({ theme }) => `${theme.colors.primary}0A`} 0%,
      transparent 34%
    ),
    ${({ theme }) => theme.colors.background};
`;

export const LegalContainer = styled.div`
  width: 100%;
  max-width: 780px;
  margin: 0 auto;
`;

export const LegalTitle = styled.h1`
  font-size: clamp(32px, 4vw, 44px);
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
`;

export const LegalUpdated = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: 40px;
`;

export const LegalBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

export const SectionHeading = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 12px;
`;

export const Paragraph = styled.p`
  font-size: 15px;
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const List = styled.ul`
  padding-left: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const ListItem = styled.li`
  font-size: 15px;
  line-height: 1.7;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

// `ContactCard` / `ContactLabel` / `ContactValue` were declared here
// but never imported anywhere — dead code. Removed alongside the
// contact-form simplification. Live contact-info styling lives in
// `Legal/contactStyles.ts` (ContactInfoGrid / ContactInfoItem / etc).
