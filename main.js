console.log('hola.');

const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];
const students = [];

// Print Function
  const printToDom = (toPrint, divId) => {
    document.getElementById(divId).innerHTML = toPrint;
  }
  
  //Print Form when button press 
  const printForm = () => {
    let stringToPrint = `
    <form>
        <div class="form-group">
            <label for="fullName">Name</label>
            <input type="text" class="form-control" id="fullName" aria-describedby="nameHelp" placeholder="Enter name">
            <small id="nameHelp" class="form-text text-muted">Enter the student's name to be sorted.</small>
        </div>
        <button id="sort-button" type="button" class="btn btn-primary">Sort!</button>
    </form>
    `
    printToDom(stringToPrint, 'studentInput');
    document.getElementById('sort-button').addEventListener('click', buttonClick);
}
  
// print student cards
const printCards = (studentArray) => {
  let stringToPrintCards = '<div class="row">';
  for (let i = 0; i < studentArray.length; i++) {
      stringToPrintCards += `
      <div class="cards col-3">
          <h5 class="card-header">${studentArray[i].name}</h5>
          <div class="card-body">
              <h5 class="card-title">${studentArray[i].house}</h5>
              <a href="#" id="expel${[i]}" class="expel-button btn btn-primary" ng-click="removeCard($index)">Expel</a>
          </div>
      </div>
      `
  }
  stringToPrintCards += '</div>';
  printToDom(stringToPrintCards, 'studentCard');

  for (let i = 0; i < studentArray.length; i++) {
  document.getElementById('expel'+i).addEventListener('click', buttonClick)
  }   
}

// print alert
const printAlert = () => {
  let alertToPrint = `
  <div class="alert alert-danger" role="alert">
  Please enter a student's name.
  </div>  
  `
  printToDom(alertToPrint, 'alert');
}


// if a button is clicked
const buttonClick = (event) => {
  const showForm = document.getElementById('studentInput');
  const showCards = document.getElementById('studentCard');
  const buttonType = event.target.id;
  const alertExists = document.getElementById('alert');
  if (showForm.innerHTML === '' && showCards.innerHTML === '') {
      if (buttonType === 'initiateButton') {
          printForm();
      }
  } else if (showForm.innerHTML !== '') {
      let randomNumber = Math.floor(Math.random() * Math.floor(4));
      let randomHouse = houses[randomNumber];
      const studentName = document.getElementById('fullName').value;
      if (buttonType === 'sort-button') {
          if (studentName === '') {
              printAlert();
              $().alert();
          } else if (alertExists) {
              $( "#alert" ).empty()
              students.push({name: studentName, house: randomHouse});
              printCards(students);
          } else {
              students.push({name: studentName, house: randomHouse});
              printCards(students);
          }
  } else if (buttonType.includes('expel')) {
      let splitById = buttonType.split('l');
      const arrayLocation = parseInt(splitById[1]);
      students.splice(arrayLocation, 1);
      printCards(students);
      }
  }
}
// begin button listener
document.getElementById('initiateButton').addEventListener('click', buttonClick);
