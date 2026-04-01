import styled from "styled-components";

// ─────────────────────────────────────────────
// Section
// Standard page section with top divider
// ─────────────────────────────────────────────

export const Section = styled.section`
  padding: 100px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

// ─────────────────────────────────────────────
// Container
// Centered max-width wrapper
// ─────────────────────────────────────────────

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

// ─────────────────────────────────────────────
// Section Header
// Flex row: title area left, optional action right
// ─────────────────────────────────────────────

export const SectionHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 48px;
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const SectionHeaderLeft = styled.div``;
