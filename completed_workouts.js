document.addEventListener("DOMContentLoaded", () => {
  displayCompletedWorkouts();

  // Attach event listener to Clear Exercises button
  document
    .getElementById("clear-exercises")
    .addEventListener("click", clearExercises);
});

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
