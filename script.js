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
    att_label.className = "required"
    yes_label.innerHTML = "Yes";
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


// Removing a person function
function close(){
    this.parentElement.remove();
}


// Submit form function
function submitForm(){
    alert("Your submission has been recieved!"); // Alert user that submission has been recieved
}