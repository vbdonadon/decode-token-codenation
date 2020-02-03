import React, { Component } from 'react';

// Libs
import sha1 from 'sha1';
import { getApi, postApi } from '../../services/api';

// Styled Components
import { Container, Row, Box, Button, InputToken } from './styles';

// Assets
import codenation from '../../assets/codenation.svg';

export default class Main extends Component {
  state = {
    token: '',
    encrypted: '',
    decoded: '',
    spacing: '',
    sha1: '',
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { token } = this.state;
    const response = await getApi.get(`/generate-data?token=${token}`);

    // Getting data from API
    const { cifrado: encrypted, numero_casas } = response.data;

    this.setState({ encrypted, spacing: numero_casas });
  };

  // Setting the token value
  handleKeyUp = event => {
    const { value } = event.target;

    this.setState({ token: value });
  };

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

    // This function will get the return of encryptedToCharCode function to transform into
    // a String decoded.
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

  handleSha1 = () => {
    const { decoded } = this.state;
    this.setState({ sha1: sha1(decoded) });
  };

  sendData = async () => {
    const { spacing, token, encrypted, decoded, sha1 } = this.state;
    const formData = new FormData();
    formData.append(
      'answer',
      {
        numero_casas: spacing,
        token,
        cifrado: encrypted,
        decifrado: decoded,
        resumo_criptografico: sha1,
      },
      'answer.json'
    );

    await postApi.post(
      `submit-solution?token=${token}`,
      {
        formData,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  };

  render() {
    const { token, encrypted, spacing, decoded, sha1 } = this.state;

    return (
      <Container>
        <Box>
          <header>
            <img src={codenation} alt="Logo da Codenation AceleraDEV" />
            <span className="tooltip">?</span>
          </header>

          <Row>
            <form
              onSubmit={this.handleSubmit}
              className="input-form"
              encType="multipart/form-data"
            >
              <label htmlFor="token" className="title">
                Token:
              </label>
              <InputToken onKeyDown={this.handleKeyUp} type="text" id="token" />
            </form>
          </Row>

          <Row>
            <header>
              <strong className="title">Encrypted:</strong>
              <code> rule: {spacing}</code>
            </header>
            <pre>
              <code>
                {encrypted ||
                  'If the token value is already ready, just click on Get Data.'}
              </code>
            </pre>
            <Button disabled={!token} onClick={this.handleDecode}>
              Decode
            </Button>
          </Row>

          <Row>
            <strong className="title">Decoded:</strong>
            <pre>
              <code>
                {decoded ||
                  'If the encrypted value is already ready, just click on decode.'}
              </code>
            </pre>
            <Button disabled={!decoded} onClick={this.handleSha1}>
              Encrypt to SHA1
            </Button>
          </Row>

          <Row>
            <strong className="title">SHA1:</strong>
            <pre>
              <code>
                {sha1 ||
                  'If the decoded value is already ready, just click on Encrypt to Sha1.'}
              </code>
            </pre>
          </Row>

          <Button onClick={this.sendData}>Send Data</Button>
        </Box>
      </Container>
    );
  }
}
