const buttons = document.querySelectorAll(".btn");
const bookDisplay = document.querySelector(".book-display");
const bookForm = document.forms["bookForm"];
const divAddBook = document.querySelector(".addBook");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    btnHandler(button.classList[1]);
  });
});

// Instantiate array to hold book objects
let myLibrary = [];

// Book constructor
function Book(title, author, year, boolRead) {
  this.title = title;
  this.author = author;
  this.year = year;
  this.boolRead = boolRead;
}

Book.prototype.toggleRead = function () {
  this.boolRead = !this.boolRead;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

let theHobbit = new Book("The Hobbit", "J.R.R", 1958, false);
let vampire = new Book("Interview with the Vampire", "Anne Rice", 1976, false);
let it = new Book("It", "Stephen King", 1986, true);

addBookToLibrary(theHobbit);
addBookToLibrary(vampire);
addBookToLibrary(it);

refreshDisplay();

function btnHandler(btnClass) {
  switch (btnClass) {
    case "search":
      console.log("search btn hit");
      break;
    case "remove":
      console.log("remove btn hit");
      break;
    case "boolRead":
      console.log("boolRead btn hit");
      break;
    case "add":
      showElement(divAddBook);
      break;
    case "cancelForm":
      showElement(divAddBook);
      break;
  }
}

function refreshDisplay() {
  myLibrary.forEach((book) => {
    createBookElement(book);
  });
}

function createBookElement(book) {
  /* Create document elements that comprise a book card */
  const divBook = document.createElement("div");
  const pTitle = document.createElement("p");
  const btnRemove = document.createElement("button");
  const iXMark = document.createElement("i");
  const pAuthor = document.createElement("p");
  const pYear = document.createElement("p");
  const btnRead = document.createElement("button");
  const iCheck = document.createElement("i");
  const iUnread = document.createElement("i");
  /* Assign classes to elements */
  divBook.classList += "book";
  pTitle.classList += "title";
  btnRemove.classList += "btn remove";
  iXMark.classList += "fa-solid fa-xmark";
  pAuthor.classList += "author";
  pYear.classList += "year";
  btnRead.classList += "btn boolRead";
  iCheck.classList += "fa-solid fa-check";
  iUnread.classList += "fa-solid fa-ban";
  /* Populate element text with book details */
  pTitle.innerText = book.title;
  pAuthor.innerText = book.author;
  pYear.innerText = book.year;

  if (book.boolRead) btnRead.appendChild(iCheck);
  else {
    btnRead.appendChild(iUnread);
    btnRead.classList += " unread";
  }

  divBook.appendChild(pTitle);
  btnRemove.appendChild(iXMark);
  divBook.appendChild(btnRemove);
  divBook.appendChild(pAuthor);
  divBook.appendChild(pYear);
  divBook.appendChild(btnRead);
  /* Final append of book into display */
  bookDisplay.appendChild(divBook);
}

function showElement(element) {
  element.classList.toggle("invisible");
}

function validateForm(form) {}
