<?php
class SqlHelper {
    private mysqli $mysqli;

    public function __construct() {
        $this->mysqli = new mysqli("localhost", "calendar_inst", "calendar_pass", "calendar");

        if ($this->mysqli->connect_errno) {
            echo("Connection Failed: " . $this->mysqli->connect_error);
            exit();
        }
    }

    /**
     * Gets a result from a query
     */
    function get_query_result(string $query, string $types, ...$params) {
        global $mysqli;

        $statement = $mysqli->prepare($query);
        if(!$statement){
            printf("Query prep failed: %s\n", $mysqli->error);
            exit;
        }
        $statement->bind_param($types, ...$params);
        $statement->execute();

        $result = $statement->get_result();
        $statement->close();
        return $result->fetch_all(MYSQLI_ASSOC);
    }

    /**
     * Executes a query
     */
    function execute_query(string $query, string $types, ...$params) {
        global $mysqli;

        $statement = $mysqli->prepare($query);
        if(!$statement){
            printf("Query prep failed: %s\n", $mysqli->error);
            exit;
        }
        $statement->bind_param($types, ...$params);
        $statement->execute();
        $statement->close();
    }
}