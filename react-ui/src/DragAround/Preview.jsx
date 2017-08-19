import React from 'react';
import PropTypes from 'prop-types';
// import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import './Preview.css';

const cardSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
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
      left,
      top,
      openBook,
      connectDragSource,
      isDragging,
      cubeRef
    } = this.props;
    const opacity = isDragging ? 0 : 1;
    return connectDragSource(
      <div
        className="cube"
        ref={el => (this.cube = el)}
        style={{ top, left, opacity }}
        ref={cubeRef}>
        <div className="side front">
          <p className="front-fullname">
            {this.props.authorLastName + ' ' + this.props.authorFirstName}
          </p>
          <br />
          <p className="front-title">
            {this.props.text}
          </p>
        </div>
        <div className="side left">
          <span className="book-side-text">
            {text}
          </span>
          <span className="book-side-text">
            {this.props.authorLastName +
              ' ' +
              this.props.authorFirstName[0] +
              '.'}
          </span>
        </div>
        <div className="side back" />
        <div className="side bottom" />
        <div className="side top" />
      </div>
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  connectDragPreview: connect.dragPreview(),
  isDragging: monitor.isDragging()
}))(Preview);

// <div
//   className="cube"
//   ref={el => (this.cube = el)}
//   style={{ top, left }}
//   ref={cubeRef}>
//   <div className="side front">
//     <p className="front-fullname">
//       {this.props.authorLastName + ' ' + this.props.authorFirstName}
//     </p>
//     <br />
//     <p className="front-title">
//       {this.props.text}
//     </p>
//   </div>
//   <div className="side left">
//     <span className="book-side-text">
//       {text}
//     </span>
//     <span className="book-side-text">
//       {this.props.authorLastName +
//         ' ' +
//         this.props.authorFirstName[0] +
//         '.'}
//     </span>
//   </div>
//   <div className="side back" />
//   <div className="side bottom" />
//   <div className="side top" />
// </div>

// <div
//   ref={cubeRef}
//   style={{
//     width: 100,
//     height: 100,
//     position: 'absolute',
//     top,
//     left,
//     backgroundColor: 'lightblue'
//   }}
// />
