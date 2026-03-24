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
  gap: 40px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    flex-direction: column;
    gap: 16px;
  }
`;

export const HeaderLeft = styled.div``;

export const Title = styled.h2`
  font-size: 36px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: 28px;
  }
`;

export const Subtitle = styled.p`
  font-size: 15px;
  color: ${({ theme }) => theme.colors.textSecondary};
  max-width: 420px;
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

export const FaqGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0 32px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    grid-template-columns: 1fr;
  }
`;

export const FaqItem = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.01);
  }
`;

export const FaqQuestion = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  font-size: 15px;
  font-weight: 500;
  gap: 16px;
`;

export const FaqIcon = styled.span<{ $open: boolean }>`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: transform 0.3s;
  transform: rotate(${({ $open }) => ($open ? "45deg" : "0deg")});
`;

export const FaqAnswer = styled.div<{ $open: boolean }>`
  max-height: ${({ $open }) => ($open ? "200px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease, padding 0.3s ease;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.7;
  padding-bottom: ${({ $open }) => ($open ? "20px" : "0")};
`;
