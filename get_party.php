<?php
// Main function
function main(){
    // Create variables to get to the table
    $server = "localhost";
    $username = "root";
    $database = "wedding_rsvp";
    $password = "abcde";
    $table = "invite_list";

    // Create connection
    $conn = new mysqli($server, $username, $password, $database);

    // Result is SELECT statement for names and parties
    $result = mysqli_query($conn, "SELECT Attendee, Party FROM $table;");

    // Return each row
    while ($row = mysqli_fetch_array($result, MYSQLI_NUM)){
        printf("%s, %s\n", $row[0], $row[1]);
    }
}


// Call main function
main()
?>
