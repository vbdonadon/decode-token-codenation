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

  handleKeyUp = event => {};

  handleDecode = event => {
    const { encrypted } = this.state;
    const encryptedArray = [];

    for (let i = 0; i <= encrypted.length; i += 1) {
      encryptedArray.push(encrypted.charCodeAt(i));
    }
  };

  render() {
    const { token, encrypted, spacing } = this.state;

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
              <code>{encrypted}</code>
            </pre>
          </Row>

          {spacing}
        </Box>
      </Container>
    );
  }
}
