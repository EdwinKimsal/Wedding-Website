<?php
// Main function
function main($input){
    // Create variables to get to the table
    $server = "localhost";
    $username = "root";
    $password = "ABNyZ=nA9G7k";
    $database = "wedding_rsvp";
    $table = "invite_list";

    // Create connection
    $conn = new mysqli($server, $username, $password, $database);
    
    // Result is SELECT statement for names and parties
    $result = mysqli_query($conn, "SELECT Attendee, Plus_One, Rehearsal, Bridal_Party, Bachelorette_Party, Bachelor_Party, is_kid FROM $table WHERE Party = '$input';");

    // Return each row
    while ($row = mysqli_fetch_array($result, MYSQLI_NUM)){
        printf("%s, %s, %s, %s, %s, %s, %s\n", $row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6]);
    }
}


// Call main function
main(json_decode($_GET['data'])); // JSON decode decodes the json data into an array
?>