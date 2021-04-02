import React from "react";
import Login from "./Login/Login";
import { Link } from "react-router-dom";
import User from "./User";

export default class Header extends React.Component {
    render() {
        const {user} = this.props;

        return (
            <nav className="navbar navbar-dark bg-primary">
                <div className="container">
                    <ul className="navbar-nav">
                        <Link to="/" className="nav-item nav-link active">
                            Home
                        </Link>
                    </ul>
                    { user ? <User /> : <Login />}
                </div>
            </nav>
        )
    }

}