const API_URL = "https://jsonplaceholder.typicode.com/users";

const container = document.getElementById("usersContainer");
const searchInput = document.getElementById("searchInput");
const sortBtn = document.getElementById("sortBtn");
const loading = document.getElementById("loading");
const error = document.getElementById("error");
const modal = document.getElementById("modal");
const userDetails = document.getElementById("userDetails");
const closeBtn = document.getElementById("closeBtn");

let users = [];
let ascending = true;

fetch(API_URL)
  .then(res => res.json())
  .then(data => {
    users = data;
    loading.style.display = "none";
    renderUsers(users);
  })
  .catch(() => {
    loading.style.display = "none";
    error.textContent = "Unable to fetch users.";
  });

function renderUsers(data) {
  container.innerHTML = "";
  data.forEach(user => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p>${user.email}</p>
     `;
    card.onclick = () => showDetails(user);
    container.appendChild(card);
  });
}

searchInput.addEventListener("input", () => {
  const value = searchInput.value.toLowerCase();
  const filtered = users.filter(user =>
    user.name.toLowerCase().includes(value) ||
    user.email.toLowerCase().includes(value)
  );
  renderUsers(filtered);
});

sortBtn.addEventListener("click", () => {
  users.sort((a, b) =>
    ascending
      ? a.name.localeCompare(b.name)
      : b.name.localeCompare(a.name)
  );
  ascending = !ascending;
  sortBtn.textContent = ascending ? "A–Z" : "Z–A";
  renderUsers(users);
});

function showDetails(user) {
  modal.style.display = "block";
  userDetails.innerHTML = `
    <h2><u>${user.name}</u></h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Company:</strong> ${user.company.name}</p>
    <p><strong>City:</strong> ${user.address.city}</p>
  `;
}

closeBtn.onclick = () => modal.style.display = "none";
window.onclick = e => {
  if (e.target === modal) modal.style.display = "none";

}
