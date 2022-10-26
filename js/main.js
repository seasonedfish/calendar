/**
 * The client-side code for the calendar main screen.
 */

const BACKEND_PREFIX = "dummy"

/**
 * Updates the month and year in the header.
 */
function updateHeader() {
    const monthAndYear = document.getElementById("month-and-year");

    const monthString = viewDate.toLocaleString("default", {month: "long"});
    const year = viewDate.getFullYear();

    monthAndYear.innerHTML = `${monthString} ${year}`;
}

/**
 * Switches the calendar to the previous month, then updates everything.
 */
function previousMonth() {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1);
    updateAll();
}

/**
 * Switches the calendar to the next month, then updates everything.
 */
function nextMonth() {
    viewDate = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1);
    updateAll();
}

/**
 * Helper method that returns the number of days in the month.
 * @param date a Date object
 * @returns {number}
 */
function getDaysInMonth(date) {
    // https://stackoverflow.com/a/1184359
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
}

async function fetchEvents() {
    const response = await fetch(`${BACKEND_PREFIX}/get_month_events.php`, {});
    return await response.json();
}

function getArrayOfEmptyDays(daysInMonth) {
    let days = [];
    const template = document.querySelector("#calendar-day");
    for (let i = 0; i < daysInMonth; i++) {
        const clone = template.content.cloneNode(true);

        const dayNumber = clone.querySelectorAll(".day-number")[0];
        dayNumber.textContent = (i + 1).toString();

        days.push(clone);
    }
    return days;
}

/**
 * Updates the calendar grid.
 */
function updateCalendar() {
    let daysInMonth = getDaysInMonth(viewDate);
    let days = getArrayOfEmptyDays(daysInMonth);

    fetchEvents()
        .then(
            events => {
                for (const event of events) {
                    let eventDate = new Date(event["datetime"]);
                    let dayNumber = eventDate.getDay();

                    let day = days[dayNumber - 1];
                    let eventsList = day.querySelectorAll(".events-list")[0];

                    let li = document.createElement("li");
                    let a = document.createElement("a");
                    a.setAttribute("href", "javascript:void(0)");
                    a.textContent = `${eventDate.getHours()}:${eventDate.getMinutes()} ${event["title"]}`;
                    li.replaceChildren(a);

                    eventsList.appendChild(li);
                }
            }
        )
        .catch(error => console.error('Error:', error))

    const dayGrid = document.querySelector("#day-grid");
    dayGrid.replaceChildren(...days);

    const dayOffset = (new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)).getDay() + 1
    let style = document.getElementById("day-offset");
    style.innerHTML = `#day-grid li:first-of-type { grid-column-start: ${dayOffset}; }`;
}

function updateAll() {
    updateHeader();
    updateCalendar();
}

let viewDate = new Date();
document.addEventListener("DOMContentLoaded", updateAll);
document.getElementById("previous-month").addEventListener("click", previousMonth);
document.getElementById("next-month").addEventListener("click", nextMonth);
