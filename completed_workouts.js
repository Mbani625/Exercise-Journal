document.addEventListener("DOMContentLoaded", () => {
  displayCompletedWorkouts();

  // Attach event listener to Clear Exercises button
  document
    .getElementById("clear-exercises")
    .addEventListener("click", clearExercises);

  // Event listeners for export functionality
  const exportButton = document.getElementById("export-button");
  const exportModal = document.getElementById("export-modal");
  const closeModalButton = document.getElementById("close-modal");
  const exportEmailButton = document.getElementById("export-email");
  const exportDriveButton = document.getElementById("export-drive");
  const exportExcelButton = document.getElementById("export-excel");

  // Show the modal when "Export" button is clicked
  exportButton.addEventListener("click", () => {
    exportModal.classList.add("active");
  });

  // Close the modal when "Close" button is clicked
  closeModalButton.addEventListener("click", () => {
    exportModal.classList.remove("active");
  });

  exportEmailButton.addEventListener("click", exportToEmail);
  exportDriveButton.addEventListener("click", exportToDrive);
  exportExcelButton.addEventListener("click", exportToExcel);
});

// Function to export workouts to an Excel file
function exportToExcel() {
  const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  if (workouts.length === 0) {
    alert("No workouts to export.");
    return;
  }

  // Prepare data for Excel
  const workbook = XLSX.utils.book_new(); // Create a new workbook
  const worksheetData = [];

  // Add headers
  worksheetData.push([
    "Date",
    "Body Part",
    "Exercise",
    "Variation",
    "Sets",
    "Notes",
    "Set #",
    "Reps",
    "Weight",
    "Spice",
  ]);

  // Populate rows with workout data
  workouts.forEach((workout) => {
    workout.setDetails.forEach((set, setIndex) => {
      worksheetData.push([
        workout.date, // Date of workout
        workout.bodyPart, // Body part targeted
        workout.exercise, // Exercise name
        workout.variation, // Exercise variation
        workout.sets, // Total number of sets for the exercise
        workout.notes, // Notes for the workout
        setIndex + 1, // Set number
        set.reps, // Number of reps in this set
        set.weight, // Weight used in this set
        set.spice || "N/A", // Optional spice value for the set
      ]);
    });
  });

  const worksheet = XLSX.utils.aoa_to_sheet(worksheetData); // Convert data to worksheet
  XLSX.utils.book_append_sheet(workbook, worksheet, "Completed Workouts"); // Append worksheet to workbook

  // Export to Excel file
  XLSX.writeFile(workbook, "Completed_Workouts.xlsx");
}

// Function to export workouts via email
/*function exportToEmail() {
  const workouts = JSON.parse(localStorage.getItem("workouts")) || [];
  if (workouts.length === 0) {
    alert("No workouts to export.");
    return;
  }

  let emailBody = "Your Completed Workouts:\n\n";
  workouts.forEach((workout, index) => {
    emailBody += `Workout ${index + 1}:\n`;
    emailBody += `Date: ${workout.date}, Body Part: ${workout.bodyPart}, Exercise: ${workout.exercise}\n`;
    emailBody += `Variation: ${workout.variation}, Sets: ${workout.sets}, Notes: ${workout.notes}\n`;
    workout.setDetails.forEach((set, setIndex) => {
      emailBody += `  Set ${setIndex + 1}: Reps ${set.reps}, Weight ${
        set.weight
      }, Spice: ${set.spice || "N/A"}\n`;
    });
    emailBody += "\n";
  });

  // Encode the body for the mailto link
  const mailtoLink = `mailto:?subject=My%20Completed%20Workouts&body=${encodeURIComponent(
    emailBody
  )}`;
  window.location.href = mailtoLink;
}

// Placeholder function for exporting to Google Drive
function exportToDrive() {
  alert("Google Drive integration requires further setup.");
}*/

function displayCompletedWorkouts() {
  const workoutList = document.getElementById("workout-list");
  const workouts = JSON.parse(localStorage.getItem("workouts")) || [];

  if (workouts.length === 0) {
    workoutList.innerHTML = "<p>No workouts added</p>";
    return;
  }

  workouts.forEach((workout, index) => {
    const workoutItem = document.createElement("div");
    workoutItem.classList.add("workout-item");

    // Format and display workout main info
    let workoutText = `
      <strong>Workout ${index + 1}:</strong><br>
      Date: ${workout.date} - Body Part: ${workout.bodyPart}, Exercise: ${
      workout.exercise
    } (${workout.variation})<br>
      Sets: ${workout.sets}, Notes: ${workout.notes}
    `;
    workoutItem.innerHTML = workoutText;

    // Display each set detail on a new line
    workout.setDetails.forEach((set, setIndex) => {
      const setInfo = document.createElement("div");
      setInfo.classList.add("set-info");
      setInfo.innerHTML = `
        Set ${setIndex + 1}: Reps ${set.reps}, Weight ${set.weight}, Spice: ${
        set.spice || "N/A"
      }
      `;
      workoutItem.appendChild(setInfo);
    });

    workoutList.appendChild(workoutItem);
  });
}

// Function to clear all workouts from local storage and reset the display
function clearExercises() {
  localStorage.removeItem("workouts");

  const workoutList = document.getElementById("workout-list");
  workoutList.innerHTML = "<p>No workouts added</p>";
}
