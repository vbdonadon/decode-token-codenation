import React, { Component } from 'react';

import sha1 from 'sha1';

import { Container, Row, Box, Button, InputToken } from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
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
      `/generate-data?token=1ef8bab35e62e32dd8e6579b39d874dc7d5d894f`
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

    // This function return all the letters encrypted;
    const encryptedToCharCode = () => {
      const charCodeEncrypted = [];
      for (let index = 0; index < encrypted.length; index += 1) {
        charCodeEncrypted.push(encrypted.charCodeAt(index));
      }

      return charCodeEncrypted;
    };

    const charCodeToDecodedString = value => {
      const charCode = value;
      const decodedCharCode = [];
      let decodedString = '';

      for (let index = 0; index < charCode.length; index += 1) {
        const code = charCode[index];

        // Threating exceptions like " ", ".";
        if (code < 97 || code > 122) {
          decodedCharCode.push(String.fromCharCode(code));
        } else {
          const realCode = code - spacing;
          const filter = 96;

          // If the constant realCode is not a valid letter, do this treatment.
          if (realCode < 97) {
            const threatedCode = filter - realCode;
            decodedCharCode.push(String.fromCharCode(122 - threatedCode));
          } else {
            decodedCharCode.push(String.fromCharCode(realCode));
          }
        }
      }

      decodedString = decodedCharCode.join('');

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
            <form onSubmit={this.handleSubmit} encType="multipart/form-data">
              <label htmlFor="token" className="title">
                Token:
              </label>
              <InputToken
                onKeyUp={this.handleKeyUp}
                type="text"
                id="token"
                value={token}
                readOnly
              />
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
