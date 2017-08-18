import React from 'react';
import './BookCase.css';
import Sortable from './SortableContainer';
import { v4 } from 'uuid';

const sortBy = criteria => {
  return (a, b) => {
    if (a[criteria].toUpperCase && b[criteria].toUpperCase) {
      if (a[criteria].toUpperCase() > b[criteria].toUpperCase()) return 1;
      if (a[criteria].toUpperCase() < b[criteria].toUpperCase()) return -1;
      return 0;
    } else {
      if (a[criteria] > b[criteria]) return 1;
      if (a[criteria] < b[criteria]) return -1;
      return 0;
    }
  };
};

class BookCase extends React.Component {
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
    const sortedShelfArr = this.props.state.shelves.map(shelf =>
      Object.values(this.props.state.books)
        .filter(book => book.shelfId === shelf)
        .map(book => ({
          id: book.id,
          text: book.text,
          authorLastName: this.props.state.authors[book.authorId].lastName,
          authorFirstName: this.props.state.authors[book.authorId].firstName,
          left: book.left,
          top: book.top
        }))
    );

    console.log('Handle sort');
    // console.log(this.props.sortedShelfArr);
    const shelfArr = sortedShelfArr;
    const sortBy = criteria => {
      return (a, b) => {
        if (a[criteria].toUpperCase && b[criteria].toUpperCase) {
          if (a[criteria].toUpperCase() > b[criteria].toUpperCase()) return 1;
          if (a[criteria].toUpperCase() < b[criteria].toUpperCase()) return -1;
          return 0;
        } else {
          if (a[criteria] > b[criteria]) return 1;
          if (a[criteria] < b[criteria]) return -1;
          return 0;
        }
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
        newArr = [...shelfArr].map(shelf => [...shelf]);
        break;
    }

    return (
      <div>
        <button name="default" onClick={this.handleSort}>
          Not sorted
        </button>
        <button name="authorLastName" onClick={this.handleSort}>
          Author last name
        </button>
        <button name="text" onClick={this.handleSort}>
          Book title
        </button>

        {newArr.map(shelf =>
          <Sortable
            key={v4()}
            cards={shelf}
            returnBook={this.props.returnBook}
            openBook={this.props.openBook}
          />
        )}
      </div>
    );
  }
}

export default BookCase;
