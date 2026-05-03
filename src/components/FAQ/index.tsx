import React from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { toggleFaq } from "@/store/faqSlice";
import { FaPlus } from "react-icons/fa";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Section,
  Container,
  Header,
  HeaderLeft,
  Title,
  Subtitle,
  CreateLink,
  FaqGrid,
  FaqItem,
  FaqQuestion,
  FaqIcon,
  FaqAnswer,
  ReadMoreRow,
  ReadMoreLink,
} from "./styles";

// Homepage FAQ — shows only the 4 questions tagged
// `featuredOnHomepage` in the slice, with a "Read more" link routing
// to the full /faq page. Two-column layout matches the existing
// design vocabulary.
const FAQ: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, openId } = useAppSelector((s) => s.faq);

  // Slice's master list contains all 16 entries; filter to the
  // homepage-featured subset.
  const featured = items.filter((it) => it.featuredOnHomepage);

  const leftItems = featured.filter((_, i) => i % 2 === 0);
  const rightItems = featured.filter((_, i) => i % 2 !== 0);

  return (
    <Section id="faq">
      <Container>
        <ScrollReveal>
          <Header>
            <HeaderLeft>
              <Title>Your Questions, Answered</Title>
              <Subtitle>
                Find everything you need to know about Fich, from security to
                supported assets.
              </Subtitle>
            </HeaderLeft>
            <CreateLink href="/signup">Create account now &rarr;</CreateLink>
          </Header>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <FaqGrid>
            <div>
              {leftItems.map((item) => (
                <FaqItem
                  key={item.id}
                  onClick={() => dispatch(toggleFaq(item.id))}
                >
                  <FaqQuestion>
                    {item.question}
                    <FaqIcon $open={openId === item.id}>
                      <FaPlus size={12} />
                    </FaqIcon>
                  </FaqQuestion>
                  <FaqAnswer $open={openId === item.id}>
                    {item.answer}
                  </FaqAnswer>
                </FaqItem>
              ))}
            </div>
            <div>
              {rightItems.map((item) => (
                <FaqItem
                  key={item.id}
                  onClick={() => dispatch(toggleFaq(item.id))}
                >
                  <FaqQuestion>
                    {item.question}
                    <FaqIcon $open={openId === item.id}>
                      <FaPlus size={12} />
                    </FaqIcon>
                  </FaqQuestion>
                  <FaqAnswer $open={openId === item.id}>
                    {item.answer}
                  </FaqAnswer>
                </FaqItem>
              ))}
            </div>
          </FaqGrid>
        </ScrollReveal>

        <ReadMoreRow>
          <Link href="/faq" passHref legacyBehavior>
            <ReadMoreLink>Read more &rarr;</ReadMoreLink>
          </Link>
        </ReadMoreRow>
      </Container>
    </Section>
  );
};

export default FAQ;
