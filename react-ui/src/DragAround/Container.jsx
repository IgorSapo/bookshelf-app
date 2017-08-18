import React, { Component } from 'react';
import PropTypes from 'prop-types';
import update from 'react/lib/update';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ItemTypes from './ItemTypes';
import Box from './Box';
import Card from '../Sortable/Card';
import ItemTypesSortable from '../Sortable/ItemTypes';
import Sortable from './SortableContainer';
import './Container.css';
import OpenedBook from './OpenedBook';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Cube from './Cube';
import BookCase from './BookCase';

// class Container extends Component {
//   static propTypes = {
//     connectDropTarget: PropTypes.func.isRequired
//   };

//   constructor(props) {
//     super(props);
//     this.state = {
//       boxes: {
//         a: { top: 20, left: 80, title: 'Drag me around' },
//         b: { top: 180, left: 20, title: 'Drag me too' }
//       }
//     };
//   }

//   moveBox(id, left, top) {
//     this.setState(
//       update(this.state, {
//         boxes: {
//           [id]: {
//             $merge: { left, top }
//           }
//         }
//       })
//     );
//   }

//   render() {
//     const { connectDropTarget } = this.props;
//     const { boxes } = this.state;

//     return connectDropTarget(
//       <div style={styles}>
//         {Object.keys(boxes).map(key => {
//           const { left, top, title } = boxes[key];
//           return (
//             <Box
//               key={key}
//               id={key}
//               left={left}
//               top={top}
//               hideSourceOnDrag={true}>
//               {title}
//             </Box>
//           );
//         })}
//       </div>
//     );
//   }
// }

// export default DragDropContext(HTML5Backend)(
//   DropTarget(ItemTypes.BOX, boxTarget, connect => ({
//     connectDropTarget: connect.dropTarget()
//   }))(Container)
// );

// const style = {
//   width: 400
// };

// class Container1 extends Component {
//   constructor(props) {
//     super(props);
//     this.moveCard = this.moveCard.bind(this);
//     this.state = {
//       cards: [
//         {
//           id: 1,
//           text: 'Write a cool JS library'
//         },
//         {
//           id: 2,
//           text: 'Make it generic enough'
//         },
//         {
//           id: 3,
//           text: 'Write README'
//         },
//         {
//           id: 4,
//           text: 'Create some examples'
//         },
//         {
//           id: 5,
//           text:
//             'Spam in Twitter and IRC to promote it (note that this element is taller than the others)'
//         },
//         {
//           id: 6,
//           text: '???'
//         },
//         {
//           id: 7,
//           text: 'PROFIT'
//         }
//       ]
//     };
//   }

//   moveCard(dragIndex, hoverIndex) {
//     const { cards } = this.state;
//     const dragCard = cards[dragIndex];

//     this.setState(
//       update(this.state, {
//         cards: {
//           $splice: [[dragIndex, 1], [hoverIndex, 0, dragCard]]
//         }
//       })
//     );
//   }

//   render() {
//     const { cards } = this.state;

//     return (
//       <div style={style}>
//         {cards.map((card, i) =>
//           <Card
//             key={card.id}
//             index={i}
//             id={card.id}
//             text={card.text}
//             moveCard={this.moveCard}
//           />
//         )}
//       </div>
//     );
//   }
// }

