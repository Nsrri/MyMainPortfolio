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
  const filterItemClass = document.querySelector(
    '.filter-item[data-category="All"]'
  );
  if (filterItemClass) {
    filterItemClass.classList.add("active");
  }

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

if (description && title && image) {
  descriptionElement.textContent = description;
  titleElement.textContent = title;
  imageElement.src = image;
}

function openDetail(message, title, image) {
  window.location.href =
    "projectDetail.html?description=" +
    encodeURIComponent(message) +
    "&title=" +
    encodeURIComponent(title) +
    "&img=" +
    encodeURIComponent(image);
}

document.addEventListener("DOMContentLoaded", function () {
  const btn = document.getElementById("sendMessageBtn");

  if (btn) {
    btn.addEventListener("click", function (event) {
      event.preventDefault();

      var contactName = document.getElementById("name").value;
      var contactEmail = document.getElementById("email").value;
      var contactSubject = document.getElementById("subject").value;
      var contactMessage = document.getElementById("message").value;

      axios
        .post("/.netlify/functions/sendEmail", {
          name: contactName,
          email: contactEmail,
          subject: contactSubject,
          message: contactMessage,
        })
        .then(function (response) {
          console.log(response.data);
          resetForm();
          alert("Email sent successfully!");
        })
        .catch(function (error) {
          console.log(error.message);
          alert("Failed to send email. Please try again.");
        });
    });
  }

  function resetForm() {
    document.getElementById("contactForm").reset();
  }
});
