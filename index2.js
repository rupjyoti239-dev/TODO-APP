const form = document.getElementById('form');
const taskName = document.getElementById('taskName');
const date = document.getElementById('date');
const taskDesc = document.getElementById('taskDesc');
const posts = document.getElementById('tasks');
const errorMsg = document.getElementById('emptyTaskName');
const addBtn = document.getElementById('addBtn');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formValidation()
})


const formValidation = () => {
  if (taskName.value === "") {
    errorMsg.innerHTML = "Task cannot be empty"
  }
  else {
    errorMsg.innerHTML = "";
    acceptTask();

    // close the form after accepting the data
    addBtn.setAttribute('data-bs-dismiss', "modal")
    addBtn.click();
    (() => {
      addBtn.setAttribute('data-bs-dismiss', "")
    })()


  }
}







let data = [];
const acceptTask = () => {
  data.push({
    task: taskName.value,
    date: date.value,
    taskDesc: taskDesc.value,
  });

  localStorage.setItem("data", JSON.stringify(data))
  console.log(data);

  displayTask();
}






const displayTask = () => {
  posts.innerHTML = "";
  data.map((x,y)=>{
    return (
      posts.innerHTML += ` <div id=${y}>
             <span class="fw-bold">${x.task}</span>
             <span class="text-secondary">${x.date}</span>
             <p class="fw-medium">${x.taskDesc}</p>
             <span class="options">
                <i onClick="editTask(this)" data-bs-toggle="modal" data-bs-target="#form"  class="fa-solid fa-pen-to-square text-primary"></i>
                <i onClick="deleteTask(this);displayTask()"  class="fa-solid fa-trash text-danger"></i>
             </span>
          </div>`
    )
  })
  
  restForm();
}


const deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data))
}



const editTask = (e) => {
  let selectedData = e.parentElement.parentElement;
  taskName.value = selectedData.children[0].innerHTML;
  date.value = selectedData.children[1].innerHTML;
  taskDesc.value = selectedData.children[2].innerHTML;

  deleteTask(e)
}




const restForm = () => {
  taskName.value = "";
  date.value = "";
  taskDesc.value = "";
}



(()=>{
  data = JSON.parse(localStorage.getItem("data")) || []
  // console.log(data);
  displayTask()
})()



