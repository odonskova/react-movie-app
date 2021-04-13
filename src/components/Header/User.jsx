import React from "react";
import { Link } from "react-router-dom";
import AppContextHOC from "../HOC/AppContextHOC";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { fetchAPI } from "../../api/fetchApi";
import { API_URL, API_KEY3 } from "../../api/api";

// in order to get access to the list of users or some data about users
// beforehand we should get some token or sessionId
// API movieDB works in such a way that having API KEY we can get token
// Having request-token we can get sessionID
// Having sessionID we will be able to send request to get users
// 1. Get request to get token: `${API_URL}/authentication/token/new?api_key=${API_KEY3}`
// 2. Post request to validate_with_login: `${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY3}`
// 3. post request to get sessionID `${API_URL}//authentication/session/new?api_key=${API_KEY3}`

class User extends React.Component {
    state = {
        dropdownOpen: false
    };

    toggleDropDown = () => {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        })
    };

    handleLogOut = () => {
        fetchAPI(`${API_URL}/authentication/session?api_key=${API_KEY3}`, {
            method: "DELETE",
            mode: "cors",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                session_id: this.props.session_id
            })
        }).then(() => {
            this.props.onLogOut();
        })
    };

    render() {
        const { user } = this.props;
        return (
            <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggleDropDown}>
                <DropdownToggle
                    caret
                    tag="div"
                    onClick={this.toggleDropDown}
                    data-toggle="dropdown"
                    aria-expanded={this.state.dropdownOpen}
                >
                    <img width="40" className="rounded-circle"
                         src={`https://secure.gravatar.com/avatar/${
                             user.avatar.gravatar.hash
                         }.jpg?s=64`}
                         alt="Avatar"/>
                </DropdownToggle>
                <DropdownMenu right>
                    <DropdownItem>
                        <Link to="/" className="menu-link">Главная страница</Link>
                    </DropdownItem>
                    <DropdownItem>
                       <Link to="/favorites" className="menu-link">Избранные</Link>
                    </DropdownItem>
                    <DropdownItem
                        onClick={this.handleLogOut}
                    >
                        Выйти
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
        )
    }
}
export default AppContextHOC(User);