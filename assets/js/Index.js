var Index,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Index = (function() {

  Index.prototype.tweets = [];

  Index.prototype.$el = null;

  function Index() {
    this.hide = __bind(this.hide, this);

    this.slide = __bind(this.slide, this);

    this.articleSelectedHandler = __bind(this.articleSelectedHandler, this);

    this._errorHandler = __bind(this._errorHandler, this);

    this._fetchSuccessHandler = __bind(this._fetchSuccessHandler, this);

    this.fetchTweetCollection = __bind(this.fetchTweetCollection, this);

    var tweets;
    tweets = [];
    this.$el = $('#main');
    this.$el.css({
      left: window.innerWidth / 2 - 350
    });
  }

  Index.prototype.fetchTweetCollection = function() {
    console.log("?????????");
    this.$el.empty();
    window.App.removeEventListener(KazitoriEvent.FIRST_REQUEST, this.fetchTweetCollection);
    return $.ajax({
      url: "/",
      dataType: "json",
      contentType: "application/json",
      success: this._fetchSuccessHandler,
      error: this._errorHandler
    });
  };

  Index.prototype._fetchSuccessHandler = function(datas) {
    var data, _i, _len;
    for (_i = 0, _len = datas.length; _i < _len; _i++) {
      data = datas[_i];
      this.tweets.push(new TweetModel(data.sid, data.text, data.created_at, data.updated_at));
    }
    return this.render();
  };

  Index.prototype._errorHandler = function(error) {
    return console.log(error, "error");
  };

  Index.prototype.render = function() {
    var elem, tweet, _i, _len, _ref;
    elem = '';
    _ref = this.tweets;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      tweet = _ref[_i];
      elem += new IndexListView(tweet).el;
    }
    this.$el.append(elem);
    $('.article').on('click', this.articleSelectedHandler);
    return $('#container').css({
      'height': this.$el.height() + 20
    });
  };

  Index.prototype.articleSelectedHandler = function(event) {
    var id, tgt;
    event.preventDefault();
    tgt = event.currentTarget;
    id = $(tgt).attr('id');
    if (window.App.fragment !== '/') {
      this.hide();
    }
    return window.App.change('/' + id);
  };

  Index.prototype.slide = function() {
    return this.$el.animate({
      left: window.innerWidth / 2 - 550
    });
  };

  Index.prototype.hide = function() {
    return this.$el.animate({
      left: window.innerWidth / 2 - 350
    });
  };

  return Index;

})();
