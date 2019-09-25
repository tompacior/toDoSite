
(function(){

    "use strict"
    let arrayList  = [];

    let addButton = document.querySelector(".toDoNew__btn");
    addButton.addEventListener("click", function(event){
        event.preventDefault();
        let title = document.querySelector(".toDoNew__input").value;
        let text = document.querySelector(".toDoNew__textarea").value;
        let newTask = new Task();
        newTask.validate(title, text);
        newTask.addTask();

        arrayList.push(newTask);
    });

    function Task(){
        this.title = "";
        this.text = "";
    }
    Task.prototype.validate = function(title, text){
        console.log("uruchomiona  Validate");
        this.title = title;
        this.text = text;
    }
    Task.prototype.addTask = function(){
        console.log("uruchomiona  AddTask");

        //////task ///////////
        let toDoItem = document.querySelector(".toDoItem");
        console.log(toDoItem);
        let task = document.createElement("article");
            task.classList.add("task");
        let header = document.createElement("div");
            header.classList.add("task__header");
        let textArea = document.createElement("div");
            textArea.classList.add("task__text");
        let clearBoth = document.createElement("div");
            clearBoth.classList.add("task__clear-both");
        console.log(task);
        task.appendChild(header);
        task.appendChild(clearBoth);
        task.appendChild(textArea);
        toDoItem.appendChild(task);

        ////// task title ///////////
        let title = document.createElement("div");
            title.classList.add("task__title");
        let head3 = document.createElement("h3");
        let titleNode = document.createTextNode(this.title);
        head3.appendChild(titleNode);
        title.appendChild(head3);

        /////Delete button ////
        let deleteText = "Usuń";
        let clean = document.createElement("div");
            clean.classList.add("task__clean");
        let clean_btn = document.createElement("button");
            clean_btn.classList.add("task__clean-btn");
        let deleteNode = document.createTextNode(deleteText);
        clean_btn.appendChild(deleteNode);
        clean.appendChild(clean_btn);

        //////task  Date and time ////////////
        let newDate = new Date();
        let date = document.createElement("div");
            date.classList.add("task__date");
        let dateNode = document.createTextNode(`${newDate.getDate()}.${newDate.getMonth() + 1}.${newDate.getFullYear()}`);
        date.appendChild(dateNode);

        let time = document.createElement("div");
            time.classList.add("task__time");
        let timeNode = document.createTextNode(`${newDate.getHours()}:${newDate.getMinutes()}`);
        time.appendChild(timeNode);

        ////// task text ///////////
        let paragrah = document.createElement("P");
        let nodeText = document.createTextNode(this.text);
        paragrah.appendChild(nodeText);


        /////// Add all to Task
        header.appendChild(title);
        header.appendChild(clean);
        header.appendChild(time);
        header.appendChild(date);
        textArea.appendChild(paragrah);

        console.log(" powinno działać");
    }
}());



/*
let tom = document.querySelector(".para");
let search = document.querySelector(".search");
let button = document.querySelector(".button");
let myRespond = "";

button.addEventListener("click", elem =>{
    tom.innerHTML = "";
    let httpRequest = "https://www.googleapis.com/books/v1/volumes?q=";
    httpRequest += search.value;
    console.log("Request: ", httpRequest);
    console.log(search.value);
    searchBooks(httpRequest);
})
console.log(tom);
console.log();

function addRespond(element){
    myRespond = "";
    console.log(element);
    myRespond += `Title: ${element.volumeInfo.title}\<br\> `;
    myRespond += ` Authors: ${element.volumeInfo.authors[0]} \<br\>`;
    myRespond += ` Liczba stron: ${element.volumeInfo.pageCount} \<br\>`;
    myRespond += ` Link do książki: ${element.volumeInfo.infoLink} \<br\>`;
    myRespond += ` Dostępne w PDF: ${element.accessInfo.pdf.isAvailable} \<br\>`;
    tom.innerHTML += myRespond + "<br>";
}

const object ={
    name: "Romek",
    surname: "Ruuuudkowski",
}

function searchBooks(myRequest){
    fetch(myRequest)
    .then(resp => {
        if (resp.ok) {
            return resp.json()
        } else {
            return Promise.reject(resp)
        }
    })
    .then(resp => {
        console.log(resp.items);
        [1,2].forEach.call(resp.items, elem => addRespond(elem))
    })
    .catch(error => {
        if (error.status === 404) {
            console.log("Błąd: żądany adres nie istnieje",);
        }else if(error.status === 400) {
            console.log("400 Bad Request! Nieprawidłowe zapytanie ups...",);
        }
    });
}

*/