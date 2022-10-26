<?php
    /**
     * Creates a user in the database.
     */

    header("Content-Type: application/json");
    require_once "util.php";

    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);
    $username = $json_obj['username'];

    if ($username != "") {
        $sql_helper = new SqlHelper();
        $query = "insert into users (username) values (?)";
        $sql_helper->execute_query($query, "s", $username);
    }
    
    exit;
?>