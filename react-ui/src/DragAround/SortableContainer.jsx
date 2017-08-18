import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from '../Sortable/ItemTypes';
// import React, { Component } from 'react';
// import update from 'react/lib/update';
// import { DragDropContext } from 'react-dnd';
// import HTML5Backend from 'react-dnd-html5-backend';
import Card from '../Sortable/Card';
import example from './example';
import './SortableContainer.css';

// class Container extends Component {
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

// const style = {
//   border: '1px dashed gray',
//   padding: '0.5rem 1rem',
//   marginBottom: '.5rem',
//   backgroundColor: 'white',
//   cursor: 'move'
// };

const sortableTarget = {
  drop(props, monitor, component) {
    // props.returnBook(monitor.getItem().id);
    console.log('Monitor getItem: !!!');
    console.log(monitor.getItem());
    props.returnBook(monitor.getItem().id);

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
class Sortable extends Component {
  static propTypes = {
    // connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    returnBook: PropTypes.func.isRequired,
    cards: PropTypes.array
    // index: PropTypes.number, //isRequired
    // isDragging: PropTypes.bool.isRequired,
    // id: PropTypes.any.isRequired,
    // text: PropTypes.string.isRequired,
    // moveCard: PropTypes.func, //isRequired
    // left: PropTypes.number,
    // top: PropTypes.number
  };

  render() {
    // console.log(JSON.stringify(example()));

    const {
      // text,
      // isDragging,
      connectDragSource,
      connectDropTarget,
      // left,
      // top
      cards
    } = this.props;
    // const opacity = isDragging ? 0 : 1;

    return connectDropTarget(
      <div className="bookshelf">
        {this.props.cards.map((card, i) => {
          if (!card.top && !card.left) {
            return (
              <Card
                openBook={this.props.openBook.bind(null, card.id)}
                key={card.id}
                index={i}
                id={card.id}
                text={card.text}
                top={card.top}
                left={card.left}
                authorLastName={card.authorLastName}
                authorFirstName={card.authorFirstName}
              />
            );
          }
        })}
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

export default DropTarget(ItemTypes.CARD, sortableTarget, connect => ({
  connectDropTarget: connect.dropTarget()
}))(Sortable);
