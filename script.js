// Get elements
const titleInput = document.getElementById('title');
const amountInput = document.getElementById('amount');
const addBtn = document.getElementById('addBtn');
const expenseList = document.getElementById('expenseList');
const totalAmount = document.getElementById('totalAmount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let editIndex = null;


// Render existing expenses on page load
window.addEventListener('DOMContentLoaded', renderExpenses);

// Add expense
addBtn.addEventListener('click', () => {
    const title = titleInput.value.trim();
    const amount = parseFloat(amountInput.value.trim());

    if(title === "" || isNaN(amount) || amount <= 0){
        alert("Please enter a valid title and amount");
        return;
    }

    if(editIndex !== null){
        // Update existing expense
        expenses[editIndex] = { title, amount };
        editIndex = null;
        addBtn.textContent = "Add Expense";
    } else {
        // Add new expense
        expenses.push({ title, amount });
    }

    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();

    titleInput.value = "";
    amountInput.value = "";
});


// Delete expense using delegation
expenseList.addEventListener('click', (e) => {
    const index = e.target.dataset.index;

    if(e.target.classList.contains('delete-btn')){
        expenses.splice(index, 1);
        localStorage.setItem('expenses', JSON.stringify(expenses));
        renderExpenses();
    }

    if(e.target.classList.contains('edit-btn')){
        titleInput.value = expenses[index].title;
        amountInput.value = expenses[index].amount;
        editIndex = index;
        addBtn.textContent = "Update Expense";
    }
});


// Function to render expenses and update total
function renderExpenses(){
    expenseList.innerHTML = "";
    let total = 0;

    expenses.forEach((expense, index) => {
        total += expense.amount;

        const li = document.createElement('li');
        li.innerHTML = `
            <span>${expense.title}</span>
            <span>$${expense.amount.toFixed(2)}</span>
            <div>
                <button class="edit-btn" data-index="${index}">Edit</button>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </div>
        `;
        expenseList.appendChild(li);
    });

    totalAmount.textContent = total.toFixed(2);
}

