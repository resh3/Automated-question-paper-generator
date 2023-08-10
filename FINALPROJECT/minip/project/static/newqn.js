let questionNumber = 2; // Initialize the question number

  // Get the "Add Question" button element
  const addQuestionBtn = document.getElementById("addQuestionBtn");

  // Get the table element
const questionTable = document.getElementById("questionTable");

// Get the container element
const container = document.querySelector(".container");

  // Add event listener to the button
  addQuestionBtn.addEventListener("click", addQuestion);

  // Function to add a new question row
  function addQuestion() {
    // Get the question table
    const questionTable = document.getElementById("questionTable");

    // Create a new row
    const newRow = document.createElement("tr");

    // Create the question cell
    const questionCell = document.createElement("td");
    const questionInput = document.createElement("input");
    questionInput.setAttribute("name", "question_" + questionNumber); // Increment the name
    questionInput.setAttribute("class", "question-input");
    questionInput.setAttribute("placeholder", "Enter your question");
    questionCell.appendChild(questionInput);
    newRow.appendChild(questionCell);

    // Create the nested table
    const nestedTable = document.createElement("table");
    nestedTable.setAttribute("class", "nested-table");

    // Create the table header row
    const headerRow = document.createElement("tr");
    const headerCell1 = document.createElement("td");
    headerCell1.textContent = "Taxonomy";
    headerRow.appendChild(headerCell1);
    const headerCell2 = document.createElement("td");
    headerCell2.textContent = "Module";
    headerRow.appendChild(headerCell2);
    const headerCell3 = document.createElement("td");
    headerCell3.textContent = "Course Outcome";
    headerRow.appendChild(headerCell3);
    const headerCell4 = document.createElement("td");
    headerCell4.textContent = "Difficulty Level";
    headerRow.appendChild(headerCell4);
    const headerCell5 = document.createElement("td");
    headerCell5.textContent = "Marks";
    headerRow.appendChild(headerCell5);
    nestedTable.appendChild(headerRow);

    // Create the data row
    const dataRow = document.createElement("tr");
    const dataCell1 = document.createElement("td");
    const taxonomySelect = createSelectElement("taxonomy", questionNumber);
    dataCell1.appendChild(taxonomySelect);
    dataRow.appendChild(dataCell1);
    const dataCell2 = document.createElement("td");
    const moduleSelect = createSelectElement("Mod", questionNumber);
    dataCell2.appendChild(moduleSelect);
    dataRow.appendChild(dataCell2);
    const dataCell3 = document.createElement("td");
    const coSelect = createSelectElement("CO", questionNumber);
    dataCell3.appendChild(coSelect);
    dataRow.appendChild(dataCell3);
    const dataCell4 = document.createElement("td");
    const difficultySelect = createSelectElement("Diff", questionNumber);
    dataCell4.appendChild(difficultySelect);
    dataRow.appendChild(dataCell4);
    const dataCell5 = document.createElement("td");
    const marksInput = document.createElement("input");
    marksInput.setAttribute("type", "text");
    marksInput.setAttribute("class", "marks");
    marksInput.setAttribute("placeholder", "Enter marks");
    marksInput.setAttribute("name", "marks_" + questionNumber); // Increment the name
    dataCell5.appendChild(marksInput);
    dataRow.appendChild(dataCell5);
    nestedTable.appendChild(dataRow);

    // Append the nested table to the question cell
    questionCell.appendChild(nestedTable);

    // Append the new row to the question table
    questionTable.appendChild(newRow);
    const totalRowsInput = document.getElementById("totalRows");
    totalRowsInput.value = questionNumber;
    questionNumber++; // Increment the question number for the next question
    
  }

  // Function to create a select element
  function createSelectElement(name, questionNumber) {
    const selectElement = document.createElement("select");
    selectElement.setAttribute("class", "select-box");
    selectElement.setAttribute("name", name + "_" + questionNumber); // Increment the name

    if (name === "taxonomy") {
      addOption(selectElement, "", "Select " + name);
      addOption(selectElement, "U", "Understand");
      addOption(selectElement, "A", "Apply");
      addOption(selectElement, "E", "Evaluate");
      addOption(selectElement, "K", "Knowledge");
    } else if (name === "Mod") {
      addOption(selectElement, "", "Select " + name);
      for (let i = 1; i <= 5; i++) {
        addOption(selectElement, i.toString(), "Module " + i);
      }
    } else if (name === "CO") {
      addOption(selectElement, "", "Select " + name);
      addOption(selectElement, "1", "CO1");
      addOption(selectElement, "2", "CO2");
      addOption(selectElement, "3", "CO3");
      // Add more course outcomes as needed
    } else if (name === "Diff") {
      addOption(selectElement, "", "Select " + name);
      addOption(selectElement, "E", "Easy");
      addOption(selectElement, "M", "Medium");
      addOption(selectElement, "D", "Difficult");
    }
   
    return selectElement;
  }

  // Helper function to add options to a select element
  function addOption(selectElement, value, text) {
    const option = document.createElement("option");
    option.setAttribute("value", value);
    option.textContent = text;
    selectElement.appendChild(option);
  }

  // Create the submit button
const submitBtn = document.createElement("button");
submitBtn.setAttribute("type", "submit");
submitBtn.setAttribute("class", "submit-button");
submitBtn.textContent = "SUBMIT";

// Append the submit button to the container
container.appendChild(submitBtn);

submitBtn.addEventListener("click", function(event) {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the form element
  const form = document.getElementById("myForm");

  // Submit the form
  form.submit();
});