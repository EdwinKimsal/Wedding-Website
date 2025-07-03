<?php
// Main function
function main($input){
    // Create variables to get to the table
    $server = "localhost";
    $username = "root";
    $password = "ABNyZ=nA9G7k";
    $database = "wedding_rsvp";
    $table = "guests";

    // Create connection
    $conn = new mysqli($server, $username, $password, $database);

    // Create array for the order of col for a person
    $order = ['pers_name', 'attending', 'meal', 'restrictions'];

    // Iterate through each element in array
    foreach($input as $pers){
        // Last element is email, not a person
        if (is_array($pers)){
            // Create string for attributes and values command
            $attr_com = "INSERT INTO $table (";
            $val_com = " VALUES (";

            // Add appropriate attributes to values command
            foreach(range(0, count($pers)-1) as $pos){
                $attr_com .= "$order[$pos],";
                $val_com .= "'$pers[$pos]',";
            }

            // Add email to both commands
            $attr_com .= "email)";
            $val_com .= "'";
            $val_com .= $input[count($input)-1];
            $val_com .= "');";

            // Merge two together
            $command = $attr_com . $val_com;

            // Query
            mysqli_query($conn, $command);

            // Run python file
            shell_exec("python main.py" .$table);
        }
    }
}

// Call main function
main(json_decode($_POST['data'])); // JSON decode decodes the json data into an array
?>