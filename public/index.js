async function main() {
    // grabbing the canvas elements for charts 
    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    //setting up parameters for the api request 
    const symbols = 'AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX';
    const interval = '1min';
    const apiKey = 'd4cc3b06cc8b42e08d546471bbb29bb8';

    //building var for API URL using parameters above
    //using those template literals
    //dont forget backticks
    const apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=${interval}&apikey=${apiKey}`

    //im scared 
    //okay writing my fetch request 
    let response = await fetch('https://api.twelvedata.com/time_series?symbol=AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX&interval=1min&apikey=d4cc3b06cc8b42e08d546471bbb29bb8')
}

main()