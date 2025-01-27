const dialog = document.querySelector("dialog");
const addBookBtn = document.querySelector(".add-book-btn");
const bookDataCancelBtn = document.querySelector("#book-data-cancel-btn");
const bookDataAddBtn = document.querySelector("#book-data-add-btn");
const booksContainer = document.querySelector(".books");

const bookData = {
  title: document.querySelector("#book-title"),
  author: document.querySelector("#book-author"),
  pages: document.querySelector("#book-pages"),
  readed: document.querySelector("#book-readed")
};

addBookBtn.addEventListener("click", () => {
  dialog.showModal();
});

bookDataCancelBtn.addEventListener("click", () => {
  dialog.close();
});

const library = [];

function book(title, author, pages, readed) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readed = readed;
}

book.prototype.toggleRead = function() {
  this.readed = !this.readed;
};

function addBookToLibrary(book) {
  library.push(book);
}

bookDataAddBtn.addEventListener("click", (event) => {
  event.preventDefault();

  const bookTitle = bookData.title.value;
  const bookAuthor = bookData.author.value;
  const bookPages = bookData.pages.value;
  const bookReaded = bookData.readed.options[bookData.readed.selectedIndex].text;

  if(bookTitle && bookAuthor && bookPages) {
    addBookToLibrary(new book(bookTitle, bookAuthor, bookPages, bookReaded));
    dialog.close();
    renderBooks();

    for (const key in bookData) {
      if(key !== "readed") {
        bookData[key].value = "";
      }
    }
  }
});

function renderBooks() {
  while(booksContainer.firstChild) {
    booksContainer.removeChild(booksContainer.firstChild);
  }

  library.forEach((book, index) => {
    const bookDivContainer = document.createElement("div");
    const bookBtnsDivContainer = document.createElement("div");

    bookDivContainer.classList.add("book");
    bookBtnsDivContainer.classList.add("book-btns");

    const pTitle = document.createElement("p");
    pTitle.textContent = `Title: ${book.title}`;

    const pAuthor = document.createElement("p");
    pAuthor.textContent = `Author: ${book.author}`;

    const pPages = document.createElement("p");
    pPages.textContent = `Pages: ${book.pages}`;

    const readBtn = document.createElement("button");
    readBtn.textContent = `Readed: ${book.readed ? "Yes" : "No"}`
    readBtn.addEventListener("click", () => {
      book.toggleRead();
      renderBooks();
    });

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", () => {
      library.splice(index, 1);
      renderBooks();
    });

    bookBtnsDivContainer.append(readBtn, removeBtn);

    bookDivContainer.append(pTitle, pAuthor, pPages, bookBtnsDivContainer);

    booksContainer.appendChild(bookDivContainer);
  });
}

const firtsBook = new book(
  "One Hundred Years of Solitude",
  "Gabriel García Márquez",
  "417",
  true
);

const secondBook = new book(
  "Pride and Prejudice",
  "Jane Austen",
  "279",
  false
);

const thirdBook = new book(
  "The Little Prince",
  "Antoine de Saint-Exupéry",
  "96",
  true
);

addBookToLibrary(firtsBook);
addBookToLibrary(secondBook);
addBookToLibrary(thirdBook);

renderBooks();