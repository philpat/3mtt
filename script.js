// Select DOM elements
const form = document.getElementById('form');
const input = document.getElementById('input');
const todoContainer = document.getElementById('todo');

// Function to create a new todo with a Promise
const addTodo = (title) => {
    return new Promise((resolve, reject) => {
        fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                title: title,
                completed: false,
                userId: 1,
            }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }
            return response.json();
        })
        .then((data) => resolve(data)) // Resolve with the new todo data
        .catch((error) => reject(error)); // Reject with an error if any
    });
};

// Function to render the todo in the UI
const renderTodo = (todo) => {
    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-items');
    todoItem.innerHTML = `
        <p>${todo.title}</p>
        <div class="item-btn">
            <i class="fas fa-trash fa-1x"></i>
            <i class="fas fa-edit fa-1x"></i>
        </div>
    `;
    todoContainer.appendChild(todoItem);
};

// Form submit event listener
form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent page reload
    const todoTitle = input.value.trim(); // Get the input value

    if (todoTitle) {
        addTodo(todoTitle)
            .then((newTodo) => {
                renderTodo(newTodo); // Add the new todo to the UI
                input.value = ''; // Clear the input field
            })
            .catch((error) => {
                console.error('Error adding todo:', error);
                alert('Failed to add todo. Please try again.');
            });
    } else {
        alert('Please enter a todo.');
    }
});
