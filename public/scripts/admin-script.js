document.addEventListener("DOMContentLoaded", async () => {
  // const dashboardLink = document.getElementById('dashboard-link');
  const membersLink = document.getElementById("members-link");
  // const analyticsLink = document.getElementById('analytics-link');
  const universityLink = document.getElementById("university-link");
  const universityManagementLink = document.getElementById(
    "university-management-link"
  );

  const adminAccountLink = document.getElementById("admin-account-link");
  const markersLink = document.getElementById("markers-link");
  const bCardsLink = document.getElementById("bcards-link");
  const membersSection = document.getElementById("members-section");
  const universitySection = document.getElementById("university-section");
  const universityManagementSection = document.getElementById(
    "university-management-section"
  );
  const markersSection = document.getElementById("markers-section");
  const bCardsSection = document.getElementById("bcards-section");
  const adminAccountSection = document.getElementById("admin-account-section");
  const errorPasswordTooltip = document.querySelector(".tooltip-error-pass");

  function showSection(section) {
    membersSection.style.display = "none";
    universitySection.style.display = "none";
    universityManagementSection.style.display = "none";
    markersSection.style.display = "none";
    bCardsSection.style.display = "none";
    adminAccountSection.style.display = "none";
    section.style.display = "block";

    // Update sidebar active state
    [
      membersLink,
      universityLink,
      universityManagementLink,
      markersLink,
      bCardsLink,
      adminAccountLink,
    ].forEach((link) => {
      link.classList.remove("sidebar-active");
    });
    if (section === membersSection) membersLink.classList.add("sidebar-active");
    if (section === universitySection)
      universityLink.classList.add("sidebar-active");
    if (section === universityManagementSection)
      universityManagementLink.classList.add("sidebar-active");
    if (section === markersSection) markersLink.classList.add("sidebar-active");
    if (section === bCardsSection) bCardsLink.classList.add("sidebar-active");
    if (section === adminAccountSection)
      adminAccountLink.classList.add("sidebar-active");
  }

  showSection(membersSection);

  membersLink.addEventListener("click", function (e) {
    errorPasswordTooltip.style.display = "none";
    e.preventDefault();
    showSection(membersSection);
  });

  universityLink.addEventListener("click", function (e) {
    errorPasswordTooltip.style.display = "none";

    e.preventDefault();
    showSection(universitySection);
  });

  universityManagementLink.addEventListener("click", function (e) {
    errorPasswordTooltip.style.display = "none";

    e.preventDefault();
    showSection(universityManagementSection);
  });

  markersLink.addEventListener("click", function (e) {
    errorPasswordTooltip.style.display = "none";

    e.preventDefault();
    showSection(markersSection);
  });

  bCardsLink.addEventListener("click", (e) => {
    errorPasswordTooltip.style.display = "none";

    e.preventDefault();
    showSection(bCardsSection);
  });

  adminAccountLink.addEventListener("click", (e) => {
    errorPasswordTooltip.style.display = "none";

    e.preventDefault();
    showSection(adminAccountSection);
  });

  // University Contents Tabs
  const tabs = document.querySelectorAll(".university-tab");
  const tabContents = document.querySelectorAll(".university-tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const tabId = tab.getAttribute("data-tab");

      tabs.forEach((t) => t.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      tab.classList.add("active");
      document.getElementById(`${tabId}-tab`).classList.add("active");
    });
  });

  // Handle university content updates
  const universityForm = document.getElementById("university-edit-form");
  const previewTitle = document.getElementById("preview-title");
  const previewText = document.getElementById("preview-text");
  const previewButton = document.getElementById("preview-button");
  const previewBackground = document.getElementById("preview-background");
  const previewImages = [
    document.getElementById("preview-image-1"),
    document.getElementById("preview-image-2"),
    document.getElementById("preview-image-3"),
  ];

  if (universityForm) {
    universityForm.addEventListener("submit", function (e) {
      e.preventDefault();

      previewTitle.textContent = document.getElementById("title").value;
      previewText.textContent = document.getElementById("content-text").value;
      previewButton.textContent = document.getElementById("button-text").value;

      const newBackground =
        document.getElementById("background-image").files[0];
      if (newBackground) {
        const reader = new FileReader();
        reader.onload = function (e) {
          previewBackground.src = e.target.result;
        };
        reader.readAsDataURL(newBackground);
      }

      for (let i = 0; i < 3; i++) {
        const newImage = document.getElementById(`carousel-image-${i + 1}`)
          .files[0];
        if (newImage) {
          const reader = new FileReader();
          reader.onload = function (e) {
            previewImages[i].src = e.target.result;
          };
          reader.readAsDataURL(newImage);
        }
      }

      console.log("University content updated");
    });
  }

  // Handle achievements
  const achievementForm = document.getElementById("achievement-add-form");
  const achievementsList = document.getElementById("achievements-list");

  if (achievementForm) {
    achievementForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const newImage = document.getElementById("achievement-image").files[0];
      const description = document.getElementById(
        "achievement-description"
      ).value;

      if (newImage && description) {
        const reader = new FileReader();
        reader.onload = function (e) {
          const achievementItem = document.createElement("div");
          achievementItem.className = "achievement-item";
          achievementItem.innerHTML = `
                        <img src="${e.target.result}" alt="Achievement">
                        <p>${description}</p>
                    `;
          achievementsList.appendChild(achievementItem);
        };
        reader.readAsDataURL(newImage);

        // Clear form
        document.getElementById("achievement-image").value = "";
        document.getElementById("achievement-description").value = "";

        console.log("Achievement added");
      } else {
        console.log("Please provide both an image and a description");
      }
    });
  }
});

