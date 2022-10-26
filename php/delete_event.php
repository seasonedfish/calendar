<?php
/**
 * Deletes an event given the event_id
 */

require_once "util.php";
header("Content-Type: application/json");

if (isset($_GET['event_id'])) {
    session_start();
    if (isset($_SESSION['username'])) {
        $event_id = $_GET['event_id'];
        $username = $_SESSION['username'];

        $sql_helper = new SqlHelper();
        $query = "select * from events where event_id=?";
        $result = $sql_helper->get_query_result($query, "i", $event_id)[0];

        if ($username == $result['username']) {
            $query = "DELETE FROM events WHERE event_id=?";
            $sql_helper->execute_query($query, "i", $event_id)[0];
        }
    }
    exit;
}