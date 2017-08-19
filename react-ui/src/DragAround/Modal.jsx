import React from 'react';
import './Modal.css';

class Modal extends React.Component {
  render() {
    return (
      <div className="opened-book">
        <button className="close-button" onClick={this.props.closeBook}>
          &#10060;
        </button>
        <div className="book">
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="page turnablePage" />
          <span className="cover" />
          <span className="page staticPage">
            Добро пожаловать, достопочтенный читатель, в страну будущего.
          </span>
          <span className="cover turnableCover" />
        </div>
      </div>
    );
  }
}

export default Modal;
