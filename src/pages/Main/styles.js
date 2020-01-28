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
`;

export const Row = styled.div`
  margin: 20px 0 20px 0;

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
  padding: 8px 8px;
  border: 0;
  color: white;
  font-size: 16px;
  background: #667db6;
  display: block;
  margin: 10px 0 0 auto;
  border-radius: 4px;
`;

export const InputToken = styled.input`
  width: 100%;
  padding: 5px 10px;
  font-size: 18px;
  border-radius: 4px;
  border: 1px solid #222;
`;
