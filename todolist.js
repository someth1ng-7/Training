// ========================================
// BEGINNER-FRIENDLY TODO APP
// Step-by-step JavaScript code with detailed comments
// ========================================

// ========================================
// STEP 1: SETUP - DECLARE VARIABLES
// ========================================
// These are containers to store our data

// This array will hold all our tasks
let allTasks = [];

// This variable keeps track of which filter is active
// Possible values: 'all', 'completed', 'pending'
let activeFilter = 'all';

// This variable stores what the user is searching for
let searchText = '';

// ========================================
// STEP 2: GET HTML ELEMENTS
// ========================================
// We need to connect JavaScript to our HTML elements
// This way JavaScript can read from and write to the HTML

// Get the input field where user types the task
const inputTaskField = document.getElementById('taskInput');

// Get the priority dropdown (High, Medium, Low)
const inputPriority = document.getElementById('priority');

// Get the due date input field
const inputDueDate = document.getElementById('dueDate');

// Get the "Add Task" button
const buttonAdd = document.getElementById('addBtn');

// Get the list where tasks will be displayed
const taskListContainer = document.getElementById('taskList');

// Get the error message display area
const errorDisplay = document.getElementById('error');

// Get the search input field
const searchField = document.getElementById('searchInput');

// Get all filter buttons (All, Completed, Pending)
const filterButtons = document.querySelectorAll('.filterBtn');

// Get the "Clear All" button
const buttonClearAll = document.getElementById('clearBtn');

// Get the statistics display areas
const totalTasksDisplay = document.getElementById('totalTasks');
const completedTasksDisplay = document.getElementById('completedTasks');
const pendingTasksDisplay = document.getElementById('pendingTasks');

// ========================================
// STEP 3: INITIALIZE THE APP
// ========================================
// This function runs when the page first loads
// It sets up everything the app needs to work

function startApp() {
    console.log('🚀 App is starting...');
    
    // Load any saved tasks from the browser's memory
    loadTasksFromBrowserMemory();
    
    // Set up all the click and input listeners
    setupEventListeners();
    
    // Show all tasks on the screen
    displayAllTasks();
    
    // Update the numbers (total, completed, pending)
    refreshCounters();
    
    console.log('✅ App is ready!');
}

// ========================================
// STEP 4: SETUP EVENT LISTENERS
// ========================================
// Event listeners wait for the user to do something
// Then they trigger a function

function setupEventListeners() {
    console.log('Setting up event listeners...');
    
    // Listen for the "Add Task" button click
    buttonAdd.addEventListener('click', function() {
        console.log('Add button clicked');
        handleAddTask();
    });
    
    // Listen for "Enter" key in the input field
    inputTaskField.addEventListener('keypress', function(event) {
        // Check if the key pressed was "Enter"
        if (event.key === 'Enter') {
            console.log('Enter key pressed');
            handleAddTask();
        }
    });
    
    // Listen for typing in the search field
    // 'input' event fires every time the user types a character
    searchField.addEventListener('input', function(event) {
        console.log('Search text changed');
        handleSearch(event);
    });
    
    // Listen for "Clear All" button click
    buttonClearAll.addEventListener('click', function() {
        console.log('Clear All button clicked');
        handleClearAll();
    });
    
    // Listen for filter button clicks
    // We need to loop through because there are multiple filter buttons
    let buttonIndex = 0;
    while (buttonIndex < filterButtons.length) {
        // Add a click listener to each filter button
        filterButtons[buttonIndex].addEventListener('click', function(event) {
            console.log('Filter button clicked');
            handleFilter(event);
        });
        buttonIndex++;
    }
}

// ========================================
// STEP 5: ADD TASK FUNCTION
// ========================================
// This function runs when user clicks "Add Task"

