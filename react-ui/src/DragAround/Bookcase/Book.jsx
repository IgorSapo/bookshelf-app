import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import './Book.css';

const bookSource = {
  beginDrag(props) {
    return {
      id: props.id,
      text: props.text,
      authorLastName: props.authorLastName,
      authorFirstName: props.authorFirstName
    };
  }
};

class Book extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    authorFirstName: PropTypes.string.isRequired,
    authorLastName: PropTypes.string.isRequired,
    openBook: PropTypes.func
  };

  componentDidMount() {
    const { connectDragPreview } = this.props;
    const img = new Image();
    connectDragPreview(img);
  }

  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      authorFirstName,
      authorLastName,
      openBook
    } = this.props;

    if (isDragging) return null;
    return connectDragSource(
      <div className="spine" onClick={openBook}>
        <span className="spine-text">
          {text}
        </span>
        <span className="spine-text">
          {authorLastName + ' ' + authorFirstName[0] + '.'}
        </span>
      </div>
    );
  }
}

export default DragSource(
  ItemTypes.BOOK,
  bookSource,
  (connect, monitor, component) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(Book);
