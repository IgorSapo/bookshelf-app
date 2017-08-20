import React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import './Preview.css';

const bookSource = {
  beginDrag(props) {
    return {
      id: props.id,
      left: props.left,
      top: props.top,
      text: props.text,
      authorLastName: props.authorLastName,
      authorFirstName: props.authorFirstName
    };
  }
};

class Preview extends React.Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    left: PropTypes.number,
    top: PropTypes.number,
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
      left,
      top,
      openBook,
      connectDragSource,
      isDragging,
      previewRef,
      authorFirstName,
      authorLastName
    } = this.props;
    if (isDragging) return null;
    return connectDragSource(
      <div
        className="preview"
        style={{ top, left }}
        ref={previewRef}
        onClick={openBook}>
        <div className="preview-side front">
          <p className="front-fullname">
            {authorLastName + ' ' + authorFirstName}
          </p>
          <br />
          <p className="front-title">
            {text}
          </p>
        </div>
        <div className="preview-side left">
          <span className="left-text">
            {text}
          </span>
          <span className="left-text">
            {authorLastName + ' ' + authorFirstName[0] + '.'}
          </span>
        </div>
        <div className="preview-side back" />
        <div className="preview-side bottom" />
        <div className="preview-side top" />
      </div>
    );
  }
}

export default DragSource(ItemTypes.BOOK, bookSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(Preview);
