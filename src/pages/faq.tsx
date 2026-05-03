import React from "react";
import Head from "next/head";
import { FaPlus } from "react-icons/fa";
import Layout from "@/components/Layout";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  toggleFaq,
  FAQ_CATEGORY_LABELS,
  type FaqCategory,
  type FaqItem as FaqItemType,
} from "@/store/faqSlice";
import {
  FaqPageSection,
  FaqPageContainer,
  FaqPageTitle,
  FaqPageSubtitle,
  CategoryBlock,
  CategoryTitle,
} from "@/components/FAQ/pageStyles";
import {
  FaqItem,
  FaqQuestion,
  FaqIcon,
  FaqAnswer,
} from "@/components/FAQ/styles";

// Display order of categories on the page — security first because
// it's the most-asked / most-anxious topic, risk last because it's
// the small-print disclaimer block.
const CATEGORY_ORDER: FaqCategory[] = [
  "security",
  "strategy",
  "logistics",
  "risk",
];

/**
 * Public `/faq` route — full FAQ page with all 16 questions grouped
 * by category. The homepage's `<FAQ />` block shows only 4 featured
 * questions plus a "Read more" link to this page.
 */
export default function FaqPage() {
  const dispatch = useAppDispatch();
  const { items, openId } = useAppSelector((s) => s.faq);

  // Bucket the master list by category once. Items inside each bucket
  // preserve the slice's declared order (the slice is already sorted
  // by intended display order within each category).
  const byCategory = CATEGORY_ORDER.map((cat) => ({
    category: cat,
    items: items.filter((it) => it.category === cat),
  })).filter((g) => g.items.length > 0);

  return (
    <>
      <Head>
        <title>FAQ - Fich</title>
        <meta
          name="description"
          content="Frequently asked questions about Fich — security, strategy, setup, and risk. Everything you need to know before connecting your Binance account."
        />
      </Head>
      <Layout>
        <FaqPageSection>
          <FaqPageContainer>
            <FaqPageTitle>Frequently Asked Questions</FaqPageTitle>
            <FaqPageSubtitle>
              Everything you need to know about Fich — from security and
              strategy to setup and the realities of running a momentum bot.
            </FaqPageSubtitle>

            {byCategory.map(({ category, items: catItems }) => (
              <CategoryBlock key={category}>
                <CategoryTitle>{FAQ_CATEGORY_LABELS[category]}</CategoryTitle>
                {catItems.map((item: FaqItemType) => (
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
              </CategoryBlock>
            ))}
          </FaqPageContainer>
        </FaqPageSection>
      </Layout>
    </>
  );
}
