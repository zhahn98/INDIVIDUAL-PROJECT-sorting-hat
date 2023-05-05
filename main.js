//declare default cards shown
const students = [
  {
    id: 1,
    name: 'Harry Potter',
    house: 'Gryffindor',
  },
  {
    id: 2,
    name: 'Draco Malfoy',
    house: 'Slytherin',
  },
  {
    id: 3,
    name: 'Cedrick Diggory',
    house: 'Hufflepuff',
  },
  {
    id: 4,
    name: 'Luna Lovegood',
    house: 'Ravenclaw',
  },
  { id: 5,
    name: 'Bellatrix Lestrange',
    house: 'Expelled'
  }
];

// const expelled = [
//   {
//     id: 1,
//     name: 'Bellatrix Lestrange'
//   }
// ];

//declare render to dom function
const renderToDom = (divId, htmlToRender) => {
  const selectedDiv = document.querySelector(divId);
  selectedDiv.innerHTML = htmlToRender;
}

//function that displays student cards on webpage
const cardsOnDom = (array) => {
  let domString = "";
  for (const student of array){
    domString += `<div id="card" class=${student.house} style="width: 20rem;">
    <class="card-img-top" alt=${student.name}> 
    <div class="card-body">
      <h5 class="card-title">${student.name}</h5>
      <p>House: ${student.house}</p>
      <button class="btn btn-danger" id="delete--${student.id}">Expel</button>
    </div>
  </div>`;
  }
  renderToDom('#app', domString);
}

// scrapped function that displays expelled students on webpage
// const expelledOnDom = (array) => {
//   let domString = "";
//   for (student of array){
//     domString += `<div id="card" style="width: 20rem;">
//     <div class="card-body">
//       <h5 class="card-title">${student.name}</h5>
//       <p class="card-text">has been Expelled O_O</p>
//     </div>
//   </div>`;
//   }
//   renderToDom('#expelledStudents', domString);
// }

//filter by house
const filter = (array, sortString) => {
  const houseArray = [];

  for (const student of array){
    if (student.house === sortString){
      houseArray.push(student);
    }
  }
  return houseArray;
}

//new student functionality
const form = document.querySelector('form');
const createStudent = (e) => {

  e.preventDefault();
  
  //random number generator declared along with array of houses that we can reference by index
  const houses = ["Gryffindor", "Slytherin", "Hufflepuff", "Ravenclaw"];
  const randInt = Math.floor(Math.random() * 4);

  const newStudentObj = {
    id: students.length + 1,
    name: document.querySelector('#name').value,
    house: houses[randInt]
  }

  students.push(newStudentObj);
  cardsOnDom(students);
  form.reset();

}

form.addEventListener('submit', createStudent)


//prep buttons for event listeners
const expelBtn = document.getElementById("delete--${student.id}")
const openModalBtn = document.getElementById("open-modal");
const closeModalBtn = document.getElementById("close-modal");
const modal = document.getElementById("modal");
const showAllBtn = document.querySelector('#showAll')
const showGryffindorBtn = document.querySelector('#Gryffindor');
const showSlytherinBtn = document.querySelector('#Slytherin');
const showHufflepuffBtn = document.querySelector('#Hufflepuff');
const showRavenclawBtn = document.querySelector('#Ravenclaw');

//modal button event listeners. 

openModalBtn.onclick = function() {
  modal.style.display = "block";
}

closeModalBtn.onclick = function() {
  modal.style.display = "none";
}

//filter button event listeners
showAllBtn.addEventListener('click', () => {
  cardsOnDom(students)
});

showGryffindorBtn.addEventListener('click', () => {
  const gryfStudents = filter(students, 'Gryffindor');
  cardsOnDom(gryfStudents);
})

showSlytherinBtn.addEventListener('click', () => {
  const slyStudents = filter(students, 'Slytherin');
  cardsOnDom(slyStudents);
})

showHufflepuffBtn.addEventListener('click', () => {
  const huffStudents = filter(students, 'Hufflepuff');
  cardsOnDom(huffStudents);
})

showRavenclawBtn.addEventListener('click', () => {
  const ravenStudents = filter(students, 'Ravenclaw');
  cardsOnDom(ravenStudents);
})

const app = document.querySelector('#app');
// const expelledStudents = document.querySelector('#expelledStudents')


//Delete button functionality
app.addEventListener('click', (e) =>{
  if (e.target.id.includes('delete')){

    const [, id] = e.target.id.split('--')

    const index = students.findIndex(e => e.id === Number(id));
    //Removes selected card from dom
    // students.splice(index, 1);
    students[index].house = "Expelled"

    cardsOnDom(students);
  }
})

//calls function that displays student cards on webpage
cardsOnDom(students);
// cardsOnDom(expelled);
