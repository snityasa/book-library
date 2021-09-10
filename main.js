const formContainer = document.querySelector('.popup');
const overlay = document.querySelector('.overlay');
const newBook = document.querySelector('.newBook');
const closeButton = document.querySelector('.closeButton');
const form = document.querySelector('.form');
//const bookshelf = document.querySelector(".bookshelf");
let books = [];
let opened = false;

newBook.addEventListener("click", openAndCloseForm);
closeButton.addEventListener("click", openAndCloseForm);
form.addEventListener("submit", addBookToLibrary);

function render(){
    let display = document.querySelector('.bookshelf');
    const bookss = document.querySelectorAll('.book');
    bookss.forEach(book => display.removeChild(book));

    for (let i = 0; i<books.length;i++) {
        displayBook(books[i]);
    }
}

function displayBook(i) {
    let library = document.querySelector('.bookshelf');
    library.classList.add('bookshelf')

    let bookNode = document.createElement("div");
    bookNode.classList.add("book");

    const title = i.title;
    let titleNode = document.createElement("h2");
    titleNode.innerHTML = `Title: ${title}`;

    const author = i.author;
    let authorNode = document.createElement("h3");
    authorNode.innerHTML = `Author: ${author}`;

    const pages = i.pages;
    let pagesNode = document.createElement("h3");
    pagesNode.innerHTML = `Pages: ${pages}`;

    const read = i.read;
    let readNode = document.createElement("h3");
    readNode.innerHTML = `Read: ${read}`;

    let updateNode = document.createElement("button");
    updateNode.classList = "update";
    updateNode.innerHTML = "Update";

    let deleteNode = document.createElement("button");
    deleteNode.classList = "delete";
    deleteNode.innerHTML = "Delete";

    bookNode.appendChild(titleNode);
    bookNode.appendChild(authorNode);
    bookNode.appendChild(pagesNode);
    bookNode.appendChild(readNode);
    bookNode.appendChild(updateNode);
    bookNode.appendChild(deleteNode);
    library.appendChild(bookNode);


    updateNode.addEventListener("click", () => {
        if (readNode.innerHTML === "Read: Yes") {
            readNode.innerHTML = "Read: No";
            i.read = "No";
        } else {
            readNode.innerHTML = "Read: Yes";
            i.read = "Yes";
        }
        render()
    });

    deleteNode.addEventListener("click", () => {
        library.removeChild(bookNode);
        books.splice(books.indexOf(i), 1);
        render();
    });

};

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}


function openAndCloseForm() {
    if (opened) {
        formContainer.style.transform = "scale(0)";
        overlay.classList.remove('active');
        opened = false;
    } else {
        formContainer.style.transform = "scale(1)";
        overlay.classList.add('active');
        opened = true;
    }
}

function addBookToLibrary() {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById("pages").value;
    const readSel = document.getElementById('read');
    const read = readSel.options[readSel.selectedIndex].value;

    let newBook = new Book(title, author, pages, read);
    books.push(newBook);
    render();
    form.reset();
    openAndCloseForm();
}

