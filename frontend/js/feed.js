(function () {
  "use strict";

  function fmt(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  }

  function escapeHtml(s) {
    return s
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function tweetHTML(t) {
    var likeCls = "action" + (t.liked ? " liked" : "");
    var retweetCls = "action" + (t.retweeted ? " retweeted" : "");
    var bookmarkCls = "action" + (t.bookmarked ? " bookmarked" : "");
    var likeIcon = t.liked ? "❤️" : "🤍";
    return (
      '<li class="tweet" data-id="' + t.id + '">' +
        '<img class="avatar" src="' + t.avatar + '" alt="" />' +
        '<div>' +
          '<div class="tweet-head">' +
            '<span class="tweet-name">' + escapeHtml(t.name) + '</span>' +
            '<span class="tweet-handle">' + escapeHtml(t.handle) + '</span>' +
            '<span class="tweet-dot">·</span>' +
            '<span class="tweet-time">' + escapeHtml(t.time) + '</span>' +
          '</div>' +
          '<p class="tweet-text">' + escapeHtml(t.text) + '</p>' +
          '<div class="tweet-actions">' +
            '<button class="action" data-kind="reply" type="button">💬 <span>' + fmt(t.counts.reply) + '</span></button>' +
            '<button class="' + retweetCls + '" data-kind="retweet" type="button">🔁 <span>' + fmt(t.counts.retweet) + '</span></button>' +
            '<button class="' + likeCls + '" data-kind="like" type="button">' + likeIcon + ' <span>' + fmt(t.counts.like) + '</span></button>' +
            '<button class="action" data-kind="view" type="button">📊 <span>' + fmt(t.counts.view) + '</span></button>' +
            '<button class="' + bookmarkCls + '" data-kind="bookmark" type="button">🔖</button>' +
          '</div>' +
        '</div>' +
      '</li>'
    );
  }

  function render() {
    var list = document.getElementById("feed-list");
    if (!list) return;
    // Always render straight from the in-memory state store.
    var html = window.TWEETS.map(tweetHTML).join("");
    list.innerHTML = html;
  }

  window.Feed = { render: render };
  document.addEventListener("DOMContentLoaded", render);
})();
