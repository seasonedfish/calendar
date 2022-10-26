<?php
/**
 * Sends (in JSON) a given event ID.
 */

require_once "util.php";
header("Content-Type: application/json");

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

        if ($result['username'] == $username) {
            send_data_as_json(htmlentities($result));
        }
    }
}