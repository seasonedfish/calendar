<?php
    /**
     * Edits an event
     */

    header("Content-Type: application/json");
    require_once "util.php";

    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $event_id = $json_obj['event_id'];
    $title = $json_obj['title'];
    $datetime = $json_obj['datetime'];
    $location = $json_obj['location'];

    $sql_helper = new SqlHelper();
    $query = "UPDATE events SET title = ?, datetime = ?, location = ? WHERE event_id = ?";
    $sql_helper->execute_query($query, "sssi", $title, $datetime, $location, $event_id);
    exit;
?>