function handleAddTask() {
    console.log('handleAddTask() started');
    
    // STEP 5A: Get the input values
    // trim() removes extra spaces at the beginning and end
    let taskText = inputTaskField.value.trim();
    let taskPriority = inputPriority.value;
    let taskDueDate = inputDueDate.value;
    
    console.log('Task text:', taskText);
    console.log('Task priority:', taskPriority);
    console.log('Task due date:', taskDueDate);
    
    // STEP 5B: VALIDATE - Check if task is empty
    // IF condition: Is the input empty?
    if (taskText === '') {
        // Show error message
        displayError('⚠️ Please write a task first!');
        console.log('Error: Task is empty');
        return; // Stop here, don't continue
    }
    
    // Clear any previous error messages
    errorDisplay.textContent = '';
    
    // STEP 5C: Create a task object
    // An object is like a container with properties
    let newTask = {
        // id is a unique number for each task
        // We use the current timestamp (milliseconds since 1970)
        id: Date.now(),
        
        // The task description
        text: taskText,
        
        // Is the task completed? Start as false
        isCompleted: false,
        
        // Priority level
        priority: taskPriority,
        
        // When is it due?
        dueDate: taskDueDate
    };
    
    console.log('New task created:', newTask);
    
    // STEP 5D: Add the task to our array
    allTasks.push(newTask);
    console.log('Task added to array. Total tasks:', allTasks.length);
    
    // STEP 5E: Clear all input fields
    inputTaskField.value = '';
    inputDueDate.value = '';
    inputPriority.value = 'Medium';
    console.log('Input fields cleared');
    
    // STEP 5F: Save to browser memory (so it stays after refresh)
    saveTasksToBrowserMemory();
    
    // STEP 5G: Update the display
    displayAllTasks();
    refreshCounters();
    
    console.log('✅ Task added successfully');
}

// ========================================
// STEP 6: DISPLAY TASKS
// ========================================
// This function shows all tasks on the screen

function displayAllTasks() {
    console.log('displayAllTasks() started');
    
    // STEP 6A: Clear the old task list
    // innerHTML = '' removes everything inside
    taskListContainer.innerHTML = '';
    
    // STEP 6B: Get the tasks to display (filtered + searched)
    let tasksToDisplay = getTasksToDisplay();
    
    console.log('Tasks to display:', tasksToDisplay.length);
    
    // STEP 6C: Check if there are any tasks to show
    // IF there are no tasks
    if (tasksToDisplay.length === 0) {
        // Show a "no tasks" message
        taskListContainer.innerHTML = '<li style="text-align: center; color: #999; padding: 30px;">No tasks to display 😊</li>';
        return; // Stop here
    }
    
    // STEP 6D: LOOP through each task and display it
    let taskIndex = 0;
    while (taskIndex < tasksToDisplay.length) {
        // Get the current task
        let currentTask = tasksToDisplay[taskIndex];
        
        // Create HTML elements for this task
        let taskElement = createTaskElement(currentTask);
        
        // Add the task element to the list on the page
        taskListContainer.appendChild(taskElement);
        
        console.log('Task displayed:', currentTask.text);
        
        taskIndex++;
    }
    
    console.log('✅ All tasks displayed');
}

// ========================================
// STEP 7: CREATE TASK ELEMENT
// ========================================
// This function creates the HTML for one task

