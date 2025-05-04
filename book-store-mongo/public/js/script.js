// Utility: Get query parameter by name
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }
  
  // ========== LIST & DELETE BOOKS (index.html) ==========
  
  async function loadBooks() {
    const response = await fetch('/api/books');
    const books = await response.json();
    const tbody = document.querySelector('#book-table tbody');
    if (!tbody) return;
    tbody.innerHTML = books.map(book => `
      <tr>
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>$${book.price}</td>
        <td>${book.genre}</td>
        <td>
          <a href="/edit-book.html?id=${book._id}" class="button">Edit</a>
          <button onclick="deleteBook('${book._id}')">Delete</button>
        </td>
      </tr>
    `).join('');
  }
  
  window.deleteBook = async function(id) {
    if (!confirm('Are you sure you want to delete this book?')) return;
    await fetch(`/api/books/${id}`, { method: 'DELETE' });
    loadBooks();
  };
  
  // ========== ADD BOOK (add-book.html) ==========
  
  const addBookForm = document.getElementById('add-book-form');
  if (addBookForm) {
    addBookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const [title, author, price, genre] = e.target.elements;
      await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: title.value,
          author: author.value,
          price: parseFloat(price.value),
          genre: genre.value
        })
      });
      window.location.href = '/index.html';
    });
  }
  
  // ========== EDIT BOOK (edit-book.html) ==========
  
  async function loadBookForEdit() {
    const id = getQueryParam('id');
    if (!id) return;
  
    const response = await fetch(`/api/books`);
    const books = await response.json();
    const book = books.find(b => b._id === id);
    if (!book) {
      alert('Book not found!');
      window.location.href = '/index.html';
      return;
    }
  
    document.getElementById('title').value = book.title;
    document.getElementById('author').value = book.author;
    document.getElementById('price').value = book.price;
    document.getElementById('genre').value = book.genre;
  }
  
  const editBookForm = document.getElementById('edit-book-form');
  if (editBookForm) {
    loadBookForEdit();
    editBookForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = getQueryParam('id');
      const title = document.getElementById('title').value;
      const author = document.getElementById('author').value;
      const price = document.getElementById('price').value;
      const genre = document.getElementById('genre').value;
  
      await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, price: parseFloat(price), genre })
      });
  
      window.location.href = '/index.html';
    });
  }
  
  // ========== PAGE INITIALIZATION ==========
  
  if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
    loadBooks();
  }
  