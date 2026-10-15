import { fetchBooks, deleteBookApi } from "./api.js";

const DOM = {
  list: document.getElementById("book-list"),
  status: document.getElementById("status-text"),
  searchInput: document.getElementById("search-input"),
  genreFilter: document.getElementById("genre-filter"),
  favCount: document.getElementById("fav-count"),
  form: document.getElementById("add-book-form"),
  themeToggle: document.getElementById("theme-toggle"),
};

let books = [];
let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function init() {
  DOM.status.textContent = "Đang tải...";
  const data = await fetchBooks();

  if (!data) {
    DOM.status.textContent = "Lỗi tải dữ liệu!";
    return;
  }

  books = data;
  updateGenres(books);
  renderBooks(books);
  updateFavCount();
}

function renderBooks(dataToRender) {
  DOM.list.innerHTML = "";
  DOM.status.textContent = `Đang hiển thị ${dataToRender.length} / ${books.length} cuốn`;

  dataToRender.forEach((book) => {
    const card = document.createElement("div");
    card.className = "card";
    const isFav = favorites.includes(book.id) ? "Bỏ thích" : "Yêu thích";

    card.innerHTML = `
      <h3>${book.title}</h3>
      <p>Tác giả: ${book.author}</p>
      <p>Thể loại: ${book.genre}</p>
      <p>Năm XB: ${book.year}</p>
      <button class="btn-fav" data-id="${book.id}">${isFav}</button>
      <button class="btn-delete" data-id="${book.id}">Xóa</button>
    `;
    DOM.list.appendChild(card);
  });
}

function updateGenres(data) {
  DOM.genreFilter.innerHTML = '<option value="">Tất cả thể loại</option>';

  const genres = [...new Set(data.map((b) => b.genre))];
  genres.forEach((g) => {
    const option = document.createElement("option");
    option.value = g;
    option.textContent = g;
    DOM.genreFilter.appendChild(option);
  });
}

function handleFilter() {
  const searchTerm = DOM.searchInput.value.toLowerCase();
  const genre = DOM.genreFilter.value;

  const filtered = books.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm) &&
      (genre === "" || b.genre === genre),
  );
  renderBooks(filtered);
}

DOM.searchInput.addEventListener("input", handleFilter);
DOM.genreFilter.addEventListener("change", handleFilter);

DOM.list.addEventListener("click", async (e) => {
  const id = e.target.dataset.id;

  if (e.target.classList.contains("btn-fav")) {
    if (favorites.includes(id)) {
      favorites = favorites.filter((favId) => favId !== id);
    } else {
      favorites.push(id);
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
    updateFavCount();
    handleFilter();
  }

  if (e.target.classList.contains("btn-delete")) {
    if (confirm("Bạn có chắc chắn muốn xóa sách này?")) {
      await deleteBookApi(id);
      books = books.filter((b) => b.id !== id);
      handleFilter();
    }
  }
});

function updateFavCount() {
  DOM.favCount.textContent = `Yêu thích: ${favorites.length}`;
}

DOM.form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const genre = document.getElementById("genre").value;
  const year = parseInt(document.getElementById("year").value);
  const currentYear = new Date().getFullYear();
  let isValid = true;

  document.querySelectorAll(".error").forEach((el) => (el.textContent = ""));

  if (title.length < 3) {
    document.getElementById("title-error").textContent = "Tên từ 3 ký tự";
    isValid = false;
  }
  if (!author.trim()) {
    document.getElementById("author-error").textContent = "Bắt buộc nhập";
    isValid = false;
  }
  if (!genre.trim()) {
    document.getElementById("genre-error").textContent = "Bắt buộc nhập";
    isValid = false;
  }
  if (!year || year < 1900 || year > currentYear) {
    document.getElementById("year-error").textContent = "Năm không hợp lệ";
    isValid = false;
  }

  if (isValid) {
    const newBook = { id: Date.now().toString(), title, author, genre, year };
    books.unshift(newBook);

    updateGenres(books);
    handleFilter();

    DOM.form.reset();
  }
});

DOM.themeToggle.addEventListener("click", () => {
  document.body.dataset.theme =
    document.body.dataset.theme === "dark" ? "light" : "dark";
});

init();
