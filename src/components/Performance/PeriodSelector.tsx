import React from "react";
import styled from "styled-components";
import type { PerformancePagePeriod } from "@/api/types";

// ─────────────────────────────────────────────
// Period selector — 5 pills at the top of the
// /performance page. Drives the headline stats
// + equity-curve chart filtering. Other sections
// (monthly returns, weekly views, winners/losers,
// cash%) are independent of this control.
// ─────────────────────────────────────────────

interface Option {
  value: PerformancePagePeriod;
  label: string;
}

const OPTIONS: Option[] = [
  { value: "SixMonths", label: "6 Months" },
  { value: "OneYear", label: "1 Year" },
  { value: "TwoYears", label: "2 Years" },
  { value: "ThreeYears", label: "3 Years" },
  { value: "Inception", label: "Since Inception" },
];

interface Props {
  value: PerformancePagePeriod;
  onChange: (next: PerformancePagePeriod) => void;
  disabled?: boolean;
}

const PeriodSelector: React.FC<Props> = ({ value, onChange, disabled }) => {
  return (
    <Wrap role="tablist" aria-label="Performance period">
      {OPTIONS.map((o) => (
        <Pill
          key={o.value}
          $active={o.value === value}
          onClick={() => !disabled && onChange(o.value)}
          disabled={disabled}
          role="tab"
          aria-selected={o.value === value}
          type="button"
        >
          {o.label}
        </Pill>
      ))}
    </Wrap>
  );
};

export default PeriodSelector;

const Wrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  padding: 6px;
  width: fit-content;
  margin: 0 auto 16px;
`;

const Pill = styled.button<{ $active: boolean }>`
  padding: 8px 18px;
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: none;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.2px;
  cursor: pointer;
  transition: background 0.15s, color 0.15s;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.primary : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.background : theme.colors.textSecondary};

  &:hover:not(:disabled):not([aria-selected="true"]) {
    background: ${({ theme }) => theme.colors.backgroundLight};
    color: ${({ theme }) => theme.colors.text};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
