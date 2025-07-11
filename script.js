// Function to clean up data
function clean_data(data){
    // Remove commas and make ' SQL friendly
    data = data.replaceAll(",", "");
    data = data.replaceAll("'", "''");

    // Return fixed data
    return data;
}


function redirect(){
    // Redirect and Alert user that submission has been recieved
    window.location.href = "/";
    alert("Thank you! Your submission has been recieved.");
}

// Submit form function
function submitForm(){
    // Set value dictionary
    const val_dict = {
        "Yes": 0.5,
        "No": 0.5,
        "Chicken": 0.25,
        "Steak": 0.25,
        "Fish": 0.25,
        "Pizza": 0.25,
        "Chicken Tenders": 0.25,
        "Mac & Cheese": 0.25,
        "Other": 0.25
    }

    // Create varaible for needed radio button clicks
    var count_rad_need = 0;
    var count_rad_have = 0;

    // Create array for final response and pers
    var final_response = [];
    var pers = new Array;

    // Initially make form valid
    var is_valid = true;

    //  Find all required fields
    const req_fields = document.getElementsByClassName("req");

    // Iterate through all required fields
    for (i=0; i < req_fields.length; i++){
        // Code for non-radio inputs
        if (req_fields[i].type != "radio"){
            // Case when form is not complete
            if (req_fields[i].value == ""){
                is_valid = false;
            }

            // When form is still valid
            else{
                // Handle (pass) case for first field
                if (i == 0){}

                // Handle case for new person
                else if (req_fields[i].id == "name"){
                    final_response.push(pers);
                    pers = new Array;
                }

                // All cases
                pers.push(clean_data(req_fields[i].value));
            }
        }

        // Code for radio inputs
        else{
            // Add to count_rad_need appropriately
            count_rad_need += val_dict[req_fields[i].value];

            // Add to count_rad_have, and pers appropriately
            if (req_fields[i].checked){
                count_rad_have += 1;
                pers.push(clean_data(req_fields[i].value));
            }
        }
    }

    // Add last person
    final_response.push(pers);

    // Add email
    final_response.push(clean_data(document.getElementById("email").value));

    // Check if form is valid
    if (is_valid == true && count_rad_need == count_rad_have){
        // Connect to PHP
        var jsonArr = JSON.stringify(final_response);
        $.ajax({
            type: "POST",
            url: "send.php",
            data: {data : jsonArr},

            // Run when connection has been made
            success: function(data){
                redirect();
            }
        });
    }

    // Else form is not valud
    else{
        alert("Not all required fields have been filled") // ALert user that submission was not completed
    }
}


// Function to fetch data
function fetch_data(){
    // Create connection to GET data
    $.ajax({
        type: "GET",
        url: "get_party.php",
        datatype: "json",

        // Run when connection has been made
        success: function(data){
            // Create array of data with each element being a person
            var arr_data = data.split("\n");

            // Create a blank map (dictionary)
            var dict_parties = new Map();

            // Iterate through each person and create an array to signify name and party
            for (i=0; i<arr_data.length; i++){
                arr_data[i] = arr_data[i].split(", ");
            }

            // Remove last element
            arr_data.pop();

            // Create this list to be a dictionary of parties and names associated with each party
            // FIXME
            for (i=0; i<arr_data.length; i++){
                // If the party is new, create a key with the name, else append
                if (dict_parties.has(arr_data[i][1])){
                    dict_parties.get(arr_data[i][1]).push(arr_data[i][0]);
                }
                else{
                    dict_parties.set(arr_data[i][1], [arr_data[i][0]]);
                }
            }

            // Get variable for datalist
            const datalist_var = document.getElementById("party_list");

            // Iterate through the map and assign to datalist_var appropriately
            for (const [key, value] of dict_parties){
                // Create an option for the datalist
                const option = document.createElement("option");

                // Set values
                option.value = key;
                option.label = value.join(", ");

                // Append to datalist
                datalist_var.append(option);
            }
        }
    });
}


// Redirect user to RSVP page with designated party
function load_form(){
    // Get inputed party
    const party = document.getElementById("party_input").value;

    // Get list of all parties through the datalist
    var options = document.getElementById("party_list").options;
    var parties = [];
    for(i=0; i<options.length; i++){
        parties.push(options[i].value);
    }

    // Make sure the party is valid
    if (parties.includes(party)){
        // Set URL and redirect user with designated party
        const url = "rsvp.html?Party=" + party;
        window.location.href = url;
    }

    // Else notify user
    else{
        alert(party + " is not a valid party. Please enter a valid party.");
    }
}


