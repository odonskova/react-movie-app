import React from "react";
import {Container} from "reactstrap";
import MovieItem from "../Movies/MovieItem";
import AppContextHOC from "../HOC/AppContextHOC";

class Favorites extends React.Component {
   render() {
        const { favorites, removeFromFavorites } = this.props;
           return (
            <Container>
                <div className="row mt-4">
                    {favorites.map(movie => {
                        return (
                            <div key={movie.id} className="col-4 mb-4">
                                <MovieItem
                                    item={movie}
                                    showDelete={true}
                                    removeFromFavorites={removeFromFavorites}
                                />
                            </div>
                        )
                    })}
                </div>
            </Container>
        )
    }
}

export default AppContextHOC(Favorites)
