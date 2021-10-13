let btn1 = document.getElementById("btn1");
let input = document.getElementById("input");
shownotes();

btn1.addEventListener('click', function (e) {
    let notes = localStorage.getItem('notes');
    if (notes === null) {
        notesarray = [];
    }
    else {
        notesarray = JSON.parse(notes);
    }
    //code to not permit people to add empty notes
    if (input.value == null || input.value == "") {
    }
    else {

      notesarray.push(input.value);
      input.value = "";
      localStorage.setItem('notes', JSON.stringify(notesarray));
      console.log(notesarray);
      shownotes();
    }
})
//function to show notes
function shownotes() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesarray = [];
    }
    else {
        notesarray = JSON.parse(notes);
    }
    let html = " ";
    let noteselement = document.getElementById("notesEle");
    localStorage.setItem('notes', JSON.stringify(notesarray));
    notesarray.forEach( function (element, index) {
        
            html += `
            <div class="cardnotes my-4 mx-2 border border-dark" style="width: 24rem;">
        <div class="card-body">
          <h5 class="card-title"> Note ${index + 1} </h5>
          <p class="card-text"> ${element} </p>
          <button  id="${index}" onclick="deletenote(this.id)" class="btn btn-primary">Delete Note</button>
          <button  id="${index}" onclick="editnote(this.id)" class="btn btn-primary mx-4.5 delbtn">Edit Note</button>
        </div> 
      </div>
            `
          })
            if (notesarray.length != 0) {

            noteselement.innerHTML = html; 
        } 

        
        else {
            noteselement.innerHTML = ` <div class="cardnotes my-4 mx-2" style="width: 18rem;">
            <div class="card-body">
              <h5 class="card-title"> No Notes </h5>
              <p class="card-text"> No Notes To Display... add one to get started</p>
            </div>
          </div>  `

        }

}

//function to delete notes
function deletenote(index) {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
      notesarray = [];
  }
  else {
      notesarray = JSON.parse(notes);
  }
  notesarray.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notesarray));
  shownotes();
  console.log(notesarray.length, index);
}
// function to search notes using event listner

let search = document.getElementById('search');
search.addEventListener('input', function () {
  
  let card = document.getElementsByClassName('cardnotes');
  let cardA = Array.from(card);
  
  cardA.forEach(function (element) {
    // console.log(element);
    let cardtxt = element.getElementsByClassName("card-text")[0].innerText;
    // console.log(cardtxt);
    let searchVal = document.getElementById('search').value.toLowerCase();
    if (searchVal == null || searchVal == "") {
      shownotes();
         }
   else if(cardtxt.includes(searchVal) == false) {
      element.style.display = "none";
      // console.log(cardtxt)
    }
    else if(cardtxt.includes(searchVal) == true) {
console.log(cardtxt);
    }
    else {
      
    }
  })
})
// function to delete all notes
let deleteallnotes = document.getElementById("btn4");
deleteallnotes.addEventListener('click', function (e){
  let notes = localStorage.getItem('notes');
  if (notes == null) {
      notesarray = [];
  }
  else {
      notesarray = JSON.parse(notes);
  }
  notesarray.splice(0, notesarray.length);
  localStorage.setItem("notes", JSON.stringify(notesarray));
  shownotes();
})

//function to edit note
function editnote (index) {
  let notes = localStorage.getItem('notes');
  if (notes == null) {
      notesarray = [];
  }
  else {
      notesarray = JSON.parse(notes);
  }

 input.value = notesarray[index];
 deletenote(index);
}
 