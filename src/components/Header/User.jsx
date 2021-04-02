import React from "react";
import AppContextHOC from "../HOC/AppContextHOC";
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { fetchAPI } from "../../api/fetchApi";
import { API_URL, API_KEY3 } from "../../api/api";


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
                        Избранные
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