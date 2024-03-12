//get
const wrapper = document.querySelector('.wrapper')
const len = document.getElementById('length')
async function displayNote() {
    const res = await fetch("http://localhost:3000/display")
    const notes = await res.json()
    len.innerText = notes.length + ' items left'
    notes.forEach(note => {
        const div = document.createElement('div')
        div.classList.add('todo-item')
        div.innerHTML = `<button onclick="editNote(event)" class="check" id="${note._id}">✓</button>
         <div data-comp="${note.completed}" class="item-todo-text" ">${note.createdAt.split('T')[0]} ${note.todo}</div>   
         <button onclick="deleteNote(event)" class="btn-delete" id="${note._id}">❌</button>`
        wrapper.appendChild(div)
    })
    addClass()
    activMenu()
}
displayNote()

//post
const form = document.querySelector('form')

function logSubmit(e) {
    
    e.preventDefault()
    const todo = document.querySelector('input[name="todo"]').value
    const data = {
        todo: todo,
    }
    console.log(todo);
    fetch('http://localhost:3000/save', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        
        .then(() => {
            location.reload()
        })
        .catch((error) => {
            console.error('Error:', error)
        })
        
}
form.addEventListener('submit', logSubmit)
//delete
async function deleteNote(e) {
    e.preventDefault()
    const _id = e.target.id
    await fetch(`http://localhost:3000/delete/${_id}`, {
            method: 'DELETE',
        })
        .then(() => {
            location.reload()
        })
        .catch((error) => {
            console.error('Error:', error)
        })
    
}
//delete all completed
async function deleteCompleted() {
   
    await fetch(`http://localhost:3000/delete`, {
            method: 'DELETE',
        })
        .then(() => {
            location.reload()
        })
        .catch((error) => {
            console.error('Error:', error)
        })
    
}
//completed
async function editNote(e) {
   
    if (e.target.nextElementSibling.dataset.comp == 'true') {
        toggle = false
    } else {
        toggle = true
    }
    const _id = e.target.id
    const data = {
        completed: toggle
    }
    await fetch(`http://localhost:3000/editOne/${_id}`, {
            method: 'put',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(() => {
             location.reload()
        })
        .catch((error) => {
            console.error('Error:', error)
        })
   
}

function addClass() {
    const comp = document.querySelectorAll('.item-todo-text')
    comp.forEach(item => {
        if (item.dataset.comp == 'true') {
            item.classList.add('through')
            item.parentElement.children[0].classList.add('checked')
        }
        if (item.dataset.comp == 'false') {
            item.classList.remove('through')
            item.parentElement.children[0].classList.remove('checked')
        }
    })
}

function activMenu() {
    const menuItem = document.querySelectorAll('.menu-item')
    menuItem.forEach(el => {
        el.addEventListener('click', show)
    })
}

function show(e) {
    todoItems = document.querySelectorAll('.todo-item')
    const divCheck = document.querySelectorAll('.check')
    divCheck.forEach(el => {
        if (e.target.id == 'clear') {
            deleteCompleted()
        } else if (e.target.id == 'active') {
            el.parentElement.style.display = 'flex'
            if (el.classList.contains('checked')) {
                el.parentElement.style.display = 'none'
            }
        } else if (e.target.id == 'completed') {
            el.parentElement.style.display = 'flex'
            if (!el.classList.contains('checked')) {
                el.parentElement.style.display = 'none'
            }
        } else if (e.target.id == 'all') {
            el.parentElement.style.display = 'flex'
        }
    })
}

const btnThema = document.querySelector('.thema button')

function changeThema(e) {
    const css = document.querySelector('#thema')
    if (btnThema.innerHTML == `🌙`) {
        const adress = 'dark'
        css.href = "./thema-" + adress + ".css"
        btnThema.innerHTML = `☀️`

    } else {
        css.href = "./thema-light.css"
        btnThema.innerHTML = `🌙`
    }
}
btnThema.addEventListener('click', changeThema)

