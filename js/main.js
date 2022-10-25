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

function updateCalendar(date) {
    let daysInMonth = getDaysInMonth(date);

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

    let sheet = document.styleSheets[1];
    let rule = sheet.cssRules[0];
    rule.style["grid-column-start"] = Math.floor(Math.random() * 7);
}

let viewDate = new Date("2022-02-02");
updateCalendar(viewDate);

const b = document.createElement("button");
b.innerHTML = "Refresh";
b.addEventListener("click", updateCalendar);
document.body.appendChild(b);
