// Fetching data using async/await and adding search functionality and sorting

let coinsData = []; // Array to store the original fetched data

fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  .then(response => response.json())
  .then(data => {
    const coins = data.map(coin => ({
      name: coin.name,
      id: coin.id,
      image: coin.image,
      symbol: coin.symbol,
      current_price: coin.current_price,
      total_volume: coin.total_volume,
      market_cap: coin.market_cap,
      price_change_percentage: coin.price_change_percentage,
    }));

    renderTable(coins);
  })
  .catch(error => {
    console.log('Error fetching data:', error);
  });


async function fetchData() {
  try {
    const response = await fetch(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false'
    );
    const data = await response.json();

    coins = data.map(coin => ({
      name: coin.name,
      id: coin.id,
      image: coin.image,
      symbol: coin.symbol,
      current_price: coin.current_price,
      total_volume: coin.total_volume,
      market_cap: coin.market_cap,
      price_change_percentage: coin.price_change_percentage,
    }));

    renderTable(coins);
  } catch (error) {
    console.log('Error fetching data:', error);
  }
}

function renderTable(coins) {
  const table = document.getElementById('coin-table');
  // Clear table before rendering
  table.innerHTML = '';

  coins.forEach(coin => {
    const row = table.insertRow();
    row.innerHTML = `
      <td>${coin.name}</td>
      <td>${coin.id}</td>
      <td><img src="${coin.image}" alt="${coin.name}" width="20" height="20"></td>
      <td>${coin.symbol}</td>
      <td>${coin.current_price}</td>
      <td>${coin.total_volume}</td>
      <td>${coin.market_cap}</td>
      <td>${coin.price_change_percentage}</td>
    `;
  });
}

function searchCoins(searchTerm) {
  const filteredCoins = coinsData.filter(coin => {
    const coinName = coin.name.toLowerCase();
    return coinName.includes(searchTerm.toLowerCase());
  });

  renderTable(filteredCoins);
}

function sortCoinsByMarketCap() {
  const sortedCoins = coinsData.sort((a, b) => {
    return b.market_cap - a.market_cap;
  });

  renderTable(sortedCoins);
}

function sortCoinsByPercentageChange() {
  const sortedCoins = coinsData.sort((a, b) => {
    return b.price_change_percentage - a.price_change_percentage;
  });

  renderTable(sortedCoins);
}

// Add event listeners for search input and sort buttons

const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', event => {
  const searchTerm = event.target.value;
  searchCoins(searchTerm);
});

const marketCapButton = document.getElementById('sort-market-cap');
marketCapButton.addEventListener('click', () => {
  sortCoinsByMarketCap();
});

const percentageChangeButton = document.getElementById('sort-percentage-change');
percentageChangeButton.addEventListener('click', () => {
  sortCoinsByPercentageChange();
});

// Fetch data and render table
search-input.addEventListener('input', filterData);

fetchData();
