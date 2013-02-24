# define ['jquery', 'underscore', 'TweetModel'], ()->
class Index
  tweets:[]
  $el:null
  constructor:()->
    tweets = []
    @$el = $('#main')
    @$el.css {left:window.innerWidth / 2 - 350}

  fetchTweetCollection:()=>
    console.log "?????????"
    @$el.empty()
    
    window.App.removeEventListener KazitoriEvent.FIRST_REQUEST, @fetchTweetCollection
    $.ajax({
      url:"/"
      dataType:"json"
      contentType:"application/json"
      success:@_fetchSuccessHandler
      error:@_errorHandler
      })

  _fetchSuccessHandler:(datas)=>
    for data in datas
      @tweets.push new TweetModel(data.sid, data.text, data.created_at, data.updated_at)
    @render()

  _errorHandler:(error)=>
    console.log error, "error"
  # return Index
  
  render:()->
    elem = ''
    for tweet in @tweets
      elem += new IndexListView(tweet).el
    @$el.append(elem)
    $('.article').on 'click', @articleSelectedHandler
    $('#container').css { 'height':@$el.height() + 20}

  articleSelectedHandler:(event)=>
    event.preventDefault()
    tgt = event.currentTarget
    id = $(tgt).attr('id')
    # id = $(@).attr('id')
    if window.App.fragment isnt '/'
      @hide()
    window.App.change('/' + id)

  slide:()=>
    # console.log @$el
    @$el.animate {left: window.innerWidth / 2 - 550}

  hide:()=>
    @$el.animate {left:window.innerWidth / 2 - 350 }