import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import Book from './Book';
import './Shelf.css';

const target = {
  drop(props, monitor) {
    props.returnBook(monitor.getItem().id);
  }
};

class Shelf extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    returnBook: PropTypes.func.isRequired,
    openBook: PropTypes.func.isRequired,
    books: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired,
        authorFirstName: PropTypes.string.isRequired,
        authorLastName: PropTypes.string.isRequired
      })
    ),
    draggingBookId: PropTypes.number
  };

  render() {
    const { connectDropTarget, books, draggingBookId, openBook } = this.props;

    return connectDropTarget(
      <div className="bookshelf">
        {books.map((book, i) => {
          if (book.id !== draggingBookId) {
            return (
              <Book
                openBook={openBook.bind(null, book.id)}
                key={book.id}
                id={book.id}
                text={book.text}
                authorLastName={book.authorLastName}
                authorFirstName={book.authorFirstName}
              />
            );
          }
          return null;
        })}
      </div>
    );
  }
}

export default DropTarget(ItemTypes.BOOK, target, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Shelf);
