import React from "react";
import styled from "styled-components";

// ─────────────────────────────────────────────
// Disclosure header — sits between the 6-stat
// row and the equity-curve chart on the public
// /performance page. Static text; if the legal
// wording ever needs to be tweaked, edit it here.
// ─────────────────────────────────────────────

const Disclosure: React.FC = () => (
  <Wrap>
    <Label>Disclosure:</Label>{" "}
    All numbers account for a 0.10% commission per trade side. The strategy
    only executes trades on the Top 150 Altcoins by market cap, rebalanced
    weekly.
  </Wrap>
);

export default Disclosure;

const Wrap = styled.p`
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textSecondary};
  line-height: 1.6;
  text-align: center;
  max-width: 880px;
  margin: 0 auto;
  padding: 0 16px;
  font-style: italic;
`;

const Label = styled.span`
  font-style: normal;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
`;
