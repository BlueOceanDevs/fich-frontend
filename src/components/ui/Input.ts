import styled from "styled-components";

export const Input = styled.input<{ $hasError?: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError
          ? `${theme.colors.danger}20`
          : `${theme.colors.primary}20`};
  }
`;

export const Label = styled.label`
  font-size: 13px;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FieldRow = styled.div`
  display: flex;
  gap: 12px;

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
  }

  & > ${FieldGroup} {
    flex: 1;
  }
`;

export const FieldError = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.danger};
`;

/**
 * Select control that visually matches <Input>. Used for the country
 * dropdown on signup + profile. Native <select> is intentional — it
 * gives us free keyboard navigation, touch-scroll on mobile, and a
 * ~250-entry country list would be overkill to render in a custom popup.
 */
export const Select = styled.select<{ $hasError?: boolean }>`
  width: 100%;
  height: 44px;
  padding: 0 14px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-family: inherit;
  transition: border-color 0.2s, box-shadow 0.2s;
  outline: none;
  // Reset the platform-native chevron so the control blends with Input;
  // we re-add a subtle triangle via background-image below.
  appearance: none;
  -webkit-appearance: none;
  background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%238A8A9A' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 10px 7px;
  padding-right: 36px;

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError
          ? `${theme.colors.danger}20`
          : `${theme.colors.primary}20`};
  }
`;
