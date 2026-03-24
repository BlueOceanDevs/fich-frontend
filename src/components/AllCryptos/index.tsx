import React from "react";
import { useAppSelector } from "@/store/hooks";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Section,
  Container,
  Header,
  HeaderLeft,
  Title,
  Subtitle,
  CryptoGrid,
  CryptoCard,
  CryptoIcon,
  CryptoInfo,
  CryptoName,
  CryptoSymbol,
  CryptoPrice,
  CryptoChange,
  MiniChart,
  BuyLink,
  AvatarGroup,
  Avatar,
} from "./styles";

const AllCryptos: React.FC = () => {
  const assets = useAppSelector((s) => s.crypto.assets);

  return (
    <Section id="cryptos">
      <Container>
        <ScrollReveal>
          <Header>
            <HeaderLeft>
              <Title>All Cryptos, One Platform</Title>
              <Subtitle>
                Buy, sell, and convert all major cryptocurrencies on a single
                platform. A seamless experience with no compromises.
              </Subtitle>
            </HeaderLeft>
            <AvatarGroup>
              <Avatar $color="#F7931A">₿</Avatar>
              <Avatar $color="#627EEA">Ξ</Avatar>
              <Avatar $color="#9945FF">◎</Avatar>
            </AvatarGroup>
          </Header>
        </ScrollReveal>

        <ScrollReveal delay={150}>
          <CryptoGrid>
            {assets.map((asset) => (
              <CryptoCard key={asset.id}>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <CryptoIcon $color={asset.color}>{asset.icon}</CryptoIcon>
                  <CryptoInfo>
                    <CryptoName>{asset.name}</CryptoName>
                    <CryptoSymbol>{asset.symbol}</CryptoSymbol>
                  </CryptoInfo>
                </div>
                <MiniChart $positive={asset.changePositive}>
                  <svg viewBox="0 0 80 32" fill="none">
                    {asset.changePositive ? (
                      <polyline
                        points="0,24 12,20 24,22 36,14 48,16 60,8 72,12 80,4"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    ) : (
                      <polyline
                        points="0,8 12,12 24,10 36,18 48,16 60,24 72,20 80,28"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                      />
                    )}
                  </svg>
                </MiniChart>
                <div>
                  <CryptoPrice>{asset.price}</CryptoPrice>
                  <CryptoChange $positive={asset.changePositive}>
                    {asset.change}
                  </CryptoChange>
                </div>
              </CryptoCard>
            ))}
          </CryptoGrid>
        </ScrollReveal>

        <ScrollReveal delay={300}>
          <BuyLink href="#">
            Buy crypto now &rarr;
          </BuyLink>
        </ScrollReveal>
      </Container>
    </Section>
  );
};

export default AllCryptos;
