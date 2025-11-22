document.addEventListener('DOMContentLoaded', () => {
  // Sample data for charts
  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Expenses',
      data: [500, 700, 400, 600, 300, 800],
      backgroundColor: '#3498db'
    }]
  };

  const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [{
      label: 'Spending Trend',
      data: [400, 450, 500, 480, 520, 600],
      borderColor: '#e74c3c',
      fill: false,
      tension: 0.2
    }]
  };

  // Chart options (optional, just for aesthetics)
  const options = {
    responsive: true,
    plugins: {
      legend: { display: true, position: 'top' }
    }
  };

  // Initialize Bar Chart
  const barCtx = document.getElementById('barChart').getContext('2d');
  new Chart(barCtx, {
    type: 'bar',
    data: barData,
    options: options
  });

  // Initialize Line Chart
  const lineCtx = document.getElementById('lineChart').getContext('2d');
  new Chart(lineCtx, {
    type: 'line',
    data: lineData,
    options: options
  });

  // Sample Monthly Comparison table data
  const monthlyComparisonData = [
    { month: 'Jan', thisYear: 500, lastYear: 450 },
    { month: 'Feb', thisYear: 700, lastYear: 600 },
    { month: 'Mar', thisYear: 400, lastYear: 500 },
    { month: 'Apr', thisYear: 600, lastYear: 550 }
  ];

  const tableBody = document.querySelector('#monthly-comparison tbody');
  monthlyComparisonData.forEach(row => {
    const change = row.thisYear - row.lastYear;
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${row.month}</td>
                    <td>₹${row.thisYear}</td>
                    <td>₹${row.lastYear}</td>
                    <td>${change >= 0 ? '+' : ''}₹${change}</td>`;
    tableBody.appendChild(tr);
  });

  // Sample Raw Data Table
  const rawTableBody = document.querySelector('#rawTable tbody');
  const rawData = [
    { date: '2025-01-05', desc: 'Groceries', cat: 'Food', amt: 500 },
    { date: '2025-01-10', desc: 'Fuel', cat: 'Transport', amt: 300 },
    { date: '2025-01-15', desc: 'Electricity', cat: 'Bills', amt: 800 }
  ];

  rawData.forEach(item => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${item.date}</td>
                    <td>${item.desc}</td>
                    <td>${item.cat}</td>
                    <td>₹${item.amt}</td>`;
    rawTableBody.appendChild(tr);
  });

  // Export buttons
  document.getElementById('btnExportJSON').addEventListener('click', () => {
    const dataStr = JSON.stringify(rawData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'expenses.json';
    a.click();
  });

  document.getElementById('btnExportCSV').addEventListener('click', () => {
    const csvRows = [
      ['Date', 'Description', 'Category', 'Amount'],
      ...rawData.map(r => [r.date, r.desc, r.cat, r.amt])
    ];
    const csvStr = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvStr], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'expenses.csv';
    a.click();
  });

  document.getElementById('btnPrint').addEventListener('click', () => {
    window.print();
  });
});
document.getElementById('btnExportJSON').addEventListener('click', () => {
    const dataStr = JSON.stringify(rawData, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'expenses.json';
    a.click();
});

document.getElementById('btnExportCSV').addEventListener('click', () => {
    const csvRows = [
        ['Date', 'Description', 'Category', 'Amount'],
        ...rawData.map(r => [r.date, r.desc, r.cat, r.amt])
    ];
    const csvStr = csvRows.map(e => e.join(',')).join('\n');
    const blob = new Blob([csvStr], { type: 'text/csv' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'expenses.csv';
    a.click();
});

document.getElementById('btnPrint').addEventListener('click', () => {
    window.print();
});
