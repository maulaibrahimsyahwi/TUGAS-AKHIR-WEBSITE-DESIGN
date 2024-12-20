// Menu SIDE BAR
const navbarNav = document.querySelector(".navbar-nav");
document.querySelector("#hamburger-menu").onclick = () => {
  navbarNav.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", function () {
  const dropdowns = document.querySelectorAll(".dropdowns, .dropdown");

  // Menyembunyikan semua dropdown saat halaman dimuat
  dropdowns.forEach((dropdown) => {
    dropdown.style.display = "none";
  });

  const dropdownParents = document.querySelectorAll(".dropdown-parent");

  dropdownParents.forEach((parent) => {
    const link = parent.querySelector("a");
    const dropdown = parent.querySelector(".dropdowns, .dropdown");

    // Hover event
    parent.addEventListener("mouseenter", () => {
      dropdown.style.display = "flex";
    });

    parent.addEventListener("mouseleave", () => {
      dropdown.style.display = "none";
    });

    // Klik toggle dropdown
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const isVisible = dropdown.style.display === "flex";
      closeAllDropdowns();
      dropdown.style.display = isVisible ? "none" : "flex";
    });
  });

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * Menutup semua dropdown
   */
  /******  4b52ce4f-53fb-4031-b901-7f4e6d957143  *******/
  function closeAllDropdowns() {
    dropdowns.forEach((dropdown) => {
      dropdown.style.display = "none";
    });
  }

  // Klik di luar dropdown untuk menutup semua dropdown
  document.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown-parent")) {
      closeAllDropdowns();
    }
  });
});

// section search
document
  .getElementById("search-input")
  .addEventListener("keypress", (event) => {
    if (event.keycode === 13) {
      searchCourses();
    }
  });
// Menambahkan event listener pada setiap kursus card
const courseCards = document.querySelectorAll(".course-card");

courseCards.forEach((card) => {
  card.addEventListener("click", () => {
    // Anda dapat mengganti dengan fungsi yang ingin dilakukan saat kursus card diklik
    alert("Kursus " + card.querySelector("h3").textContent + " telah diklik!");
  });
});

function sortCourses() {
  const levelSort = document.getElementById("sort-level").value;
  const categorySort = document.getElementById("sort-category").value;
  const priceSort = document.getElementById("sort-price").value;

  const coursesContainer = document.getElementById("courses");
  const courses = Array.from(coursesContainer.children);

  courses.sort((a, b) => {
    if (levelSort && a.dataset.level !== b.dataset.level) {
      return a.dataset.level.localeCompare(b.dataset.level);
    }

    if (categorySort === "popular") {
      return a.dataset.popular - b.dataset.popular;
    } else if (categorySort === "newest") {
      return b.dataset.duration - a.dataset.duration;
    } else if (categorySort === "oldest") {
      return a.dataset.duration - b.dataset.duration;
    }

    if (priceSort === "highest") {
      return b.dataset.price - a.dataset.price;
    } else if (priceSort === "lowest") {
      return a.dataset.price - b.dataset.price;
    }
  });

  courses.forEach((course) => coursesContainer.appendChild(course));
}

function searchCourses() {
  const searchInput = document
    .getElementById("search-input")
    .value.toLowerCase();
  // Menambahkan pengecekan jika input pencarian kosong
  if (searchInput === "") {
    const noResultsMessage = document.querySelector(".no-results");
    if (noResultsMessage) {
      noResultsMessage.remove();
    }
    const courses = document.querySelectorAll(".course-card");
    courses.forEach((course) => {
      course.style.display = "flex";
    });
    return;
  }

  const courses = document.querySelectorAll(".course-card");
  const coursesContainer = document.getElementById("courses");
  let found = false;

  courses.forEach((course) => {
    const title = course.querySelector("h3").textContent.toLowerCase();
    const level = course
      .querySelector("p:nth-of-type(1)")
      .textContent.toLowerCase();
    const duration = course
      .querySelector("p:nth-of-type(2)")
      .textContent.toLowerCase();

    if (
      title.includes(searchInput) ||
      level.includes(searchInput) ||
      duration.includes(searchInput)
    ) {
      course.style.display = "flex";
      found = true;
    } else {
      course.style.display = "none";
    }
  });

  const noResultsMessage = document.querySelector(".no-results");
  if (!found) {
    if (!noResultsMessage) {
      const message = document.createElement("div");
      message.className = "no-results";
      message.textContent = `Hasil pencarian dengan kata kunci "${searchInput}" tidak ditemukan`;
      coursesContainer.appendChild(message);
    } else {
      noResultsMessage.textContent = `Hasil pencarian dengan kata kunci "${searchInput}" tidak ditemukan`;
    }
  } else if (noResultsMessage) {
    noResultsMessage.remove();
  }
}
