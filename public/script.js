const splitCountdown = timeLeft => {
  if (isNaN(timeLeft)) {
    return [NaN, NaN, NaN, NaN];
  }
  timeLeft /= 1000;
  const second = timeLeft % 60;
  timeLeft /= 60;
  const minute = timeLeft % 60;
  timeLeft /= 60;
  const hour = timeLeft % 24;
  timeLeft /= 24;
  const day = timeLeft;
  return [day, hour, minute, second].map(x => Math.floor(x));
};

const app = new Vue({
  el: '#app',
  data: {
    loading: false,
    clientDelay: 0,
    doku: null,
    sei: null,
    kikoku: null,
    now: null,
    interval: null,
    ready: false,
    start: null,
    error: false
  },
  computed: {
    dokuCd: function() {
      return splitCountdown(this.doku - this.now);
    },
    dokuSumi: function() {
      return this.now > this.doku;
    },
    dokuPercent: function() {
      return (this.dokuSumi ? 100 : (this.now - this.start) / (this.doku - this.start) * 100) + '%';
    },
    seiCd: function() {
      return splitCountdown(this.sei - this.now);
    },
    seiSumi: function() {
      return this.now > this.sei;
    },
    seiPercent: function() {
      return (this.seiSumi ? 100 : (this.now - this.start) / (this.sei - this.start) * 100) + '%';
    },
    kikokuCd: function() {
      return splitCountdown(this.kikoku - this.now);
    },
    kikokuSumi: function() {
      return this.now > this.kikoku;
    },
    kikokuPercent: function() {
      return (this.kikokuSumi ? 100 : (this.now - this.start) / (this.kikoku - this.start) * 100) + '%';
    }
  },
  methods: {
    startup: function() {
      this.loading = true;
      const requestTime = new Date();
      axios('/api').then(response => {
        this.doku = response.data.doku;
        this.sei = response.data.sei;
        this.kikoku = response.data.kikoku;
        this.clientDelay = (response.data.genzai - requestTime.getTime()) / 2;
        this.start = response.data.start;
        this.startCount();
      }).catch(() => {
        this.error = true;
      }).finally(() => {
        this.loading = false;
        document.getElementById('app-content').style.display = 'block';
      });
    },
    intervalAction: function() {
      this.now = new Date().getTime() + this.clientDelay;
      this.ready = true;
    },
    startCount: function() {
      if (this.interval) {
        clearInterval(this.interval);
      }
      this.intervalAction();
      this.interval = setInterval(this.intervalAction, 500);
    }
  },
  mounted: function() {
    this.startup();
  }
});
