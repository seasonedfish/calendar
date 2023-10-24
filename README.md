# CSE330 Calendar Website
Fisher Sun / seasonedfish

Harry Gao / harrygao56

## Creative Portion
- We implemented a feature that allows the user to toggle between dark and light mode.
  - To do this, we added CSS root variables to set to colors for all the elements, and we added functionality in the JavaScript to manipulate the DOM and change the color scheme.
  - The user's color scheme is saved in local storage, so that when they reopen the page, the color scheme is remembered.
- We added another column in the event table that allows the user to specify a location for the event.
  - When the user clicks on the event, they are able to open Google Maps directions to the location of the event.
- We also added a feature that allows the user to download the event as an .ics file, which is the industry standard for calendar programs.
  - This makes it so the user can add the event to their Google/Outlook calendar.
