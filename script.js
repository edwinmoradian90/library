let myLibrary = [];

let saveLibrary = () => {
    localStorage.setItem('library', JSON.stringify(myLibrary));
}

let setLibrary = () => {
    myLibrary = JSON.parse(localStorage.getItem('library')) || [];
}

let haveRead = (read) => {
    return read = read ? 'Have read' : 'Have not read';
}

let removeBook = (book_id) => {
    myLibrary.splice(book_id,1);
    refresh();
}

let changeReadStatus = (readId) => {
    let readStatus = myLibrary[readId].read;
    if(readStatus == 'Have read'){
        myLibrary[readId].read = 'Have not read';
    } else {
        myLibrary[readId].read = 'Have read';
    }
    refresh();
}

function Book(author, title, pages, read) {
    this.author = author;
    this.title  = title;
    this.pages  = pages;
    this.read   = haveRead(read);
}

Book.prototype.getInfo = () => {
    return `${this.title} by ${this.author}, ${this.pages} pages, ${this.read}`
}

function addBookToLibrary() {
    let title  = document.getElementById('title').value,
        author = document.getElementById('author').value,
        pages  = document.getElementById('pages').value,
        read   = document.getElementById('read').checked,
        form   = document.getElementById('form'),
        book = new Book(author, title, pages, read);
    myLibrary.push(book);
    saveLibrary();
    form.reset();
}

function render( books ) {
    list.innerHTML = '';
    if(books.length > 0){
        books.forEach((book, i) => {
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
            `
            list.innerHTML+= content;
        })
    }
}

let refresh = () => {
    saveLibrary();
    setLibrary();
    render( myLibrary );
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    addBookToLibrary();
    render( myLibrary );
});


window.addEventListener('load', (e) => {
    e.preventDefault();
    setLibrary();
    render( myLibrary );
    console.log('page loaded')
});

window.addEventListener('click', (e) => {   
    let deleteButton = document.querySelectorAll("a.delete-button")[0];
    let readStatus   = document.querySelectorAll("a.read-status")[0];
    if(e.target == deleteButton){
        removeBook(deleteButton.id);
    } else if(e.target == readStatus){
        changeReadStatus(readStatus.id);
    }
});

render( myLibrary );
