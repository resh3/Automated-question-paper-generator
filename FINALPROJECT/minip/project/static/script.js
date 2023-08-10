const body = document.querySelector("body"),
      modeToggle = body.querySelector(".mode-toggle");
      sidebar = body.querySelector("nav");
      sidebarToggle = body.querySelector(".sidebar-toggle");

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
    body.classList.toggle("dark");
}

let getStatus = localStorage.getItem("status");
if(getStatus && getStatus ==="close"){
    sidebar.classList.toggle("close");
}

modeToggle.addEventListener("click", () =>{
    body.classList.toggle("dark");
    if(body.classList.contains("dark")){
        localStorage.setItem("mode", "dark");
    }else{
        localStorage.setItem("mode", "light");
    }
});

sidebarToggle.addEventListener("click", () => {
    sidebar.classList.toggle("close");
    if(sidebar.classList.contains("close")){
        localStorage.setItem("status", "close");
    }else{
        localStorage.setItem("status", "open");
    }
})

/*function editRow(row) {
    // Perform action when edit button is clicked
    console.log("Edit row: " + row);
}

function deleteRow(row) {
    // Perform action when delete button is clicked
    console.log("Delete row: " + row);
}
*/
// function addQuestionRow() {
//     var table = document.getElementById("questionTable");
//     var row = table.insertRow(-1); // Insert row at the last position
   
//     // Insert cells in the new row
//     for (var i = 0; i < 6; i++) {
//         var cell = row.insertCell(i);
        
//         if (i === 0) {
//             cell.innerHTML = "<input type='text' name='question' />";
//         } else if (i === 1) {
//             cell.innerHTML = "<select name='module'>" +
//                                 "<option>Mod</option>" +
//                                 "<option>Module 2</option>" +
//                                 "<option>Module 3</option>" +
//                                 "<option>Module 4</option>" +
//                                 "<option>Module 5</option>" +
//                             "</select>";
//         } else if (i === 2) {
//             cell.innerHTML = "<select name='taxonomy'>" +
//                                 "<option value='K'>Knowledge</option>" +
//                                 "<option value='U'>Understand</option>" +
//                                 "<option value='A'>Apply</option>" +
//                                 "<option value='E'>Evaluate</option>" +
//                                 "<option value='C'>Create</option>" +
//                             "</select>";
//         } else if (i === 3) {
//             cell.innerHTML = "<select name='difficulty_level'>" +
//                                 "<option value='E'>Easy</option>" +
//                                 "<option value='M'>Medium</option>" +
//                                 "<option value='D'>Difficult</option>" +
//                             "</select>";
//         } else if (i === 4) {
//             cell.innerHTML = "<select name='course_outcome'>" +
//                                 "<option value='1'>CO1</option>" +
//                                 "<option value='2'>CO2</option>" +
//                                 "<option value='3'>CO3</option>" +
//                                 "<option value='4'>CO4</option>" +
//                                 "<option value='5'>CO5</option>" +
//                             "</select>";
//         } else if (i === 5) {
//             cell.className = "icons";
//             cell.innerHTML = "<button type='button' onclick='editRow(this)'>" +
//                                 "<i class='fas fa-edit'></i>" +
//                             "</button>" +
//                             "<button type='button' onclick='deleteRow(this)'>" +
//                                 "<i class='fas fa-trash-alt'></i>" +
//                             "</button>";
//         }
//     }
// }

// function editRow(row) {
//     // Perform action when edit button is clicked
//     console.log("Edit row: " + row);
// }

// function deleteRow(row) {
//     // Perform action when delete button is clicked
//     console.log("Delete row: " + row);
// }

// Edit Row
/* function editRow(rowId) {
    // Get the row element
    var row = document.getElementById('row-' + rowId);
    
  
    // Get the cells within the row
    var cells = row.getElementsByTagName('td');
  
    // Extract the data from the cells
    var question = cells[0].textContent;
    var module = cells[1].getElementsByTagName('select')[0].value;
    var taxonomyLevel = cells[2].getElementsByTagName('select')[0].value;
    var difficultyLevel = cells[3].getElementsByTagName('select')[0].value;
    var courseOutcome = cells[4].getElementsByTagName('select')[0].value;

  
    // Display the data in an alert (you can replace this with your custom edit logic)
    var editMessage =
      'Edit Row:\n\n' +
      'Question: ' + question + '\n' +
      'Module: ' + module + '\n' +
      'Taxonomy Level: ' + taxonomyLevel + '\n' +
      'Difficulty Level: ' + difficultyLevel + '\n' +
      'Course Outcome: ' + courseOutcome;
  
    alert(editMessage);
  }*/
  
//   // Delete Row
//   function deleteRow(rowId) {
//     // Get the row element
//     var row = document.getElementById('row-' + rowId);
  
//     // Remove the row from the table
//     row.parentNode.removeChild(row);
  
