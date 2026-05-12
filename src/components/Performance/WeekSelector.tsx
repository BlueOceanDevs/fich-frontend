import React from "react";
import styled from "styled-components";

// ─────────────────────────────────────────────
// Week selector dropdown — used in "Weekly
// Positions" and "Weekly BUYs and SELLs". One
// dropdown drives BOTH sections per the mockup
// (no separate selector for the trades table).
// Native <select> styled to match the dark theme;
// can be upgraded to a searchable combobox later
// if 332 weeks gets unwieldy.
// ─────────────────────────────────────────────

interface Props {
  value: string;                            // ISO date "yyyy-MM-dd"
  options: string[];                         // descending — newest first
  onChange: (next: string) => void;
  disabled?: boolean;
}

/** Format ISO date "2026-04-26" → "2026-04-26" (kept ISO; matches the mockup). */
function formatLabel(iso: string): string {
  return iso;
}

const WeekSelector: React.FC<Props> = ({ value, options, onChange, disabled }) => {
  return (
    <Wrap>
      <Select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        aria-label="Select week"
      >
        {options.map((d) => (
          <option key={d} value={d}>
            {formatLabel(d)}
          </option>
        ))}
      </Select>
    </Wrap>
  );
};

export default WeekSelector;

const Wrap = styled.div`
  display: inline-block;
`;

const Select = styled.select`
  /* Right padding leaves room for the bigger chevron. */
  padding: 10px 44px 10px 16px;
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;

  /* Custom dropdown arrow. Bumped from 12px to 18px and made it
     thicker + brighter so it's obvious this is a dropdown rather
     than a static label. */
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%23B8B8C8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>");
  background-repeat: no-repeat;
  background-position: right 14px center;
  background-size: 18px;

  &:hover:not(:disabled) {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
