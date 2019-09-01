const addForm = document.querySelector('.add');
const list = document.querySelector('.todos');
const search = document.querySelector('.search input');
const del = document.querySelector('.delete');

const generateTemplate = todo => {

    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
        </li>
    `;

    list.innerHTML += html;

    saveList();
};

addForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = addForm.add.value.trim();

    if (todo.length) {
        generateTemplate(todo);
        addForm.reset();               
    }
});

loadList();

// delete todos
del.addEventListener('click', removeTodo);

const filterTodos = (term) => {
    Array.from(list.children)
        .filter((todo) => !todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.add('filtered'));
    
    Array.from(list.children)
        .filter((todo) => todo.textContent.toLowerCase().includes(term))
        .forEach((todo) => todo.classList.remove('filtered'));
};

// keyup event
search.addEventListener('keyup', () => {
    const term = search.value.trim().toLowerCase();
    filterTodos(term);
});

// set local storage 
function saveList() {
    let html = list.innerHTML;

    localStorage.setItem('list', html);
}

function loadList() {
    let html = localStorage.getItem('list');

    list.innerHTML = html;
}

function removeTodo() {
    list.innerHTML = '';

    localStorage.removeItem('list');
}