//     // Display a confirmation message (you can replace this with your custom delete logic)
//     var deleteMessage = 'Row deleted successfully.';
//     alert(deleteMessage);
//   }
  









function editRow(rowId) {
  var row = document.getElementById("row-" + rowId);
  var cells = row.cells;

  // Get the current values of the row
  var question = cells[0].innerText;
  var module = cells[1].querySelector("select").value;
  var taxonomyLevel = cells[2].querySelector("select").value;
  var difficultyLevel = cells[3].querySelector("select").value;
  var courseOutcome = cells[4].querySelector("select").value;
  var marks = cells[5].innerText;

  // Create input fields with the current values
  cells[0].innerHTML = "<input type='text' value='" + question + "'>";
  cells[1].innerHTML = createModuleDropdown(module);
  cells[2].innerHTML = createTaxonomyLevelDropdown(taxonomyLevel);
  cells[3].innerHTML = createDifficultyLevelDropdown(difficultyLevel);
  cells[4].innerHTML = createCourseOutcomeDropdown(courseOutcome);
  cells[5].innerHTML = "<input type='text' value='" + marks + "'>";

  // Create Save button
  var saveButton = document.createElement("button");
  saveButton.type = "button";
  saveButton.textContent = "Save";
  saveButton.addEventListener("click", function() {
    saveRow(rowId);
  });

  // Create Cancel button
  var cancelButton = document.createElement("button");
  cancelButton.type = "button";
  cancelButton.textContent = "Cancel";
  cancelButton.addEventListener("click", function() {
    cancelEditRow(rowId, question, module, taxonomyLevel, difficultyLevel, courseOutcome,marks);
  });

  // Replace the icons cell content with Save and Cancel buttons
  cells[6].innerHTML = "";
  cells[6].appendChild(saveButton);
  cells[6].appendChild(cancelButton);
}

function saveRow(rowId) {
  var row = document.getElementById("row-" + rowId);
  var cells = row.cells;

  // Get the updated values from the input fields
  var question = cells[0].querySelector("input").value;
  var module = cells[1].querySelector("select").value;
  var taxonomyLevel = cells[2].querySelector("select").value;
  var difficultyLevel = cells[3].querySelector("select").value;
  var courseOutcome = cells[4].querySelector("select").value;
  var marks = cells[5].querySelector("input").value;

  // Update the row with the new values
  cells[0].textContent = question;
  cells[1].innerHTML = createModuleDropdown(module);
  cells[2].innerHTML = createTaxonomyLevelDropdown(taxonomyLevel);
  cells[3].innerHTML = createDifficultyLevelDropdown(difficultyLevel);
  cells[4].innerHTML = createCourseOutcomeDropdown(courseOutcome);
  cells[5].textContent = marks;

  // Restore the icons in the last cell
  cells[6].innerHTML = "<button type='button' onclick='editRow(" + rowId + ")'>" +
    "<i class='fas fa-edit'></i>" +
    "</button>" +
    "<button type='button' onclick='deleteRow(" + rowId + ")'>" +
    "<i class='fas fa-trash-alt'></i>" +
    "</button>";
}

function cancelEditRow(rowId, question, module, taxonomyLevel, difficultyLevel, courseOutcome,marks) {
  var row = document.getElementById("row-" + rowId);
  var cells = row.cells;

  // Restore the original values in the row
  cells[0].textContent = question;
  cells[1].innerHTML = createModuleDropdown(module);
  cells[2].innerHTML = createTaxonomyLevelDropdown(taxonomyLevel);
  cells[3].innerHTML = createDifficultyLevelDropdown(difficultyLevel);
  cells[4].innerHTML = createCourseOutcomeDropdown(courseOutcome);
  cells[5].textContent = marks;

  // Restore the icons in the last cell
  cells[6].innerHTML = "<button type='button' onclick='editRow(" + rowId + ")'>" +
    "<i class='fas fa-edit'></i>" +
    "</button>" +
    "<button type='button' onclick='deleteRow(" + rowId + ")'>" +
    "<i class='fas fa-trash-alt'></i>" +
    "</button>";
}

function deleteRow(rowId) {
  var row = document.getElementById("row-" + rowId);
  row.remove();

   // Display a confirmation message (you can replace this with your custom delete logic)
   var deleteMessage = 'Row deleted successfully.';
   alert(deleteMessage);
 
}

function createModuleDropdown(selectedValue,rowId) {
  var dropdown = "<select name='module_"+rowId+"'>" +
    "<option value='1' " + (selectedValue === '1' ? "selected" : "") + ">Module 1</option>" +
    "<option value='2' " + (selectedValue === '2' ? "selected" : "") + ">Module 2</option>" +
    "<option value='3' " + (selectedValue === '3' ? "selected" : "") + ">Module 3</option>" +
    "<option value='4' " + (selectedValue === '4' ? "selected" : "") + ">Module 4</option>" +
    "<option value='5' " + (selectedValue === '5' ? "selected" : "") + ">Module 5</option>" +
    "</select>";
  return dropdown;
}

