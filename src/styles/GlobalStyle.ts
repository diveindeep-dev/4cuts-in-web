import { createGlobalStyle } from 'styled-components';
import './Font.css';

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    text-decoration: none;
  }

  html {
    font-size: 100%;
    min-width: max-content;
  }

  ol,
  ul,
  li {
    list-style: none;
    padding-left: 0px;
    margin: 0;
  }

  body {
    margin: 0 auto;
  }

  a {
    color: inherit;
  }

  input {
    border: none;
    background: transparent;
    &:focus {
      outline: none;
    }
  }

  button {
    border: none;
    background: none;
    padding: 0;

    &:focus {
      outline: none;
    }
    &:hover {
      cursor: pointer;
    }
  }

  h1,
  h2,
  h3,
  h4 {
    margin: 0;
  }

  p {
    margin: 0;
  }
`;

export default GlobalStyle;
