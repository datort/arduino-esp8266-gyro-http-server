const UPDATE_INTERVAL = 1000;

class Monitoring {
  host = null;
  ok = { y: null }
  bad = { y: null }
  reading = { y: null }

  constructor(host) {
    this.host = host;
  }

  start = () => {
    this.runLoop();
  }

  runLoop = () => {
    fetch(`http://${this.host}`)
      .then(response => response.json())
      .then(data => {
        this.updateReadings(data);
        window.setTimeout(this.runLoop, UPDATE_INTERVAL);
      })
      .catch(error => this.setError(error))
    ;
  }

  updateReadings = (data) => {
    this.reading['y'] = data.y;
    document.getElementById('y-axis').textContent = data.y;

    if (this.ok['y'] && this.bad['y']) {
      let range = this.bad['y'] - this.ok['y'];
      let current = data.y - this.ok['y'];

      let ratio = (current * 100 / range) / 100;
      ratio = ratio < 0 ? 0 : ratio;
      ratio = ratio > 1 ? 1 : ratio;

      this.calculateColor(ratio);
    }
  }

  setError = (error) => {
    document.getElementById('error').textContent = error;
  }

  setOk = () => {
    this.ok['y'] = this.reading['y'];
    document.getElementById('ok-value').textContent = this.ok['y'];
  }

  setBad = () => {
    this.bad['y'] = this.reading['y'];
    document.getElementById('bad-value').textContent = this.bad['y'];
  }

  calculateColor = (ratio) => {
    const color1 = 'FF0000';
    const color2 = '00FF00';

    var hex = function(x) {
      x = x.toString(16);
      return (x.length == 1) ? '0' + x : x;
    };
    
    var r = Math.ceil(parseInt(color1.substring(0,2), 16) * ratio + parseInt(color2.substring(0,2), 16) * (1-ratio));
    var g = Math.ceil(parseInt(color1.substring(2,4), 16) * ratio + parseInt(color2.substring(2,4), 16) * (1-ratio));
    var b = Math.ceil(parseInt(color1.substring(4,6), 16) * ratio + parseInt(color2.substring(4,6), 16) * (1-ratio));
    document.getElementById('indicator').style.backgroundColor = hex(r) + hex(g) + hex(b);
  }
}