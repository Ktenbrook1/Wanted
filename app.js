"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  let searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  let searchResults;
  switch(searchType){
    case 'yes':
      searchResults = searchByName(people);
      break;
    case 'no':
      // TODO: search by traits
      searchResults = searchByTraits(people);
      break;
      default:
    app(people); // restart app
      break;
  }
  
  // Call the mainMenu function ONLY after you find the SINGLE person you are looking for
  mainMenu(searchResults, people);
}

// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original dataset of people. We need people in order to find descendants and other information that the user may want. */

  if(!person){
    alert("Could not find that individual.");
    return app(people); // restart
  }

  let displayOption = prompt("Found " + person[0].firstName + " " + person[0].lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person, people)
    return app 
    break;
    case "family":
    displayFamily(person, people)
    // TODO: get person's family
    break;
    case "descendants":
    displayDescendants(person[0], people)
    break;
    // TODO: get person's descendants
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
  return mainMenu(person, people);
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(el){
    if(el.firstName == firstName && el.lastName == lastName){
      return true;
    }
    else{
      return false;
    }
  }) 
  if(foundPerson === undefined || foundPerson.length === 0) {
    notValid();
    return app(data);
  }
  return foundPerson;
}
function searchByGender(people){
  let searchType = promptFor("Do you know the gender of this person? Enter 'yes' or 'no'", yesNo).toLowerCase();

  switch(searchType){
    case 'yes':
      let gender = promptFor("What is the person's gender?", chars);
      if(gender == "male" || gender == "female"){
        let foundPeople = people.filter(function(el){
          if(el.gender == gender){
            return true;
          }
        })
        return foundPeople;
      }
      else{
        notValid();
        return searchByGender(people);
      }
    case 'no':
      break;
  }
}

function searchByEyeColor(people){
  let searchType = promptFor("Do you know the eye color of this person? Enter 'yes' or 'no'", yesNo).toLowerCase();

  switch(searchType){
    case 'yes':
      let eyeColor = promptFor("What is the person's eye color?", chars);
      if(eyeColor == "blue" || eyeColor == "black" || eyeColor == "brown" || eyeColor == "hazel" || eyeColor == "green"){
        let foundPeople = people.filter(function(el){
          if(el.eyeColor == eyeColor){
            return true;
          }
        })
        return foundPeople;
      }
      else{
        notValid();
        return searchByEyeColor(people);
      }    
    case 'no':
      break;
  }
}

function searchByOccupation(people){
  let searchType = promptFor("Was the suspect wearing any clothes that could have hinted towards a occupation? Enter 'yes' or 'no'", yesNo).toLowerCase();

  switch(searchType){
    case 'yes':
      let occupation = promptFor("What was their occupation?", chars);
      if(occupation == "programmer" || occupation == "assistant" || occupation == "landscaper" || occupation == "nurse" || occupation == "student" || occupation == "architect" || occupation == "doctor" || occupation == "politician"){
        let foundPeople = people.filter(function(el){
          if(el.occupation == occupation){
            return true;
          }
        })
        return foundPeople;
      }
      else{
        notValid();
        return searchByOccupation(people);
      }
    case 'no':
      break;
  }
}
//SearchByTraits

function searchByTraits(people){

  let genderArray = searchByGender(people);
  displayPeople(genderArray);
  //checks to see if one person was passed in
  let foundPerson = ifOnePersonFound(genderArray);
  if(foundPerson == true){
    mainMenu(genderArray);
    return;
  }
  let eyeColorArray = searchByEyeColor(genderArray);
  displayPeople(eyeColorArray);
  foundPerson = ifOnePersonFound(eyeColorArray);
  if(foundPerson == true){
    mainMenu(eyeColorArray);
    return;
  }
  let occupationArray = searchByOccupation(eyeColorArray);
  displayPeople(occupationArray);
  foundPerson = ifOnePersonFound(occupationArray);
  if(foundPerson == true){
    mainMenu(occupationArray);
    return;
  }
  notValid();
  return;
}

//If there is one result in the search by traits it will return true
function ifOnePersonFound(people){
  if(people.length <= 1){
    return true;
  }
  else{
    return false;
  }
}

// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
}

function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  let personInfo = "First Name: " + person[0].firstName + "\n";
  personInfo += "Last Name: " + person[0].lastName + "\n";
  personInfo += "Height: " + person[0].height + "\n";
  personInfo += "Weight: " + person[0].weight + "\n";
  personInfo += "Date of Birth: " + person[0].dob + "\n";
  personInfo += "Eye Color: " + person[0].eyeColor + "\n";
  personInfo += "Occupation: " + person[0].occupation + "\n"; 
  alert(personInfo);
}


function displayDescendants(person, people){
  let descendantsArray = people.filter(function(el){

    if(el.parents[0] == person.id || el.parents[1] == person.id){
        return true;
    }
    else{
      return false;
    }
  })
  //displayPeople(childrenArray);
  descendantsArray.forEach(child => {
    displayPerson([child]);
    displayDescendants(child, people);
  });
}

function displayFamily(person, people) {
  console.log(person);
  console.log(person.parents);
  let parentArray = people.filter(function (el) {
      if (el.id == person[0].parents[0] || el.id == person[0].parents[1]) {
        return true;
      } 
      else{
        return false;
      }
    });

  let siblingArray = people.filter(function(el){
      if(el.parents[0] == person[0].parents[0] 
        || el.parents[1] == person[0].parents[1]){
        return true;
      }
      else{
        return false;
      }
    });

  let spouse = people.filter(function(el){
    if(el.id === people.spouse){
      return true;
    }
    else{
      return false;
    }
  });

  if (parentArray.length >= 1) {
    let parentAlert = "Here are the parents";
    alert(parentAlert);
    displayPeople(parentArray);
  }
  if(siblingArray.length >= 1){
    alert("Here are the siblings");
    displayPeople(siblingArray);
  }
  if(spouse.length >= 1){
    alert("Here is the spouse");
    displayPeople(spouse);
  }
}
  


// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}
//function to alert user that input was not valid 
function notValid(){
  alert("Could not find that individual based on the input given. Please try again or say 'no' to proceed to next question.");
  return false;
}

// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}

// helper function to pass in as default promptFor validation
function chars(input){
  return true; // default validation only
}
