<?php
/**
 * Deletes an event given the event_id
 */

require_once "util.php";

$json_str = file_get_contents('php://input');
$json_obj = json_decode($json_str, true);

if (isset($json_obj['event_id'])) {
    ini_set("session.cookie_httponly", 1);

    session_start();
    if (isset($_SESSION['username'])) {
        $event_id = $json_obj['event_id'];
        $username = $_SESSION['username'];

        $sql_helper = new SqlHelper();
        $query = "select * from events where event_id=?";
        $result = $sql_helper->get_query_result($query, "i", $event_id)[0];

        if ($username == $result['username']) {
            $query = "DELETE FROM events WHERE event_id=?";
            $sql_helper->execute_query($query, "i", $event_id);
        }
    }
    exit;
}