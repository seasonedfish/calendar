<?php
    /**
     * Edits an event
     */

    header("Content-Type: application/json");
    require_once "util.php";
    
    ini_set("session.cookie_httponly", 1);

    session_start();
    $username = $_SESSION['username'];

    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    $event_id = $json_obj['event_id'];
    $title = $json_obj['title'];
    $datetime = $json_obj['datetime'];
    $location = $json_obj['location'];

    $sql_helper = new SqlHelper();

    $query = "select * from events where event_id=?";
    $result = $sql_helper->get_query_result($query, "i", $event_id)[0];

    if ($username == $result['username']) {
        $query = "UPDATE events SET title = ?, datetime = ?, location = ? WHERE event_id = ?";
        $sql_helper->execute_query($query, "sssi", $title, $datetime, $location, $event_id);
    }
    exit;
?>