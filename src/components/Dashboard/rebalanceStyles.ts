import styled from "styled-components";

export const RebalanceRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
`;

export const RebalanceTime = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const RebalanceGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    gap: 16px;
  }
`;

export const RebalanceStat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const RebalanceStatValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;
