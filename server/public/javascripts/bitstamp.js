window.onload = () => {

  var buffer = {};
  buffer['Bitstamp'] = [[], []];

  var pusher = new Pusher('de504dc5763aeef9ff52');
  var channel = pusher.subscribe('live_trades');
  channel.bind('trade', (data) => {
    buffer['Bitstamp'][data.type].push({
      x: data.timestamp * 1000,
      y: data.price
    });
  });

  var id = 'Bitstamp';
  var canvas = document.getElementById(id);
  var context = canvas.getContext('2d');
  var chart = new Chart(context, {
    type: 'line',
    data: {
      datasets: [{
        data: [],
        label: 'Buy',
        borderColor: 'rgb(255, 99, 132)',
        backgoundColor: 'rgba(255, 99, 132, 0.5)',
        fill: false,
        lineTension: 0
      },
      {
        data: [],
        label: 'Sell',
        borderColor: 'rgb(54,162, 235)',
        backgoundColor: 'rgba(54, 162, 235, 0.5)',
        fill: false,
        lineTension: 0
      }]
    },
    options: {
      title: {
        text: `BTC/USD (${id})`,
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
          onRefresh: (chart) => {
            Array.prototype.push.apply(
              chart.data.datasets[0].data,
              buffer[id][0]
            );
            Array.prototype.push.apply(
              chart.data.datasets[1].data,
              buffer[id][1]
            );
            buffer[id] = [[], []];
          }
        }
      }
    }
  });

};
