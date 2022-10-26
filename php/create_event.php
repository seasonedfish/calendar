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
    $sql_helper->execute_query($query, "ssss", $title, $datetime, $username, $location);
?>