
// ======================================
// 1. WEEKLY TIMETABLE DATA
// ======================================

const activities = [
    // MONDAY
    { day: "Monday", time: "08:00 - 10:00", title: "Programming Lectures", type: "lecture" },
    { day: "Monday", time: "10:00 - 12:00", title: "Mechanics Lectures", type: "lecture" },
    { day: "Monday", time: "12:00 - 14:00", title: "Mechanics Exercise (Group 1)", type: "lecture" },
    { day: "Monday", time: "15:00 - 16:30", title: "Mathematics 1", type: "study", course: "Mathematics 1", hours: 1.5 },
    { day: "Monday", time: "17:00 - 19:00", title: "Mechanics", type: "study", course: "Mechanics", hours: 2 },

    // TUESDAY
    { day: "Tuesday", time: "08:00 - 10:00", title: "Programming PT (ENG 3)", type: "lecture" },
    { day: "Tuesday", time: "10:00 - 12:00", title: "Mathematics 1 Exercise (Group 3)", type: "lecture" },
    { day: "Tuesday", time: "12:00 - 14:00", title: "EE1 Lectures", type: "lecture" },
    { day: "Tuesday", time: "14:00 - 16:00", title: "Mathematics 1 Lectures", type: "lecture" },
    { day: "Tuesday", time: "20:00 - 22:00", title: "Basketball Training", type: "sport" },

    // WEDNESDAY
    { day: "Wednesday", time: "08:00 - 10:00", title: "FoBaM Lectures", type: "lecture" },
    { day: "Wednesday", time: "10:30 - 12:30", title: "EE1", type: "study", course: "EE1", hours: 2 },
    { day: "Wednesday", time: "13:30 - 15:00", title: "Mathematics 1", type: "study", course: "Mathematics 1", hours: 1.5 },
    { day: "Wednesday", time: "15:30 - 16:30", title: "Mechanics", type: "study", course: "Mechanics", hours: 1 },

    // THURSDAY
    { day: "Thursday", time: "08:00 - 10:00", title: "Mathematics 1 Lectures", type: "lecture" },
    { day: "Thursday", time: "10:00 - 12:00", title: "FoBaM Lectures", type: "lecture" },
    { day: "Thursday", time: "15:00 - 18:00", title: "EE1 PT (Group B)", type: "lecture" },
    { day: "Thursday", time: "19:00 - 21:00", title: "EE1", type: "study", course: "EE1", hours: 2 },

    // FRIDAY
    { day: "Friday", time: "09:30 - 11:00", title: "Mathematics 1", type: "study", course: "Mathematics 1", hours: 1.5 },
    { day: "Friday", time: "12:00 - 14:00", title: "EE1 Exercise (Week A)", type: "lecture" },
    { day: "Friday", time: "15:00 - 17:00", title: "EE1", type: "study", course: "EE1", hours: 2 },

    // SATURDAY
    { day: "Saturday", time: "10:00 - 13:00", title: "Programming", type: "study", course: "Programming", hours: 3 },

    // SUNDAY
    { day: "Sunday", time: "09:00 - 12:00", title: "Mechanics", type: "study", course: "Mechanics", hours: 3 },
    { day: "Sunday", time: "13:00 - 16:00", title: "Programming", type: "study", course: "Programming", hours: 3 }
];


// ======================================
// 2. LOAD SAVED ACTIVITIES
// ======================================

const savedActivities = localStorage.getItem("myTimetable");

let currentActivities = savedActivities
    ? JSON.parse(savedActivities)
    : activities;

const days = [
    "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday", "Sunday"
];


// ======================================
// 3. DISPLAY ACTIVITIES
// ======================================

function displayTimetable() {

    days.forEach(day => {

        const column = document.getElementById(day);

        column.innerHTML = `<h3>${day}</h3>`;

        const dayActivities = currentActivities
            .map((activity, index) => ({ ...activity, index }))
            .filter(activity => activity.day === day);

        dayActivities.forEach(activity => {

            const card = document.createElement("div");

            card.className = `activity ${activity.type}`;

            if (activity.completed) {
                card.classList.add("completed");
            }

            card.innerHTML = `
                <h4>${activity.title}</h4>
                <p>${activity.time}</p>

                <label>
                    <input
                        type="checkbox"
                        ${activity.completed ? "checked" : ""}
                        onchange="toggleCompleted(${activity.index})"
                    >
                    Completed
                </label>

                <button onclick="deleteActivity(${activity.index})">
                    Delete
                </button>
            `;

            column.appendChild(card);

        });

    });

    updateStudyHours();
}


// ======================================
// 4. COMPLETE AN ACTIVITY
// ======================================

function toggleCompleted(index) {

    currentActivities[index].completed =
        !currentActivities[index].completed;

    saveActivities();

    displayTimetable();
}


// ======================================
// 5. DELETE AN ACTIVITY
// ======================================

function deleteActivity(index) {

    const confirmation = confirm(
        "Are you sure you want to delete this activity?"
    );

    if (confirmation) {

        currentActivities.splice(index, 1);

        saveActivities();

        displayTimetable();
    }
}


// ======================================
// 6. CALCULATE STUDY HOURS
// ======================================

