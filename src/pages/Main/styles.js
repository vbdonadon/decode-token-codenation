import styled from 'styled-components';

export const Container = styled.div`
  padding: 20px 20px;
`;

export const Box = styled.div`
  display: block;
  max-width: 700px;
  margin: 0 auto;

  background: white;
  padding: 20px 20px;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 0 10px 0;

    img {
      margin: 0; padding: 0;
      display: block;
      width: 100%;
      max-width: 250px;
    }

    .tooltip {
      font-weight: 600;
      font-size: 14px;
      color: #FFF;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      width: 25px;
      height: 25px;
      border-radius: 50%;
      background-color: #667db6;
      position: relative;

      &:hover::after {
        content: 'Esta aplicação é feita completamente em React.js e não tem compromisso algum de ser segura, pois todo o código da aplicação é aberto.';
        display: block;
        background-color: #0082c8;
        position: absolute;
        top: 0;
        left: calc(50% + 20px);
        font-weight: 300;
        padding: 10px;
        border-radius: 4px;
        box-shadow: 0 0 20px rgba(255, 255, 255, 0.4);
      }
    }
  }
`;

export const Row = styled.div`
  margin: 20px 0 20px 0;

  .input-form {
    position: relative;

    &::after {
      content: 'Enter';
      position: absolute;
      background-color: #667db6;
      color: #FFF;
      border-radius: 4px;
      padding: 5px;
      right: 5px;
      bottom: 4px;
    }
  }

  .title {
    font-size: 24px;
    font-weight: 600;
    display: block;
    margin: 0 0 10px 0;
  }

  pre {
    background-color: #f6faf3;
    border-left: 2px solid #667db6;
    padding: 9px 20px;
    overflow: hidden;

    code {
      font-size: 18px;
    }
  }
`;

export const Button = styled.button`
  width: 100%;
  max-width: 150px;
  padding: 8px 8px;
  border: 0;
  color: white;
  font-size: 16px;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  background: ${props =>
    props.disabled ? 'rgba(102,125,182,.4)' : 'rgba(102,125,182,1)'};
  display: block;
  margin: 10px 0 0 auto;
  border-radius: 4px;
  transition: background 0.4s ease;
`;

export const InputToken = styled.input`
  width: 100%;
  padding: 5px 60px 6px 10px;
  font-size: 18px;
  border-radius: 4px;
  border: 1px solid #222;
`;
