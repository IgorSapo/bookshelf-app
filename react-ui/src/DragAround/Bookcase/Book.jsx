import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../ItemTypes';
import './Book.css';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      text: props.text,
      authorLastName: props.authorLastName,
      authorFirstName: props.authorFirstName
    };
  }
};

const cardTarget = {
  hover(props, monitor, component) {
    // const dragIndex = monitor.getItem().index;
    // const hoverIndex = props.index;
    // // Don't replace items with themselves
    // if (dragIndex === hoverIndex) {
    //   return;
    // }
    // // Determine rectangle on screen
    // const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    // // Get vertical middle
    // const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    // // Determine mouse position
    // const clientOffset = monitor.getClientOffset();
    // // Get pixels to the top
    // const hoverClientY = clientOffset.y - hoverBoundingRect.top;
    // // Only perform the move when the mouse has crossed half of the items height
    // // When dragging downwards, only move when the cursor is below 50%
    // // When dragging upwards, only move when the cursor is above 50%
    // // Dragging downwards
    // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
    //   return;
    // }
    // // Dragging upwards
    // if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
    //   return;
    // }
    // // Time to actually perform the action
    // props.moveCard(dragIndex, hoverIndex);
    // // Note: we're mutating the monitor item here!
    // // Generally it's better to avoid mutations,
    // // but it's good here for the sake of performance
    // // to avoid expensive index searches.
    // monitor.getItem().index = hoverIndex;
  }
};

// @DropTarget(ItemTypes.CARD, cardTarget, connect => ({
//   connectDropTarget: connect.dropTarget(),
// }))
// @DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging(),
// }))
/* export default */
class Book extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    connectDragPreview: PropTypes.func.isRequired,
    index: PropTypes.number, //isRequired
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func, //isRequired
    left: PropTypes.number,
    top: PropTypes.number
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
      connectDropTarget,
      authorFirstName,
      authorLastName
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    // console.log(this.props);
    return connectDragSource(
      <div className="card" style={{ opacity }} onClick={this.props.openBook}>
        <span className="book-side">
          {text}
        </span>
        <span className="book-side">
          {authorLastName + ' ' + authorFirstName[0] + '.'}
        </span>
      </div>
    );
  }
}

// export default DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
//   connectDragSource: connect.dragSource(),
//   isDragging: monitor.isDragging()
// }))(
//   DropTarget(ItemTypes.CARD, cardTarget, connect => ({
//     connectDropTarget: connect.dropTarget()
//   }))(Card)
// );

// export default DropTarget(ItemTypes.CARD, cardTarget, connect => ({
//   connectDropTarget: connect.dropTarget()
// }))(

export default DragSource(
  ItemTypes.CARD,
  cardSource,
  (connect, monitor, component) => ({
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview(),
    isDragging: monitor.isDragging()
  })
)(Book);

// );
