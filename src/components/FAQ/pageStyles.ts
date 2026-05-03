import styled from "styled-components";

// ─────────────────────────────────────────────
// Styles for the dedicated /faq page
// ─────────────────────────────────────────────
//
// The page reuses FaqItem / FaqQuestion / FaqIcon / FaqAnswer from
// ./styles.ts (so the per-row visual matches the homepage preview
// exactly) and adds page-level chrome here: section padding, page
// title, category section headings, and the per-category block
// wrappers that visually separate the four groups.

export const FaqPageSection = styled.section`
  padding: 100px 0 120px;
  background: ${({ theme }) => theme.colors.background};

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 64px 0 80px;
  }
`;

export const FaqPageContainer = styled.div`
  max-width: 880px;
  margin: 0 auto;
  padding: 0 24px;
`;

export const FaqPageTitle = styled.h1`
  font-size: 44px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text};
  text-align: center;
  margin-bottom: 16px;
  line-height: 1.15;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 32px;
  }
`;

export const FaqPageSubtitle = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textSecondary};
  text-align: center;
  max-width: 620px;
  margin: 0 auto 64px;
  line-height: 1.6;
`;

// One block per category — separator line above the category title
// (except the first), generous bottom margin between blocks. The
// FaqItem rows from ./styles.ts handle their own borders so they
// stack cleanly inside.
export const CategoryBlock = styled.section`
  margin-bottom: 56px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const CategoryTitle = styled.h2`
  font-size: 22px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 8px;
  padding-bottom: 12px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;
