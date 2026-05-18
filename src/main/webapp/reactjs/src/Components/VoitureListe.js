import React, { Component } from 'react';
import { Card, Table, ButtonGroup, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faList } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { Link } from 'react-router-dom';

export default class VoitureListe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      voitures: [],
      show: false
    };
  }

  componentDidMount() {
    axios.get('http://localhost:9090/voitures', {
      auth: {
        username: 'user',
        password: 'admin'
      }
    })
      .then(response => response.data)
      .then((data) => {
        console.log(data);
        this.setState({ voitures: data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteVoiture = (voitureId) => {
    axios.delete('http://localhost:9090/voitures/' + voitureId, {
      auth: {
        username: 'user',
        password: 'admin'
      }
    })
      .then(response => {
        if (response != null) {
          this.setState({
            voitures: this.state.voitures.filter(voiture => voiture.id !== voitureId)
          });
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <div>
        <div style={{ display: this.state.show ? 'block' : 'none' }}>
          <MyToast>
            {{
              show: this.state.show,
              message: 'Voiture supprimée avec succès',
              type: 'danger'
            }}
          </MyToast>
        </div>

        <Card className="border border-dark bg-dark text-white">
          <Card.Header>
            <FontAwesomeIcon icon={faList} /> Liste des Voitures
          </Card.Header>

          <Card.Body>
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Marque</th>
                  <th>Modele</th>
                  <th>Couleur</th>
                  <th>Immatricule</th>
                  <th>Annee</th>
                  <th>Prix</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {
                  this.state.voitures.length === 0 ?
                    <tr align="center">
                      <td colSpan="7">Aucune Voiture n&apos;est disponible</td>
                    </tr>
                    :
                    this.state.voitures.map((voiture) => (
                      <tr key={voiture.id}>
                        <td>{voiture.marque}</td>
                        <td>{voiture.modele}</td>
                        <td>{voiture.couleur}</td>
                        <td>{voiture.immatricule}</td>
                        <td>{voiture.annee}</td>
                        <td>{voiture.prix}</td>
                        <td>
                          <ButtonGroup>
                            <Link
                              to={"/edit/" + voiture.id}
                              className="btn btn-sm btn-outline-primary"
                            >
                              <FontAwesomeIcon icon={faEdit} />
                            </Link>{' '}

                            <Button
                              size="sm"
                              variant="outline-danger"
                              onClick={this.deleteVoiture.bind(this, voiture.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </Button>
                          </ButtonGroup>
                        </td>
                      </tr>
                    ))
                }
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}