import React from 'react';
import Shelf from './Shelf';
import PropTypes from 'prop-types';

class Bookcase extends React.Component {
  static propTypes = {
    returnBook: PropTypes.func.isRequired,
    openBook: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = {
      filter: 'default'
    };
    this.handleSort = this.handleSort.bind(this);
  }

  handleSort(e) {
    this.setState({
      filter: e.target.name
    });
  }

  render() {
    const shelfArr = this.props.state.shelves.map(shelf =>
      Object.values(this.props.state.books)
        .filter(book => book.shelfId === shelf)
        .map(book => ({
          id: book.id,
          text: book.text,
          authorLastName: this.props.state.authors[book.authorId].lastName,
          authorFirstName: this.props.state.authors[book.authorId].firstName
        }))
    );

    const sortBy = criteria => {
      return (a, b) => {
        if (a[criteria].toUpperCase() > b[criteria].toUpperCase()) return 1;
        if (a[criteria].toUpperCase() < b[criteria].toUpperCase()) return -1;
        return 0;
      };
    };
    let newArr;
    switch (this.state.filter) {
      case 'authorLastName':
        newArr = [...shelfArr].map(shelf =>
          [...shelf].sort(sortBy('text')).sort(sortBy('authorLastName'))
        );
        break;
      case 'text':
        newArr = [...shelfArr].map(shelf => [...shelf].sort(sortBy('text')));
        break;
      case 'default':
      default:
        newArr = shelfArr;
        break;
    }

    return (
      <div>
        Sort by:
        <button name="authorLastName" onClick={this.handleSort}>
          Author&#39;s last name
        </button>
        <button name="text" onClick={this.handleSort}>
          Book title
        </button>
        <button name="default" onClick={this.handleSort}>
          Not sorted
        </button>
        {newArr.map((shelf, index) =>
          <Shelf
            key={index}
            books={shelf}
            returnBook={this.props.returnBook}
            openBook={this.props.openBook}
            draggingBookId={
              this.props.state.draggingBook
                ? this.props.state.draggingBook.id
                : null
            }
          />
        )}
      </div>
    );
  }
}

export default Bookcase;
