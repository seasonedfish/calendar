/**
 * The client-side code for the calendar main screen.
 */

function getIncrementedDate(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth() + 1,
        1
    );
}

function getDecrementedDate(date) {
    return new Date(
        date.getFullYear(),
        date.getMonth() - 1,
        1
    );
}

function getDaysInMonth(date) {
    // https://stackoverflow.com/a/1184359
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

function updateCalendar() {
    let daysInMonth = getDaysInMonth(viewDate);

    let days = [];
    const template = document.querySelector("#calendar-day");
    for (let d = 1; d <= daysInMonth; d++) {
        const clone = template.content.cloneNode(true);

        const dayNumber = clone.querySelectorAll(".day-number")[0];
        dayNumber.textContent = d.toString();

        days.push(clone);
    }

    const dayGrid = document.querySelector("#day-grid");
    dayGrid.replaceChildren(...days);

    const dayOffset = Math.floor(Math.random() * 7);
    let style = document.getElementById("day-offset");
    style.innerHTML = `#day-grid li:first-of-type { grid-column-start: ${dayOffset}; }`;
}

let viewDate = new Date();
updateCalendar();

const b = document.createElement("button");
b.innerHTML = "Refresh";
b.addEventListener("click", updateCalendar);
document.body.appendChild(b);
