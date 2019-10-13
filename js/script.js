/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/

"use strict"
const studentsPerPage = 10;
const studentList = document.querySelectorAll("ul.student-list li");


function showPage(studentList, pageNumber){
   const startIndex = (pageNumber * studentsPerPage) - studentsPerPage;
   const endIndex = (pageNumber * studentsPerPage) - 1;
   
   for (let i= 0; i< studentList.length; i++){
      if (i >= startIndex && i <= endIndex ){
         studentList[i].style.display = "block";
   }else {studentList[i].style.display = "none";}
}}


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

   a.addEventListener('click', (e) => {         
      showPage(studentList, pageNumber);
      let activeAncher = document.querySelector('.active');
      activeAncher.className = "";
      e.target.className = "active";});

   if (a.textContent === '1') {a.className ="active";}

}

}

showPage(studentList, 1);
appendPageLinks(studentList);
   /*

3. Add a ul to the “pagination” div to store the pagination links
4. for every page, add li and a tags with the page number text
5. Add an event listener to each a tag. When they are clicked
call the showPage function to display the appropriate page
6. Loop over pagination links to remove active class from all links
7. Add the active class to the link that was just clicked. You can identify that
clicked link using event.target
*/




// Remember to delete the comments that came with this file, and replace them with your own code comments.