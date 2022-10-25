/**
 * The client-side code for the calendar main screen.
 */
function updateHeader() {
    const header = document.createElement("header");

    const left = document.createElement("div");
    const h1 = document.createElement("h1");
    const monthString = viewDate.toLocaleString("default", {month: "long"});
    const year = viewDate.getFullYear()
    h1.innerHTML = `${monthString} ${year}`;
    left.appendChild(h1);

    const right = document.createElement("div");
    const signIn = document.createElement("a");
    signIn.innerHTML = "Sign in"
    right.appendChild(signIn);
    const creatEvent = document.createElement("a");
    creatEvent.innerHTML = "Create Event";
    right.appendChild(creatEvent);

    header.appendChild(left);
    header.appendChild(right);

    document.body.prepend(header);
}

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

    const dayOffset = (new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)).getDay() + 1
    let style = document.getElementById("day-offset");
    style.innerHTML = `#day-grid li:first-of-type { grid-column-start: ${dayOffset}; }`;
}

let viewDate = new Date();
document.addEventListener("DOMContentLoaded", updateCalendar);
document.addEventListener("DOMContentLoaded", updateHeader)
