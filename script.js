const form = document.getElementById("registrationForm");
const tableBody = document.querySelector("#studentsTable tbody");

let students = JSON.parse(localStorage.getItem("students")) || [];

function renderTable() {
  tableBody.innerHTML = "";
  students.forEach((student, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student.name}</td>
      <td>${student.id}</td>
      <td>${student.email}</td>
      <td>${student.contact}</td>
      <td class="actions">
        <button onclick="editStudent(${index})">Edit</button>
        <button onclick="deleteStudent(${index})">Delete</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

function validateInputs(name, id, email, contact) {
  const nameValid = /^[A-Za-z ]+$/.test(name);
  const idValid = /^\d+$/.test(id);
  const emailValid = /^[\w.-]+@[\w.-]+\.\w{2,}$/.test(email);
  const contactValid = /^\d{10}$/.test(contact);
  return nameValid && idValid && emailValid && contactValid;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = form.studentName.value.trim();
  const id = form.studentId.value.trim();
  const email = form.email.value.trim();
  const contact = form.contact.value.trim();

  if (!validateInputs(name, id, email, contact)) {
    alert("Please enter valid details.");
    return;
  }

  students.push({ name, id, email, contact });
  localStorage.setItem("students", JSON.stringify(students));
  form.reset();
  renderTable();
});

/* Adding edit Feature */

function editStudent(index) {
  const student = students[index];
  form.studentName.value = student.name;
  form.studentId.value = student.id;
  form.email.value = student.email;
  form.contact.value = student.contact;

  students.splice(index, 1);
  localStorage.setItem("students", JSON.stringify(students));
  renderTable();
}

/* Adding delete feature */

function deleteStudent(index) {
  if (confirm("Are you sure you want to delete this record?")) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderTable();
  }
}

window.onload = renderTable;
