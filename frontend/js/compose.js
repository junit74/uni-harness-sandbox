(function () {
  "use strict";

  var counter = 100;

  function makeTweet(text) {
    counter += 1;
    return {
      id: "t-new-" + counter,
      name: "나",
      handle: "@me",
      avatar: "https://i.pravatar.cc/64?img=12",
      time: "방금",
      text: text,
      counts: { reply: 0, retweet: 0, like: 0, view: 1 },
      liked: false,
      retweeted: false,
      bookmarked: false,
    };
  }

  function publish(text) {
    var clean = (text || "").trim();
    if (!clean) return false;
    // Prepend in place so existing tweet state (counts, liked, ...) survives the render.
    window.TWEETS.unshift(makeTweet(clean));
    window.Feed.render();
    return true;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var inline = document.getElementById("compose-text");
    var inlineBtn = document.getElementById("submit-tweet");
    if (inlineBtn) {
      inlineBtn.addEventListener("click", function () {
        if (publish(inline.value)) inline.value = "";
      });
    }

    var modal = document.getElementById("compose-modal");
    var openBtn = document.getElementById("open-compose");
    var modalText = document.getElementById("compose-modal-text");
    var modalBtn = document.getElementById("submit-tweet-modal");

    if (openBtn && modal && typeof modal.showModal === "function") {
      openBtn.addEventListener("click", function () { modal.showModal(); });
    }
    if (modalBtn) {
      modalBtn.addEventListener("click", function (ev) {
        if (publish(modalText.value)) {
          modalText.value = "";
        } else {
          ev.preventDefault();
        }
      });
    }
  });
})();