// export default DragDropContext(HTML5Backend)(Container);

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
    //component.moveBox(item.id, left, top);
    const containerCoords = component.container.getBoundingClientRect();
    const containerTop = containerCoords.top;
    const containerLeft = containerCoords.left;

    if (monitor.getSourceClientOffset()) {
      component.moveBox(
        item.id,
        monitor.getSourceClientOffset().x - containerLeft,
        monitor.getSourceClientOffset().y - containerTop
      );
    }
    console.log();
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

    // this.am = this.am.bind(this);
    this.isDragging = false;
    this.prevClientX = null;
    this.rotation = 0;

    this.state = {
      sortedShelfArr: null,
      openedBookId: null,
      draggingBook: {
        id: null,
        top: null,
        left: null
      },
      // boxes: {
      //   a: { top: 20, left: 80, title: 'Drag me around' },
      //   b: { top: 180, left: 20, title: 'Drag me too' }
      // },
      cards: [
        {
          id: 0,
          text: 'Data structures',
          top: null,
          left: null,
          authorId: 2,
          shelfId: 0
        },
        {
          id: 1,
          text: 'Write a cool JS library',
          top: null,
          left: null,
          authorId: 5,
          shelfId: 1
        },
        {
          id: 2,
          text: 'Eat, pray, love',
          top: null,
          left: null,
          authorId: 3,
          shelfId: 1
        },
        {
          id: 3,
          text: 'Write',
          top: null,
          left: null,
          authorId: 1,
          shelfId: 2
        },
        {
          id: 4,
          text: 'Create examples',
          top: null,
          left: null,
          authorId: 4,
          shelfId: 1
        },
        {
          id: 5,
          text: 'Spam in Twitter and IRC',
          top: null,
          left: null,
          authorId: 7,
          shelfId: 0
        },
        {
          id: 6,
          text: 'Good Book',
          top: null,
          left: null,
          authorId: 6,
          shelfId: 2
        },
        {
          id: 7,
          text: 'PROFIT',
          top: null,
          left: null,
          authorId: 5,
          shelfId: 1
        },
        {
          id: 8,
          text: 'Goodfellas',
          top: null,
          left: null,
          authorId: 6,
          shelfId: 2
        },
        {
          id: 9,
          text: 'Algorithms',
          top: null,
          left: null,
          authorId: 1,
          shelfId: 2
        },
        {
          id: 10,
          text: 'JavaScript',
          top: null,
          left: null,
          authorId: 2,
          shelfId: 0
        }
      ],
      books: {
        0: {
          id: 0,
          text: 'Data structures',
          top: null,
          left: null,
          authorId: 2,
          shelfId: 0
        },
        1: {
          id: 1,
          text: 'Write a cool JS library',
          top: null,
          left: null,
          authorId: 5,
          shelfId: 1
        },
        2: {
          id: 2,
          text: 'Eat, pray, love',
          top: null,
          left: null,
          authorId: 3,
          shelfId: 1
        },
        3: {
          id: 3,
          text: 'Write',
          top: null,
          left: null,
          authorId: 1,
          shelfId: 2
        },
        4: {
          id: 4,
          text: 'Create examples',
          top: null,
          left: null,
          authorId: 4,
          shelfId: 1
        },
        5: {
          id: 5,
          text: 'Spam in Twitter and IRC',
          top: null,
          left: null,
          authorId: 7,
          shelfId: 0
        },
        6: {
          id: 6,
          text: 'Good Book',
          top: null,
          left: null,
          authorId: 6,
          shelfId: 2
        },
        7: {
          id: 7,
          text: 'PROFIT',
          top: null,
          left: null,
          authorId: 5,
          shelfId: 1
        },
        8: {
          id: 8,
          text: 'Goodfellas',
          top: null,
          left: null,
          authorId: 6,
          shelfId: 2
        },
        9: {
          id: 9,
          text: 'Algorithms',
          top: null,
          left: null,
          authorId: 1,
          shelfId: 2
        },
        10: {
          id: 10,
          text: 'JavaScript',
          top: null,
          left: null,
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

  // componentDidMount() {
  //   this.am('default');
  // }

  // am() {
  //   return this.state.shelves.map(shelf =>
  //     Object.values(this.state.books)
  //       .filter(book => book.shelfId === shelf)
  //       .map(book => ({
  //         id: book.id,
  //         text: book.text,
  //         authorLastName: this.state.authors[book.authorId].lastName,
  //         authorFirstName: this.state.authors[book.authorId].firstName,
  //         left: book.left,
  //         top: book.top
  //       }))
  //   );

  //   // const shelfArr = this.props.sortedShelfArr;
  //   // const sortBy = criteria => {
  //   //   return (a, b) => {
  //   //     if (a[criteria].toUpperCase && b[criteria].toUpperCase) {
  //   //       if (a[criteria].toUpperCase() > b[criteria].toUpperCase()) return 1;
  //   //       if (a[criteria].toUpperCase() < b[criteria].toUpperCase()) return -1;
  //   //       return 0;
  //   //     } else {
  //   //       if (a[criteria] > b[criteria]) return 1;
  //   //       if (a[criteria] < b[criteria]) return -1;
  //   //       return 0;
  //   //     }
  //   //   };
  //   // };
  //   // let newArr;
  //   // switch (filter) {
  //   //   case 'authorLastName':
  //   //     newArr = [...shelfArr].map(shelf =>
  //   //       [...shelf].sort(sortBy('text')).sort(sortBy('authorLastName'))
  //   //     );
  //   //     break;
  //   //   case 'text':
  //   //     newArr = [...shelfArr].map(shelf => [...shelf].sort(sortBy('text')));
  //   //     break;
  //   //   case 'default':
  //   //   default:
  //   //     newArr = [...shelfArr].map(shelf => [...shelf]);
  //   //     break;
  //   // }
  //   // this.setState({
  //   //   sortedShelfArr: newArr
  //   // });
  // }

  // Rotation logic
  handleDrag(e) {
    console.log('Target');
    console.log(e.target);
    if (e.target.className === 'cube' || e.target.className === 'sortable')
      return;
    // console.log('Current target');
    // console.log(e.currenTarget);
    this.isDragging = true;
    this.prevClientX = e.clientX;
  }

  handleMouseMove(e) {
    if (this.isDragging) {
      const newClientX = e.clientX;
      if (newClientX > this.prevClientX) {
        if (this.rotation < 90) {
          this.rotation += 0.5;
        }
      } else {
        if (this.rotation > 0) {
          this.rotation -= 0.5;
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
    if (this.isDragging) {
      this.isDragging = false;
      this.prevClientX = null;
    }
  }

  moveBox(id, left, top) {
    console.log(id, left, top);
    if (!left || !top) {
      return;
    }
    this.setState(prevState => {
      const al = prevState.cards.map(card => {
        if (card.id == id) {
          return {
            id,
            text: card.text,
            top,
            left
          };
        } else {
          return {
            id: card.id,
            text: card.text,
            top: null,
            left: null
          };
        }
      });
      const newBookIdObj = {
        id,
        text: prevState.books[id].text,
        top,
        left,
        authorId: prevState.books[id].authorId,
        shelfId: prevState.books[id].shelfId
      };

      console.log('Old books');
      console.log(Object.values(prevState.books));
      const newBooksValues = Object.values(prevState.books).map(book => {
        if (book.id == id) {
          return {
            id,
            text: book.text,
            top,
            left,
            authorId: book.authorId,
            shelfId: book.shelfId
          };
        } else {
          return {
            id: book.id,
            text: book.text,
            top: null,
            left: null,
            authorId: book.authorId,
            shelfId: book.shelfId
          };
        }
      });
      console.log('New book values!!!');
      console.log(newBooksValues);
      let newBooks = {};
      Object.keys(prevState.books).forEach(id => {
        newBooks[id] = newBooksValues[id];
      });
      console.log('newBooks!!!');
      console.log(newBooks);

      const newBooksById = Object.assign({}, prevState.books, {
        [id]: newBookIdObj
      });
      console.log(newBooksById);
      const newState = {
        cards: al,
        draggingBook: {
          id,
          top,
          left
        },
        books: newBooks
      };

      return newState;
    });
  }

  // moveCard(dragIndex, hoverIndex) { here was moveCard from Card component

  returnBook(id) {
    this.setState(prevState => {
      const al = prevState.cards.map(card => ({
        id: card.id,
        text: card.text,
        top: null,
        left: null
      }));

      const newBookIdObj = {
        id,
        top: null,
        left: null,
        authorId: prevState.books[id].authorId,
        shelfId: prevState.books[id].shelfId,
        text: prevState.books[id].text
      };
      const newBooksById = Object.assign({}, prevState.books, {
        [id]: newBookIdObj
      });
      console.log('New state!!!');
      console.log(newBooksById);
      const newState = {
        cards: al,
        books: newBooksById
      };

      return newState;
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
    const { authors, boxes, cards, books } = this.state;

    return connectDropTarget(
      <div
        draggable="true"
        onDragStart={this.handleDrag}
        onMouseMove={this.handleMouseMove}
        onMouseUp={this.handleMouseUp}>
        <div
          className="bookshelf-container"
          ref={el => {
            this.container = el;
          }}>
          <div>
            {Object.values(books).map(card => {
              const { left, top, text, id, authorId } = card;
              const authorFirstName = authors[authorId].firstName;
              const authorLastName = authors[authorId].lastName;
              if (left > 0 && top > 0)
                return (
                  <Cube
                    key={id}
                    id={id}
                    left={left}
                    top={top}
                    text={text}
                    authorFirstName={authorFirstName}
                    authorLastName={authorLastName}
                    openBook={this.openBook.bind(this, id)}
                    cubeRef={el => (this.cube = el)}
                  />
                );
            })}
          </div>
          {
            // <Sortable
            //   cards={cards}
            //   returnBook={this.returnBook}
            //   openBook={this.openBook}
            // />
          }
          <BookCase
            state={this.state}
            books={books}
            returnBook={this.returnBook}
            openBook={this.openBook}
            draggingBookId={this.state.draggingBook.id}
            am={this.am}
          />
        </div>

        <ReactCSSTransitionGroup
          transitionName={{
            enter: 'beforeOpen',
            enterActive: 'afterOpen',
            leave: 'beforeClose',
            leaveActive: 'afterClose'
          }}>
          {this.state.openedBookId &&
            <OpenedBook
              book={this.state.cards.find(
                card => card.id === this.state.openedBookId
              )}
              closeBook={this.closeBook}
            />}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(
  DropTarget(ItemTypesSortable.CARD, boxTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(Container)
);
