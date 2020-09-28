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

  let displayOption = prompt("Found " + person.firstName + " " + person.lastName + " . Do you want to know their 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'");

  switch(displayOption){
    case "info":
    displayPerson(person, data)
    // TODO: get person's info
    break;
    case "family":
    displayFamily(person, data)
    // TODO: get person's family
    break;
    case "descendants":
    displayDescendants(person, data)
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}

function searchByName(people){
  let firstName = promptFor("What is the person's first name?", chars);
  let lastName = promptFor("What is the person's last name?", chars);

  let foundPerson = people.filter(function(person){
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered

  return foundPerson;
}
function searchByGender(people){
  let searchType = promptFor("Do you know the gender of this person? Enter 'yes' or 'no'", yesNo).toLowerCase();

  switch(searchType){
    case 'yes':
      let gender = promptFor("What is the person's gender?", chars);
      if(gender == male || gender == female){
        let foundPeople = people.filter(function(el){
          if(el.gender === gender){
            return foundPeople;
          }
          else{
            return false;
          }
        })
      }
      else{
        alert("Could not find that individual based on the input given. Please try again or say 'no' to proceed to next question.");
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
      if(eyecolor == blue || eyeColor == black || eyeColor == brown || eyeColor == hazel || eyeColor == green){
        let foundPeople = people.filter(function(el){
          if(el.gender === gender){
            return foundPeople;
          }
          else{
            notValid();
          }
        })
      }
      else{
        return searchByEyeColor(people);
      }
    case 'no':
      break;
  }
}
//SearchByTraits
function searchByTraits(people) {
  let searchType = promptFor("Which trait(s) would you like to search by? 'gender', 'dob', 'height', 'weight', 'eye color', 'occupation'", chars).toLowerCase();
  let filterPeople = [];
  
  switch(searchType){
      case "gender":
      filterPeople = searchByGender(people);
      break;
      case "dob":
      filterPeople = searchByDob(people);
      break;
      case "height":
      filterPeople = searchByHeight(people);
      break;
      case "weight":
      filterPeople = searchByWeight(people);
      break;
      case "eye color":
      filterPeople = searchByEyeColor(people);
      break;
      case "occupation":
      filterPeople = searchByOccupation(people);
      break;
      case "restart":
      app(people); // restart
      break;
      case "quit":
      return;
      default:
        alert("Please Enter A Correct Entry Option");
        searchByTraits(people);
        break;
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
  let personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Height: " + person.height + "\n";
  personInfo += "Weight: " + person.weight + "\n";
  personInfo += "Age: " + person.age + "\n";
  personInfo += "Eye Color: " + person.eyecolor + "\n";
  personInfo += "Occupation: " + person.occupation + "\n"; 
  alert(personInfo);
}

function displayDescendants(person, people, allDescendants = []) {
  var loopFinish = false;
  let newArray = people.filter(function (el) {
    if( (person.id == el.parents[0]) || (person.id == el.parents[1]) ) {
      allDescendants.push(el)
      return true;
    } else {
      return false;
    }
  });
  if (newArray.length > 1) {
    for (var i = 0; i < newArray.length; i++) {
      displayDescendants(newArray[i], data, allDescendants);
    }
    loopFinish = true;
  } else if (allDescendants.length === 0) {
    loopFinish = true;
  }
  
  if (newArray.length >= 1) {
    displayPeople(allDescendants)
    return app(data);
  }
 
  if (loopFinish) {
    if (newArray === undefined || newArray.length === 0) {
      alert("This person has no descendants");
      return app(data);
    }
    loopFinish = false;
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