function createTaskElement(task) {
    console.log('Creating element for task:', task.text);
    
    // STEP 7A: Create the main list item
    let listItem = document.createElement('li');
    
    // STEP 7B: Add priority class for styling
    // This adds a colored left border based on priority
    let priorityClass = task.priority.toLowerCase(); // 'high' or 'medium' or 'low'
    listItem.classList.add(priorityClass);
    
    // STEP 7C: Check if task is overdue
    // IF task has a due date AND it's in the past AND task is not completed
    if (isTaskOverdue(task.dueDate) && !task.isCompleted) {
        listItem.classList.add('overdue'); // Add red background
    }
    
    // STEP 7D: Check if task is completed
    // IF the task is marked as completed
    if (task.isCompleted) {
        listItem.classList.add('completed'); // Add strikethrough style
    }
    
    // STEP 7E: Create the task content (text and info)
    let contentDiv = document.createElement('div');
    contentDiv.style.flex = '1';
    
    // Create the task text
    let taskTextElement = document.createElement('span');
    taskTextElement.textContent = task.text;
    taskTextElement.style.wordBreak = 'break-word';
    
    // Create the task info (priority, due date)
    let taskInfoElement = document.createElement('small');
    taskInfoElement.style.display = 'block';
    taskInfoElement.style.color = '#666';
    taskInfoElement.style.marginTop = '5px';
    
    // Build the info text
    let infoText = 'Priority: ' + task.priority;
    
    // IF task has a due date, add it to the info
    if (task.dueDate !== '') {
        infoText = infoText + ' | Due: ' + task.dueDate;
    }
    
    taskInfoElement.textContent = infoText;
    
    // Add text and info to the content
    contentDiv.appendChild(taskTextElement);
    contentDiv.appendChild(taskInfoElement);
    
    // STEP 7F: Create the buttons container
    let buttonsDiv = document.createElement('div');
    buttonsDiv.style.display = 'flex';
    buttonsDiv.style.gap = '10px';
    
    // Create the Complete button
    let completeButton = document.createElement('button');
    completeButton.classList.add('completeBtn');
    
    // IF task is completed, show "Undo", otherwise show "Complete"
    if (task.isCompleted) {
        completeButton.textContent = '↩️ Undo';
    } else {
        completeButton.textContent = '✓ Complete';
    }
    
    // When button is clicked, call the complete function
    completeButton.addEventListener('click', function() {
        console.log('Complete button clicked for task:', task.id);
        handleCompleteTask(task.id);
    });
    
    // Create the Delete button
    let deleteButton = document.createElement('button');
    deleteButton.classList.add('deleteBtn');
    deleteButton.textContent = '🗑️ Delete';
    
    // When button is clicked, call the delete function
    deleteButton.addEventListener('click', function() {
        console.log('Delete button clicked for task:', task.id);
        handleDeleteTask(task.id);
    });
    
    // STEP 7G: Add buttons to the buttons container
    buttonsDiv.appendChild(completeButton);
    buttonsDiv.appendChild(deleteButton);
    
    // STEP 7H: Add content and buttons to the list item
    listItem.appendChild(contentDiv);
    listItem.appendChild(buttonsDiv);
    
    // Return the complete task element
    return listItem;
}

// ========================================
// STEP 8: COMPLETE/UNCOMPLETE TASK
// ========================================
// This function toggles a task between completed and pending

function handleCompleteTask(taskId) {
    console.log('handleCompleteTask() called with ID:', taskId);
    
    // STEP 8A: LOOP through all tasks to find the one with this ID
    let taskIndex = 0;
    while (taskIndex < allTasks.length) {
        let task = allTasks[taskIndex];
        
        // IF we found the task
        if (task.id === taskId) {
            // Toggle the completed status
            // ! means "NOT", so it flips true to false and false to true
            task.isCompleted = !task.isCompleted;
            
            console.log('Task completed status toggled:', task.isCompleted);
            break; // Exit the loop, we found it
        }
        
        taskIndex++;
    }
    
    // Save to browser memory
    saveTasksToBrowserMemory();
    
    // Update the display
    displayAllTasks();
    refreshCounters();
    
    console.log('✅ Task completion toggled');
}

// ========================================
// STEP 9: DELETE TASK
// ========================================
// This function removes a task from the list

function handleDeleteTask(taskId) {
    console.log('handleDeleteTask() called with ID:', taskId);
    
    // STEP 9A: LOOP through all tasks to find the one to delete
    let taskIndex = 0;
    while (taskIndex < allTasks.length) {
        let task = allTasks[taskIndex];
        
        // IF we found the task to delete
        if (task.id === taskId) {
            // Remove it from the array
            // splice(index, count) removes 'count' items starting at 'index'
            allTasks.splice(taskIndex, 1);
            
            console.log('Task removed. Remaining tasks:', allTasks.length);
            break; // Exit the loop
        }
        
        taskIndex++;
    }
    
    // Save to browser memory
    saveTasksToBrowserMemory();
    
    // Update the display
    displayAllTasks();
    refreshCounters();
    
    console.log('✅ Task deleted');
}

// ========================================
// STEP 10: SEARCH TASKS
// ========================================
// This function filters tasks based on search text

function handleSearch(event) {
    console.log('handleSearch() called');
    
    // Get the search text from the input field
    searchText = event.target.value.toLowerCase(); // Convert to lowercase for comparison
    
    console.log('Search text:', searchText);
    
    // Update the display with the filtered results
    displayAllTasks();
}

// ========================================
// STEP 11: FILTER TASKS
// ========================================
// This function handles the filter buttons (All, Completed, Pending)

