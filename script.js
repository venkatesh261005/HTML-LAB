// ------------------- INPUT FIELDS -------------------
const date = document.getElementById('date');
const description = document.getElementById('description');
const category = document.getElementById('category');
const amount = document.getElementById('amount');
const addBtn = document.getElementById('add');

const incomeEl = document.getElementById('income');
const totalExpenseEl = document.getElementById('total-expense');
const remainingBalanceEl = document.getElementById('reme-balance');
const transactionsBody = document.getElementById('transactionsBody');

// ------------------- MENU TOGGLE -------------------
const ul = document.querySelector('ul');
const menuIcon = document.querySelector('.menu-icon');
let menuVisible = false;

menuIcon.addEventListener('click', () => {
    ul.style.visibility = menuVisible ? "hidden" : "visible";
    menuVisible = !menuVisible;
});

// ------------------- CHART SETUP -------------------
const ctx = document.getElementById('categoryChart').getContext('2d');
const categoryLabels = ['Food', 'Travel', 'Utilities', 'Entertainment'];

const chartData = {
    labels: categoryLabels,
    datasets: [{
        label: 'Expenses',
        data: [0, 0, 0, 0],
        backgroundColor: ['#4F46E5', '#22C55E', '#FACC15', '#EF4444'],
        borderWidth: 1
    }]
};

const categoryChart = new Chart(ctx, {
    type: 'doughnut',
    data: chartData,
    options: {
        responsive: true,
        plugins: {
            legend: { position: 'bottom' }
        }
    }
});

// ------------------- STATE -------------------
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let totalIncome = parseFloat(localStorage.getItem('totalIncome')) || 0;

// ------------------- PAGE LOAD -------------------
window.addEventListener('DOMContentLoaded', () => {

    expenses.forEach((exp, index) => {
        exp.amount = parseFloat(exp.amount) || 0;
        addExpenseToTable(exp, index);
    });

    updateBalances();
    updateChartData();

    incomeEl.textContent = `$${totalIncome.toFixed(2)}`;

    const storedRemaining = parseFloat(localStorage.getItem('remainingBalance'));
    const remaining = isNaN(storedRemaining) ? totalIncome : storedRemaining;
    remainingBalanceEl.textContent = `$${remaining.toFixed(2)}`;
});

// ------------------- INCOME EDIT -------------------
incomeEl.addEventListener('click', () => {
    const newIncomeStr = prompt("Enter your monthly income:", totalIncome || 0);

    if (newIncomeStr === null) return;

    const newIncome = parseFloat(newIncomeStr);

    if (!isNaN(newIncome) && newIncome >= 0) {
        totalIncome = newIncome;
        localStorage.setItem('totalIncome', totalIncome.toFixed(2));
        updateBalances();
    } else {
        alert("Please enter a valid number.");
    }
});

// ------------------- ADD EXPENSE BUTTON -------------------
addBtn.addEventListener('click', () => {
    const expeDate = date.value.trim();
    const expeDescription = description.value.trim();
    const expeCategory = category.value.trim();
    const expeAmount = amount.value.trim();

    if (!expeDate || !expeDescription || !expeCategory || !expeAmount) {
        alert("Please fill all fields.");
        return;
    }

    const expense = {
        date: expeDate,
        description: expeDescription,
        category: expeCategory,
        amount: parseFloat(expeAmount)
    };

    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));

    addExpenseToTable(expense, expenses.length - 1);

    updateBalances();
    updateChartData();

    // Clear form
    date.value = "";
    description.value = "";
    category.value = "";
    amount.value = "";
});

// ------------------- ADD EXPENSE ROW WITH DELETE -------------------
function addExpenseToTable(expense, index) {
    const amountNum = parseFloat(expense.amount) || 0;

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${expense.date}</td>
        <td>${expense.description}</td>
        <td>${expense.category}</td>
        <td class="negative">-$${amountNum.toFixed(2)}</td>
        <td><button class="delete-expense">Delete</button></td>
    `;

    // DELETE EVENT
    row.querySelector(".delete-expense").addEventListener("click", () => {
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        row.remove();
        updateBalances();
        updateChartData();

        // Re-index all rows so delete stays accurate
        transactionsBody.innerHTML = "";
        expenses.forEach((exp, i) => addExpenseToTable(exp, i));
    });

    transactionsBody.appendChild(row);
}

// ------------------- BALANCE CALCULATION -------------------
function updateBalances() {
    const totalExpense = expenses.reduce((sum, e) => sum + (parseFloat(e.amount) || 0), 0);
    const remaining = totalIncome - totalExpense;

    incomeEl.textContent = `$${totalIncome.toFixed(2)}`;
    totalExpenseEl.textContent = `$${totalExpense.toFixed(2)}`;
    remainingBalanceEl.textContent = `$${remaining.toFixed(2)}`;

    localStorage.setItem('remainingBalance', remaining.toFixed(2));
}

// ------------------- CHART UPDATE -------------------
function updateChartData() {
    const categorySums = {
        Food: 0,
        Travel: 0,
        Utilities: 0,
        Entertainment: 0
    };

    expenses.forEach(exp => {
        const amt = parseFloat(exp.amount) || 0;
        if (categorySums.hasOwnProperty(exp.category)) {
            categorySums[exp.category] += amt;
        }
    });

    chartData.datasets[0].data = categoryLabels.map(cat => categorySums[cat]);
    categoryChart.update();
}

// ------------------- LOGOUT -------------------
document.addEventListener("DOMContentLoaded", () => {
    const logoutBtn = document.getElementById("logout");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", (e) => {
            e.preventDefault();
            localStorage.removeItem("loggedInUser");
            window.location.href = "login.html";
        });
    }
});
