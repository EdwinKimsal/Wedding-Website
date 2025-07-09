<?php
// Function to get order of person input
function get_order($conn, $pers, $table){
    // Set the initial order of database
    $init_order = ["Name", "Bachelor_Party", "Bachelorette_Party", "Bridal_Party", "Rehearsal", "Reception", "Meal", "Restrictions"];

    // Get values of person in invite table into an array
    $result = mysqli_query($conn, "SELECT Bachelor_Party, Bachelorette_Party, Bridal_Party, Rehearsal FROM $table WHERE Attendee = '$pers[0]';");
    while ($row = mysqli_fetch_array($result, MYSQLI_NUM)){
        $values = [$row[0], $row[1], $row[2], $row[3]];
    }

    // Get rid of values that are n (use unset)

    // TEST
    return implode(", ", $values);
}


// Main function
function main($input){
    // Create variables to get to the table
    $server = "localhost";
    $username = "root";
    $password = "ABNyZ=nA9G7k";
    $database = "wedding_rsvp";
    $table = "guests";
    $input_table = "invite_list";

    // Create connection
    $conn = new mysqli($server, $username, $password, $database);

    // Create string for email message
    $msg = "";

    // Iterate through each element in array
    foreach($input as $pers){
        // Last element is email, not a person
        if (is_array($pers)){
            // Get order of attributes in form
            $order = get_order($conn, $pers, $input_table);
            echo $order;

        //     // Create string for attributes and values command
        //     $attr_com = "INSERT INTO $table (";
        //     $val_com = " VALUES (";

        //     // Add appropriate attributes to values command
        //     foreach(range(0, count($pers)-1) as $pos){
        //         $attr_com .= "$order[$pos],";
        //         $val_com .= "'$pers[$pos]',";
        //         $msg .= "$order[$pos]: $pers[$pos],";
        //     }

        //     // Add email to both commands
        //     $attr_com .= "Email)";
        //     $val_com .= "'";
        //     $val_com .= $input[count($input)-1];
        //     $val_com .= "');";

        //     // Merge two together
        //     $command = $attr_com . $val_com;

        //     // Query
        //     mysqli_query($conn, $command);
        }

        // // Add a new line to msg
        // $msg .= ",";
    }

    // // Replace spaces in msg with a delimeter
    // $msg = str_replace(" ", "\space", $msg);

    // // Run python file for CSV and email
    // shell_exec("cd" .getcwd());
    // shell_exec("python main.py $table"); // CSV
    // shell_exec("python mail.py $msg"); // Email
}


// Call main function
main(json_decode($_POST['data'])); // JSON decode decodes the json data into an array
?>