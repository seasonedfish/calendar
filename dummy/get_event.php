<?php
/**
 * Sends (in JSON) a given event ID.
 */

require_once "../php/util.php";

$event = array(
    "eventId" => "1",
    "title" => "My dummy event",
    "datetime" => "2023-01-01T13:15:00",
    "location" => NULL
);

send_data_as_json($event);
