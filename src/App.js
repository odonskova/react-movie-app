import React from "react";
import Header from "./components/Header/Header";
import MoviesPage from "./components/Pages/MoviesPages/MoviesPage";
import MovieDetails from "./components/Pages/MovieDetails/MovieDetails";
import {BrowserRouter, Route} from "react-router-dom";
import Cookies from 'universal-cookie';
import {API_URL, API_KEY3} from "./api/api"
import { fetchAPI } from "./api/fetchApi"
import Favorites from "./components/Favorites/Favorites";

const cookies = new Cookies();
export const AppContext = React.createContext();

export default class App extends React.Component {
    constructor() {
        super();
        this.state =   {
            user: null,
            session_id: null,
            favorites: [],
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
        this.setState({
            favorites: JSON.parse(localStorage.getItem("favorites")) || []
        })
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

    addToFavorites = movie => {
        let movieIndex = this.state.favorites.findIndex(item => item.id === movie.id);
        if (movieIndex === -1) {
            this.setState(prevState => ({
                favorites: [...prevState.favorites, movie]
            }), () => {
                const jsonFavorites = JSON.stringify(this.state.favorites);
                localStorage.setItem("favorites", jsonFavorites)
            });
        }
    };

    removeFromFavorites= (movieId) =>{
        const updateFavoritesList = this.state.favorites.filter(
            item => item.id !== movieId);
        this.setState({
            favorites: updateFavoritesList
        }, () => {
            const jsonFavorites = JSON.stringify(this.state.favorites);
            localStorage.setItem("favorites", jsonFavorites)
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
                    onLogOut: this.onLogOut,
                    favorites: this.state.favorites,
                    addToFavorites: this.addToFavorites,
                    removeFromFavorites: this.removeFromFavorites
                }}>
                    <Header user={user}/>
                    <Route exact path="/" component={MoviesPage} />
                    <Route exact path="/favorites" component={Favorites} />
                    <Route exact path="/movie/:id/:movie_title" component={MovieDetails} />
                </AppContext.Provider>
            </BrowserRouter>
        );
    }
}

