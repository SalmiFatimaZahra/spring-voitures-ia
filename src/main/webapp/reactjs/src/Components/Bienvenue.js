import React from 'react';
import { Card } from 'react-bootstrap';

class Bienvenue extends React.Component {
  render() {
    return (
      <Card className="bg-dark text-white">
        <Card.Body>
          <h1>Bienvenue dans votre Magasin de Voitures</h1>
          <blockquote className="blockquote mb-0">
            <p>Le meilleur de nos voitures est exposé près de chez vous</p>
            <footer className="blockquote-footer">
              Master MIOLA
            </footer>
          </blockquote>
        </Card.Body>
      </Card>
    );
  }
}

export default Bienvenue;