// Functions for University management page
const availableIcons = [
  { class: "bi bi-award", label: "Award" },
  { class: "bi bi-trophy", label: "Trophy" },
  { class: "bi bi-star", label: "Star" },
  { class: "bi bi-ribbon", label: "Ribbon" },
  { class: "bi bi-gem", label: "Gem" },
  { class: "bi bi-book", label: "Book" },
  { class: "bi bi-mortarboard", label: "Mortarboard" },
  { class: "bi bi-pencil", label: "Pencil" },
  { class: "bi bi-journal-text", label: "Journal Text" },
  { class: "bi bi-person-video3", label: "Person Video" },
  { class: "bi bi-briefcase", label: "Briefcase" },
  { class: "bi bi-diagram-3", label: "Hierarchy Diagram" },
  { class: "bi bi-building", label: "Building" },
  { class: "bi bi-person-badge", label: "Person Badge" },
  { class: "bi bi-pie-chart", label: "Pie Chart" },
  { class: "bi bi-tools", label: "Tools" },
  { class: "bi bi-lightbulb", label: "Lightbulb" },
  { class: "bi bi-gear", label: "Gear" },
  { class: "bi bi-robot", label: "Robot" },
  { class: "bi bi-puzzle", label: "Puzzle Piece" },
  { class: "bi bi-people", label: "People" },
  { class: "bi bi-hand-thumbs-up", label: "Thumbs Up" },
  { class: "bi bi-heart", label: "Heart" },
  { class: "bi bi-chat-dots", label: "Chat Dots" },
  { class: "bi bi-flag", label: "Flag" },
  { class: "bi bi-palette", label: "Palette" },
  { class: "bi bi-music-note", label: "Music Note" },
  { class: "bi bi-camera", label: "Camera" },
  { class: "bi bi-film", label: "Film" },
  { class: "bi bi-quill-pen", label: "Quill Pen" },
  { class: "bi bi-globe", label: "Globe" },
  { class: "bi bi-cloud", label: "Cloud" },
  { class: "bi bi-shield-check", label: "Shield Check" },
  { class: "bi bi-calendar-check", label: "Calendar Check" },
  { class: "bi bi-three-dots", label: "Three Dots" },
];

