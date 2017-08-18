const state = {
  authors: {
    byId: {
      102: {
        id: 102,
        name: 'John Black'
      },
      103: {
        id: 103,
        name: 'Jack White'
      },
      104: {
        id: 104,
        name: 'Jonh Green'
      }
    },
    allIds: [102, 103, 104]
  },

  books: {
    byId: {
      2: {
        id: 2,
        title: 'Pink book'
      },
      3: {
        id: 3,
        title: 'Blue book'
      },
      4: {
        id: 4,
        title: 'White book'
      },
      5: {
        id: 5,
        title: 'Black book'
      }
    },
    allIds: [2, 3, 4]
  },

  authorBook: {
    byId: {
      1: {
        id: 1,
        authorId: 102,
        bookId: 2
      },
      2: {
        id: 2,
        authorId: 103,
        bookId: 3
      },
      3: {
        id: 3,
        authorId: 104,
        bookId: 4
      },
      4: {
        id: 4,
        authorId: 102,
        bookId: 5
      }
    },
    allIds: [1, 2, 3, 4]
  }
};

const state2 = {
  authorId: {
    102: { id: 102, name: 'John Black' },
    103: { id: 103, name: 'Jack White' },
    104: { id: 104, name: 'Jonh Green' }
  },
  bookId: {
    2: { id: 2, title: 'Pink book' },
    3: { id: 3, title: 'Blue book' },
    4: { id: 4, title: 'White book' },
    5: { id: 5, title: 'Black book' }
  },
  authorBook: {
    1: {
      id: 1,
      authorId: 102,
      bookId: 2
    },
    2: {
      id: 2,
      authorId: 103,
      bookId: 3
    },
    3: {
      id: 3,
      authorId: 104,
      bookId: 4
    },
    4: {
      id: 4,
      authorId: 102,
      bookId: 5
    }
  }
};

const simple = [
  { id: 1, author: 'John Black', title: 'Pink book' },
  { id: 2, author: 'Jack White', title: 'Blue book' },
  { id: 3, author: 'Jonh Green', title: 'White book' },
  { id: 4, author: 'John Black', title: 'Black book' }
];

const sortState = () => {
  // const booksByAuthor = state.authorBook.allIds.map(id => {
  //   const bookObject = state.authorBook.byId[id];
  //   const author = state.authors.byId[bookObject.authorId].name;
  //   const title = state.books.byId[bookObject.bookId].title;
  //   return { author, title };
  // });
  // const byAuthor = state.authors.allIds.map(id => state.authors.byId[id].name);
  // const booksByAuthor = simple.sort((a, b) => {
  //   if (a.author.toUpperCase() > b.author.toUpperCase()) {
  //     return 1;
  //   }
  //   if (a.author.toUpperCase() < b.author.toUpperCase()) {
  //     return -1;
  //   }
  //   if (a.author.toUpperCase() === b.author.toUpperCase()) {
  //     if (a.title.toUpperCase() > b.title.toUpperCase()) return 1;
  //     if (a.title.toUpperCase() < b.title.toUpperCase()) return -1;
  //     return 0;
  //   }
  //   return 0;
  // });

  // const booksByAuthor = Object.values(state2.authorBook).map(book => {
  //   return {
  //     id: book.id,
  //     author: state2.authorId[book.authorId],
  //     title: state2.bookId[book.bookId]
  //   };
  // });
  const sortBy = criteria => {
    return (a, b) => {
      if (a[criteria].toUpperCase() > b[criteria].toUpperCase()) return 1;
      if (a[criteria].toUpperCase() < b[criteria].toUpperCase()) return -1;
      return 0;
    };
  };

  const booksByAuthor = Object.values(state2.authorId)
    .sort(sortBy('name'))
    .map(author => {
      return Object.values(state2.authorBook)
        .filter(book => book.authorId == author.id)
        .map(book => ({
          id: book.id,
          author: state2.authorId[book.authorId].name,
          title: state2.bookId[book.bookId].title
        }))
        .sort(sortBy('title'));
    })
    .reduce((a, b) => a.concat(b), []);

  // const booksByTitle = Object.values(state2.bookId)
  //   .sort(sortBy('title'))
  //   .map(bookObj => {
  //     return Object.values(state2.authorBook)
  //       .filter(book => book.bookId == bookObj.id)
  //       .map(book => ({
  //         id: book.id,
  //         author: state2.authorId[book.authorId].name,
  //         title: state2.bookId[book.bookId].title
  //       }));
  //   });

  // return [].concat(...booksByTitle);

  return booksByAuthor;
};

export default sortState;
