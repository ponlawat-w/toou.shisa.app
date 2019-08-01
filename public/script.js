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
    shukkoku: null,
    touchaku: null,
    now: null,
    interval: null,
    ready: false,
    start: null,
    error: false
  },
  computed: {
    shukkokuCd: function() {
      return splitCountdown(this.shukkoku - this.now);
    },
    shukkokuSumi: function() {
      return this.now > this.shukkoku;
    },
    shukkokuPercent: function() {
      return (this.shukkokuSumi ? 100 : (this.now - this.start) / (this.shukkoku - this.start) * 100) + '%';
    },
    touchakuCd: function() {
      return splitCountdown(this.touchaku - this.now);
    },
    touchakuSumi: function() {
      return this.now > this.touchaku;
    },
    touchakuPercent: function() {
      return (this.touchakuSumi ? 100 : (this.now - this.start) / (this.touchaku - this.start) * 100) + '%';
    },
  },
  methods: {
    startup: function() {
      this.loading = true;
      const requestTime = new Date();
      axios('/api').then(response => {
        this.shukkoku = response.data.shukkoku;
        this.touchaku = response.data.touchaku;
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
