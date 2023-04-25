import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './layouts';
import Index from './pages';
import PhotoBooth from './pages/PhotoBooth';
import Code from './pages/Code';
import GlobalStyle from './styles/GlobalStyle';

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Layout>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/photobooth" element={<PhotoBooth />} />
          <Route path="/code" element={<Code />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
