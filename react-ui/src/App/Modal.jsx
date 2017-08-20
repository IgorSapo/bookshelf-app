import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

class Modal extends React.Component {
  static propTypes = {
    closeBook: PropTypes.func.isRequired,
    book: PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      authorFirstName: PropTypes.string.isRequired,
      authorLastName: PropTypes.string.isRequired
    })
  };

  render() {
    const { authorFirstName, authorLastName } = this.props.book;
    return (
      <div className="modal-overlay">
        <button className="modal-close" onClick={this.props.closeBook}>
          &#10060;
        </button>
        <div className="modal-book">
          <div className="page turnablePage" />
          <div className="page turnablePage" />
          <div className="page turnablePage" />
          <div className="page turnablePage" />
          <div className="page turnablePage" />
          <div className="page turnablePage" />
          <div className="cover" />
          <div className="page staticPage">
            <p>Добро пожаловать, достопочтенный читатель, в страну будущего.</p>
            <p>
              {authorFirstName +
                ' ' +
                authorLastName +
                ' рад приветствовать вас.'}
            </p>
          </div>
          <div className="cover turnableCover" />
        </div>
      </div>
    );
  }
}

export default Modal;