// Function to create form based on party
function create_form(){
    // Get parameters from URL (parameters after ?)
    const urlParams = new URLSearchParams(window.location.search);

    // Get a specific parameter's value
    const party = urlParams.get("Party");
    
    // Create connection to GET data
    var jsonParty = JSON.stringify(party);
    $.ajax({
        type: "GET",
        url: "get_people.php",
        data: {data : jsonParty},
        datatype: "json",

        // Run when connection has been made
        success: function(data){
            // Create array of data with each element being a person
            var arr_data = data.split("\n");

            // Iterate through each person and create an element
            for(i=0; i<arr_data.length; i++){
                arr_data[i] = arr_data[i].split(", ");
            }

            // Remove last element
            arr_data.pop();

            // Create person questions for each person
            for(i=0; i<arr_data.length; i++){
                generate_pers(arr_data[i][0], arr_data[i][1], arr_data[i][2], arr_data[i][3], arr_data[i][4], arr_data[i][5], arr_data[i][6]);
            }
        }
    });
}


// Generate person questions
function generate_pers(name, plus_one, rehearsal, bridal, bachelorette, bachelor, is_kid){
    // Get people section
    const people_loc = document.getElementById("people");

    // Set variables of new person for needed elements
    const newPers = document.createElement("form");
    const header = document.createElement("h2");

    // Code for lines and line breaks
    // document.createElement("hr")
    // document.createElement("br")

    // Generate name label and text box
    // Create needed elements
    const name_label = document.createElement("label");
    const name_text_box = document.createElement("textarea");

    // Add details to header
    header.innerHTML = "Attendee";

    // Add header and styling to new form for person
    newPers.append(header);
    newPers.append(document.createElement("br"));
    newPers.append(document.createElement("hr"));
    newPers.append(document.createElement("br"));

    // Create Name fields for label
    name_label.innerHTML = "Name:";
    name_label.htmlFor = "name";
    name_label.className = "required";

    // Create Name fields for text box
    name_text_box.id = "name";
    name_text_box.rows = "1";
    name_text_box.maxLength = "100";
    name_text_box.className = "req";
    name_text_box.value = name;
    name_text_box.disabled = "True";

    // Append to the new form for person
    newPers.append(name_label);
    newPers.append(document.createElement("br"));
    newPers.append(name_text_box);
    newPers.append(document.createElement("br"));
    newPers.append(document.createElement("br"));

    // Generate questions needed by calling the add attendence question
    if (bachelor == "y"){
        add_att("Bachelor Party", newPers, name);
    }
    if (bachelorette == "y"){
        add_att("Bachelorette Party", newPers, name);
    }
    if (bridal == "y"){
        add_att("Bridal Shower", newPers, name);
    }
    if (rehearsal == "y"){
        add_att("Rehearsal Dinner", newPers, name);
    }
    add_att("Ceremony & Reception", newPers, name);

    // Set class and id of the new person
    newPers.className = "pers_box";
    newPers.id = is_kid;

    // Append newPers to page
    people_loc.appendChild(newPers);

    // Add plus one by recursion, if needed
    if (plus_one == "y"){
        generate_pers(name + "'s Guest", "n", rehearsal, "n", "n", "n");
    }
}


// Function to add attendence question to person
function add_att(type, newPers, name){
    // Create needed elements
    const att_label = document.createElement("label");
    const yes_button = document.createElement("input");
    const yes_label = document.createElement("label");
    const no_button = document.createElement("input");
    const no_label = document.createElement("label");

    // Create Attending fields and append to newPers div
    att_label.innerHTML = "Will you be attending the " + type + "?";
    att_label.htmlFor = name + "_" + type;
    att_label.className = "required";
    yes_label.innerHTML = "Yes";
    yes_label.htmlFor =  name + "_" + type;
    no_label.innerHTML = "No";
    no_label.htmlFor =  name + "_" + type;

    // Add event listener's for meals if type if Ceremony and Reception
    if (type == "Ceremony & Reception"){
        yes_button.addEventListener("click", add_meal);
        no_button.addEventListener("click", remove_meal);
    }

    // Add attributes to radio buttons
    yes_button.type = "radio";
    yes_button.value = "Yes";
    yes_button.name = name + "_" + type;
    yes_button.className = "req";
    yes_button.id = name + "_" + type;
    no_button.type = "radio";
    no_button.value = "No";
    no_button.name = name + "_" + type;
    no_button.className = "req";
    no_button.id = type;

    // Append all new elements to the new person
    newPers.append(att_label);
    newPers.append(document.createElement("br"));
    newPers.append(yes_button);
    newPers.append(yes_label);
    newPers.append(document.createElement("br"));
    newPers.append(no_button);
    newPers.append(no_label);
    newPers.append(document.createElement("br"));
    if (type != "Ceremony & Reception"){
        newPers.append(document.createElement("br"));
    }
}


