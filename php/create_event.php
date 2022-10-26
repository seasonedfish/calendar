<?php
    /**
     * Creates an event
     */

    header("Content-Type: application/json");
    require_once "util.php";

    session_start();
    $username = $_SESSION['username'];

    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $title = $json_obj['title'];
    $datetime = $json_obj['datetime'];
    $location = $json_obj['location'];

    $sql_helper = new SqlHelper();
    $query = "insert into events (title, datetime, username, location) values (?, ?, ?, ?)";
    $result = $sql_helper->get_query_result($query, "ssss", $title, $datetime, $username, $location);

    send_data_as_json($result);
?>