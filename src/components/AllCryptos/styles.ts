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

export const HeaderLeft = styled.div`
  max-width: 550px;
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
  line-height: 1.6;
`;

export const AvatarGroup = styled.div`
  display: flex;
  gap: 0;
`;

export const Avatar = styled.div<{ $color: string }>`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 700;
  color: white;
  margin-left: -8px;
  border: 2px solid ${({ theme }) => theme.colors.background};

  &:first-child {
    margin-left: 0;
  }
`;

export const CryptoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const CryptoCard = styled.div`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  transition: border-color 0.3s, transform 0.3s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
    transform: translateY(-2px);
  }
`;

export const CryptoIcon = styled.div<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: ${({ $color }) => $color}22;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: ${({ $color }) => $color};
  flex-shrink: 0;
`;

export const CryptoInfo = styled.div``;

export const CryptoName = styled.div`
  font-size: 14px;
  font-weight: 600;
`;

export const CryptoSymbol = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
`;

export const MiniChart = styled.div<{ $positive: boolean }>`
  width: 80px;
  height: 32px;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.primary : theme.colors.danger};
  flex-shrink: 0;

  svg {
    width: 100%;
    height: 100%;
  }
`;

export const CryptoPrice = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-align: right;
`;

export const CryptoChange = styled.div<{ $positive: boolean }>`
  font-size: 12px;
  text-align: right;
  color: ${({ $positive, theme }) =>
    $positive ? theme.colors.primary : theme.colors.danger};
`;

export const BuyLink = styled.a`
  display: inline-block;
  margin-top: 32px;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`;
