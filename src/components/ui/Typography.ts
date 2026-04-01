import styled from "styled-components";

// ─────────────────────────────────────────────
// Section Title (h2)
// ─────────────────────────────────────────────

export const SectionTitle = styled.h2`
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.5px;
  line-height: 1.2;
  margin-bottom: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 28px;
  }
`;

// ─────────────────────────────────────────────
// Section Subtitle
// ─────────────────────────────────────────────

export const SectionSubtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
`;

// ─────────────────────────────────────────────
// Divider
// Horizontal line with "or" text in center
// ─────────────────────────────────────────────

export const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin: 4px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: ${({ theme }) => theme.colors.divider};
  }

  span {
    font-size: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;
