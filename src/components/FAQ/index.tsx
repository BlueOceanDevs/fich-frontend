import React from "react";
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
} from "./styles";

const FAQ: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items, openId } = useAppSelector((s) => s.faq);

  const leftItems = items.filter((_, i) => i % 2 === 0);
  const rightItems = items.filter((_, i) => i % 2 !== 0);

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
            <CreateLink href="#">Create account now &rarr;</CreateLink>
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
      </Container>
    </Section>
  );
};

export default FAQ;