function createTaxonomyLevelDropdown(selectedValue,rowId) {
  var dropdown = "<select name='taxonomy_"+rowId+"'>" +
    "<option value='K' " + (selectedValue === 'K' ? "selected" : "") + ">Knowledge</option>" +
    "<option value='U' " + (selectedValue === 'U' ? "selected" : "") + ">Understand</option>" +
    "<option value='A' " + (selectedValue === 'A' ? "selected" : "") + ">Apply</option>" +
    "<option value='E' " + (selectedValue === 'E' ? "selected" : "") + ">Evaluate</option>" +
    "<option value='C' " + (selectedValue === 'C' ? "selected" : "") + ">Create</option>" +
    "</select>";
  return dropdown;
}

function createDifficultyLevelDropdown(selectedValue,rowId) {
  var dropdown = "<select name='difficulty_level_"+rowId+"'>" +
    "<option value='E' " + (selectedValue === 'E' ? "selected" : "") + ">Easy</option>" +
    "<option value='M' " + (selectedValue === 'M' ? "selected" : "") + ">Medium</option>" +
    "<option value='D' " + (selectedValue === 'D' ? "selected" : "") + ">Difficult</option>" +
    "</select>";
  return dropdown;
}

function createCourseOutcomeDropdown(selectedValue,rowId) {
  var dropdown = "<select name='course_outcome_"+rowId+"'>" +
    "<option value='1' " + (selectedValue === '1' ? "selected" : "") + ">CO1</option>" +
    "<option value='2' " + (selectedValue === '2' ? "selected" : "") + ">CO2</option>" +
    "<option value='3' " + (selectedValue === '3' ? "selected" : "") + ">CO3</option>" +
    "<option value='4' " + (selectedValue === '4' ? "selected" : "") + ">CO4</option>" +
    "<option value='5' " + (selectedValue === '5' ? "selected" : "") + ">CO5</option>" +
    "</select>";
  return dropdown;
}

function addQuestionRow() {
  var questionTable = document.getElementById("questionTable");
  var rowId = questionTable.rows.length;

  var row = questionTable.insertRow();
  row.id = "row-" + rowId;

  var questionCell = row.insertCell();
  questionCell.innerHTML = "<input type='text'>";

  var moduleCell = row.insertCell();
  moduleCell.innerHTML = createModuleDropdown("",rowId);

  var taxonomyLevelCell = row.insertCell();
  taxonomyLevelCell.innerHTML = createTaxonomyLevelDropdown("",rowId);

  var difficultyLevelCell = row.insertCell();
  difficultyLevelCell.innerHTML = createDifficultyLevelDropdown("",rowId);

  var courseOutcomeCell = row.insertCell();
  courseOutcomeCell.innerHTML = createCourseOutcomeDropdown("",rowId);

  var marksCell = row.insertCell();
  var marksInput = document.createElement("input");
  marksInput.type = "text";
  marksInput.className = "marks";
  marksInput.name = "marks_" + rowId;
  marksInput.placeholder = "Enter marks";
  marksCell.appendChild(marksInput);

  var iconsCell = row.insertCell();
  iconsCell.innerHTML = "<button type='button' onclick='editRow(" + rowId + ")'>" +
    "<i class='fas fa-edit'></i>" +
    "</button>" +
    "<button type='button' onclick='deleteRow(" + rowId + ")'>" +
    "<i class='fas fa-trash-alt'></i>" +
    "</button>";

  var totalRowsInput = document.getElementById("totalRows");
  totalRowsInput.value = rowId;
}
















 

  function search(event) {
    if (event.key === 'Enter') {
      // Prevent the default form submission behavior
      event.preventDefault();
  
      // Get the search query from the input
      var searchQuery = document.getElementById('searchInput').value.toLowerCase();
  
      // Get all text nodes on the webpage
      var textNodes = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
  
      // Loop through each text node and search for the query
      var found = false;
      while (textNodes.nextNode()) {
        var node = textNodes.currentNode;
        var text = node.textContent.toLowerCase();
  
        if (text.includes(searchQuery)) {
          // Create a new element to highlight the keyword
          var span = document.createElement('span');
          span.className = 'highlighted';
          var regex = new RegExp('(' + searchQuery + ')', 'gi');
          span.innerHTML = text.replace(regex, '<mark>$1</mark>');
  
          // Replace the text node with the highlighted element
          node.parentNode.replaceChild(span, node);
  
          // Scroll to the highlighted element
          span.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
          // Set the focus to the input field
          document.getElementById('searchInput').focus();
  
          found = true;
          break;
        }
      }
  
      // If not found, clear the input field
      if (!found) {
        document.getElementById('searchInput').value = '';
      }
    }
  }
  
  // Add event listener to the search input
  document.getElementById('searchInput').addEventListener('keydown', search);
  