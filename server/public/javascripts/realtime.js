window.onload = () => {

  const buffer = {};
  buffer['price'] = [];
  buffer['amount'] = [[], []];
  buffer['book'] = [[], []];

  // Initialize buffer
  axios.get('https://www.bitstamp.net/api/transactions/?time=minute')
     .then(response => {
       console.log('Transacciones', response);
       const dataInvTime = response.data.reverse()
       dataInvTime.forEach(data => {
         buffer['price'].push({
           x: data.date * 1000,
           y: data.price
         });
       });

       dataInvTime.forEach(data => {
         buffer['amount'][data.type].push({
           x: data.date * 1000,
           y: data.amount
         });
       });

       console.log('Buffer', buffer);
     })
     .catch(error => {
       console.log(error);
     });

  // Initialize websockets
  const pusher = new Pusher('de504dc5763aeef9ff52');
  const channel = pusher.subscribe('live_trades');
  channel.bind('trade', (data) => {
    buffer['price'].push({
      x: data.timestamp * 1000,
      y: data.price
    });
    console.log('Buffer Price: ',buffer['price']);
    buffer['amount'][data.type].push({
      x: data.timestamp * 1000,
      y: data.amount
    });
    console.log('Buffer Amount: ', buffer['amount']);
  });

  // Real-time price chart
  const idPrice = 'price';
  const canvasPrice = document.getElementById(idPrice);
  const contextPrice = canvasPrice.getContext('2d');
  const chartPrice = new Chart(contextPrice, {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        label: 'Price',
        borderColor: '#fab915',
        backgoundColor: '#fab915',
        fill: false,
        lineTension: 0,
        pointRadius: 0
      }]
    },
    options: {
      title: {
        text: `BTC/USD - Bitstamp`,
        display: true
      },
      scales: {
        xAxes: [{
          type: 'realtime'
        }]
      },
      plugins: {
        streaming: {
          duration: 300000,
          onRefresh: chart => {
            Array.prototype.push.apply(
              chart.data.datasets[0].data,
              buffer[idPrice]
            );
            buffer[idPrice] = [];
          }
        }
      }
    }
  });
  console.log('Chart: ', chartPrice);

  // Real-time amount chart
  const idAmount = 'amount'
  const canvasAmount = document.getElementById(idAmount);
  const contextAmount = canvasAmount.getContext('2d');
  const chartAmount = new Chart(contextAmount, {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        label: 'Buy',
        borderColor: 'rgb(0, 255, 0)',
        backgoundColor: 'rgb(0, 255, 0)',
        fill: true
      },
      {
        data: [],
        label: 'Sell',
        borderColor: 'rgb(255, 0, 0)',
        backgoundColor: 'rgb(255, 0, 0)',
        fill: true
      }]
    },
    options: {
      title: {
        text: `BTC/Amount - Bitstamp`,
        display: false
      },
      scales: {
        xAxes: [{
          type: 'realtime'
        }]
      },
      plugins: {
        streaming: {
          duration: 300000,
          onRefresh: chart => {
            Array.prototype.push.apply(
              chart.data.datasets[0].data,
              buffer[idAmount][0]
            );
            Array.prototype.push.apply(
              chart.data.datasets[1].data,
              buffer[idAmount][1]
            );
            buffer[idAmount] = [[], []];
          }
        }
      }
    }
  });

  // Initialize order book
  axios.get('https://www.bitstamp.net/api/order_book/')
    .then(response => {
      //console.log(response);
      let dataset = response.data;
      for (let i = 0; i < 10; i++) {
        buffer['book'][0].push(dataset.bids[i]);
        buffer['book'][1].push(dataset.asks[i]);
      }
    })
    .catch(error => {
      console.log(error);
    });

    console.log(buffer['book']);



};
