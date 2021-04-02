import React from "react";
import Header from "./components/Header/Header";
import MoviesPage from "./components/Pages/MoviesPages/MoviesPage";
import MovieDetails from "./components/Pages/MovieDetails/MovieDetails";
import {BrowserRouter, Route} from "react-router-dom";
import Cookies from 'universal-cookie';
import {API_URL, API_KEY3} from "./api/api"
import { fetchAPI } from "./api/fetchApi"

const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
    constructor() {
        super();
        this.state =   {
            user: null,
            session_id: null,
        }}

    componentDidMount() {
        const session_id = cookies.get("session_id");
        if (session_id) {
            fetchAPI(`${API_URL}/account?api_key=${API_KEY3}&session_id=${session_id}`)
                .then(user => {
                    this.updateUser(user);
                    this.updateSessionId(session_id)
                })
        }
    }

    updateUser = user => {
        this.setState({user})
    };

    updateSessionId = session_id => {
        this.setState({session_id});
        cookies.set("session_id", session_id, {
            path: "/",
            maxAge: 2592000
        })
    };

    onLogOut = () => {
        cookies.remove("session_id");
        this.setState({
            user: null,
            session_id: null
        })
    };

    render() {
        const { user, session_id} = this.state;
        return (
            <BrowserRouter>
                <AppContext.Provider value={{
                    user,
                    session_id,
                    updateUser: this.updateUser,
                    updateSessionId: this.updateSessionId,
                    onLogOut: this.onLogOut
                }}>
                    <Header user={user}/>
                    <Route exact path="/" component={MoviesPage}/>
                    <Route exact path="/movie/:id/:movie_title" component={MovieDetails}/>
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

