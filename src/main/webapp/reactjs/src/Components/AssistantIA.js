import React, { Component } from 'react';
import { Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default class AssistantIA extends Component {
    constructor(props) {
        super(props);
        this.state = {
            question: '',
            reponse: '',
            loading: false,
            error: ''
        };
    }

    handleChange = (event) => {
        this.setState({ question: event.target.value });
    };

    poserQuestion = async (event) => {
        event.preventDefault();

        if (!this.state.question.trim()) {
            this.setState({ error: 'Veuillez saisir une question.' });
            return;
        }

        this.setState({
            loading: true,
            reponse: '',
            error: ''
        });

        try {
            const response = await axios.post(
                'http://localhost:9090/ai/conseil',
                this.state.question,
                {
                    headers: {
                        'Content-Type': 'text/plain'
                    },
                    auth: {
                        username: 'user',
                        password: 'admin'
                    }
                }
            );

            this.setState({
                reponse: response.data,
                loading: false
            });
        } catch (error) {
            this.setState({
                error: "Erreur lors de l'appel à l'assistant IA.",
                loading: false
            });
        }
    };

    render() {
        return (
            <Card className="m-4">
                <Card.Header>
                    <h4>Assistant IA Automobile</h4>
                </Card.Header>

                <Card.Body>
                    <p>
                        Posez une question à l'assistant IA. Il utilisera les voitures disponibles
                        dans la base de données pour vous conseiller.
                    </p>

                    <Form onSubmit={this.poserQuestion}>
                        <Form.Group className="mb-3">
                            <Form.Label>Votre question</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={this.state.question}
                                onChange={this.handleChange}
                                placeholder="Exemple : Quelle voiture me conseillez-vous avec un budget de 100000 ?"
                            />
                        </Form.Group>

                        <Button type="submit" variant="primary" disabled={this.state.loading}>
                            {this.state.loading ? (
                                <>
                                    <Spinner animation="border" size="sm" /> Analyse en cours...
                                </>
                            ) : (
                                'Demander conseil'
                            )}
                        </Button>
                    </Form>

                    {this.state.error && (
                        <Alert variant="danger" className="mt-3">
                            {this.state.error}
                        </Alert>
                    )}

                    {this.state.reponse && (
                        <Alert variant="success" className="mt-3">
                            <strong>Réponse IA :</strong>
                            <br />
                            {this.state.reponse}
                        </Alert>
                    )}
                </Card.Body>
            </Card>
        );
    }
}