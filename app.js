const buttons = document.querySelectorAll(".btn");
const bookDisplay = document.querySelector(".book-display");
const bookForm = document.forms["bookForm"];
const divAddBook = document.querySelector(".addBook");
const errorYear = document.querySelector(".formError.year");

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    btnHandler(button.classList[1]);
  });
});

bookForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let errors = validateForm(bookForm);
  if (errors.length > 0) {
    errors.forEach((error) => {
      if (error.type == "year") errorYear.innerText = error.message;
    });
  }
  if (errors.length == 0) {
    let book = ingestForm(bookForm);
    addBookToLibrary(book);
    createBookElement(book);
    showElement(divAddBook);
  }
});

// Instantiate array to hold book objects
let myLibrary = [];

// Book constructor
function Book(title, author, year, boolRead) {
  this.index = "";
  this.title = title;
  this.author = author;
  this.year = year;
  this.boolRead = boolRead;
}

Book.prototype.toggleRead = function () {
  this.boolRead = !this.boolRead;
};

// Error constructor
function Error(type, message) {
  this.type = type;
  this.message = message;
}

let theHobbit = new Book("The Hobbit", "J.R.R", 1958, false);
let vampire = new Book("Interview with the Vampire", "Anne Rice", 1976, false);
let it = new Book("It", "Stephen King", 1986, true);

addBookToLibrary(theHobbit);
addBookToLibrary(vampire);
addBookToLibrary(it);

refreshDisplay();

function addBookToLibrary(book) {
  book.index = myLibrary.length;
  myLibrary.push(book);
}

function btnHandler(btnClass) {
  switch (btnClass) {
    case "search":
      console.log("search btn hit");
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
  divBook.dataset.index = book.index;
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

  btnRemove.addEventListener("click", (e) => {
    removeBook(e.target.parentElement.dataset.index);
  });

  iXMark.classList += "fa-solid fa-xmark insensitive";
  pAuthor.classList += "author";
  pYear.classList += "year";
  btnRead.classList += "btn boolRead";
  btnRead.addEventListener("click", (e) => {
    changeReadStatus(e);
  });
  addHoverListener(btnRead);
  iCheck.classList += "fa-solid fa-check insensitive";
  iUnread.classList += "fa-solid fa-ban insensitive";
  /* Populate element text with book details */
  pTitle.innerText = book.title;
  pAuthor.innerText = book.author;
  pYear.innerText = book.year;

  if (book.boolRead) {
    btnRead.classList += " read";
    btnRead.appendChild(iCheck);
  } else {
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

function validateForm(form) {
  // Validate year input
  let errors = validateFormInput("year", form["publishYear"].value);

  // Future logic for any additional input validation...

  return errors;
}

function validateFormInput(inputType, input) {
  let messages = [];
  // Begin handling publishYear input
  if (inputType == "year") {
    if (input == "" || input == null) {
      messages.push(new Error("year", "Please enter a valid year"));
    }
    if (!Number.isInteger(parseInt(input))) {
      messages.push(new Error("year", "Please enter a valid year"));
    }
  }
  // End handling publishYear input
  return messages;
}

function ingestForm(form) {
  let title = form["title"].value;
  let author = form["author"].value;
  let publishYear = form["publishYear"].value;
  let hasRead = form["hasRead"].checked;

  return new Book(title, author, publishYear, hasRead);
}

/* 
   addHoverListener is used to add hover styling to boolRead buttons 
   by changing the button to indicate the future state of the button 
   in the event of a click. e.g. hover over a checked button, button
   then becomes red and unchecked. Hover out, and it will return to 
   its checkmark and green color 
*/

function addHoverListener(button) {
  // mouse enter
  button.addEventListener("mouseover", (e) => {
    e.stopPropagation();
    const btn = e.target;
    btn.removeChild(btn.firstChild);
    let divBook = btn.parentElement;
    if (myLibrary[divBook.dataset.index].boolRead) {
      const iUnread = document.createElement("i");
      iUnread.classList += "fa-solid fa-ban  insensitive";
      btn.appendChild(iUnread);
      btn.classList.toggle("unread");
    }
    if (!myLibrary[divBook.dataset.index].boolRead) {
      const iCheck = document.createElement("i");
      iCheck.classList += "fa-solid fa-check insensitive";
      btn.appendChild(iCheck);
      btn.classList.toggle("unread");
    }
  });

  // mouse leave
  button.addEventListener("mouseout", (e) => {
    console.log(`event triggered: ${e.target}`);
    const btn = e.target;
    btn.removeChild(btn.firstChild);
    let divBook = btn.parentElement;
    if (!myLibrary[divBook.dataset.index].boolRead) {
      const iUnread = document.createElement("i");
      iUnread.classList += "fa-solid fa-ban";
      btn.appendChild(iUnread);
      btn.classList.toggle("unread");
    }
    if (myLibrary[divBook.dataset.index].boolRead) {
      const iCheck = document.createElement("i");
      iCheck.classList += "fa-solid fa-check";
      btn.appendChild(iCheck);
      btn.classList.toggle("unread");
    }
  });
}

function removeBook(index) {
  debugger;
  myLibrary.splice(index, 1);
  bookDisplay.removeChild(bookDisplay.children[index]);

  for (i = 0; i < myLibrary.length; i++) {
    myLibrary[i].index = i;
    bookDisplay.children[i].dataset.index = i;
  }
}

function changeReadStatus(e) {
  divIndex = e.target.parentElement.dataset.index;
  myLibrary[divIndex].toggleRead();
  e.target.classList.toggle("unread ");
}