function updateStudyHours() {

    const totals = {
        "Mathematics 1": 0,
        "Mechanics": 0,
        "Programming": 0,
        "EE1": 0
    };

    currentActivities.forEach(activity => {

        if (activity.type === "study" && activity.course) {

            if (totals[activity.course] !== undefined) {
                totals[activity.course] += activity.hours;
            }

        }

    });

    document.getElementById("mathHours").textContent =
        `${totals["Mathematics 1"]} / 4.5 hrs`;

    document.getElementById("mechanicsHours").textContent =
        `${totals["Mechanics"]} / 6 hrs`;

    document.getElementById("programmingHours").textContent =
        `${totals["Programming"]} / 6 hrs`;

    document.getElementById("eeHours").textContent =
        `${totals["EE1"]} / 6 hrs`;
}


// ======================================
// 7. ADD NEW ACTIVITY
// ======================================

// ======================================
// ADD AND HIDE ACTIVITY FORM
// ======================================

const addButton = document.getElementById("addActivity");
const activityForm = document.getElementById("activityForm");

const saveButton = document.getElementById("saveActivity");
const cancelButton = document.getElementById("cancelActivity");

const activityType = document.getElementById("activityType");
const studyFields = document.getElementById("studyFields");


// SHOW FORM

addButton.addEventListener("click", () => {
    activityForm.classList.add("show");
});


// HIDE FORM

cancelButton.addEventListener("click", () => {
    activityForm.classList.remove("show");
});


// SHOW STUDY FIELDS ONLY WHEN STUDY IS SELECTED

activityType.addEventListener("change", () => {

    if (activityType.value === "study") {
        studyFields.style.display = "block";
    } else {
        studyFields.style.display = "none";
    }

});


// SAVE NEW ACTIVITY

saveButton.addEventListener("click", () => {

    const title = document.getElementById("activityTitle").value.trim();

    const day = document.getElementById("activityDay").value;

    const time = document.getElementById("activityTime").value.trim();

    const type = activityType.value;

    if (!title || !day || !time) {
    alert("Please fill in all required fields.");
    return;
}

// CHECK TIME FORMAT

const timePattern = /^([01]\d|2[0-3]):[0-5]\d\s*-\s*([01]\d|2[0-3]):[0-5]\d$/;

if (!timePattern.test(time)) {
    alert("Invalid time! Example: 14:00 - 16:00");
    return;
}

// CHECK THAT END TIME IS AFTER START TIME

const [startTime, endTime] = time.split("-").map(t => t.trim());

const convertToMinutes = (value) => {
    const [hours, minutes] = value.split(":").map(Number);
    return hours * 60 + minutes;
};

if (convertToMinutes(endTime) <= convertToMinutes(startTime)) {
    alert("End time must be later than start time.");
    return;
}

    const newActivity = {
        title: title,
        day: day,
        time: time,
        type: type
    };

    if (type === "study") {

        const course = document.getElementById("activityCourse").value;

        const hours = Number(document.getElementById("activityHours").value);

        if (!Number.isFinite(hours) || hours <= 0) {
            alert("Please enter a valid study duration.");
            return;
        }

        newActivity.course = course;
        newActivity.hours = hours;

    }
    if (hasOverlap(newActivity)) {
    alert("This activity overlaps with another activity!");
    return;
}

    currentActivities.push(newActivity);

    saveActivities();

    displayTimetable();

    activityForm.classList.remove("show");

    alert("Activity added successfully!");

});

// ======================================
// 8. SAVE ACTIVITIES
// ======================================

function saveActivities() {

    localStorage.setItem(
        "myTimetable",
        JSON.stringify(currentActivities)
    );

}


// ======================================
// 9. DARK / LIGHT MODE
// ======================================

const themeButton = document.getElementById("themeToggle");

themeButton.addEventListener("click", () => {

    document.body.classList.toggle("light-mode");

    const lightMode = document.body.classList.contains("light-mode");

    themeButton.textContent = lightMode
        ? "☀️ Light Mode"
        : "🌙 Dark Mode";

    localStorage.setItem("theme", lightMode ? "light" : "dark");

});


// Restore saved theme

if (localStorage.getItem("theme") === "light") {

    document.body.classList.add("light-mode");

    themeButton.textContent = "☀️ Light Mode";

}


// ======================================
// 10. START APPLICATION
// ======================================

// ======================================
// CHECK FOR OVERLAPPING ACTIVITIES
// ======================================

function hasOverlap(newActivity) {

    // Convert time into minutes

    function toMinutes(time) {
        const [hours, minutes] = time.split(":").map(Number);
        return hours * 60 + minutes;
    }

    // Get the new activity's start and end times

    const [newStart, newEnd] = newActivity.time
        .split("-")
        .map(t => toMinutes(t.trim()));

    // Compare with existing activities

    return currentActivities.some(activity => {

        // Only compare activities on the same day

        if (activity.day !== newActivity.day) {
            return false;
        }

        const [existingStart, existingEnd] = activity.time
            .split("-")
            .map(t => toMinutes(t.trim()));

        // Check whether the time periods overlap

        return newStart < existingEnd &&
               newEnd > existingStart;

    });

}
displayTimetable();
