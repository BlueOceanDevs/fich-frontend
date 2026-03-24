import React from "react";
import styled, { css, keyframes } from "styled-components";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type Direction = "up" | "down" | "left" | "right" | "none";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  stagger?: number;
  className?: string;
}

const getTranslate = (direction: Direction, distance: number) => {
  switch (direction) {
    case "up":
      return `translateY(${distance}px)`;
    case "down":
      return `translateY(-${distance}px)`;
    case "left":
      return `translateX(${distance}px)`;
    case "right":
      return `translateX(-${distance}px)`;
    case "none":
      return "translate(0, 0)";
  }
};

const Wrapper = styled.div<{
  $visible: boolean;
  $direction: Direction;
  $delay: number;
  $duration: number;
  $distance: number;
}>`
  opacity: 0;
  transform: ${({ $direction, $distance }) =>
    getTranslate($direction, $distance)};
  transition: opacity ${({ $duration }) => $duration}ms ease-out,
    transform ${({ $duration }) => $duration}ms ease-out;
  transition-delay: ${({ $delay }) => $delay}ms;

  ${({ $visible }) =>
    $visible &&
    css`
      opacity: 1;
      transform: translate(0, 0);
    `}
`;

const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  direction = "up",
  delay = 0,
  duration = 700,
  distance = 40,
  threshold = 0.15,
  className,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold });

  return (
    <Wrapper
      ref={ref}
      $visible={isVisible}
      $direction={direction}
      $delay={delay}
      $duration={duration}
      $distance={distance}
      className={className}
    >
      {children}
    </Wrapper>
  );
};

export default ScrollReveal;

/* StaggerChildren: Wraps multiple items and staggers their reveal */
interface StaggerChildrenProps {
  children: React.ReactNode;
  direction?: Direction;
  staggerDelay?: number;
  duration?: number;
  distance?: number;
  threshold?: number;
  className?: string;
}

const StaggerWrapper = styled.div``;

export const StaggerChildren: React.FC<StaggerChildrenProps> = ({
  children,
  direction = "up",
  staggerDelay = 100,
  duration = 700,
  distance = 40,
  threshold = 0.1,
  className,
}) => {
  const { ref, isVisible } = useScrollReveal({ threshold });

  return (
    <StaggerWrapper ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <Wrapper
          $visible={isVisible}
          $direction={direction}
          $delay={index * staggerDelay}
          $duration={duration}
          $distance={distance}
        >
          {child}
        </Wrapper>
      ))}
    </StaggerWrapper>
  );
};