async function fetchDepartments() {
  const response = await fetch("/api/departments");
  const departments = await response.json();

  const container = document.getElementById("departments-list");
  container.innerHTML = "";

  departments.forEach((department) => {
    const li = document.createElement("li");
    li.value = department.department_id;

    const nameContainer = document.createElement("span");
    nameContainer.textContent = department.department_name;
    nameContainer.className = "department-name";

    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn-dept";
    deleteBtn.onclick = function (e) {
      e.preventDefault();
      if (confirm("Are you sure you want to delete this department?")) {
        deleteDepartment(department.department_id);
      }
    };

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn-dept";
    editBtn.onclick = function (e) {
      e.preventDefault();
      toggleEditMode(
        department.department_id,
        nameContainer,
        editBtn,
        deleteBtn
      );
    };

    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(deleteBtn);

    li.appendChild(nameContainer);
    li.appendChild(buttonsContainer);
    container.appendChild(li);
  });

  function toggleEditMode(departmentId, nameContainer, editBtn, deleteBtn) {
    const isEditing = nameContainer.querySelector("input");

    if (isEditing) {
      // Save mode
      const input = nameContainer.querySelector("input");
      const newName = input.value;

      // Replace input with text content
      nameContainer.textContent = newName;

      // Revert button to Edit
      editBtn.className = "edit-btn-dept";

      // Re-enable delete button
      deleteBtn.disabled = false;

      saveDepartmentName(departmentId, newName);
    } else {
      // Edit mode
      const currentName = nameContainer.textContent;

      // Replace text content with an input field
      const input = document.createElement("input");
      input.type = "text";
      input.value = currentName;
      input.className = "edit-input";

      editBtn.classList.add("active");

      nameContainer.textContent = ""; // Clear current text
      nameContainer.appendChild(input);

      // Disable delete button
      deleteBtn.disabled = true;
    }
  }
}

