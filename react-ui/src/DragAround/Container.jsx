import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ItemTypes from './ItemTypes';
import Bookcase from './Bookcase/Bookcase';
import Preview from './Preview';
import Modal from './Modal';
import CustomDragLayer from './CustomDragLayer';
import './Container.css';

const boxTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    console.log('getItem left and top');
    console.log(item.left);
    console.log(item.top);
    console.log('delta x and y');
    // console.log(delta.x);
    // console.log(delta.y);
    console.log('get drop result');
    console.log(monitor.getDropResult());
    console.log('git client offset');
    console.log(monitor.getClientOffset());
    console.log('getSourceClientOffset');
    console.log(monitor.getSourceClientOffset());
    console.log('initial client offset');
    console.log(monitor.getInitialClientOffset());
    // const left = Math.round(item.left + delta.x);
    // const top = Math.round(item.top + delta.y);
    if (
      !monitor.getSourceClientOffset() ||
      monitor.getSourceClientOffset().x < 0
    )
      return;
    //component.moveBook(item.id, left, top);
    // const containerCoords = component.container.getBoundingClientRect();
    // const containerTop = containerCoords.top;
    // const containerLeft = containerCoords.left;
    const containerTop = 0;
    const containerLeft = 0;

    if (monitor.getSourceClientOffset()) {
      component.moveBook(
        item.id,
        monitor.getSourceClientOffset().x - containerLeft,
        monitor.getSourceClientOffset().y - containerTop
      );
    }
  }
};

