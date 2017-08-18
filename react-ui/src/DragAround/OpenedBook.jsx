import React from 'react';
import './OpenedBook.css';

class OpenedBook extends React.Component {
  render() {
    return (
      <div className="opened-book">
        <button className="close-button" onClick={this.props.closeBook}>
          X
        </button>
        <div className="book">
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="cover" />
          <span className="page">
            Добро пожаловать, достопочтенный читатель, в страну будущего.
          </span>
          <span className="cover turnableCover" />
        </div>
      </div>
    );
  }
}

export default OpenedBook;
