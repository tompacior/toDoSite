
(function () {

    "use strict"

    let title = null;
    let text = null;
    let toDoItems = null;
    let addForm = null;
    let searchForm = null;
    let searchWord = null;
    let refreshButton = null;

    document.addEventListener('DOMContentLoaded', function (e) {
        title = document.querySelector(".toDoNew__input");
        text = document.querySelector(".toDoNew__textarea");
        toDoItems = document.querySelector(".toDoItems");
        addForm = document.querySelector(".toDoNew");
        searchForm = document.querySelector(".toDoSearch");
        searchWord = document.querySelector(".toDoSearch__input");
        refreshButton = document.querySelector(".toDoWorks__btn");

        function refresh() {
            let refreshTask = new Task();
            while (toDoItems.firstChild) {
                toDoItems.removeChild(toDoItems.firstChild);
            };
            refreshTask.GET("");
        };
        refresh();

        addForm.addEventListener("submit", function (event) {
            event.preventDefault();
            console.log("Pobrane dane z DOM: ", title.value, " Text: ", text.value);
            let newTask = new Task();
            if (newTask.validate(title.value, text.value)) {
                while (toDoItems.firstChild) {
                    toDoItems.removeChild(toDoItems.firstChild);
                };
                newTask.POST();
                title.value = "";
                text.value = "";
            } else {
                alert("Wpisz poprawne dane!");
            };
        });

        searchForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let searchTask = new Task();
            console.log("Szukaj: ", searchWord.value);
            if (searchWord.value !== "") {
                while (toDoItems.firstChild) {
                    toDoItems.removeChild(toDoItems.firstChild);
                };
                searchTask.GET(`?q=${searchWord.value}`);
            }
        });
        refreshButton.addEventListener("click", refresh);

        document.addEventListener("click", function(element){
            if(element.target.className === "task__clean-btn"){
                console.log("Usuwam zadanie: ",element.srcElement.id);
                let deleteTask = new Task();
                deleteTask.DELETE(`/${element.srcElement.id}`);
                refresh();
            };
        });

    });

    function Task() {
        this.myRequest = "http://localhost:3000/toDoTask";
        this.jsonObject = {
            title: "",
            text: "",
            id: 0
        };
    };
    Task.prototype.validate = function (title, text) {
        console.log("uruchomiona  Validate");
        if (title === "" & text === "") {
            return false;
        };
        this.jsonObject.title = title;
        this.jsonObject.text = text;
        return true;
    };
    Task.prototype.addTask = function (elem) {
        this.jsonObject.title = elem.title;
        this.jsonObject.text = elem.text;
        this.jsonObject.id = elem.id;

        //////task ///////////
        let task = document.createElement("article");
        task.classList.add("task");
        task.id = this.jsonObject.id;
        let header = document.createElement("div");
        header.classList.add("task__header");
        let textArea = document.createElement("div");
        textArea.classList.add("task__text");
        let clearBoth = document.createElement("div");
        clearBoth.classList.add("task__clear-both");
        //console.log(task);
        task.appendChild(header);
        task.appendChild(clearBoth);
        task.appendChild(textArea);
        toDoItems.appendChild(task);

        ////// task title ///////////
        let title = document.createElement("div");
        title.classList.add("task__title");
        let head3 = document.createElement("h3");
        let titleNode = document.createTextNode(this.jsonObject.title);
        head3.appendChild(titleNode);
        title.appendChild(head3);

        /////button delete ////
        let deleteText = "Usuń";
        let clean = document.createElement("div");
        clean.classList.add("task__clean");
        let clean_btn = document.createElement("button");
        clean_btn.classList.add("task__clean-btn");
        clean_btn.id = this.jsonObject.id;
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
        let nodeText = document.createTextNode(this.jsonObject.text);
        paragrah.appendChild(nodeText);


        /////// Add all to Task /////////
        header.appendChild(title);
        header.appendChild(clean);
        header.appendChild(time);
        header.appendChild(date);
        textArea.appendChild(paragrah);

        console.log("Finish task - AddTask");
    };
    Task.prototype.POST = function () {
        fetch(this.myRequest, {
            method: "post",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify(this.jsonObject)
        })
            .then(res =>
                res.json())
            .then(res => {
                console.log("We send:");
                console.log(res);
                this.GET("");
            });
    };
    Task.prototype.DELETE = function (number) {
        fetch(this.myRequest + number,{
            method: "delete"
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    return Promise.reject(resp);
                }
            })
            .then(resp => {
                console.log("Respond GET: ", resp);
            })
            .catch(error => {
                if (error.status === 404) {
                    console.log("Error: 404 Not Found");
                } else if (error.status === 400) {
                    console.log("Error: 400 Bad Request! Incorrect request ups...");
                } else {
                    console.log("Other error: ", error.status);
                }
            });
    };
    Task.prototype.GET = function (httpRequest) {
        fetch(this.myRequest + httpRequest)
            .then(resp => {
                if (resp.ok) {
                    return resp.json();
                } else {
                    return Promise.reject(resp);
                }
            })
            .then(resp => {
                console.log("Respond GET: ", resp);
                for (let i = 0; i < resp.length; i++) {
                    this.addTask(resp[i]);
                };
            })
            .catch(error => {
                if (error.status === 404) {
                    console.log("Error: 404 Not Found");
                } else if (error.status === 400) {
                    console.log("Error: 400 Bad Request! Incorrect request ups...");
                } else {
                    console.log("Other error: ", error.status);
                }
            });
    };
}());