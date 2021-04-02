import React from "react";
import {
    API_URL,
    API_KEY3
} from "../../../api/api";
import { fetchAPI } from "../../../api/fetchApi";
import AppContextHOC from "../../HOC/AppContextHOC";

class LoginForm extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            repeatPassword: "",
            errors: {},
            submitting: false
        }
    }

    onChange = event => {
        const name = event.target.name;
        const value = event.target.value;
        this.setState(prevState => ({
            [name]: value,
            errors: {
                ...prevState.errors,
                [name]: null,
                base: null
            }
        }))
    };

    validateFields = () => {
        const errors = {};
        const passwordRegex = /(?=.*\d)(?=.*[a-zA-Z]).*$/;

        if (this.state.username === "") {
            errors.username = "Username field can not be empty"
        }
        if (!passwordRegex.test(this.state.password)) {
            errors.password = "Password should contain letters and digits"
        }
        if (this.state.password !== this.state.repeatPassword) {
            errors.repeatPassword = "Repeat password should be the same as the password"
        }
        return errors
    };

    onSubmit = async () => {
        this.setState({
            submitting: true
        });
        try {
            const data = await fetchAPI(`${API_URL}/authentication/token/new?api_key=${API_KEY3}`)
            const result = await fetchAPI(`${API_URL}/authentication/token/validate_with_login?api_key=${API_KEY3}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    username: this.state.username,
                    password: this.state.password,
                    request_token: data.request_token
                })
            });
            const {session_id} = await fetchAPI(`${API_URL}//authentication/session/new?api_key=${API_KEY3}`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    request_token: result.request_token
                })
            });
            this.props.updateSessionId(session_id);
            const userAccount = await fetchAPI(`${API_URL}/account?api_key=${API_KEY3}&session_id=${session_id}`)
            this.setState({
                submitting: false,
            }, () => {
                this.props.updateUser(userAccount)
            })
        } catch (error) {
            this.setState({
                submitting: false,
                errors: {
                    base: error.status_message
                }
            })
        }
    };

    onLogin = event => {
        event.preventDefault();
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }))
        } else {
            this.onSubmit()
        }
    };

    handlerBlur = () => {
        const errors = this.validateFields();
        if (Object.keys(errors).length > 0) {
            this.setState(prevState => ({
                errors: {
                    ...prevState.errors,
                    ...errors
                }
            }))
        }
    };

    render() {
        const { username, password, repeatPassword, errors, submitting } = this.state;
        return (
            <div className="form-login-container">
                <form action="" className="form-login">
                    <h1 className="h3 mb-3 font-weight-normal text-center">
                        Авторизация
                    </h1>
                    <div className="form-group">
                        <label htmlFor="username">Пользователь</label>
                        <input 
                            type="text"
                            className={errors.username ? "form-control border border-danger" : "form-control"}
                            id="username"
                            placeholder="Пользователь"
                            name="username"
                            value={username}
                            onChange={this.onChange}
                            onBlur={this.handlerBlur}
                        />
                             {errors.username && (
                        <div className="invalid-feedback">{errors.username}</div>
                    )}
                    </div>
               
                    <div className="form-group">
                        <label htmlFor="password">Пароль</label>
                        <input 
                            type="password"
                            className={errors.password ? "form-control border border-danger" : "form-control"}
                            id="password"
                            placeholder="Пароль"
                            name="password"
                            value={password}
                            onChange={this.onChange}
                            onBlur={this.handlerBlur}
                        />
                             {errors.password && (
                        <div className="invalid-feedback">{errors.password}</div>
                    )}
                    </div>
                    <div className="form-group">
                        <label htmlFor="repeatPassword">Повторить пароль</label>
                        <input 
                            type="password"
                            className={errors.repeatPassword ? "form-control border border-danger" : "form-control"}
                            id="repeatPassword"
                            placeholder="Повторить пароль"
                            name="repeatPassword"
                            value={repeatPassword}
                            onChange={this.onChange}
                            onBlur={this.handlerBlur}
                        />
                             {errors.repeatPassword && (
                        <div className="invalid-feedback">{errors.repeatPassword}</div>
                    )}
                    </div>
                </form>
                <button className="btn btn-lg btn-primary btn-block"
                type="submit"
                onClick={this.onLogin}
                disabled={submitting}
                >
                    Вход
                </button>
                {errors.base && (
                        <div className="invalid-feedback mt-3 text-center">{errors.base}</div>
                    )}
            </div>
        )
    }
}

export default AppContextHOC(LoginForm)