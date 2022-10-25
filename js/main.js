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

function getStyleSheet(unique_title) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/styleSheets
    for (const sheet of document.styleSheets) {
        if (sheet.title === unique_title) {
            return sheet;
        }
    }
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

    let sheet = getStyleSheet("First Day");
    sheet.deleteRule(0);
    sheet.insertRule("#day-grid li:first-of-type { grid-column-start: 5; }", 0);

}

let viewDate = new Date("2022-02-02");
updateCalendar(viewDate);
