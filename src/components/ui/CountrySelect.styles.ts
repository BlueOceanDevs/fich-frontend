import styled, { css } from "styled-components";

// Shared visual shape with <Input> and <Select> so the combobox sits
// naturally inside the existing auth / profile forms. Kept in its own
// file per the project convention (no inline styles in the component).

export const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

export const Control = styled.div<{ $hasError?: boolean; $open?: boolean; $disabled?: boolean }>`
  position: relative;
  width: 100%;
  height: 44px;
  display: flex;
  align-items: center;
  padding: 0 36px 0 14px;
  background: ${({ theme }) => theme.colors.backgroundLight};
  border: 1px solid
    ${({ theme, $hasError, $open }) =>
      $hasError
        ? theme.colors.danger
        : $open
        ? theme.colors.primary
        : theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "text")};
  transition: border-color 0.2s, box-shadow 0.2s;

  ${({ $open, $hasError, theme }) =>
    $open &&
    css`
      box-shadow: 0 0 0 3px
        ${$hasError ? `${theme.colors.danger}20` : `${theme.colors.primary}20`};
    `}

  /* Chevron — matches the <Select> styling so the combobox looks like
     a native picker to the user. Pure CSS; no icon dependency. */
  &::after {
    content: "";
    position: absolute;
    right: 14px;
    top: 50%;
    width: 10px;
    height: 7px;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%238A8A9A' d='M6 8L0 0h12z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-size: contain;
    transform: translateY(-50%) ${({ $open }) => ($open ? "rotate(180deg)" : "rotate(0)")};
    transition: transform 0.15s ease;
    pointer-events: none;
  }
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  height: 100%;
  background: transparent;
  border: none;
  outline: none;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  padding: 0;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;

export const SelectedDisplay = styled.span<{ $muted?: boolean }>`
  flex: 1;
  min-width: 0;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${({ theme, $muted }) =>
    $muted ? theme.colors.textMuted : theme.colors.text};
`;

export const Popup = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;
  z-index: 40;
  max-height: 240px;
  overflow-y: auto;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);

  /* Faint scrollbar so the ~250-item list doesn't dominate the visual
     but users can still see where they are. */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.cardBorder};
    border-radius: 4px;
  }
`;

export const Option = styled.div<{ $highlighted?: boolean; $selected?: boolean }>`
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.text};
  background: ${({ theme, $highlighted }) =>
    $highlighted ? theme.colors.backgroundLight : "transparent"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;

  /* Keep hover + keyboard highlight visually consistent. */
  &:hover {
    background: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

export const OptionCode = styled.span`
  font-size: 12px;
  color: ${({ theme }) => theme.colors.textMuted};
  font-variant-numeric: tabular-nums;
  flex-shrink: 0;
`;

export const EmptyState = styled.div`
  padding: 12px 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;
