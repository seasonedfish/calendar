<?php
    /**
     * Sends (in JSON) the user's events for a given month.
     */
    header("Content-Type: application/json");
    require_once "util.php";

    if (isset($_GET['date'])) {
        $date = $_GET['date'];
        $username = $_SESSION['username'];
        
        $sql_helper = new SqlHelper();
        $query = "SELECT * FROM `events` WHERE MONTH(datetime)=MONTH(?) AND username=?";
        $result = $sql_helper->get_query_result($query, "ss", $date, $username);

        echo json_encode($result);
        exit;
    }
?>