document.addEventListener("DOMContentLoaded", () => {
  const filterItems = document.querySelectorAll(".filter-item");
  const works = document.querySelectorAll(".filter-section");

  function showWorks(category) {
    works.forEach((work) => {
      if (category === "All") {
        work.style.display = "block";
      } else {
        const workCategory = work.dataset.category;
        if (workCategory === category) {
          work.style.display = "block";
        } else {
          work.style.display = "none";
        }
      }
    });
  }

  showWorks("All");
  document
    .querySelector('.filter-item[data-category="All"]')
    .classList.add("active");

  filterItems.forEach((filterItem) => {
    filterItem.addEventListener("click", function () {
      const category = this.dataset.category;
      console.log(category);
      showWorks(category);

      filterItems.forEach((item) => {
        item.classList.remove("active");
      });
      this.classList.add("active");
    });
  });
});

// This is part make the project creation dynamic.
const params = new URLSearchParams(window.location.search);
const description = params.get('description');
const image = params.get('img');
const title = params.get('title');

const descriptionElement = document.getElementById("description");
const titleElement = document.getElementById("title");
const imageElement = document.getElementById("img-detail");

descriptionElement.textContent = description;
titleElement.textContent = title;
imageElement.src = image;


function openDetail(message, title, image) {
  window.open(
    "projectDetail.html?description=" +
      encodeURIComponent(message) +
      "&title=" +
      encodeURIComponent(title) +
      "&img=" +
      encodeURIComponent(image),
    "_blank"
  );
}



