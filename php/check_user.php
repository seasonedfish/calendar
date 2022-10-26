<?php
    /**
     * Check if which user is signed in (if any)
     */
    require_once "util.php";
    header("Content-Type: application/json");

    ini_set("session.cookie_httponly", 1);

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