class Container extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    //this.moveCard = this.moveCard.bind(this);
    this.returnBook = this.returnBook.bind(this);
    this.openBook = this.openBook.bind(this);
    this.closeBook = this.closeBook.bind(this);
    // this.getSortedShelfArr = this.getSortedShelfArr.bind(this);
    this.sortedShelfArr = null;

    // // Rotation functions and variables
    this.handleDrag = this.handleDrag.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    this.isDragging = false;
    this.prevClientX = null;
    this.rotation = 0;

    // this.onSwipingLeftListener = this.onSwipingLeftListener.bind(this);
    // this.onSwipingRightListener = this.onSwipingRightListener.bind(this);

    this.state = {
      sortedShelfArr: null,
      openedBookId: null,
      draggingBook: null,
      books: {
        0: {
          id: 0,
          text: 'Data structures',
          authorId: 2,
          shelfId: 0
        },
        1: {
          id: 1,
          text: 'Write a cool JS library',
          authorId: 5,
          shelfId: 1
        },
        2: {
          id: 2,
          text: 'Eat, pray, love',
          authorId: 3,
          shelfId: 1
        },
        3: {
          id: 3,
          text: 'Write',
          authorId: 1,
          shelfId: 2
        },
        4: {
          id: 4,
          text: 'Create examples',
          authorId: 4,
          shelfId: 1
        },
        5: {
          id: 5,
          text: 'Spam in Twitter and IRC',
          authorId: 7,
          shelfId: 0
        },
        6: {
          id: 6,
          text: 'Good Book',
          authorId: 6,
          shelfId: 2
        },
        7: {
          id: 7,
          text: 'PROFIT',
          authorId: 5,
          shelfId: 1
        },
        8: {
          id: 8,
          text: 'Goodfellas',
          authorId: 6,
          shelfId: 2
        },
        9: {
          id: 9,
          text: 'Algorithms',
          authorId: 1,
          shelfId: 2
        },
        10: {
          id: 10,
          text: 'JavaScript',
          authorId: 2,
          shelfId: 0
        }
      },
      authors: {
        0: {
          id: 0,
          firstName: 'Susan',
          lastName: 'Sunshine'
        },
        1: {
          id: 1,
          firstName: 'John',
          lastName: 'Green'
        },
        2: {
          id: 2,
          firstName: 'Maria',
          lastName: 'Sun'
        },
        3: {
          id: 3,
          firstName: 'Abigail',
          lastName: 'White'
        },
        4: {
          id: 4,
          firstName: 'Michael',
          lastName: 'Grey'
        },
        5: {
          id: 5,
          firstName: 'Jack',
          lastName: 'Orange'
        },
        6: {
          id: 6,
          firstName: 'Michael',
          lastName: 'Apple'
        },
        7: {
          id: 7,
          firstName: 'Robert',
          lastName: 'Ludlum'
        }
      },
      shelves: [0, 1, 2]
    };
  }
  onSwipingLeftListener(e) {
    console.log(e);
  }
  onSwipingRightListener(e) {
    console.log(e);
  }
  // Rotation logic
  handleDrag(e) {
    if (this.state.draggingBook && !this.isDragging) {
      if (e.target.className === 'cube' || e.target.className === 'sortable')
        return;
      // console.log('Current target');
      // console.log(e.currenTarget);
      this.isDragging = true;
      this.prevClientX = e.clientX;
    }
  }

  handleMouseMove(e) {
    if (this.state.draggingBook && this.isDragging) {
      const newClientX = e.clientX;
      if (newClientX > this.prevClientX) {
        if (this.rotation < 180) {
          this.rotation += 1;
        }
      } else {
        if (this.rotation > 0) {
          this.rotation -= 1;
        }
      }
      // console.log(this.rotation);
      this.prevClientX = newClientX;
      if (this.cube) {
        window.requestAnimationFrame(
          () => (this.cube.style.transform = `rotateY(${this.rotation}deg)`)
        );
      }
    }
  }

  handleMouseUp(e) {
    if (this.state.draggingBook) {
      this.isDragging = false;
      this.prevClientX = null;
    }
  }

  moveBook(id, left, top) {
    // console.log(id, left, top);
    if (!left || !top) {
      return;
    }
    this.isDragging = false;
    this.prevClientX = null;
    this.setState({
      draggingBook: {
        id,
        left,
        top
      }
    });
  }

  returnBook(id) {
    this.isDragging = false;
    this.prevClientX = null;
    this.setState({
      draggingBook: null
    });
  }

  openBook(id) {
    console.log(`Book opened ${id}`);
    this.setState({
      openedBookId: id
    });
  }

  closeBook(id) {
    console.log(`Book opened ${id}`);
    this.setState({
      openedBookId: null
    });
  }

  render() {
    const { connectDropTarget } = this.props;
    const { authors, cards, books, draggingBook, openedBookId } = this.state;
    const draggingBookData = draggingBook
      ? {
          id: draggingBook.id,
          left: draggingBook.left,
          top: draggingBook.top,
          text: books[draggingBook.id].text,
          authorFirstName: authors[books[draggingBook.id].authorId].firstName,
          authorLastName: authors[books[draggingBook.id].authorId].lastName
        }
      : null;

    return connectDropTarget(
      <div>
        <CustomDragLayer />
        <div
          draggable="true"
          className="bookshelf-container"
          onMouseDown={this.handleDrag}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}>
          {draggingBook &&
            <Preview
              {...draggingBookData}
              openBook={this.openBook.bind(this, this.state.draggingBook.id)}
              cubeRef={el => (this.cube = el)}
            />}
          <Bookcase
            state={this.state}
            returnBook={this.returnBook}
            openBook={this.openBook}
          />
          <ReactCSSTransitionGroup
            transitionName={{
              enter: 'beforeOpen',
              enterActive: 'afterOpen',
              leave: 'beforeClose',
              leaveActive: 'afterClose'
            }}
            transitionEnterTimeout={0}
            transitionLeaveTimeout={0}>
            {openedBookId &&
              <Modal book={books[openedBookId]} closeBook={this.closeBook} />}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(
  DropTarget(ItemTypes.CARD, boxTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(Container)
);

// {Object.values(books).map(card => {
//   const { left, top, text, id, authorId } = card;
//   const authorFirstName = authors[authorId].firstName;
//   const authorLastName = authors[authorId].lastName;
//   if (id === this.state.draggingBook.id)
//     return (
//       <Cube
//         key={id}
//         id={id}
//         left={left}
//         top={top}
//         text={text}
//         authorFirstName={authorFirstName}
//         authorLastName={authorLastName}
//         openBook={this.openBook.bind(this, id)}
//         cubeRef={el => (this.cube = el)}
//       />
//     );
// })}
