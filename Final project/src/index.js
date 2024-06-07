document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.querySelector('#search-input');
  const searchSubmit = document.querySelector('#search-submit');
  const chartContainer = document.querySelector('#chart-container');
  const priceElement = document.querySelector('#price');
  const marketCapElement = document.querySelector('#market-cap');
  const volumeElement = document.querySelector('#volume');

  searchSubmit.addEventListener('click', handleSearch);

  function handleSearch() {
    const searchTerm = searchInput.value.trim();
    if (searchTerm) {
      axios.get(`https://api.dexscreener.com/latest/dex/pairs/ethereum/${searchTerm}`)
        .then(response => {
          const data = response.data;
          const pairData = data.pairs[0];
          const allData = {
            pairAddress: pairData.pairAddress,
            baseToken: pairData.baseToken.symbol,
            quoteToken: pairData.quoteToken.symbol,
            priceNative: pairData.priceNative,
            priceUsd: pairData.priceUsd,
            volume: pairData.volume.h24,
            liquidity: pairData.liquidity.usd,
            marketCap: pairData.baseToken.marketCap,
          };
          const price = allData.priceUsd;
          const marketCap = allData.marketCap;
          const volume = allData.volume;
          const chart = new Chart(chartContainer, {
            type: 'bar',
            data: {
              labels: ['Price', 'Market Cap', 'Volume'],
              datasets: [{
                label: 'Values',
                data: [price, marketCap, volume],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
              }]
            },
            options: {
              title: {
                display: true,
                text: 'Cryptocurrency Stats'
              }
            }
          });
          priceElement.innerText = price;
          marketCapElement.innerText = marketCap;
          volumeElement.innerText = volume;
        })
        .catch(error => console.error(error));
    }
  }
});