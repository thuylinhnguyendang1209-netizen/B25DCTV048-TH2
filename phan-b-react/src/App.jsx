import { initialBooks } from "./data.js";

import { initialBooks } from "./data";
import "./App.css";

const Header = ({ favCount }) => (
  <header>
    <h1>Thư Viện</h1>
    <div className="header-actions">
      <span>Yêu thích: {favCount}</span>
    </div>
  </header>
);

const Section = ({ children }) => (
  <main className="container" style={{ flexDirection: "column" }}>
    {children}
  </main>
);

const GenreFilter = ({ genres, onFilterSelect }) => (
  <div className="toolbar">
    <select onChange={(e) => onFilterSelect(e.target.value)} id="genre-filter">
      <option value="">Tất cả thể loại</option>
      {genres.map((g) => (
        <option key={g} value={g}>
          {g}
        </option>
      ))}
    </select>
  </div>
);

const BookCard = ({ book, isFav, onToggleFav }) => (
  <div className="card">
    <h3>{book.title}</h3>
    <p>Tác giả: {book.author}</p>
    <p>Thể loại: {book.genre}</p>
    <p>Năm XB: {book.year}</p>
    <button className="btn-fav" onClick={() => onToggleFav(book.id)}>
      {isFav ? "Bỏ thích" : "Yêu thích"}
    </button>
  </div>
);

const BookList = ({ books, favorites, onToggleFav }) => (
  <section className="book-list">
    {books.map((book) => (
      <BookCard
        key={book.id}
        book={book}
        isFav={favorites.includes(book.id)}
        onToggleFav={onToggleFav}
      />
    ))}
  </section>
);

const Footer = () => (
  <footer style={{ padding: "1rem", textAlign: "center", marginTop: "2rem" }}>
    © 2026 Thư Viện
  </footer>
);

function App() {
  const [books] = useState(initialBooks);
  const [favorites, setFavorites] = useState([]);
  const [filterGenre, setFilterGenre] = useState("");

  const genres = [...new Set(books.map((b) => b.genre))];

  const handleToggleFav = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  };

  const displayedBooks = filterGenre
    ? books.filter((b) => b.genre === filterGenre)
    : books;

  return (
    <div>
      <Header favCount={favorites.length} />
      <GenreFilter genres={genres} onFilterSelect={setFilterGenre} />
      <Section>
        <div className="status">
          Đang hiển thị {displayedBooks.length} / {books.length} cuốn
        </div>
        <BookList
          books={displayedBooks}
          favorites={favorites}
          onToggleFav={handleToggleFav}
        />
      </Section>
      <Footer />
    </div>
  );
}

export default App;
