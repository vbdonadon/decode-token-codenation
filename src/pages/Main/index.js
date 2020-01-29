import React, { Component } from 'react';

import { Container, Row, Box, Button, InputToken } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    getToken: '',
    token: '',
    encrypted: '',
    decoded: '',
    spacing: '',
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    const response = await api.get(
      `/generate-data?token=b4dec9bfe985a48a2209f2790bfe77a0ec7be914`
    );

    // Getting data from API
    const { token, cifrado: encrypted, numero_casas } = response.data;

    this.setState({ token, encrypted, spacing: numero_casas });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  handleKeyUp = () => {};

  handleDecode = () => {
    const { encrypted, spacing } = this.state;

    const encryptedToCharCode = () => {
      const charCodeEncrypted = [];
      // Getting all the letters encrypted
      for (let index = 0; index < encrypted.length; index += 1) {
        charCodeEncrypted.push(encrypted.charCodeAt(index));
      }

      return charCodeEncrypted;
    };

    const charCodeToDecodedString = value => {
      const charCode = value;
      const decodedCharCode = [];
      const decodedString = decodedCharCode.join('');

      // Necessário verificar se o charCode - spacing é menor do que o alphabet charCode
      for (let index = 0; index < charCode.length; index += 1) {
        if (encrypted.charCodeAt(index) === 97) {
          decodedCharCode.push(String.fromCharCode(120));
        } else if (encrypted.charCodeAt(index) === 98) {
          decodedCharCode.push(String.fromCharCode(121));
        } else if (encrypted.charCodeAt(index) === 99) {
          decodedCharCode.push(String.fromCharCode(122));
        } else if (encrypted.charCodeAt(index) === 32) {
          decodedCharCode.push(' ');
        } else if (encrypted.charCodeAt(index) === 46) {
          decodedCharCode.push('.');
        } else {
          decodedCharCode.push(String.fromCharCode(charCode[index] - 3));
        }
      }

      return decodedString;
    };

    charCodeToDecodedString(encryptedToCharCode());

    this.setState({ decoded: charCodeToDecodedString(encryptedToCharCode()) });
  };

  render() {
    const { token, encrypted, spacing, decoded } = this.state;

    return (
      <Container>
        <Box>
          <Row>
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="token" className="title">
                Token:
              </label>
              <InputToken onKeyUp={this.handleKeyUp} type="text" id="token" value={token} readOnly />
              <Button type="submit">Get Data</Button>
            </form>
          </Row>

          <Row>
            <strong className="title">Encrypted:</strong>
            <pre>
              <code>{encrypted}</code>
            </pre>
            <Button onClick={this.handleDecode}>Decode</Button>
          </Row>

          <Row>
            <strong className="title">Decoded:</strong>
            <pre>
              <code>{decoded}</code>
            </pre>
          </Row>

          {spacing}
        </Box>
      </Container>
    );
  }
}
