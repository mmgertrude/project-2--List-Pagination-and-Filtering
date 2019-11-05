/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

"use strict"
//document.querySelectorAll("div.pagination ul").style.display = "none"

/*Variables to store the input text  and the search `button` */
const studentSearch = document.createElement('div');
studentSearch.className = "student-search";

const button = document.createElement('button');
button.innerHTML = "Submit";
button.className = "submit";

const inputField = document.createElement("input");
inputField.type = "text";
inputField.placeholder = 'Search for students...';
inputField.className = "search";

/*append the elements to the DOM */
studentSearch.appendChild(inputField);
studentSearch.appendChild(button);

const searchDiv = document.querySelector(".page-header"); 
searchDiv.appendChild(studentSearch);


/*global variables that store the DOM elements */
const studentsPerPage = 10;
const studentList = document.querySelectorAll("ul.student-list li");

/* function showPage will hide all the students except for the ten to be displayed */
function showPage(studentList, pageNumber){
   const startIndex = (pageNumber * studentsPerPage) - studentsPerPage;
   const endIndex = (pageNumber * studentsPerPage) - 1;
   
   for (let i= 0; i< studentList.length; i++){
      if (i >= startIndex && i <= endIndex ){
         studentList[i].style.display = "block";
   }else {studentList[i].style.display = "none";}
}}


/*appendPageLinks function that creates and appends functioning pagination links. */
function appendPageLinks(studentList){
   const pagesNeeded = Math.ceil(studentList.length/studentsPerPage);
   const mainDiv = document.querySelector(".page");
   let div = document.createElement("div");
   div.className = "pagination";
   mainDiv.appendChild(div);
   
   const ul = document.createElement("ul");
   div.appendChild(ul);

   for ( let i = 1; i <= pagesNeeded; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i;
      let pageNumber = a.textContent;
      li.appendChild(a);
      div.appendChild(li);

      /* Adding "click” event listener to each pagination link */
   a.addEventListener('click', (e) => {         
      showPage(studentList, pageNumber);
      let activeAncher = document.querySelector('.active');
      activeAncher.className = "";
      e.target.className = "active";});

   if (a.textContent === '1') {a.className ="active";}
}
}

//the search function

function searchList (inputValue, studentList){
   let matchesFound = [];
   for (let i= 0; i < studentList.length; i++){
     const names = studentList[i].getElementsByTagName("h3")[0];
     
     if (inputValue.length !==0 && names.innerText.toLowerCase().includes(inputValue.toLowerCase())){
      matchesFound.push(studentList[i]);
      }else {
         studentList[i].style.display = "none";
         
      } }

      console.log(matchesFound.length)

      //the case of no results found:
    if (matchesFound.length === 0){
      const unmatched = document.createElement('p');
      unmatched.textContent = 'No Results Found';
      const noticePoint = document.querySelector('.student-list');
      const mainDiv = document.querySelector(".page");
      mainDiv.insertBefore(unmatched, noticePoint);
    }
      /*here i am setting display to none because the pagination ancher links 
      still display even when results fit just one page */
      document.getElementsByClassName("pagination")[0].style.display = "none";
   }


 /******************************************************************** */  
 /******************************************************************** */       
   /* tried to consider writing searchList as below but it does not filter out search results
         both when i comment and uncomment line 132*/ 

/*
function searchList (inputValue, studentList){
   let matchesFound = [];
   for (let i= 0; i < studentList.length; i++){
     const names = studentList[i].getElementsByTagName("h3")[0];
     
     if (inputValue.length !==0 && names.innerText.toLowerCase().includes(inputValue.toLowerCase())){
      matchesFound.push(studentList[i]);
      }else {
         studentList[i].style.display = "none";
         
      } }

      //the case of no results found:
    if (matchesFound.length === 0){
      const unmatched = document.createElement('p');
      unmatched.textContent = 'No Results Found';
      const noticePoint = document.querySelector('.student-list');
      const mainDiv = document.querySelector(".page");
      mainDiv.insertBefore(unmatched, noticePoint);
    }
    document.getElementsByClassName("pagination")[0].style.display = "none";
    //calls to show page and add links if search results are greater than 10: 
    showPage(matchesFound, 1);
    appendPageLinks(matchesFound);
   }        
*/
/******************************************************************** */  
/******************************************************************** */  

//function calls to showPage and appendPageLinks
showPage(studentList, 1);
appendPageLinks(studentList);

/* Variables to reference the search field and button */
const search = document.querySelector('.search');
const submit = document.querySelector('.submit');

//add event listeners to search field and button and shown in the project warmup
search.addEventListener('keyup', () => {
  searchList (inputField.value, studentList);});

submit.addEventListener('click', (event)=> {
   event.preventDefault();
   searchList(inputField.value, studentList);});


  
