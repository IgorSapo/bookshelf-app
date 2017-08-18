import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../Sortable/ItemTypes';
import './Cube.css';

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

class Cube extends React.Component {
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

  constructor() {
    super();
    // this.handleDrag = this.handleDrag.bind(this);
    // this.handleMouseMove = this.handleMouseMove.bind(this);
    // this.handleMouseUp = this.handleMouseUp.bind(this);
    this.isDragging = false;
    this.prevClientX = null;
    this.rotation = 0;
  }

  // handleDrag(e) {
  //   this.isDragging = true;
  //   this.prevClientX = e.clientX;
  // }

  // handleMouseMove(e) {
  //   if (this.isDragging) {
  //     const newClientX = e.clientX;
  //     if (newClientX > this.prevClientX) {
  //       if (this.rotation < 90) {
  //         this.rotation += 5;
  //       }
  //     } else {
  //       if (this.rotation > 0) {
  //         this.rotation -= 5;
  //       }
  //     }
  //     this.prevClientX = newClientX;
  //     window.requestAnimationFrame(
  //       () => (this.cube.style.transform = `rotateY(${this.rotation}deg)`)
  //     );
  //   }
  // }

  // handleMouseUp(e) {
  //   this.isDragging = false;
  //   this.prevClientX = null;
  // }

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
    let absolute;
    if (top > 0 && left > 0) {
      absolute = {
        position: 'absolute',
        left,
        top
      };
    }
    return connectDragSource(
      <div
        className="cube"
        ref={el => (this.cube = el)}
        style={{ ...absolute }}
        draggable="true"
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
      </div>
    );
  }
}

export default DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))(Cube);
