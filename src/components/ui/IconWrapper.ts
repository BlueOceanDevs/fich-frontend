import styled from "styled-components";

// ─────────────────────────────────────────────
// Icon Wrapper
// Colored background circle/square for icons
// ─────────────────────────────────────────────

export const IconCircle = styled.div<{ $color: string; $size?: number }>`
  width: ${({ $size }) => $size || 40}px;
  height: ${({ $size }) => $size || 40}px;
  border-radius: 50%;
  background: ${({ $color }) => `${$color}22`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

export const IconSquare = styled.div<{ $color: string; $size?: number }>`
  width: ${({ $size }) => $size || 40}px;
  height: ${({ $size }) => $size || 40}px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  background: ${({ $color }) => `${$color}18`};
  color: ${({ $color }) => $color};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;
