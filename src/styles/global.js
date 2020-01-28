import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Fira+Sans:300,400,500,600,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
    font-family: 'Fira Sans', sans-serif;
  }

  html, body, #root {
    min-height: 100%;
  }

  body {
    background: #667db6;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #667db6, #0082c8, #0082c8, #667db6); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

    display: block;
    min-height: 100vh;
    -webkit-font-smoothing: antialiased!important;
  }

  body, input, button {
    color: #222;
    font-size: 14px;
    font-family: 'Fira Sans', sans-serif;
  }

  button {
    cursor: pointer;
  }
`;
