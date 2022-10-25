<?php
/**
 * Sends (in JSON) the user's events for a given month.
 */

require_once "../php/util.php";

$events = array(
    array(
        "event_id" => "70",
        "title" => "My first dummy event",
        "datetime" => "2022-10-01T13:15:00",
        "location" => NULL,
        "username" => "fisher",
    ),
    array(
        "event_id" => "71",
        "title" => "My other dummy event",
        "datetime" => "2022-10-31T14:15:00",
        "location" => NULL,
        "username" => "fisher",
    )
);

send_data_as_json($events);
