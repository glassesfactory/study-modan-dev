class Show
  _template:'<header><section class="icon"><a href="#" class="close closeShow" data-dismiss="alert">&times;</a><img src="/assets/images/icon.jpg" width="50"></section><section class="name">username</section></header><section class="tweet"><%= text %></section><footer><%= created_at %></footer>'
  $el:null
  constructor:()->
    $el = $('#show')
    if not $el or $el.length < 1
      $('#container').append($('<div id="show" />'))
      $el = $('#show')
    @$el = $el
    @$el.addClass('detail')
    @$el.css {left:window.innerWidth / 2 - 325}
    

  show:(id)->
    @$el.animate {left: window.innerWidth / 2 - 50}
    url = '/' + id
    $.ajax({
      url:url
      dataType:"json"
      contentType:"application/json"
      success:@_fetchSuccessHandler
      error:@_errorHandler
      })

    return

  hide:()->
    @$el.animate { left: window.innerWidth / 2 - 325}, ()=>
      @$el.empty()
    return

  hideAndShow:(id)=>
    @$el.animate { left:window.innerWidth / 2 - 225 }, ()=>
      @$el.empty()
      @show(id)

  _fetchSuccessHandler:(data)=>
    @$el.append(_.template(@_template, {'text':data.text, 'created_at':data.created_at}))
    $('.closeShow').on 'click', @closeHandler

  _errorHandler:(error)=>
    console.log error

  closeHandler:(event)=>
    event.preventDefault()
    console.log "oooooo"
    window.App.change('/')

