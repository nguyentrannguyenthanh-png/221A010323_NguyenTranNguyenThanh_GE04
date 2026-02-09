
const movies = [
  { 
    title: "One Battle After Another", 
    year: 2025, 
    genre: "Hành động",
    director: "Paul Thomas Anderson", 
    cast: "Leonardo DiCaprio",
    description: "Lấy cảm hứng từ tiểu thuyết, phim kể về nhóm cách mạng French 75 do Pat Calhoun (DiCaprio) dẫn đầu, đối đầu với đại tá tàn bạo Steven Lockjaw (Sean Penn). Bộ phim khắc họa sâu sắc bi kịch gia đình, sự đổ vỡ của lý tưởng và cuộc sống ẩn danh của cha con nhân vật chính trong 16 năm trước khi bị săn đuổi.",
    poster: "images/1.jpg" 
  },
  { 
    title: "Khi cuộc đời cho bạn quả quýt",
    year: 2025, 
    genre: "Tình cảm, ngôn tình",
    director: "Kim Won Seok", 
    cast: "Lee Ji Eun",
    description: "Tựa phim mang ý nghĩa: 'Nếu cuộc đời ném cho bạn những quả quýt chua, hãy dùng chúng làm mứt và pha một tách trà quýt ấm', thể hiện sự kiên cường, biến khó khăn thành hạnh phúc.",
    poster: "images/2.jpg" 
  }

];
  // thêm nhiều phim khác...
function renderMovies(list) {
  const container = document.querySelector(".main-content");
  container.innerHTML = "";
  list.forEach(movie => {
    const card = document.createElement("div");
    card.className = "movie-card";
    card.innerHTML = `
      <img src="${movie.poster}" alt="${movie.title}">
      <div class="info">
        <h3>${movie.title}</h3>
        <p>${movie.year}</p>
      </div>
    `;
    card.addEventListener("click", () => openModal(movie));
    container.appendChild(card);
  });
}
renderMovies(movies);
function getGenres() {
  return [...new Set(movies.map(m => m.genre))];
}

function renderGenreFilters() {
  const sidebar = document.querySelector(".sidebar");
  const genres = getGenres();
  genres.forEach(g => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" value="${g}"> ${g}`;
    sidebar.appendChild(label);
  });
}
renderGenreFilters();
let selectedGenres = [];
let searchTerm = "";

document.querySelector(".sidebar").addEventListener("change", e => {
  if (e.target.type === "checkbox") {
    selectedGenres = [...document.querySelectorAll("input[type=checkbox]:checked")].map(cb => cb.value);
    filterMovies();
  }
});

const searchInput = document.querySelector("#search");
let debounceTimer;
searchInput.addEventListener("input", e => {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    searchTerm = e.target.value.toLowerCase();
    filterMovies();
  }, 400);
});

function filterMovies() {
  let filtered = movies.filter(m => {
    const genreMatch = selectedGenres.length ? selectedGenres.includes(m.genre) : true;
    const searchMatch = m.title.toLowerCase().includes(searchTerm);
    return genreMatch && searchMatch;
  });
  renderMovies(filtered);
}
function openModal(movie) {
  const modal = document.querySelector(".modal");
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${movie.poster}" alt="${movie.title}">
      <h2>${movie.title} (${movie.year})</h2>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p><strong>Cast:</strong> ${movie.cast}</p>
      <p>${movie.description}</p>
    </div>
  `;
  modal.style.display = "block";
  modal.querySelector(".close").onclick = () => modal.style.display = "none";
}const toggleBtn = document.querySelector("#toggle-mode");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});

window.onload = () => {
  if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
  }
};