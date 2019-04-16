import React, { Component } from 'react'
import * as BooksAPI from '../../utils/BooksAPI'
import SearchBar from './SearchBar'
import Book from '../BooksShelf/Book'
import PropTypes from 'prop-types';


class Search extends Component {
	state = {
        booksResult: [],
        query: ''
    }

    handleChange = (query) => {
        this.setState({
            query: query
        })
        this.searchBooks(query)
    }

    intersect = (a, b) => {
        let t;
        if (b.length > a.length) {
            t = b;
            b = a;
            a = t;
        }
        return a.filter(function (e) {
            return b.indexOf(e) > -1;
        });
    }

    searchBooks = (query) => {
        if(query === '') {
            this.setState({
                booksResult: []
            })

            return
        }

        BooksAPI.search(query, 20).then((books) => {
            this.updateBookSearchState(books);
            if (books !== undefined && books.error !== "empty query") {
                this.setState({
                    booksResult: books
                })
            } else {
                this.setState({
                    booksResult: []
                })
            }

        })
    }

    updateBookSearchState = (books) => {

        if (books !== undefined && books.error !== "empty query") {
            let bookIds = books.map(book => book.id);
            let currentlyReadingIntersect = this.intersect(bookIds, this.props.bsBooks.filter((cr) => cr.shelf === 'currentlyReading').map(b => b.id));
            let readIntersects = this.intersect(bookIds, this.props.bsBooks.filter(r => r.shelf === 'read').map((b) => b.id));
            let wantToReadIntersects = this.intersect(bookIds, this.props.bsBooks.filter((wr) => wr.shelf === 'wantToRead').map((b) => b.id));

            for (let i = 0; i < books.length; i++) {
                if (currentlyReadingIntersect.includes(books[i].id)) {
                    books[i].shelf = 'currentlyReading';
                }
                if (readIntersects.includes(books[i].id)) {
                    books[i].shelf = 'read';
                }
                if (wantToReadIntersects.includes(books[i].id)) {
                    books[i].shelf = 'wantToRead';
                }
            }
        }
    }

    clearQuery = () => {
        this.setState({
            booksResult: []
        })
    }

    handleBookShelfChange = (book, shelf) => {
        this.props.onBookShelfChange(book, shelf);
    }

	render() {
        const { booksResult } = this.state
		return (
            <div className="search-books">
                <SearchBar
                    clearQuery={this.clearQuery}
                    onInputChange={this.handleChange}
                />
                <div className="search-books-results">
                    <ol className="books-grid">
                        {booksResult.map(book => (
                            <li key={book.id}>
                                <Book
                                    book={book}
                                    booksShelfChange={this.handleBookShelfChange}
                                />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

Search.PropTypes = {
    bsBooks: PropTypes.array.isRequired,
    onBookShelfChange: PropTypes.func.isRequired
}

export default Search
