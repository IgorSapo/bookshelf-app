import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import './Card.css';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      left: props.left,
      top: props.top
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
class Card extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    index: PropTypes.number, //isRequired
    isDragging: PropTypes.bool.isRequired,
    id: PropTypes.any.isRequired,
    text: PropTypes.string.isRequired,
    moveCard: PropTypes.func, //isRequired
    left: PropTypes.number,
    top: PropTypes.number
  };

  render() {
    const {
      text,
      isDragging,
      connectDragSource,
      connectDropTarget,
      left,
      top,
      authorFirstName,
      authorLastName
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    let absolute;
    if (top > 0 && left > 0) {
      absolute = {
        position: 'absolute',
        left,
        top
      };
    }

    // console.log(this.props);
    return connectDragSource(
      <div
        className="card"
        style={{ opacity, ...absolute }}
        onClick={this.props.openBook}>
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
export default DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Card);
// );
