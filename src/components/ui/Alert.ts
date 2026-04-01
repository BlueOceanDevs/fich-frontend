import styled, { css } from "styled-components";

export const Alert = styled.div<{ $variant?: "error" | "success" }>`
  padding: 12px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 13px;
  line-height: 1.5;

  ${({ theme, $variant = "error" }) =>
    $variant === "error"
      ? css`
          background: ${theme.colors.danger}15;
          border: 1px solid ${theme.colors.danger}30;
          color: ${theme.colors.danger};
        `
      : css`
          background: ${theme.colors.success}15;
          border: 1px solid ${theme.colors.success}30;
          color: ${theme.colors.success};
        `}
`;
