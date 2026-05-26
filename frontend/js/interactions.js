(function () {
  "use strict";

  function formatCount(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  }

  function findTweet(id) {
    var list = window.TWEETS;
    for (var i = 0; i < list.length; i++) {
      if (list[i].id === id) return list[i];
    }
    return null;
  }

  function syncCounterDom(btn, value) {
    var span = btn.querySelector("span");
    if (span) span.textContent = formatCount(value);
  }

  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest(".action");
    if (!btn) return;
    ev.stopPropagation();
    var tweetEl = btn.closest(".tweet");
    if (!tweetEl) return;
    var tweet = findTweet(tweetEl.dataset.id);
    if (!tweet) return;
    var kind = btn.dataset.kind;

    if (kind === "like") {
      tweet.liked = !tweet.liked;
      tweet.counts.like = Math.max(0, tweet.counts.like + (tweet.liked ? 1 : -1));
      btn.classList.toggle("liked", tweet.liked);
      btn.firstChild.nodeValue = tweet.liked ? "❤️ " : "🤍 ";
      syncCounterDom(btn, tweet.counts.like);
    } else if (kind === "retweet") {
      tweet.retweeted = !tweet.retweeted;
      tweet.counts.retweet = Math.max(0, tweet.counts.retweet + (tweet.retweeted ? 1 : -1));
      btn.classList.toggle("retweeted", tweet.retweeted);
      syncCounterDom(btn, tweet.counts.retweet);
    } else if (kind === "bookmark") {
      tweet.bookmarked = !tweet.bookmarked;
      btn.classList.toggle("bookmarked", tweet.bookmarked);
    } else if (kind === "reply") {
      tweet.counts.reply = Math.max(0, tweet.counts.reply + 1);
      syncCounterDom(btn, tweet.counts.reply);
    }
  });
})();
