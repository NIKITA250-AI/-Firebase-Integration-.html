const databaseURL = "https://your-project-id.firebaseio.com"; 

async function fetchBooks() {
  const response = await fetch(`${databaseURL}/books.json`);
  const data = await response.json();
  displayBooks(data);
}

function displayBooks(books) {
  const bookList = document.getElementById("bookList");
  bookList.innerHTML = "";
  for (let id in books) {
    const book = books[id];
    const div = document.createElement("div");
    div.textContent = `${book.title} by ${book.author} (${book.publishedYear}) - ${book.available ? "Available" : "Not Available"}`;
    bookList.appendChild(div);
  }
}

document.getElementById("bookForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const newBook = {
    title: document.getElementById("title").value,
    author: document.getElementById("author").value,
    genre: document.getElementById("genre").value,
    publishedYear: parseInt(document.getElementById("year").value),
    available: document.getElementById("available").checked
  };
  await fetch(`${databaseURL}/books.json`, {
    method: "POST",
    body: JSON.stringify(newBook),
  });
  fetchBooks();
});

fetchBooks();