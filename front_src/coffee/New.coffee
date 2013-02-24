class New
  $el:'<div><header><h2>New Tweet</h2><a href="#" class="close" data-dismiss="alert">&times;</a></header><form class="form" action="/create" method="POST"><div class="controls"><textarea name="text"></textarea></div><div><button id="sendTweet" type="submit" class="btn btn-primary">送信</button></div></form></div>'
  
  constructor:()->
    $('.new').on 'click', @toggleClickHandler

  toggleClickHandler:(event)=>
    event.preventDefault()
    console.log $('#newContainer')
    if $('#newContainer').length > 0
      $('#newContainer').remove()
    else
      $('body').append('<div id="newContainer" />')
      $container = $('#newContainer')
      $container.append(@$el)
      $container.css {left: window.innerWidth / 2 - 215}
      # $container.addClass('alert')
      $('form').on 'submit', @_sendTweetHandler
      $('textarea[name=text]').focus()
      $('.close').on 'click', @closeHandler

  _sendTweetHandler:(event)=>
    event.preventDefault()
    data = $('form').serializeArray()
    console.log data
    $.ajax {
      url: '/create'
      method: "POST"
      data:data
      success:(data)=>
        console.log "ok"
    }
    $('#newContainer').remove()

  closeHandler:(event)=>
    event.preventDefault()
    $('#newContainer').remove()    