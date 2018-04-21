//To Do App
$(document).ready(function() {
    localStorage.setItem("taskCount", 0);

    //start of clock
    var myVar = setInterval(myTimer, 1000);
    function myTimer() {
        var d = new Date();
        document.getElementById("time").innerHTML = d.toLocaleTimeString();
    }
    //end of clock
});

//Adding New Task , flag=0
function add() {
    var subject = document.getElementById("subject");
    var description = document.getElementById("description");
    createNewCard(subject, description, 0);
}

// Create the Task with subject,description,flag parameters
//flag==0 -> New Task
//flag==1 -> Update task
function createNewCard(subject, description, flag) {

    if (flag == 0) {
        var taskCount = localStorage.getItem("taskCount");
        taskCount++;
        localStorage.setItem("taskCount", taskCount);
    }

    var d = new Date();
    d.toLocaleTimeString();
    var month = d.getMonth() + 1;
    var date = d.getDate() + "/" + month + "/" + d.getFullYear();
    var li = document.createElement("LI");

    var cardDiv = document.createElement("div");
    cardDiv.setAttribute("id", subject.value);
    cardDiv.className = "card";
    var cardHeader = document.createElement("div");
    cardHeader.className = "card-header heading";
    var cardBody = document.createElement("div");
    var cardFooter = document.createElement("div");

    cardBody.className = "card-body";
    cardFooter.className = "footer";

    var deleteBtn = document.createElement("BUTTON");
    deleteBtn.setAttribute("class", "btn btn-danger col-xs-2");
    var deleteBtnText = document.createTextNode("Delete");
    deleteBtn.appendChild(deleteBtnText);



    var editBtn = document.createElement("BUTTON");
    editBtn.setAttribute("class", "btn btn-info col-xs-2");
    editBtn.setAttribute("data-toggle", "modal");
    editBtn.setAttribute("data-target", "#updateModal");
    var editBtnText = document.createTextNode("Edit");
    editBtn.appendChild(editBtnText);

    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");
    checkbox.className = "col-sm-2 checkbox-gap";


    var headerText = document.createTextNode(subject.value);
    var bodyText = document.createTextNode(description.value);
    cardDiv.appendChild(cardHeader);

    cardHeader.appendChild(checkbox);
    cardHeader.appendChild(headerText);
    $(cardHeader).append("<span class='badge badge-secondary badge-gap'>" +
        localStorage.getItem("taskCount") + "</span>");
    cardDiv.appendChild(cardBody);
    cardBody.appendChild(bodyText);
    cardDiv.appendChild(cardFooter);
    cardFooter.appendChild(deleteBtn);
    cardFooter.appendChild(editBtn);
    $(cardFooter).append("<span class='date-gap'>" + date + "<span>");

    var incompleteList = document.getElementById("incompleteList");
    var completedList = document.getElementById("completedlist");

    if (subject.value === "") {
        alert("You should enter the subject!")
    } else {


        li.appendChild(cardDiv);
        if (flag == 1) {
            completedlist.appendChild(li);
            checkbox.setAttribute("checked", true);
        } else {
            incompleteList.appendChild(li);
        }
        subject.value = "";
        description.value = "";

        checkbox.onclick = function() {
            if (this.checked == true) {
                completedList.appendChild(li);
            }
            if (this.checked == false) {
                incompleteList.appendChild(li);
            }
        }


        deleteBtn.onclick = function() {
            var li = this.parentNode;
            var ul = li.parentNode;
            var li1 = ul.parentNode;
            li1.removeChild(ul);
            ul.removeChild(li);
        }


        editBtn.onclick = function() {
            var cardFooter = this.parentNode;
            var cardDiv = cardFooter.parentNode;

            var c = cardDiv.childNodes;
            var todoId = c[0].innerText;
            var todoId = todoId.substring(0, todoId.length-2);

            document.getElementById("newSubject").value = todoId;
            document.getElementById("newDescription").value = c[1].innerText;

            localStorage.setItem("newTodoId", todoId);

        }


        //Start of styling
        deleteBtn.style.margin = "10px 10px 10px 20px";

        //End of stying


    }

}

function update() {
    var todoId = localStorage.getItem("newTodoId");

    var element = document.getElementById(todoId);
    element.parentNode.removeChild(element);

    var newSubject = document.getElementById("newSubject");
    var newDescription = document.getElementById("newDescription");

    createNewCard(newSubject, newDescription, 1);

}

//End of todo app coding
