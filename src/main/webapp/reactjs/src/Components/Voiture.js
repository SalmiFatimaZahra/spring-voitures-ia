import React, { Component } from 'react';
import { Card, Form, Button, Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faUndo } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

export default class Voiture extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: '',
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      prix: '',
      annee: '',
      show: false
    };

    this.voitureChange = this.voitureChange.bind(this);
    this.submitVoiture = this.submitVoiture.bind(this);
    this.resetVoiture = this.resetVoiture.bind(this);
  }

  voitureChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  resetVoiture() {
    this.setState({
      id: '',
      marque: '',
      modele: '',
      couleur: '',
      immatricule: '',
      prix: '',
      annee: '',
      show: false
    });
  }

  submitVoiture(event) {
    event.preventDefault();

    const voiture = {
      marque: this.state.marque,
      modele: this.state.modele,
      couleur: this.state.couleur,
      immatricule: this.state.immatricule,
      prix: this.state.prix,
      annee: this.state.annee
    };

    if (this.state.id) {
      axios.put('http://localhost:9090/voitures/' + this.state.id, voiture, {
        auth: {
          username: 'user',
          password: 'admin'
        }
      })
        .then(response => {
          if (response.data != null) {
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios.post('http://localhost:9090/voitures', voiture, {
        auth: {
          username: 'user',
          password: 'admin'
        }
      })
        .then(response => {
          if (response.data != null) {
            this.resetVoiture();
            this.setState({ show: true });
            setTimeout(() => this.setState({ show: false }), 3000);
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  componentDidMount() {
    const path = window.location.pathname;

    if (path.startsWith('/edit/')) {
      const id = path.split('/')[2];

      axios.get('http://localhost:9090/voitures/' + id, {
        auth: {
          username: 'user',
          password: 'admin'
        }
      })
        .then(response => response.data)
        .then((voiture) => {
          if (voiture != null) {
            this.setState({
              id: voiture.id,
              marque: voiture.marque,
              modele: voiture.modele,
              couleur: voiture.couleur,
              immatricule: voiture.immatricule,
              prix: voiture.prix,
              annee: voiture.annee
            });
          }
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast>
            {{
              show: this.state.show,
              message: this.state.id ? 'Voiture modifiée avec succès' : 'Voiture enregistrée avec succès',
              type: 'success'
            }}
          </MyToast>
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            {this.state.id ? 'Modifier Voiture' : 'Ajouter Voiture'}
          </Card.Header>

          <Form onSubmit={this.submitVoiture} onReset={this.resetVoiture} id="VoitureFormId">
            <Card.Body>
              <Row>
                <Form.Group as={Col} controlId="formGridMarque">
                  <Form.Label>Marque</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="marque"
                    value={this.state.marque}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Marque Voiture"
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridModele">
                  <Form.Label>Modele</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="modele"
                    value={this.state.modele}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Modele Voiture"
                    autoComplete="off"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridCouleur">
                  <Form.Label>Couleur</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="couleur"
                    value={this.state.couleur}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Couleur Voiture"
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridImmatricule">
                  <Form.Label>Immatricule</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="immatricule"
                    value={this.state.immatricule}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Immatricule Voiture"
                    autoComplete="off"
                  />
                </Form.Group>
              </Row>

              <Row>
                <Form.Group as={Col} controlId="formGridPrix">
                  <Form.Label>Prix</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="prix"
                    value={this.state.prix}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Prix Voiture"
                    autoComplete="off"
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridAnnee">
                  <Form.Label>Annee</Form.Label>
                  <Form.Control
                    required
                    type="number"
                    name="annee"
                    value={this.state.annee}
                    onChange={this.voitureChange}
                    className="bg-dark text-white"
                    placeholder="Entrez Annee Voiture"
                    autoComplete="off"
                  />
                </Form.Group>
              </Row>
            </Card.Body>

            <Card.Footer style={{ textAlign: 'right' }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} /> Submit
              </Button>{' '}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
            </Card.Footer>
          </Form>
        </Card>
      </div>
    );
  }
}