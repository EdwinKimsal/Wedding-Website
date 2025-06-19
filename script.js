// Initial function
function init(){
    // Add event listeners
    document.getElementById("yes").addEventListener("click", add_meal);
    document.getElementById("no").addEventListener("click", remove_meal);
}

// Adding a new person to list function
function addPers(){
    // Get people section
    const people_loc = document.getElementById("people");

    // Set variables of new person
    const newPers = document.createElement("form");
    const header = document.createElement("h2");

    // Code for lines and line breaks
    // document.createElement("hr")
    // document.createElement("br")

    const name_label = document.createElement("label");
    const name_del = document.createElement("button");
    const name_text_box = document.createElement("textarea");

    const att_label = document.createElement("label");
    const yes_button = document.createElement("input");
    const yes_label = document.createElement("label");
    const no_button = document.createElement("input");
    const no_label = document.createElement("label");

    // Create header and append to newPers div
    header.innerHTML = "Person";

    name_del.innerHTML = "Delete";
    name_del.className = "close_button";
    name_del.addEventListener("click", close);
    name_del.type = "button";

    newPers.append(header);
    newPers.append(name_del);
    newPers.append(document.createElement("hr"));

    // Create Name fields and append to newPers div
    name_label.innerHTML = "Name:";
    name_label.htmlFor = "name";
    name_label.className = "required";

    name_text_box.id = "name";
    name_text_box.rows = "1";

    newPers.append(name_label);
    newPers.append(document.createElement("br"));
    newPers.append(name_text_box);
    newPers.append(document.createElement("br"));
    newPers.append(document.createElement("br"));
    
    // Create Attending fields and append to newPers div
    att_label.innerHTML = "Will you be attending?";
    att_label.htmlFor = "attQ";
    att_label.className = "required";
    yes_button.addEventListener("click", add_meal);
    yes_label.innerHTML = "Yes";
    no_button.addEventListener("click", remove_meal);
    no_label.innerHTML = "No";

    yes_button.type = "radio";
    yes_button.value = "Yes";
    yes_button.id = "yes";
    yes_button.name = "attBool";
    no_button.type = "radio";
    no_button.value = "No";
    no_button.id = "no";
    no_button.name = "attBool";

    newPers.append(att_label);
    newPers.append(document.createElement("br"));
    newPers.append(yes_button);
    newPers.append(yes_label);
    newPers.append(document.createElement("br"));
    newPers.append(no_button);
    newPers.append(no_label);
    newPers.append(document.createElement("br"));

    // Set class of the new person
    newPers.className = "pers_box";

    // Append newPers to page
    people_loc.appendChild(newPers);
}


// Add meal function
function add_meal(){
    console.log(this.parentElement.lastChild.innerHTML);
    // Add meal if not already there
    if (this.parentElement.lastChild.innerHTML == undefined || this.parentElement.lastChild.innerHTML == "" || this.parentElement.lastChild.innerHTML == "No"){
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
        meal_label.innerHTML = "Select your meal:";
        meal_label.className = "required"

        meal_1.type = "radio";
        meal_1.id = "chicken";
        meal_1.value = "chicken";
        meal_1.name = "meal";
        meal_1_label.innerHTML = "Chicken";
        meal_1_label.htmlFor = "chicken";

        meal_2.type = "radio";
        meal_2.id = "steak";
        meal_2.value = "steak"
        meal_2.name = "meal";
        meal_2_label.innerHTML = "Steak";
        meal_2_label.htmlFor = "steak";

        meal_3.type = "radio";
        meal_3.id = "fish";
        meal_3.value = "fish";
        meal_3.name = "meal";
        meal_3_label.innerHTML = "Fish";
        meal_3_label.htmlFor = "fish";

        meal_other.type = "radio";
        meal_other.id = "other";
        meal_other.value = "other";
        meal_other.name = "meal";
        meal_other.addEventListener("click", restrictions);
        meal_other_label.innerHTML = "Other"
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
        meal.append(document.createElement("br"));
        this.parentElement.append(meal);
    }
}

// Function to remove the meal option if needed
function remove_meal(){
    console.log(this.parentElement.lastChild.innerHTML);
    // Remove meal if there
    if (this.parentElement.lastChild.innerHTML != undefined && this.parentElement.lastChild.innerHTML != "No"){
        this.parentElement.lastChild.remove();
    }
}

//  Function for adding dietary restrictions
function restrictions(){
    // Set constant varaibles for new elements
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

    // Append elements to person
    this.parentElement.append(document.createElement("br"));
    this.parentElement.append(restr_label);
    this.parentElement.append(document.createElement("br"));
    this.parentElement.append(restr_text);
    this.parentElement.append(document.createElement("br"));
}

// Removing a person function
function close(){
    this.parentElement.remove();
}


// Submit form function
function submitForm(){
    alert("Your submission has been recieved!"); // Alert user that submission has been recieved
}