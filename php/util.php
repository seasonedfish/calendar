<?php
/**
 * Class with helper methods for SQL operations.
 */
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
     * Gets the result from a query as a 2D array
     */
    function get_query_result(string $query, string $types, ...$params) {
        $statement = $this->mysqli->prepare($query);
        if(!$statement){
            printf("Query prep failed: %s\n", $this->mysqli->error);
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
        $statement = $this->mysqli->prepare($query);
        if(!$statement){
            printf("Query prep failed: %s\n", $this->mysqli->error);
            exit;
        }
        $statement->bind_param($types, ...$params);
        $statement->execute();
        $statement->close();
    }
}

function send_data_as_json($data) {
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit();
}

send_data_as_json(array("hello", "world"));
