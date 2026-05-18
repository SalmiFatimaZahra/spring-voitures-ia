import React, { Component } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

export default class MyToast extends Component {
  render() {
    return (
      <div>
        <ToastContainer position="top-end" className="p-3">
          <Toast bg={this.props.children.type === 'success' ? 'success' : 'danger'}>
            <Toast.Header closeButton={false}>
              <strong className="me-auto">
                {this.props.children.type === 'success' ? 'Succès' : 'Suppression'}
              </strong>
            </Toast.Header>
            <Toast.Body className="text-white">
              {this.props.children.message}
            </Toast.Body>
          </Toast>
        </ToastContainer>
      </div>
    );
  }
}