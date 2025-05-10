document.addEventListener("DOMContentLoaded", () => {
    // Define course data (you can replace this with actual course data or fetch from an API)
    const courses = [
        { name: "Web Development (WDD)", code: "WDD 131", credits: 3 },
        { name: "Computer Science (CSE)", code: "CSE 101", credits: 4 },
        { name: "Web Development (WDD)", code: "WDD 201", credits: 3 },
        { name: "Computer Science (CSE)", code: "CSE 201", credits: 4 }
    ];

    // Get the course list container
    const courseList = document.getElementById("course-list");

    // Function to render courses in the list
    function renderCourses(filteredCourses) {
        // Clear the existing content
        courseList.innerHTML = "";

        filteredCourses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.classList.add("course-card");

            courseCard.innerHTML = `
                <h3>${course.name}</h3>
                <p>Course Code: ${course.code}</p>
                <p>Credits: ${course.credits}</p>
            `;

            courseList.appendChild(courseCard);
        });

        // Calculate and display total credits
        const totalCredits = filteredCourses.reduce((acc, course) => acc + course.credits, 0);
        document.getElementById("total-credits").textContent = `Total Credits: ${totalCredits}`;
    }

    // Render all courses initially
    renderCourses(courses);

    // Add event listeners to filter buttons
    const filterButtons = document.querySelectorAll("#course-filters button");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const filter = button.getAttribute("data-filter");

            let filteredCourses = [];
            if (filter === "all") {
                filteredCourses = courses;
            } else {
                filteredCourses = courses.filter(course => course.code.startsWith(filter.toUpperCase()));
            }

            renderCourses(filteredCourses);
        });
    });
});
