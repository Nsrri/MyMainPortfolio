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
const description = params.get("description");
const image = params.get("img");
const title = params.get("title");

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

document
  .getElementById("sendMessageBtn")
  .addEventListener("click", function () {
    var contactName = document.getElementById("name").value;
    var contactEmail = document.getElementById("email").value;
    var contactSubject = document.getElementById("subject").value;
    var contactMessage = document.getElementById("message").value;

    axios
      .post("/.netlify/functions/send-contact-email", {
        name: contactName,
        email: contactEmail,
        subject: contactSubject,
        message: contactMessage,
      })
      .then(function (response) {
        document.getElementById("messageResponse").innerHTML =
          '<p class="success-message">' + response.data + "</p>";
        resetForm();
      })
      .catch(function (error) {
        document.getElementById("messageResponse").innerHTML =
          '<p class="error-message">' + error.response.data + "</p>";
      });
  });

function resetForm() {
  document.getElementById("contactForm").reset();
}
