const API_URL = 'http://localhost:3000/animals';
const TOTAL_EXPENSE_URL = 'http://localhost:3000/animals/total-expense';
const animalsList = document.getElementById('animals-list');
const countBtn = document.getElementById('countBtn');
const totalSpan = document.getElementById('total');
const sortToggle = document.getElementById('sortToggle');
const searchInput = document.querySelector('.smth-input'); 
const searchLink = document.querySelector('.Search-link');
const clearBtn = document.querySelector('header .right button');

let allAnimalsData = [];
let displayedAnimals = []; 

async function loadAnimals(sortByExpense = false, filterQuery = '') {
  try { 
      let url = new URL(API_URL);
      const queryTrimmed = filterQuery.trim();

      if (queryTrimmed) {
          url.searchParams.append('search', queryTrimmed);
      }
      if (sortByExpense) {
          url.searchParams.append('sort', 'expense');
      }

      const res = await fetch(url.toString());
      
      if (!res.ok) {
          throw new Error(`Failed to fetch animals: ${res.status}`);
      }
      
      const fetchedAnimals = await res.json();
      displayedAnimals = fetchedAnimals; 
      
      animalsList.innerHTML = '';

      if (!queryTrimmed && !sortByExpense) { 
          allAnimalsData = fetchedAnimals;
      }
      
      if (displayedAnimals.length === 0) {
           const message = allAnimalsData.length > 0 ? 
                           'За вашим запитом тварин не знайдено.' : 
                           'Список тварин порожній. Створіть нову тварину!';
           animalsList.innerHTML = `<p class="empty-state">${message}</p>`;
      } else {
        displayedAnimals.forEach(a => {
            const animalName = a.name || 'Unknown Animal'; 
            const animalType = a.type || 'N/A';
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
              <h3>${animalName}</h3>
              <p class="type">Type: ${animalType}</p>
              <p class="expense">Expense: $${(a.dailyExpense || 0).toFixed(2)}</p>
              <p class="description">${a.description || ''}</p>
              <div class="card-buttons">
                <button onclick="deleteAnimal(${a.id})">Delete</button>
                <button onclick="editAnimal(${a.id})">Edit</button>
              </div>
            `;
            animalsList.appendChild(card);
        });
      }

  } catch (error) {
    console.error("Помилка завантаження тварин:", error);
    animalsList.innerHTML = '<p>Не вдалося завантажити дані про тварин. Переконайтеся, що API працює.</p>';
  }
}

async function calculateTotalExpense() {
    const isSorted = sortToggle.checked;
    const query = searchInput.value.trim();

    let url = new URL(TOTAL_EXPENSE_URL);
      
    if (query) { url.searchParams.append('search', query); }
    if (isSorted) { url.searchParams.append('sort', 'expense'); }

    totalSpan.textContent = `...`;

    try {
        const res = await fetch(url.toString());
        if (!res.ok) {
            throw new Error(`Failed to fetch total expense: ${res.status}`);
        }
        
        const data = await res.json();
        totalSpan.textContent = `$${data.totalExpense}`;

    } catch (error) {
        console.error("Помилка підрахунку витрат:", error);
        totalSpan.textContent = `$Error`;
    }
}

searchLink.addEventListener('click', (e) => {
    e.preventDefault();
    loadAnimals(sortToggle.checked, searchInput.value.trim());
});

clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    loadAnimals(sortToggle.checked, '');
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        loadAnimals(sortToggle.checked, searchInput.value.trim());
    }
});

countBtn.addEventListener('click', calculateTotalExpense);

sortToggle.addEventListener('change', (e) => {
    loadAnimals(e.target.checked, searchInput.value.trim());
});


async function deleteAnimal(id) {
  if (confirm("Ви впевнені, що хочете видалити цю тварину?")) {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      loadAnimals(sortToggle.checked, searchInput.value.trim()); 
    } catch (error) {
      console.error("Помилка видалення тварини:", error);
      alert("Не вдалося видалити тварину. Перевірте консоль.");
    }
  }
}

loadAnimals();