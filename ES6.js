//Classes
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  addBookToList(book) {
    const bookList = document.getElementById('data-book');

    //create row
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='' class='delete'>X</a></td>
  `;
    bookList.appendChild(row);
  }

  deleteInp() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
  }

  showMessage(message, classCss) {
    const container = document.querySelector('#container');
    const form = document.querySelector('#book-form');
    const msg = document.createElement('div');
    msg.className = `alert ${classCss}`;
    msg.appendChild(document.createTextNode(message));
    container.insertBefore(msg, form);

    //setTimeOut after 3 sec
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 2000);
  }

  deleteElment(element) {
    if (element.target.className === 'delete') {
      element.target.parentElement.parentElement.remove();
      const ui = new UI();
      ui.showMessage('Book Removed!', 'success');
    }
  }
}

class Store {
  static checkStore() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }
    return books;
  }

  static addToStore(book) {
    const books = Store.checkStore();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));

  }

  static displayBook() {
    const books = Store.checkStore();

    books.forEach(function (book) {
      const ui = new UI();

      ui.addBookToList(book);
    })
  }

  static deleteBook(isbn) {
    const books = Store.checkStore();

    books.forEach(function (book, index) {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }

    })
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Events
document.addEventListener('DOMContentLoaded', Store.displayBook);

const form = document.getElementById('book-form');
form.addEventListener('submit', addBook);

const bookBody = document.querySelector('#data-book');
bookBody.addEventListener('click', deleteBook);

//functions
function addBook(e) {

  //Get the book info. values
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const isbn = document.getElementById('isbn').value;

  //book object;
  const book = new Book(title, author, isbn);

  //UI Object
  const ui = new UI();

  if (title === '' || author === '' || isbn === '') {
    ui.showMessage('please fill the fields first!', 'error');
  } else {
    //addBootToList prototype
    ui.addBookToList(book);

    Store.addToStore(book);

    //reset the form
    ui.deleteInp();

    ui.showMessage('Book added successfully.', 'success');
  }

  e.preventDefault();

}

function deleteBook(e) {

  //UI Object
  const ui = new UI();

  ui.deleteElment(e);

  Store.deleteBook(e.target.parentElement.previousElementSibling.textContent);

  e.preventDefault();
}