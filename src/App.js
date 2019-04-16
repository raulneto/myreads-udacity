import React, { Component } from 'react'
import * as BooksAPI from './utils/BooksAPI'
import './App.css'

import Search from './components/Search/Search'
import Shelf from './components/BooksShelf/Shelf'

import { Route, Link } from 'react-router-dom'

class App extends Component {

	state = {
		books: []
	}

	componentDidMount() {
		this.getAllBooks()
	}
	
	moveBookShelf = (book, newValue) => {

		book.props.book.shelf = newValue;
  
		this.setState( (state) => ({
			books: state.books.filter( (b) => b.id !== book.props.book.id).concat([book.props.book])
		}))
  
		BooksAPI.update(book.props.book, newValue);
	}

	getAllBooks = () => {
		BooksAPI.getAll().then((books) => {
			this.setState({
				books: books
			})
		})
	}

	render() {
		const { books } = this.state
		return (
			<div className="app">
				<Route exact path='/' render={() => (
					<div className="list-books">
						<div className="list-books-title">
							<h1>MyReads</h1>
						</div>
						<div className="list-books-content">
							<div>
								<Shelf
									title="Currently Reading"
									cat="currentlyReading"
									books={books.filter(bs => bs.shelf === 'currentlyReading')}
									onBookShelfChange={this.moveBookShelf}
								/>
								<Shelf
									title="Want to Read"
									cat="wantToRead"
									books={books.filter(bs => bs.shelf === 'wantToRead')}
									onBookShelfChange={this.moveBookShelf}
								/>
								<Shelf
									title="Read"
									cat="read"
									books={books.filter(bs => bs.shelf === 'read')}
									onBookShelfChange={this.moveBookShelf}
								/>
							</div>
						</div>
						<div className="open-search">
							<Link
								to="/search"
							>
							Add a book
							</Link>
						</div>
					</div>
				)} />
				<Route path='/search' render={() => (
					<Search
						bsBooks={books}
                		onBookShelfChange={this.moveBookShelf}
					 />
				)} />
			</div>
		)
	}
}

export default App
