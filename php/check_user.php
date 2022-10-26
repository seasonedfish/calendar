<?php
    /**
     * Check if which user is signed in (if any)
     */
    require_once "util.php";
    header("Content-Type: application/json");


    session_start();
    if (isset($_SESSION['username'])) {
        send_data_as_json(array(
            "user" => $_SESSION['username']
        ));
    }
    else {
        send_data_as_json(array(
            "user" => ""
        ));
    }
?>