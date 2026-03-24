import styled from "styled-components";

export const Section = styled.section`
  padding: 100px 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.divider};
`;

export const Container = styled.div`
  max-width: ${({ theme }) => theme.maxWidth};
  margin: 0 auto;
`;

export const Header = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 48px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  margin-bottom: 12px;
  letter-spacing: -0.5px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 450px;
  line-height: 1.6;
`;

export const CreateLink = styled.a`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  white-space: nowrap;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;

export const StepsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const StepCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  overflow: hidden;
  transition: border-color 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const StepImage = styled.div`
  width: 100%;
  height: 180px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
`;

export const StepIconWrapper = styled.div<{ $color: string }>`
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ $color }) => $color}18;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $color }) => $color};
`;

export const StepTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  padding: 20px 20px 8px;
`;

export const StepDescription = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  padding: 0 20px 24px;
  line-height: 1.6;
`;