async function saveDepartmentName(departmentId, newName) {
  try {
    const response = await fetch(`/arcms/api/v1/departments/${departmentId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ department_name: newName }),
    });

    if (!response.ok) {
      showErrorMessage("Failed to save department name");
      throw new Error("Failed to save department name.");
    }

    console.log("Department name updated successfully.");
    showSuccessMessage("Department name updated successfully.");
  } catch (error) {
    console.error(error);
  }
}

async function createDepartment(name) {
  try {
    const response = await fetch("/arcms/api/v1/departments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ department_name: name }),
    });

    if (!response.ok) {
      showErrorMessage("Failed to create new department");
      throw new Error("Failed to create new department.");
    }

    showSuccessMessage("New department created successfully.");
    fetchDepartments();
  } catch (error) {
    console.error(error);
  }
}

async function deleteDepartment(departmentId) {
  try {
    const response = await fetch(`/arcms/api/v1/departments/${departmentId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      showErrorMessage("Failed to delete department");
      throw new Error("Failed to delete department.");
    }
    showErrorMessage("Department deleted.");
    fetchDepartments();
  } catch (error) {
    console.error("Failed to delete department: ", error);
  }
}

async function fetchAchievementTypes() {
  const container = document.getElementById("achievement-list");
  const response = await fetch("/arcms/api/v1/achievements/type");
  const data = await response.json();

  container.innerHTML = "";

  data.forEach((type) => {
    const li = document.createElement("li");
    li.setAttribute("data-achievement-id", type.achievement_id);

    // Create a container for the icon and name
    const leftContainer = document.createElement("div");
    leftContainer.className = "left-container";

    // Parse the icon HTML string into a DOM element
    const iconElement = document.createElement("span");
    iconElement.innerHTML = type.icon;

    // Create the name text node
    const nameElement = document.createElement("span");
    nameElement.className = "achievement-name";
    nameElement.textContent =
      type.name.charAt(0).toUpperCase() + type.name.slice(1);

    // Append icon and name to the left container
    leftContainer.appendChild(iconElement);
    leftContainer.appendChild(nameElement);

    // Create buttons container
    const buttonsContainer = document.createElement("div");
    buttonsContainer.className = "buttons";

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn-ach";
    deleteBtn.onclick = function () {
      if (confirm("Are you sure you want to delete this achievement type?")) {
        deleteAchievementType(type.achievement_id);
      }
    };

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn-ach";
    editBtn.onclick = function () {
      toggleEditMode(type, iconElement, nameElement, editBtn, deleteBtn);
    };

    // Append buttons to the container
    buttonsContainer.appendChild(editBtn);
    buttonsContainer.appendChild(deleteBtn);

    // Append containers to the list item
    li.appendChild(leftContainer);
    li.appendChild(buttonsContainer);

    // Append the list item to the container
    container.appendChild(li);
  });

  function toggleEditMode(type, iconElement, nameElement, editBtn, deleteBtn) {
    const isEditing = nameElement.querySelector("input");

    if (isEditing) {
      // Save mode
      const input = nameElement.querySelector("input");
      const newName = input.value;

      const select = iconElement.querySelector("select");
      const newIconClass = select.value;

      // Replace inputs with updated content
      nameElement.textContent = newName;
      iconElement.innerHTML = `<i class="${newIconClass}"></i>`;

      // Revert button to Edit
      editBtn.classList.remove("active");
      deleteBtn.disabled = false;

      updateAchievement(type.achievement_id, newName, iconElement.innerHTML);
    } else {
      // Edit mode
      const currentName = nameElement.textContent;

      // Replace name with input field
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      nameInput.value = currentName;
      nameInput.className = "edit-input";

      nameElement.textContent = ""; // Clear current text
      nameElement.appendChild(nameInput);

      // Replace icon with a dropdown
      const select = document.createElement("select");
      select.className = "edit-input";
      availableIcons.forEach((icon) => {
        const option = document.createElement("option");
        option.value = icon.class;
        option.innerHTML = `<i class="${icon.class}"></i> ${icon.label}`;
        if (icon.class === type.icon) {
          option.selected = true;
        }
        select.appendChild(option);
      });

      iconElement.textContent = ""; // Clear current icon
      iconElement.appendChild(select);

      // Change button to Save and disable delete
      editBtn.classList.add("active");
      deleteBtn.disabled = true;
    }
  }
}

async function updateAchievement(achievement_id, newName, newIconClass) {
  try {
    const response = await fetch(
      `/arcms/api/v1/achievements/type/${achievement_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: newName,
          icon: newIconClass,
        }),
      }
    );

    if (!response.ok) {
      showErrorMessage("Failed to save Achievement type");
      throw new Error("Failed to save Achievement type.");
    }

    console.log("Achievement type updated successfully.");
    showSuccessMessage("Achievement type updated successfully.");
  } catch (error) {
    console.error(error);
  }
}

async function createAchievementType(name, icon) {
  try {
    const response = await fetch("/arcms/api/v1/achievements/type", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        icon: icon,
      }),
    });
    if (!response.ok) {
      showErrorMessage("Failed to save Achievement type");
      throw new Error("Failed to save Achievement type.");
    }

    console.log("Achievement type created successfully.");
    showSuccessMessage("Achievement type created successfully.");
    fetchAchievementTypes();
  } catch (error) {
    console.error(error);
  }
}

async function deleteAchievementType(achievement_id) {
  try {
    const response = await fetch(
      `/arcms/api/v1/achievements/type/${achievement_id}`,
      {
        method: "DELETE",
      }
    );
    if (!response.ok) {
      showErrorMessage("Failed to delete Achievement type");
      throw new Error("Failed to delete Achievement type.");
    }
    showErrorMessage("Achievement type deleted.");
    fetchAchievementTypes();
  } catch (error) {
    console.error("Failed to delete achievement type: ", error);
  }
}

async function fetchFaqs() {
  const container = document.getElementById("faq-items");
  const response = await fetch("/arcms/api/v1/faqs");
  const data = await response.json();

  data.forEach((faq, index) => {
    const questionInput = document.getElementById(`faq-question-${index}`);
    const answerTextarea = document.getElementById(`faq-answer-${index}`);

    if (questionInput && answerTextarea) {
      // Set the question and answer values
      questionInput.value = faq.question;
      answerTextarea.value = faq.answer;

      // Also set the FAQ ID in the data-faq-id attribute
      questionInput.setAttribute("data-faq-id", faq.faq_id);
      answerTextarea.setAttribute("data-faq-id", faq.faq_id);
    }
  });
}

function editFAQs(button) {
  const faqItems = document.querySelectorAll(".faq-item");

  if (!button.classList.contains("active")) {
    // Enter edit mode
    button.classList.add("active");
    button.textContent = "Save"; // Change button text to Save
    faqItems.forEach((faq) => {
      const questionInput = faq.querySelector("input");
      const answerTextarea = faq.querySelector("textarea");
      questionInput.disabled = false; // Enable inputs
      answerTextarea.disabled = false;
    });
  } else {
    // Save changes
    button.classList.remove("active");
    button.textContent = "Edit"; // Change button text back to Edit
    faqItems.forEach((faq) => {
      const questionInput = faq.querySelector("input");
      const answerTextarea = faq.querySelector("textarea");
      questionInput.disabled = true; // Disable inputs
      answerTextarea.disabled = true;
    });

    saveFAQs();
  }
}

async function saveFAQs() {
  const faqItems = document.querySelectorAll(".faq-item");
  const faqData = [];

  faqItems.forEach((faq) => {
    const question = faq.querySelector("input").value.trim();
    const answer = faq.querySelector("textarea").value.trim();
    const faq_id = Number(
      faq.querySelector("input").getAttribute("data-faq-id")
    );

    faqData.push({ faq_id, question, answer });
  });

  try {
    const response = await fetch(`/arcms/api/v1/faqs/updateAll`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(faqData),
    });

    if (!response.ok) {
      throw new Error("Failed to save FAQs. Please try again.");
    }

    console.log("FAQs successfully saved:");
    showSuccessMessage("FAQs updated successfully!");
  } catch (error) {
    console.error("Error saving FAQs:", error);
    showErrorMessage("An error occurred while saving FAQs.");
  }
}

function populateList(listId, items) {
  const list = document.getElementById(listId);
  list.innerHTML = "";
  items.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.className = "delete-btn";
    deleteBtn.onclick = function () {
      deleteItem(listId, item);
    };
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

function deleteItem(listId, item) {
  if (confirm("Are you sure you want to delete this item?")) {
    switch (listId) {
      case "departments-list":
        departments.splice(departments.indexOf(item), 1);
        break;
      case "offices-list":
        offices.splice(offices.indexOf(item), 1);
        break;
      case "consultation-types-list":
        consultationTypes.splice(consultationTypes.indexOf(item), 1);
        break;
    }
    populateList(listId, eval(listId.split("-")[0]));
  }
}

function openModal(type) {
  const modal = document.getElementById("management-modal");
  const title = document.getElementById("modal-title");
  const form = document.getElementById("management-form");
  const iconContainer = document.getElementById("icon-selection-container");
  const iconSelect = document.getElementById("icon-select");

  // Show the icon selection dropdown only for achievements
  if (type === "achievement") {
    iconContainer.style.display = "block";

    // Populate the dropdown with available icons
    iconSelect.innerHTML = "";
    availableIcons.forEach((icon) => {
      const option = document.createElement("option");
      option.value = icon.class;
      option.innerHTML = `<i class="${icon.class}"></i> ${icon.label}`;
      iconSelect.appendChild(option);
    });
  } else {
    iconContainer.style.display = "none";
  }

  title.textContent = `Add New ${type.charAt(0).toUpperCase() + type.slice(1)}`;

  form.onsubmit = function (e) {
    e.preventDefault();
    const name = document.getElementById("item-name").value;
    if (name) {
      switch (type) {
        case "department":
          createDepartment(name);
          break;
        case "achievement":
          const icon = `<i class="${iconSelect.value}"></i>`;
          createAchievementType(name, icon);
          break;
        case "consultation":
          consultationTypes.push(name);
          populateList("consultation-types-list", consultationTypes);
          break;
      }
      closeModal();
    }
  };

  modal.style.display = "block";
}

function closeModal() {
  document.getElementById("management-modal").style.display = "none";
  document.getElementById("item-name").value = "";
}

// Initialize lists
document.addEventListener("DOMContentLoaded", function () {
  fetchDepartments();
  fetchAchievementTypes();
  fetchFaqs();
});

// Close modal when clicking outside
window.onclick = function (event) {
  const modal = document.getElementById("management-modal");
  if (event.target == modal) {
    closeModal();
  }
};

const messageDiv = document.querySelector(".message-div");
const alertMessage = document.querySelector(".alert-message");
const closeMessageBtn = document.querySelector(".close-message-btn");

function showSuccessMessage(message) {
  messageDiv.style.display = "flex";
  messageDiv.classList.remove("error-message");
  messageDiv.classList.add("success-message");
  alertMessage.textContent = message;
}
function showErrorMessage(message) {
  messageDiv.style.display = "flex";
  messageDiv.classList.remove("success-message");
  messageDiv.classList.add("error-message");
  alertMessage.textContent = message;
}

closeMessageBtn.addEventListener("click", () => {
  messageDiv.style.display = "none";
  messageDiv.classList.remove("success-message");
  messageDiv.classList.remove("error-message");
  alertMessage.textContent = "";
});