// Add meal function
function add_meal(){
    // Add meal if not already there
    if (this.parentElement.lastChild.innerHTML == undefined || this.parentElement.lastChild.innerHTML == "" || this.parentElement.lastChild.innerHTML == "No" || this.parentElement.lastChild.type == "br"){
        // Create needed elements
        const meal = document.createElement("div");
        const meal_label = document.createElement("label");
        const meal_1 = document.createElement("input");
        const meal_1_label = document.createElement("label");
        const meal_2 = document.createElement("input");
        const meal_2_label = document.createElement("label");
        const meal_3 = document.createElement("input");
        const meal_3_label = document.createElement("label");
        const meal_other = document.createElement("input");
        const meal_other_label = document.createElement("label");

        // Code for lines and line breaks
        // document.createElement("hr")
        // document.createElement("br")

        // Add to needed elements
        meal_label.innerHTML = "Select your meal for the Reception:";
        meal_label.className = "required"

        // Find is_kid from the text area
        is_kid = parent.id;
        console.log(is_kid);

        // Meals when not a kid
        if (is_kid == "y"){
            meal_1.type = "radio";
            meal_1.id = "chicken";
            meal_1.value = "Chicken";
            meal_1.name = "meal";
            meal_1.className = "req";
            meal_1.addEventListener("click", restrictions);
            meal_1_label.innerHTML = "Chicken";
            meal_1_label.htmlFor = "chicken";

            meal_2.type = "radio";
            meal_2.id = "steak";
            meal_2.value = "Steak"
            meal_2.name = "meal";
            meal_2.className = "req";
            meal_2.addEventListener("click", restrictions);
            meal_2_label.innerHTML = "Steak";
            meal_2_label.htmlFor = "steak";

            meal_3.type = "radio";
            meal_3.id = "fish";
            meal_3.value = "Fish";
            meal_3.name = "meal";
            meal_3.className = "req";
            meal_3.addEventListener("click", restrictions);
            meal_3_label.innerHTML = "Fish";
            meal_3_label.htmlFor = "fish";
        }

        // Else is a kid
        else{
            meal_1.type = "radio";
            meal_1.id = "pizza";
            meal_1.value = "Pizza";
            meal_1.name = "meal";
            meal_1.className = "req";
            meal_1.addEventListener("click", restrictions);
            meal_1_label.innerHTML = "Pizza";
            meal_1_label.htmlFor = "pizza";

            meal_2.type = "radio";
            meal_2.id = "chicken_tenders";
            meal_2.value = "Chicken Tenders"
            meal_2.name = "meal";
            meal_2.className = "req";
            meal_2.addEventListener("click", restrictions);
            meal_2_label.innerHTML = "Chicken Tenders";
            meal_2_label.htmlFor = "chicken_tenders";

            meal_3.type = "radio";
            meal_3.id = "mac";
            meal_3.value = "Mac & Cheese";
            meal_3.name = "meal";
            meal_3.className = "req";
            meal_3.addEventListener("click", restrictions);
            meal_3_label.innerHTML = "Mac & Cheese";
            meal_3_label.htmlFor = "mac";
        }

        meal_other.type = "radio";
        meal_other.id = "other";
        meal_other.value = "Other";
        meal_other.name = "meal";
        meal_other.className = "req";
        meal_other.addEventListener("click", restrictions);
        meal_other_label.innerHTML = "Have Dietary Restrictions"
        meal_other_label.htmlFor = "other";

        // Append to HTML
        meal.append(document.createElement("br"));
        meal.append(meal_label);
        meal.append(document.createElement("br"));
        meal.append(meal_1);
        meal.append(meal_1_label);
        meal.append(document.createElement("br"));
        meal.append(meal_2);
        meal.append(meal_2_label);
        meal.append(document.createElement("br"));
        meal.append(meal_3);
        meal.append(meal_3_label);
        meal.append(document.createElement("br"));
        meal.append(meal_other);
        meal.append(meal_other_label);
        this.parentElement.append(meal);
    }
}


// Function to remove the meal option if needed
function remove_meal(){
    // Remove meal if there
    if (this.parentElement.lastChild.innerHTML != "" && this.parentElement.lastChild.innerHTML != "No"){
        this.parentElement.lastChild.remove();
    }
}


//  Function for adding dietary restrictions
function restrictions(){
    // Make sure a restriction is not already there
    if (this.parentElement.lastChild.innerHTML == "Have Dietary Restrictions" && this.value == "Other"){
        // Set constant varaibles for new elements
        const restr = document.createElement("div");
        const restr_label = document.createElement("label");
        const restr_text = document.createElement("textarea");

        // Code for lines and line breaks
        // document.createElement("hr")
        // document.createElement("br")

        // Add to new elements
        restr_label.innerHTML = "Please specify dietary restrictions:";
        restr_label.htmlFor = "restr";
        restr_label.className = "required";

        restr_text.id = "restr";
        restr_text.rows = "1";
        restr_text.className = "req";

        // Append elements to person
        restr.append(document.createElement("br"));
        restr.append(restr_label);
        restr.append(document.createElement("br"));
        restr.append(restr_text);
        restr.append(document.createElement("br"));
        this.parentElement.append(restr);
    }

    // Remove if needed
    else if (this.parentElement.lastChild.innerHTML != "Have Dietary Restrictions" && this.value != "other")
        this.parentElement.lastChild.remove();
}