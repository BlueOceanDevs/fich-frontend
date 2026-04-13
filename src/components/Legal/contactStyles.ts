import styled, { keyframes } from "styled-components";

export const ContactGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const ContactFieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const ContactLabel = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const ContactInput = styled.input`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const ContactTextarea = styled.textarea`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: inherit;
  resize: vertical;
  min-height: 120px;
  transition: border-color 0.2s;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

export const ContactSpinner = styled.span`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid currentColor;
  border-top-color: transparent;
  border-radius: 50%;
  animation: ${spin} 0.6s linear infinite;
`;

export const ContactSubmitButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 32px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.background};
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.primaryHover};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ContactSuccess = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 24px;
  background: ${({ theme }) => `${theme.colors.primary}12`};
  border: 1px solid ${({ theme }) => `${theme.colors.primary}30`};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-size: 15px;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: 500;
`;

export const ContactInfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    grid-template-columns: 1fr;
  }
`;

export const ContactInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 20px 24px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
`;

export const ContactInfoIcon = styled.div`
  width: 44px;
  height: 44px;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  background: ${({ theme }) => `${theme.colors.primary}14`};
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const ContactInfoText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

export const ContactInfoTitle = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.3px;
`;

export const ContactInfoValue = styled.a`
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.primary};
  text-decoration: none;

  &:hover {
    opacity: 0.8;
  }
`;
