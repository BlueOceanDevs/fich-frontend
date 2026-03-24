import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styled from "styled-components";

const Main = styled.main`
  min-height: 100vh;
`;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

export default Layout;
