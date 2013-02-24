var Show,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

Show = (function() {

  Show.prototype._template = '<header><section class="icon"><a href="#" class="close closeShow" data-dismiss="alert">&times;</a><img src="/assets/images/icon.jpg" width="50"></section><section class="name">username</section></header><section class="tweet"><%= text %></section><footer><%= created_at %></footer>';

  Show.prototype.$el = null;

  function Show() {
    this.closeHandler = __bind(this.closeHandler, this);

    this._errorHandler = __bind(this._errorHandler, this);

    this._fetchSuccessHandler = __bind(this._fetchSuccessHandler, this);

    this.hideAndShow = __bind(this.hideAndShow, this);

    var $el;
    $el = $('#show');
    if (!$el || $el.length < 1) {
      $('#container').append($('<div id="show" />'));
      $el = $('#show');
    }
    this.$el = $el;
    this.$el.addClass('detail');
    this.$el.css({
      left: window.innerWidth / 2 - 325
    });
  }

  Show.prototype.show = function(id) {
    var url;
    this.$el.animate({
      left: window.innerWidth / 2 - 50
    });
    url = '/' + id;
    $.ajax({
      url: url,
      dataType: "json",
      contentType: "application/json",
      success: this._fetchSuccessHandler,
      error: this._errorHandler
    });
  };

  Show.prototype.hide = function() {
    var _this = this;
    this.$el.animate({
      left: window.innerWidth / 2 - 325
    }, function() {
      return _this.$el.empty();
    });
  };

  Show.prototype.hideAndShow = function(id) {
    var _this = this;
    return this.$el.animate({
      left: window.innerWidth / 2 - 225
    }, function() {
      _this.$el.empty();
      return _this.show(id);
    });
  };

  Show.prototype._fetchSuccessHandler = function(data) {
    this.$el.append(_.template(this._template, {
      'text': data.text,
      'created_at': data.created_at
    }));
    return $('.closeShow').on('click', this.closeHandler);
  };

  Show.prototype._errorHandler = function(error) {
    return console.log(error);
  };

  Show.prototype.closeHandler = function(event) {
    event.preventDefault();
    console.log("oooooo");
    return window.App.change('/');
  };

  return Show;

})();
