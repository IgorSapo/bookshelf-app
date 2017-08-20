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

const target = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    // const delta = monitor.getDifferenceFromInitialOffset();
    if (
      !monitor.getSourceClientOffset() ||
      monitor.getSourceClientOffset().x < 0
    )
      return;
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
    this.returnBook = this.returnBook.bind(this);
    this.openBook = this.openBook.bind(this);
    this.closeBook = this.closeBook.bind(this);
    this.moveBook = this.moveBook.bind(this);

    // // Rotation functions and variables
    this.handleDrag = this.handleDrag.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.isDragging = false;
    this.prevClientX = null;
    this.rotation = 0;

    this.state = {
      openedBook: null,
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

  // Rotation logic
  handleDrag(e) {
    if (this.state.draggingBook && !this.isDragging) {
      if (e.target.className === 'preview' || e.target.className === 'sortable')
        return;
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
      if (this.preview) {
        window.requestAnimationFrame(
          () => (this.preview.style.transform = `rotateY(${this.rotation}deg)`)
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
    const { books, authors } = this.state;
    const authorId = books[id].authorId;
    this.setState({
      openedBook: {
        id,
        text: books[id].text,
        authorFirstName: authors[authorId].firstName,
        authorLastName: authors[authorId].lastName
      }
    });
  }

  closeBook(id) {
    this.setState({
      openedBook: null
    });
  }

  render() {
    const { connectDropTarget } = this.props;
    const { authors, books, draggingBook, openedBook } = this.state;
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
            !openedBook &&
            <Preview
              {...draggingBookData}
              openBook={this.openBook.bind(this, this.state.draggingBook.id)}
              previewRef={el => (this.preview = el)}
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
            {openedBook &&
              <Modal book={openedBook} closeBook={this.closeBook} />}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(
  DropTarget(ItemTypes.BOOK, target, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(Container)
);
