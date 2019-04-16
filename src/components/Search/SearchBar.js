import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Debounce } from 'react-throttle';

class SearchBar extends Component {

    render() {
        const { clearQuery, onInputChange } = this.props
        return(
            <div className="search-books-bar">
                <Link
                    to="/"
                    className="close-search"
                    onClick={clearQuery}
                >
                    Close
                </Link>
                <div className="search-books-input-wrapper">
                    <Debounce time="200" handler="onChange">
                        <input type="text" placeholder="Search by title or author" onChange={(event) => onInputChange(event.target.value)}/>
                    </Debounce>
                </div>
            </div>
        )
    }
}

SearchBar.propTypes = {
    clearQuery: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired
}

export default SearchBar