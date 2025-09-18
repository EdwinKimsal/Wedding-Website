<?php
// Main function
function main(){
	// Create variables to get to the table
    $server = "server";
    $username = "username";
    $database = "database";
    $password = "password";
    $invite = "invite";
    $submissions = "submissions";
    
	// Create connection
    $conn = new mysqli($server, $username, $password, $database);

    // Result is SELECT statement for parties from responses already happened
    $result = mysqli_query($conn, "SELECT Party FROM $invite, $submissions WHERE $invite.Attendee = $submissions.Attendee;");
    
    // Return each row
    while ($row = mysqli_fetch_array($result, MYSQLI_NUM)){
        printf("%s\n", $row[0]);
    }
}


// Call main function
main()
?>
