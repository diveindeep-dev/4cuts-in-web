import React, { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import styled from 'styled-components';
import { colorAll } from '../styles/Variables';

interface LayoutProps {
  children: ReactNode;
}

const LAYOUT = styled.div`
  background-color: ${colorAll.back};
`;

function Layout({ children }: LayoutProps) {
  return (
    <LAYOUT>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </LAYOUT>
  );
}

export default Layout;
