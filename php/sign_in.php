<?php
    /**
     * Signs a user in.
     */

    header("Content-Type: application/json");
    require_once "util.php";

    $json_str = file_get_contents('php://input');
    $json_obj = json_decode($json_str, true);
    $username = $json_obj['username'];

    $sql_helper = new SqlHelper();
    $query = "select * from users where username = (?)";
    $result = $sql_helper->get_query_result($query, "s", $username);
    
    if (sizeof($result) > 0) {
        session_start();
        $_SESSION['username'] = $username;
        
        echo json_encode(array(
            "success" => true
        ));
        exit;
    }
    else {
        echo json_encode(array(
            "success" => false
        ));
        exit;
    }
?>