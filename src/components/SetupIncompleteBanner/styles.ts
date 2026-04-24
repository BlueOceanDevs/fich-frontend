import styled from "styled-components";

// Visual shape mirrors the old inline banner that lived in profile.tsx
// before the Apr 2 "clean up profile page" refactor — primary-tinted
// gradient with a rounded CTA button. Kept in a styles file per repo
// convention.

export const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 18px 24px;
  margin-bottom: 24px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => `${theme.colors.primary}18`} 0%,
    ${({ theme }) => `${theme.colors.primary}08`} 100%
  );
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    text-align: center;
  }
`;

export const BannerText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const BannerTitle = styled.span`
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;

export const BannerHint = styled.span`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const BannerButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 22px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
  }
`;
