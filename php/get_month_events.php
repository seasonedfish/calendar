<?php
    /**
     * Sends (in JSON) the user's events for a given month.
     */
    header("Content-Type: application/json");
    require_once "util.php";

    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);

    if (isset($json_obj['date'])) {
        ini_set("session.cookie_httponly", 1);

        session_start();
        $date = $json_obj['date'];
        $username = $_SESSION['username'];
        
        $sql_helper = new SqlHelper();
        $query = "SELECT * FROM `events` WHERE MONTH(datetime)=MONTH(?) AND username=?";
        $result = $sql_helper->get_query_result($query, "ss", $date, $username);

        send_data_as_json($result);
    }
?>