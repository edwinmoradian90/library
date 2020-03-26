let myLibrary = [];

const haveRead = (read) => {
  const didRead = read ? 'Have read' : 'Have not read';
  return didRead;
};

function Book(author, title, pages, read) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.read = haveRead(read);
}

Book.prototype.info = () => `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`;

function render(books) {
  const list = document.querySelector('#list');
  list.innerHTML = '';
  if (books.length > 0) {
    books.forEach((book, i) => {
      book.prototype = Object.create(Book.prototype);
      const content = `
                <li id=book_${i}>
                  <div class="card is-full">
                    <header class="card-header">
                    <p class="card-header-title subtitle is-4">
                        ${book.title} by ${book.author}
                    </p>
                    </header>
                    <div class="card-content">
                    <div class="content">
                        Pages: ${book.pages}<br>
                        Read : ${book.read}
                    </div>
                    </div>
                    <footer class="card-footer">
                        <a id=${i} href="#" class="is-primary card-footer-item read-status">Read status</a>
                        <a id=${i} href="#" class="has-text-danger is-small card-footer-item delete-button">Delete</a>
                    </footer>
                  </div>
                </li><br>
            `;
      list.innerHTML += content;
    });
  }
}

const saveLibrary = () => {
  localStorage.setItem('library', JSON.stringify(myLibrary));
};

const setLibrary = () => {
  myLibrary = JSON.parse(localStorage.getItem('library')) || [];
};

const refresh = () => {
  saveLibrary();
  setLibrary();
  render(myLibrary);
};

function addBookToLibrary() {
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const pages = document.getElementById('pages').value;
  const read = document.getElementById('read').checked;
  const form = document.getElementById('form');
  const book = new Book(author, title, pages, read);
  myLibrary.push(book);
  saveLibrary();
  form.reset();
}

const removeBook = (bookId) => {
  myLibrary.splice(bookId, 1);
  refresh();
};

const changeReadStatus = (readId) => {
  const readStatus = myLibrary[readId].read;
  if (readStatus === 'Have read') {
    myLibrary[readId].read = 'Have not read';
  } else {
    myLibrary[readId].read = 'Have read';
  }
  refresh();
};

const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  addBookToLibrary();
  render(myLibrary);
});


window.addEventListener('load', (e) => {
  e.preventDefault();
  setLibrary();
  render(myLibrary);
});

window.addEventListener('click', (e) => {
  const deleteButton = document.querySelectorAll('a.delete-button')[0];
  const readStatus = document.querySelectorAll('a.read-status')[0];
  if (e.target === deleteButton) {
    removeBook(deleteButton.id);
  } else if (e.target === readStatus) {
    changeReadStatus(readStatus.id);
  }
});

render(myLibrary);
