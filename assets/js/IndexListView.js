var IndexListView;

IndexListView = (function() {

  IndexListView.prototype.el = null;

  IndexListView.prototype._template = '<article id="<%= id %>" class="article"><section class="icon"><img src="/assets/images/icon.jpg"></section><section class="tweet"><header>username</header><section><%= text %></section><footer><%= created_at %></footer></section></article>';

  function IndexListView(data) {
    this.el = _.template(this._template, {
      'id': data.id,
      'text': data.text,
      'created_at': data.created_at
    });
  }

  return IndexListView;

})();
