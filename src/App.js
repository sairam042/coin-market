import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');
  // const [sortOption, setSortOption] = useState('');

  // Fetch data using .then method
  // const fetchCoinsUsingThen = () => {
  //   fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
  //     .then((response) => response.json())
  //     .then((data) => setCoins(data))
  //     .catch((error) => console.error('Error fetching data: ', error));
  // };

  // Fetch data using async/await method
  const fetchCoinsUsingAsyncAwait = async () => {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  useEffect(() => {
    fetchCoinsUsingAsyncAwait(); 
  }, []);

  // Handle search
  const handleSearch = () => {
    return coins.filter(coin =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
    );
  };

  // Handle sort
  const handleSort = (sortType) => {
    const sortedCoins = [...coins];
    if (sortType === 'market_cap') {
      sortedCoins.sort((a, b) => b.market_cap - a.market_cap);
    } else if (sortType === 'percentage_change') {
      sortedCoins.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    }
    setCoins(sortedCoins);
  };

  return (
    <div className="App">
      <h1>Coin Market</h1>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name or symbol"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="sort-container">
        <button onClick={() => handleSort('market_cap')}>Sort by Market Cap</button>
        <button onClick={() => handleSort('percentage_change')}>Sort by Percentage Change</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Current Price</th>
            <th>Total Volume</th>
            <th>Market Cap</th>
            <th>Percentage Change (24h)</th>
          </tr>
        </thead>
        <tbody>
          {handleSearch().map((coin) => (
            <tr key={coin.id}>
              <td><img src={coin.image} alt={coin.name} width="30" /></td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price}</td>
              <td>${coin.total_volume}</td>
              <td>${coin.market_cap}</td>
              <td>{coin.price_change_percentage_24h}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
