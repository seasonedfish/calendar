<?php
/**
 * Sends (in JSON) a given event ID.
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

        if ($result['username'] == $username) {
            send_data_as_json($result);
        }
    }
}