const entries = JSON.parse(localStorage.getItem('entries')) || [];
const form = document.getElementById('entry-form');
const entriesList = document.getElementById('entries');
const totalIncome = document.getElementById('total-income');
const totalExpenses = document.getElementById('total-expenses');
const netBalance = document.getElementById('net-balance');
const resetButton = document.getElementById('reset-button');


function updateOverview() {
    const income = entries.filter(e => e.type === 'income').reduce((sum, e) => sum + e.amount, 0);
    const expense = entries.filter(e => e.type === 'expense').reduce((sum, e) => sum + e.amount, 0);
    totalIncome.textContent = `$${income.toFixed(2)}`;
    totalExpenses.textContent = `$${expense.toFixed(2)}`;
    netBalance.textContent = `$${(income - expense).toFixed(2)}`;
}


function renderEntries(filter = 'all') {
    entriesList.innerHTML = '';
    const filtered = filter === 'all' ? entries : entries.filter(e => e.type === filter);
    filtered.forEach((entry, index) => {
        const li = document.createElement('li');
        li.className = 'flex justify-between items-center p-2 border-b';
        li.innerHTML = `
            <span>${entry.description} - $${entry.amount} (${entry.type})</span>
            <div class="flex gap-2">
                <button onclick="editEntry(${index})" class="text-blue-500">Edit</button>
                <button onclick="deleteEntry(${index})" class="text-red-500">Delete</button>
            </div>
        `;
        entriesList.appendChild(li);
    });
    updateOverview();
}


form.addEventListener('submit', e => {
    e.preventDefault();
    const description = document.getElementById('description').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const type = document.getElementById('type').value;

    if (description && amount && !isNaN(amount)) {
        entries.push({ description, amount, type });
        localStorage.setItem('entries', JSON.stringify(entries));
        renderEntries();
        form.reset();
    }
});


function deleteEntry(index) {
    entries.splice(index, 1);
    localStorage.setItem('entries', JSON.stringify(entries));
    renderEntries();
}


function editEntry(index) {
    const entry = entries[index];
    document.getElementById('description').value = entry.description;
    document.getElementById('amount').value = entry.amount;
    document.getElementById('type').value = entry.type;
    deleteEntry(index);
}


document.querySelectorAll('input[name="filter"]').forEach(radio => {
    radio.addEventListener('change', e => renderEntries(e.target.value));
});


resetButton.addEventListener('click', () => form.reset());


renderEntries();