function handleFilter(event) {
    console.log('handleFilter() called');
    
    // STEP 11A: Get which filter button was clicked
    // data-filter attribute contains 'all', 'completed', or 'pending'
    activeFilter = event.target.getAttribute('data-filter');
    
    console.log('Active filter changed to:', activeFilter);
    
    // STEP 11B: Update the button styling
    // Make all buttons normal color first
    let buttonIndex = 0;
    while (buttonIndex < filterButtons.length) {
        filterButtons[buttonIndex].style.background = '#6c63ff';
        buttonIndex++;
    }
    
    // Make the clicked button darker
    event.target.style.background = '#4a44b8';
    
    // STEP 11C: Update the display
    displayAllTasks();
    
    console.log('✅ Filter applied');
}

// ========================================
// STEP 12: GET TASKS TO DISPLAY
// ========================================
// This function returns only the tasks that match the current filter and search

function getTasksToDisplay() {
    console.log('getTasksToDisplay() called');
    
    // STEP 12A: First, filter by status (All, Completed, Pending)
    let filteredByStatus = [];
    
    let taskIndex = 0;
    while (taskIndex < allTasks.length) {
        let task = allTasks[taskIndex];
        let shouldInclude = false;
        
        // IF/ELSE: Check which filter is active
        if (activeFilter === 'all') {
            // Include all tasks
            shouldInclude = true;
        } else if (activeFilter === 'completed') {
            // Include only completed tasks
            shouldInclude = task.isCompleted === true;
        } else if (activeFilter === 'pending') {
            // Include only uncompleted tasks
            shouldInclude = task.isCompleted === false;
        }
        
        // IF this task should be included
        if (shouldInclude) {
            filteredByStatus.push(task);
        }
        
        taskIndex++;
    }
    
    console.log('Tasks after status filter:', filteredByStatus.length);
    
    // STEP 12B: Then, filter by search text
    let finalList = [];
    
    taskIndex = 0;
    while (taskIndex < filteredByStatus.length) {
        let task = filteredByStatus[taskIndex];
        
        // Convert task text to lowercase to compare with search text
        let taskTextLower = task.text.toLowerCase();
        
        // IF the task text includes the search text
        if (taskTextLower.includes(searchText)) {
            // Add it to our final list
            finalList.push(task);
        }
        
        taskIndex++;
    }
    
    console.log('Tasks after search filter:', finalList.length);
    
    return finalList;
}

// ========================================
// STEP 13: UPDATE COUNTERS
// ========================================
// This function updates the numbers (Total, Completed, Pending)

function refreshCounters() {
    console.log('refreshCounters() called');
    
    // STEP 13A: Count total tasks
    let totalCount = allTasks.length;
    
    // STEP 13B: Count completed tasks using a LOOP
    let completedCount = 0;
    
    let taskIndex = 0;
    while (taskIndex < allTasks.length) {
        let task = allTasks[taskIndex];
        
        // IF task is completed
        if (task.isCompleted === true) {
            completedCount++; // Increase the counter by 1
        }
        
        taskIndex++;
    }
    
    // STEP 13C: Calculate pending tasks
    let pendingCount = totalCount - completedCount;
    
    // STEP 13D: Update the HTML to show the numbers
    totalTasksDisplay.textContent = totalCount;
    completedTasksDisplay.textContent = completedCount;
    pendingTasksDisplay.textContent = pendingCount;
    
    console.log('Counters updated - Total:', totalCount, 'Completed:', completedCount, 'Pending:', pendingCount);
}

// ========================================
// STEP 14: CLEAR ALL TASKS
// ========================================
// This function deletes all tasks after asking for confirmation

function handleClearAll() {
    console.log('handleClearAll() called');
    
    // STEP 14A: Check if there are any tasks
    if (allTasks.length === 0) {
        displayError('No tasks to clear! 😊');
        return;
    }
    
    // STEP 14B: Ask for confirmation
    // confirm() shows a dialog with OK and Cancel buttons
    let userConfirmed = confirm('Are you sure you want to delete ALL tasks? This cannot be undone! ⚠️');
    
    // STEP 14C: IF user clicked OK
    if (userConfirmed === true) {
        // Clear the array
        allTasks = [];
        
        // Clear search and filter
        searchText = '';
        activeFilter = 'all';
        searchField.value = '';
        
        console.log('All tasks cleared');
        
        // Save to browser memory
        saveTasksToBrowserMemory();
        
        // Update the display
        displayAllTasks();
        refreshCounters();
        
        // Clear error message
        errorDisplay.textContent = '';
        
        console.log('✅ All tasks deleted');
    } else {
        console.log('User cancelled clear operation');
    }
}

