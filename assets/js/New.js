var New,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

New = (function() {

  New.prototype.$el = '<div><header><h2>New Tweet</h2><a href="#" class="close" data-dismiss="alert">&times;</a></header><form class="form" action="/create" method="POST"><div class="controls"><textarea name="text"></textarea></div><div><button id="sendTweet" type="submit" class="btn btn-primary">送信</button></div></form></div>';

  function New() {
    this.closeHandler = __bind(this.closeHandler, this);

    this._sendTweetHandler = __bind(this._sendTweetHandler, this);

    this.toggleClickHandler = __bind(this.toggleClickHandler, this);
    $('.new').on('click', this.toggleClickHandler);
  }

  New.prototype.toggleClickHandler = function(event) {
    var $container;
    event.preventDefault();
    console.log($('#newContainer'));
    if ($('#newContainer').length > 0) {
      return $('#newContainer').remove();
    } else {
      $('body').append('<div id="newContainer" />');
      $container = $('#newContainer');
      $container.append(this.$el);
      $container.css({
        left: window.innerWidth / 2 - 215
      });
      $('form').on('submit', this._sendTweetHandler);
      $('textarea[name=text]').focus();
      return $('.close').on('click', this.closeHandler);
    }
  };

  New.prototype._sendTweetHandler = function(event) {
    var data,
      _this = this;
    event.preventDefault();
    data = $('form').serializeArray();
    console.log(data);
    $.ajax({
      url: '/create',
      method: "POST",
      data: data,
      success: function(data) {
        return console.log("ok");
      }
    });
    return $('#newContainer').remove();
  };

  New.prototype.closeHandler = function(event) {
    event.preventDefault();
    return $('#newContainer').remove();
  };

  return New;

})();
