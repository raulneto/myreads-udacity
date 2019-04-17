import React , { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Book extends PureComponent {

    handleShelfChange = (e) => {
        let newValue = e.target.value;
        this.props.booksShelfChange(this, newValue)
    }

    render() {
        const { book } = this.props;

        if (book.shelf === undefined) {
            book.shelf = 'none';
        }

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover"
                        style={{ width: 128,
                        height: 193,
                        backgroundImage:`url(${
                            book.imageLinks && book.imageLinks.thumbnail
                            ? `${book.imageLinks.thumbnail}`
                            : `http://via.placeholder.com/128x193?text=No%20Cover`
                            })`
                        }}
                    />
                    <div className="book-shelf-changer">
                        <select onChange={this.handleShelfChange} defaultValue={book.shelf}>
                            <option value="" disabled>Move to...</option>
                            <option value="currentlyReading" >Currently Reading</option>
                            <option value="wantToRead" >Want to Read</option>
                            <option value="read" >Read</option>
                            <option value="none" >None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">{book.authors ? book.authors.join(", ") : ''}</div>
            </div>
        )
    }
}
Book.propTypes = {
    book: PropTypes.object.isRequired,
    booksShelfChange: PropTypes.func.isRequired
}

export default Book