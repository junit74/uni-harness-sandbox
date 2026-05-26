(function () {
  "use strict";

  function parseCount(text) {
    var s = text.trim();
    if (/K$/.test(s)) return Math.round(parseFloat(s) * 1000);
    return parseInt(s, 10) || 0;
  }

  function formatCount(n) {
    if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
    return String(n);
  }

  function bumpCounter(btn, delta) {
    var span = btn.querySelector("span");
    if (!span) return;
    var next = Math.max(0, parseCount(span.textContent) + delta);
    span.textContent = formatCount(next);
  }

  document.addEventListener("click", function (ev) {
    var btn = ev.target.closest(".action");
    if (!btn) return;
    ev.stopPropagation();
    var kind = btn.dataset.kind;

    if (kind === "like") {
      var liked = btn.classList.toggle("liked");
      btn.firstChild.nodeValue = liked ? "❤️ " : "🤍 ";
      // Inline color override stays in sync with --accent via JS.
      btn.style.color = liked ? "#1d9bf0" : "";
      bumpCounter(btn, liked ? 1 : -1);
      return;
    }

    if (kind === "retweet") {
      var rt = btn.classList.toggle("retweeted");
      bumpCounter(btn, rt ? 1 : -1);
      return;
    }

    if (kind === "bookmark") {
      btn.classList.toggle("bookmarked");
      return;
    }

    if (kind === "reply") {
      bumpCounter(btn, 1);
      return;
    }
  });
})();
