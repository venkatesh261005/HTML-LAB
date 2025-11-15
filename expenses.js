document.addEventListener("DOMContentLoaded", () => {
  const expenseForm = document.getElementById("expenseForm");
  const transactionsBody = document.getElementById("transactionsBody");

  // Load saved expenses
  const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  expenses.forEach(addExpenseToTable);

  expenseForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = document.getElementById("description").value.trim();
    const amount = parseFloat(document.getElementById("amount").value);
    const date = document.getElementById("date").value;
    const category = document.getElementById("category").value;

    if (!description || !amount || !date || !category) {
      alert("Please fill in all fields");
      return;
    }

    const newExpense = { description, amount, date, category };
    expenses.push(newExpense);
    localStorage.setItem("expenses", JSON.stringify(expenses));

    addExpenseToTable(newExpense);
    expenseForm.reset();
  });

  function addExpenseToTable(expense) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${expense.date}</td>
      <td>${expense.description}</td>
      <td>${expense.category}</td>
      <td>$${expense.amount.toFixed(2)}</td>
    `;
    transactionsBody.appendChild(row);
  }
});
