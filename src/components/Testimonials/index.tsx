import React from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { nextTestimonial, prevTestimonial } from "@/store/testimonialSlice";
import { FaChevronLeft, FaChevronRight, FaQuoteRight } from "react-icons/fa";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Section,
  Container,
  Header,
  HeaderLeft,
  Title,
  Subtitle,
  TestimonialCard,
  BadgeRow,
  Badge,
  QuoteText,
  AuthorName,
  AuthorRole,
  QuoteIcon,
  NavRow,
  NavButton,
  NavLabel,
} from "./styles";

const Testimonials: React.FC = () => {
  const dispatch = useAppDispatch();
  const { testimonials, activeIndex } = useAppSelector((s) => s.testimonials);
  const current = testimonials[activeIndex];

  return (
    <Section id="testimonials">
      <Container>
        <ScrollReveal>
          <Header>
            <HeaderLeft>
              <Title>
                Trusted by Crypto
                <br />
                Enthusiasts Worldwide
              </Title>
            </HeaderLeft>
            <Subtitle>
              Join a growing community of investors who choose Fich for its
              seamless experience, security, and premium design.
            </Subtitle>
          </Header>
        </ScrollReveal>

        <ScrollReveal delay={200} direction="left" distance={30}>
          <TestimonialCard>
            <BadgeRow>
              <Badge $color="#627EEA">★</Badge>
              <Badge $color="#00D897">✦</Badge>
            </BadgeRow>
            <QuoteText>&ldquo;{current.text}&rdquo;</QuoteText>
            <AuthorName>{current.name}</AuthorName>
            <AuthorRole>{current.role}</AuthorRole>
            <QuoteIcon>
              <FaQuoteRight size={20} />
            </QuoteIcon>
          </TestimonialCard>

          <NavRow>
            <NavButton onClick={() => dispatch(prevTestimonial())}>
              <FaChevronLeft size={14} />
              <NavLabel>Previous</NavLabel>
            </NavButton>
            <NavButton onClick={() => dispatch(nextTestimonial())}>
              <NavLabel>Next</NavLabel>
              <FaChevronRight size={14} />
            </NavButton>
          </NavRow>
        </ScrollReveal>
      </Container>
    </Section>
  );
};

export default Testimonials;
