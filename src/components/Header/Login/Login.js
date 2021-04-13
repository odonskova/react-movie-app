import React from "react";
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from "./LoginForm.jsx"

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            showModal: false
        }
    }
    toggleModal = () => {
        this.setState({
            showModal: !this.state.showModal
        })

    };

    render() {
        return ( 
            <div>
                <button type = "button"
                        className = "btn btn-success"
                        onClick = {this.toggleModal}>
                    Login 
                </button>
                <Modal isOpen={this.state.showModal} toggle={this.toggleModal}>
                    <ModalBody>
                        <LoginForm/>
                    </ModalBody>
                </Modal>
            </div>

        )
    }
}