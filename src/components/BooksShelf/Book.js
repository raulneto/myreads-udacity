import React , { Component } from 'react';
import PropTypes from 'prop-types';

class Book extends Component {


    handleShelfChange = (e) => {
        let newValue = e.target.value;
        this.props.booksShelfChange(this, newValue)
    }

    render() {
        const { title } = this.props.book;


        if (this.props.book.shelf === undefined) {
            this.props.book.shelf = 'none';
        }

        if (this.props.book.imageLinks === undefined ) {
            this.props.book.imageLinks['thumbnail'] = ''
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{ width: 128,
                        height: 193,
                        backgroundImage: `url("${this.props.book.imageLinks.thumbnail}")`
                        }}
                    />
                    <div className="book-shelf-changer">
                        <select onChange={this.handleShelfChange} defaultValue={this.props.book.shelf}>
                            <option value="none" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead" >Want to Read</option>
                            <option value="read" >Read</option>
                            <option value="none" >None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{this.props.book.authors ? this.props.book.authors.join(", ") : ''}</div>
            </div>
        )
    }
}
Book.propTypes = {
    book: PropTypes.object.isRequired,
    booksShelfChange: PropTypes.func.isRequired
}

export default Book