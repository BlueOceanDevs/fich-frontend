import styled from "styled-components";

// ─────────────────────────────────────────────
// Base Card
// Standard card with border, hover lift effect
// ─────────────────────────────────────────────

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  transition: border-color 0.3s, transform 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

// ─────────────────────────────────────────────
// Static Card
// Card without hover effects (for content display)
// ─────────────────────────────────────────────

export const StaticCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;
