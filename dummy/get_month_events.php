<?php
/**
 * Sends (in JSON) the user's events for a given month.
 */

require_once "../php/util.php";

$events = array(
    array(
        "eventId" => "70",
        "title" => "My first dummy event",
        "datetime" => "2023-02-01T13:15:00",
        "location" => NULL
    ),
    array(
        "eventId" => "71",
        "title" => "My other dummy event",
        "datetime" => "2023-02-07T14:15:00",
        "location" => NULL
    )
);

send_data_as_json($events);
