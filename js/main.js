/**
 * The client-side code for the calendar main screen.
 */

const BACKEND_PREFIX = "php"

/**
 * Updates the month and year in the header. Also changes which buttons show up depending on if the user is signed in.
 */
function updateHeader() {
    const monthAndYear = document.getElementById("month-and-year");

    const monthString = viewDate.toLocaleString("default", {month: "long"});
    const year = viewDate.getFullYear();

    monthAndYear.innerHTML = `${monthString} ${year}`;

    fetch(`${BACKEND_PREFIX}/check_user.php`, {})
    .then(result => result.json())
    .then(result => {
        if (result['user'] != "") {
            document.getElementById("sign-in-li").style.display = "none";
            document.getElementById("create-event-li").style.display = "list-item";
            document.getElementById("sign-out-li").style.display = "list-item";
        }
        else {
            document.getElementById("sign-in-li").style.display = "list-item";
            document.getElementById("create-event-li").style.display = "none";
            document.getElementById("sign-out-li").style.display = "none";
        }
    });
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
 * Fetches the events for the current month from the server.
 * @returns {Promise<any>}
 */
async function fetchEvents() {
    // Use en-CA to format it as ISO 8601.
    // https://stackoverflow.com/a/63490548
    const dateString = viewDate.toLocaleDateString("en-CA");
    const response = await fetch(`${BACKEND_PREFIX}/get_month_events.php?date=${dateString}`, {});
    return await response.json();
}

/**
 * Helper method to return an array of date notes that only have the calendar date.
 *
 * @returns {*[]}
 */
function getArrayOfEmptyDays() {
    const daysInMonth = (new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0)).getDate();

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

function updateCalendarWithEvents(events) {
    let days = getArrayOfEmptyDays();

    for (const event of events) {
        const eventDate = new Date(event["datetime"]);
        const dateNumber = eventDate.getDate();

        let day = days[dateNumber - 1];
        let eventsList = day.querySelectorAll(".events-list")[0];

        let li = document.createElement("li");
        let a = document.createElement("a");
        a.setAttribute("href", "javascript:void(0)");
        a.textContent = `${eventDate.getHours()}:${eventDate.getMinutes()} ${event["title"]}`;
        // Add parameter to handler https://stackoverflow.com/a/49015755
        a.addEventListener("click", (evt) => showEditEvent(evt, event["event_id"]));
        li.replaceChildren(a);

        eventsList.appendChild(li);
    }

    const dayGrid = document.querySelector("#day-grid");
    dayGrid.replaceChildren(...days);

    const dayOffset = (new Date(viewDate.getFullYear(), viewDate.getMonth(), 1)).getDay() + 1
    let style = document.getElementById("day-offset");
    style.innerHTML = `#day-grid li:first-of-type { grid-column-start: ${dayOffset}; }`;

}
/**
 * Updates the calendar grid.
 */
function updateCalendar() {
    fetchEvents()
        .then(updateCalendarWithEvents)
        .catch(error => console.error('Error:', error))
}

function updateAll() {
    updateHeader();
    updateCalendar();
}

function showSignIn() {
    document.getElementById("signin-popup").style.display = "flex";
}

function hideSignIn() {
    document.getElementById("signin-popup").style.display = "none";
}

function signIn() {
    const username = document.getElementById("username").value;

    const data = { 'username': username };

    fetch("php/sign_in.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log("Sucessfully logged in");
                hideSignIn();
                updateAll();
            }
            else {
                alert("Error");
            }
        })
        .catch(err => console.error(err));
}

function newUser() {
    const username = document.getElementById("new_username").value;

    const data = { 'username': username };

    fetch("php/create_account.php", {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'content-type': 'application/json' }
        });
    hideSignIn();
}

function showCreateEvent() {
    document.getElementById("create-event-popup").style.display = "flex";
}

function hideCreateEvent() {
    document.getElementById("create-event-popup").style.display = "none";
}

function createEvent(event) {
    event.preventDefault(); // prevent refreshing https://stackoverflow.com/a/19454346

    const formData = new FormData(document.getElementById("create-event-form"));
    const entries = Object.fromEntries(formData);
    const json = {
        "title": entries["create-event-name"],
        "datetime": entries["create-event-datetime"],
        "location": entries["create-event-location"]
    }

    fetch(`${BACKEND_PREFIX}/create_event.php`, {
        method: "POST",
        body: JSON.stringify(json),
        headers: { "content-type": "application/json" }
    });

    hideCreateEvent();
    updateAll();
}

function signOut() {
    fetch("php/sign_out.php", {});
    updateAll();
}

async function getEvent(eventId) {
    const response = await fetch(`php/get_event.php?event_id=${eventId}`);
    return response.json();
}

function showEditEvent(evt, eventId) {
    const event = getEvent(eventId);

    let editEvent = document.getElementById("edit-event-popup");
    document.getElementById("edit-event-title").value = event["title"];
    document.getElementById("edit-event-datetime").value = event["datetime"];
    document.getElementById("edit-event-location").value = event["location"];

    editEvent.style.display = "flex";
}

function hideEditEvent() {
    document.getElementById("create-event-popup").style.display = "none";
}

let viewDate = new Date();

document.addEventListener("DOMContentLoaded", updateAll);

document.getElementById("previous-month").addEventListener("click", previousMonth);
document.getElementById("next-month").addEventListener("click", nextMonth);

document.getElementById("sign-in").addEventListener("click", showSignIn);
document.getElementById("sign-in-submit").addEventListener("click", signIn);
document.getElementById("sign-out").addEventListener("click", signOut);
document.getElementById("create-account-submit").addEventListener("click", newUser);
document.getElementById("cancel-signin").addEventListener("click", hideSignIn);

document.getElementById("create-event").addEventListener("click", showCreateEvent);
document.getElementById("create-event-form").addEventListener("submit", createEvent);
document.getElementById("create-event-submit").addEventListener("click", createEvent);
document.getElementById("cancel-create-event").addEventListener("click", hideCreateEvent);

document.getElementById("cancel-edit-event").addEventListener("click", hideEditEvent);