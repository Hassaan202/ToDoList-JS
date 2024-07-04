const inputTask=document.querySelector("#task");
const btn=document.querySelector("#enterButton");
const list=document.querySelector(".taskList ul");


function AddOption(){
    if (inputTask.value==""){
        alert("You must enter some task.");
    }
    else{
        let newDiv=document.createElement("div");
        newDiv.classList.add("listingRow");
        let newListElem=document.createElement("li");
        let innerImg=document.createElement("img");
        innerImg.src="unchecked.png";
        newListElem.innerText=inputTask.value;
        //add cross button
        let deleteBtn=document.createElement("span");
        deleteBtn.innerHTML="\u00d7";
        deleteBtn.classList.add("del");
        newDiv.append(deleteBtn);
        newListElem.prepend(innerImg);
        newDiv.prepend(newListElem);
        list.append(newDiv);
        saveData();
    }
    inputTask.value="";
}

function toggleCheckStatus(evt){
    // console.log("li pressed");
    if(evt.target.tagName=="LI") {
        if (evt.target.classList.contains("checked")){
            //change the image to unchecked
            evt.target.classList.toggle("checked");
            evt.target.firstChild.setAttribute("src", "unchecked.png");
        }
        else{
            evt.target.firstChild.setAttribute("src", "checked.png");
            evt.target.classList.toggle("checked");
        }
        saveData();
    }
    else if(evt.target.tagName=="IMG"){
        if (evt.target.parentElement.classList.contains("checked")){
            evt.target.setAttribute("src", "unchecked.png");
            evt.target.parentElement.classList.toggle("checked");
        }
        else{
            evt.target.setAttribute("src", "checked.png");
            evt.target.parentElement.classList.toggle("checked");
        }
        saveData();
    }
}


function deleteTask(evt){
    if (evt.target.tagName=="SPAN"){
        evt.stopPropagation();
        evt.target.parentNode.remove();
    }
    saveData();
}

const saveData=()=>{
    localStorage.setItem("data", list.innerHTML); 
}

const retieveSavedData=()=>{
    list.innerHTML=localStorage.getItem("data");
}

btn.addEventListener("click", (evt)=>{
    AddOption();
})

list.addEventListener("click", (evt)=>{
    toggleCheckStatus(evt);
});

list.addEventListener("click", (evt)=>{
    deleteTask(evt);
})

window.addEventListener("load", ()=>{
    retieveSavedData();
});