// ========================================
// STEP 15: DISPLAY ERROR MESSAGE
// ========================================
// This function shows error messages to the user

function displayError(message) {
    console.log('Error message:', message);
    
    // Show the error message
    errorDisplay.textContent = message;
    
    // After 3 seconds, clear the error message
    // setTimeout runs a function after a delay (in milliseconds)
    setTimeout(function() {
        errorDisplay.textContent = '';
        console.log('Error message cleared');
    }, 3000);
}

// ========================================
// STEP 16: CHECK IF TASK IS OVERDUE
// ========================================
// This function checks if a task's due date has passed

function isTaskOverdue(dueDate) {
    // IF there's no due date set
    if (dueDate === '' || dueDate === null) {
        return false; // Not overdue
    }
    
    // Get today's date
    let todayDate = new Date();
    todayDate.setHours(0, 0, 0, 0); // Set time to start of day
    
    // Get the task's due date
    let taskDueDate = new Date(dueDate);
    taskDueDate.setHours(0, 0, 0, 0); // Set time to start of day
    
    // IF due date is before today
    if (taskDueDate < todayDate) {
        return true; // Task is overdue
    }
    
    return false; // Task is not overdue
}

// ========================================
// STEP 17: SAVE TO BROWSER MEMORY
// ========================================
// This function saves tasks to Local Storage so they stay after refresh

function saveTasksToBrowserMemory() {
    console.log('Saving tasks to browser memory...');
    
    // Convert the array of objects to a JSON string
    // JSON is a format for storing data
    let tasksAsJSON = JSON.stringify(allTasks);
    
    // Save to Local Storage
    // localStorage is the browser's memory
    // It saves data with a key name
    localStorage.setItem('savedTasks', tasksAsJSON);
    
    console.log('✅ Tasks saved to browser memory');
}

// ========================================
// STEP 18: LOAD FROM BROWSER MEMORY
// ========================================
// This function loads tasks from Local Storage when the page starts

function loadTasksFromBrowserMemory() {
    console.log('Loading tasks from browser memory...');
    
    // Get the saved data from Local Storage
    let tasksAsJSON = localStorage.getItem('savedTasks');
    
    // IF there is saved data
    if (tasksAsJSON !== null) {
        // Convert from JSON string back to an array of objects
        allTasks = JSON.parse(tasksAsJSON);
        console.log('✅ Tasks loaded from browser memory. Count:', allTasks.length);
    } else {
        // IF there's no saved data, start with empty array
        allTasks = [];
        console.log('No saved tasks found. Starting fresh.');
    }
}

// ========================================
// STEP 19: START THE APP
// ========================================
// This runs when the page finishes loading

// The DOMContentLoaded event waits until the HTML is fully loaded
// Then it runs our startApp function
document.addEventListener('DOMContentLoaded', function() {
    console.log('Page loaded. Starting app...');
    startApp();
});

// ========================================
// QUICK REFERENCE
// ========================================
// Functions called when user interacts:
// - handleAddTask() - when "Add Task" clicked or Enter pressed
// - handleCompleteTask() - when "Complete" button clicked
// - handleDeleteTask() - when "Delete" button clicked
// - handleSearch() - when search input changes
// - handleFilter() - when filter button clicked
// - handleClearAll() - when "Clear All" button clicked
//
// Functions that update display:
// - displayAllTasks() - shows tasks on page
// - refreshCounters() - updates the numbers
// - createTaskElement() - creates HTML for one task
//
// Functions that manage data:
// - saveTasksToBrowserMemory() - saves to Local Storage
// - loadTasksFromBrowserMemory() - loads from Local Storage
//
// Helper functions:
// - isTaskOverdue() - checks if task is past due date
// - displayError() - shows error messages
// - getTasksToDisplay() - filters and searches tasks