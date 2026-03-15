class IssuedBook {
  _id;
  name;
  author;
  genre;
  price;
  publisher;
  issuedBy;
  issuedDate;
  returnDate;

  constructor(user) {
    const book = user.issuedBook;

    if (!book) return;

    this._id = book._id;
    this.name = book.name;
    this.author = book.author;
    this.genre = book.genre;
    this.price = book.price;
    this.publisher = book.publisher;

    this.issuedBy = `${user.name} ${user.surname}`;
    this.issuedDate = user.issuedDate;
    this.returnDate = user.returnDate;
  }
}

module.exports = IssuedBook;