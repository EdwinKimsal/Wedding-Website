<?php
// Main function
function main(){
	// Create variables to get to the table
    $server = "localhost";
    $username = "root";
    $database = "wedding_rsvp";
    $password = "tw+rdNHix1";
    $invite = "invite_list";
    $submissions = "guests";
    
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
