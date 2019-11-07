/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

"use strict"
//document.querySelectorAll("div.pagination ul").style.display = "none"

/*Variables to store elements created and those selected from the DOM */
const studentSearch = document.createElement('div');
const button = document.createElement('button');
const unmatched = document.createElement('p');
const inputField = document.createElement("input");
const searchDiv = document.querySelector(".page-header"); 
const mainDiv = document.querySelector(".page");
const noticePoint = document.querySelector('.student-list');



/*global variables for students' list and pages  */
const studentsPerPage = 10;
const studentList = document.querySelectorAll("ul.student-list li");

studentSearch.className = "student-search";
button.innerHTML = "Submit";
button.className = "submit";
inputField.type = "text";
inputField.placeholder = 'Search for students...';
inputField.className = "search";
unmatched.textContent = 'No Results Found';
unmatched.style.display = "none";

/*append the elements to the DOM */
studentSearch.appendChild(inputField);
studentSearch.appendChild(button);
searchDiv.appendChild(studentSearch);
mainDiv.insertBefore(unmatched, noticePoint);

/* function showPage will hide all the students except for the ten to be displayed */
function showPage(studentList, pageNumber){
   const startIndex = (pageNumber * studentsPerPage) - studentsPerPage;
   const endIndex = (pageNumber * studentsPerPage) - 1;
   
   for (let i= 0; i< studentList.length; i++){
      if (i >= startIndex && i <= endIndex )
         {
            studentList[i].style.display = "block";
         } else 
            {studentList[i].style.display = "none";}
}}


/*appendPageLinks function that creates and appends functioning pagination links. */
function appendPageLinks(studentList){
   const pagesNeeded = Math.ceil(studentList.length/studentsPerPage);
   let div = document.createElement("div");
   div.className = "pagination";
   mainDiv.appendChild(div);
   
   const ul = document.createElement("ul");
   div.appendChild(ul);

   //append ancher links to pages
   for (let i = 1; i <= pagesNeeded; i++) {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.textContent = i;
      let pageNumber = a.textContent;
      li.appendChild(a);
      ul.appendChild(li);
      

      /* Adding "click” event listener to each pagination link */
   a.addEventListener('click', (e) => {         
      showPage(studentList, pageNumber);
      let activeAncher = document.querySelector('.active');
      activeAncher.className = "";
      e.target.className = "active";});

   if (a.textContent === '1') {a.className ="active";}
}
}

//function calls to showPage() and appendPageLinks()
showPage(studentList, 1);
appendPageLinks(studentList);

//the search function: Finds a student name that matches input search text
function searchList (inputValue, studentList){
   let matchesFound = [];
   for (let i= 0; i < studentList.length; i++)
      {
      const names = studentList[i].getElementsByTagName("h3")[0];
      
      if (inputValue.length !==0 && names.innerText.toLowerCase().includes(inputValue.toLowerCase()))
         {
            matchesFound.push(studentList[i]);
            studentList[i].style.display = "block";
         }
      else 
         {studentList[i].style.display = "none";}   
      }
      //the case of no results found: Display notification
    if (matchesFound.length === 0){
       unmatched.style.display = "block";}
      
   return matchesFound;
   }

/* Variables to reference the search field and button */
const search = document.querySelector('.search');
const submit = document.querySelector('.submit');

/*add event listeners to search field and button 
as shown in the project warmup */
search.addEventListener('keyup', () => {
   
   //dont display previous page ancher links:
   let anchers = document.querySelectorAll("li > a");
   for (let i= 0; i < anchers.length; i++)
   {anchers[i].style.display = "none";}

   let searchResults = searchList (inputField.value, studentList);
   showPage(searchResults,1);
   appendPageLinks(searchResults);
});

submit.addEventListener('click', (event)=> {
   event.preventDefault();
   //dont display previous page ancher links:
   let anchers = document.querySelectorAll("li > a");
   for (let i= 0; i < anchers.length; i++)
   {anchers[i].style.display = "none";}

   let searchResults = searchList (inputField.value, studentList);
   showPage(searchResults,1);
   appendPageLinks(searchResults);
});


  
