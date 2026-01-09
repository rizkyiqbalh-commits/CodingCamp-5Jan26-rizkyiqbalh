// Temporary Storage for Todo Items
let actionMode = false;     // true = tampilkan checkbox
let selectedTodos = [];    // index todo yang dipilih

// Array to hold todo items
let todos = [];

// Function to Add Todo Item
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoDate = document.getElementById('todo-date');

    if (todoInput.value === '' || todoDate.value === '') {
        alert('Please fill in both the todo item and the date.');
    } else {
        const newTodo = {
            task: todoInput.value,
            date: todoDate.value
        };

        // Add the new todo to the todos array
        todos.push(newTodo);

        renderTodos();

        // Clear input fields
        todoInput.value = '';
        todoDate.value = '';
    }
}

/// Function to render todo items to the DOM
function renderTodos() {
    const todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    todos.forEach((todo, index) => {
        todoList.innerHTML += `
        <li class="flex items-center justify-between
                   px-4 py-3 rounded-lg mb-3
                   bg-black/30 border border-cyan-400
                   ${todo.completed ? 'opacity-50 line-through' : 'text-white'}">

          <div class="flex items-center gap-3">
            
            ${actionMode ? `
              <input type="checkbox"
                     onchange="toggleSelect(${index})"
                     class="w-5 h-5 accent-cyan-400"/>
            ` : ''}

            <span class="text-lg font-semibold">
              ${todo.task}
              <span class="text-sm text-cyan-300 ml-2">
                (${todo.date})
              </span>
            </span>
          </div>

        </li>`;
    });

    renderActionButtons();
}

// Function to Remove All Todo Items
function removeAllTodo() {
    todos = [];

    // Re-Render the empty list
    renderTodos();
}

// Function to Filter Todo Items
function filterTodo() { }

// Function to Toggle Action Mode
function toggleActionMode() {
    actionMode = !actionMode;
    selectedTodos = [];
    renderTodos();
}

// Function to Toggle Select Todo Item
function toggleSelect(index) {
    if (selectedTodos.includes(index)) {
        selectedTodos = selectedTodos.filter(i => i !== index);
    } else {
        selectedTodos.push(index);
    }

    renderActionButtons(); 
}

// Function to Render Action Buttons
function renderActionButtons() {
    const container = document.getElementById("action-buttons");
    container.innerHTML = '';

    if (actionMode && selectedTodos.length > 0) {
        container.innerHTML = `
          <button onclick="markDone()"
            class="bg-green-500 text-white px-4 py-2 rounded-lg">
            Done
          </button>

          <button onclick="clearSelected()"
            class="bg-red-500 text-white px-4 py-2 rounded-lg">
            Clear
          </button>
        `;
    }
}

// Function to Mark Selected Todos as Done
function markDone() {
    selectedTodos.forEach(index => {
        todos[index].completed = true;
    });

    selectedTodos = [];
    actionMode = false;
    renderTodos();
}

// Function to Clear Selected Todos
function clearSelected() {
    todos = todos.filter((_, index) => !selectedTodos.includes(index));

    selectedTodos = [];
    actionMode = false;
    renderTodos();
}