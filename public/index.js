import mockData from "./mockData.js";
async function main() {
  // grabbing the canvas elements for charts
  const timeChartCanvas = document.querySelector("#time-chart");
  const highestPriceChartCanvas = document.querySelector(
    "#highest-price-chart"
  );
  const averagePriceChartCanvas = document.querySelector(
    "#average-price-chart"
  );

  //setting up parameters for the api request
  const result = mockData;
  // const symbols = 'AAPL,EUR/USD,ETH/BTC:Huobi,TRP:TSX';
  // const interval = '1min';
  // const apiKey = 'd4cc3b06cc8b42e08d546471bbb29bb8';

  //building var for API URL using parameters above
  //using those template literals
  //dont forget backticks
  // const apiUrl = `https://api.twelvedata.com/time_series?symbol=${symbols}&interval=${interval}&apikey=${apiKey}`

  //im scared
  //okay writing my fetch request
  //with the const apiUrl i should be able to pull from the twelve data API
  // let response = await fetch(apiUrl)
  //thanks tomas
  let GME = result.GME;
  let MSFT = result.MSFT;
  let DIS = result.DIS;
  let BNTX = result.BNTX;

  const stocks = [GME, MSFT, DIS, BNTX];
  //maybe we'll refactor later

  function getColor(stock) {
    if (stock === "GME") {
      return "rgba(61, 161, 61, 0.7)";
    }
    if (stock === "MSFT") {
      return "rgba(209, 4, 25, 0.7)";
    }
    if (stock === "DIS") {
      return "rgba(18, 4, 209, 0.7)";
    }
    if (stock === "BNTX") {
      return "rgba(166, 43, 158, 0.7)";
    }
  }
  
  stocks.forEach(stock => stock.values.reverse());
  //new chart lets go
  new Chart(timeChartCanvas.getContext("2d"), {
    type: "line",
    data: {
      //the dates are shown now :)
      labels: stocks[0].values.map((value) => value.datetime),
      datasets: stocks.map((stock) => ({
        label: stock.meta.symbol,
        // data: stock.values.map((value) => parseFloat(value.high)),
        //og
        data: stock.values.reverse().map(value => parseFloat(value.high)),
        backgroundColor: getColor(stock.meta.symbol),
        borderColor: getColor(stock.meta.symbol),
      })),
    },
  });


  //I learned the bar chart was not a bonus :'(
    //here we go, please forgive me

  new Chart(highestPriceChartCanvas.getContext("2d"), {
    type: "bar",
    data: {
      labels: stocks.map(stock => stock.meta.symbol),
      datasets: [{
        label: "Highest Prices",
        //map creates the array
        //for each stock we map the 'values' array of that stock, so we're grabbing the highest prices
        //the '...' is a spread operator that spreads the array into individual arguments to the Math.max
        //the outer map is collecting the max high prices and that array ill use as the data for the chart
        data: stocks.map(stock => Math.max(...stock.values.map(value => parseFloat(value.high)))),
        backgroundColor: stocks.map(stock => getColor(stock.meta.symbol)),
        borderColor: stocks.map(stock => getColor(stock.meta.symbol)),
      }]
    },
    //need this via charts documentation
    //this is such an insane way to say i want just a y axis that starts at zero lol
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
   
  console.log(stocks[0].values);
  //this assignment was kinder than the book store
}

main();
