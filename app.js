//book info. constructor (book object)
function Book(title, author, isbn) {
  this.title = title;
  this.author = author;
  this.isbn = isbn;
}

//UI constructor (add the book to the list (prototype))
function UI() { };

UI.prototype.addBookToList = function (book) {
  const bookList = document.getElementById('data-book');

  //create row
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href='' class='delete'><i class="fa-solid fa-circle-minus"></i></a></td>
  `;
  bookList.appendChild(row);
}

UI.prototype.deleteInp = function () {
  document.getElementById('title').value = '';
  document.getElementById('author').value = '';
  document.getElementById('isbn').value = '';
}

UI.prototype.showMessage = function (message, classCss) {
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

UI.prototype.deleteElment = function (element) {
  if (element.target.parentElement.className === 'delete') {
    element.target.parentElement.parentElement.parentElement.remove();
    const ui = new UI();
    ui.showMessage('Book Removed!', 'success');
  }
}

//Event listener
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

  e.preventDefault();
}