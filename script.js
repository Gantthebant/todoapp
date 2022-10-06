const form = document.querySelector('form');
const input = document.querySelector('input');
const todoList = document.querySelector('.todo');

function notification(message, type) {
    const container = document.createElement('div');
    container.classList.add('alert', `alert-${type}`);

    const alerMessage = message;
    container.innerText = alerMessage;

    setTimeout(() => {
        container.remove();
    }, 2000);

    return container;
}

function editTodo(text, editButton) {
    if(editButton.innerText.toLocaleLowerCase() === 'edit') {
        text.removeAttribute('readonly');
        text.focus();
        editButton.innerText = 'Save';
    } else {
        text.setAttribute('readonly', 'readonly');
        editButton.innerText = 'Edit';
        todoList.prepend(notification(`Edited '${text.value}'`, 'secondary'));
    }
}

function createTodo(input) {
    const container = document.createElement('div');
    container.classList.add('input-group', 'mb-3', 'gy-1');

    const text = document.createElement('input');
    text.setAttribute('type', 'text');
    text.setAttribute('readonly', 'readonly');
    text.classList.add('form-control');
    text.value = input;
    
    const editButton = document.createElement('button');
    editButton.innerText = 'Edit';
    editButton.classList.add('btn', 'btn-secondary');
    const deleteButton = document.createElement('button');
    deleteButton.classList.add('btn', 'btn-danger');
    deleteButton.innerText = 'Delete';

    editButton.addEventListener('click', () => {
        editTodo(text, editButton);
    })
    deleteButton.addEventListener('click', () => {
        container.remove();
        todoList.prepend(notification(`Delete task '${text.value}'`, 'danger'));
    })
    
    container.appendChild(text);
    container.appendChild(editButton);
    container.appendChild(deleteButton);
    return container;
}

function validateEmptyInput(input) {
    if(!input) {
        todoList.prepend(notification('No Input!', 'danger'));
        return false;
    }
    return true;
}

function validateMinimumLenght(input) {
    if(input.length < 4) {
        todoList.prepend(notification('Less Than 5 Characters', 'danger'));
        return false;
    }
    return true;
}

function validateNumbersOnly(input) {
    if(+input) {
        todoList.prepend(notification('No Number Only!', 'danger'));
        return false;
    }
    return true;
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const todoTask = validateEmptyInput(input.value) && 
                     validateMinimumLenght(input.value) &&
                     validateNumbersOnly(input.value) &&
                     createTodo(input.value);

    if(todoTask) {
        todoList.appendChild(todoTask);
        todoList.prepend(notification(`Created a task`, 'success'));
    }

    input.value = '';
    input.focus();
});
