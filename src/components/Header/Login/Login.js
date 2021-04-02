import React from "react";
import { Modal, ModalBody } from 'reactstrap';
import LoginForm from "./LoginForm.jsx"

// in order to get access to the list of users or some data about users
// beforehand we should get some token or sessionId
// API movieDB works in such a way that having API KEY we can get token
// Having request-token we can get sessionID
// Having sessionID we will be able to send request to get users
// 1. Get request to get token: `${API_URL}/authentication/token/new?api_key=${API_KEY3}`
// 2. Post request to validate_with_login: `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY3}`
// 3. post request to get sessionID `${API_URL}//authentication/session/new?api_key=${API_KEY3}`


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