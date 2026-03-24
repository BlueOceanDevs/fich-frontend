import styled from "styled-components";

export const TaglineSection = styled.section`
  padding: 100px 24px;
  text-align: center;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
  border-bottom: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const TaglineText = styled.h2`
  font-size: 36px;
  font-weight: 500;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 650px;
  margin: 0 auto;
  letter-spacing: -0.5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 24px;
  }
`;
