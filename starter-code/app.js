firebase.initializeApp(config);

var messageAppReference = firebase.database();

$(() => {
  var $messageBoardDiv = $('.message-board');
  console.log(messageAppReference)

  $('#message-form').submit(event => {
    event.preventDefault()
 
    var message = $('#message').val()
    $('#message').val('')
 
    var messagesReference = messageAppReference.ref('messages');
 
    messagesReference.push({
      message: message,
      votes: 0
    })
  })  

  function getFanMessages() {    
    messageAppReference
    .ref('messages')
    .on('value', (results) => {
      $messageBoardDiv.empty()

      let allMessages = results.val()
      
      for (let msg in allMessages) {        
        var $upVoteElement = $(`<i class="fa fa-thumbs-up pull-right"></i>`)
        $upVoteElement.on('click', (e) => {
          let id = e.target.parentNode.id
          console.log(id)
        })

        // UPDATE MESSAGE WITH UPVOTE
        var $upVoteElement = $(`<i class="fa fa-thumbs-down pull-right"></i>`)
        $upVoteElement.on('click', (e) => {
          let id = e.target.parentNode.id
          console.log(id)
        }) 

        // UPDATE MESSAGE WITH DOWNVOTE
        var $downVoteElement = $(`<i class="fa fa-thumbs-down pull-right"></i>`)
        $downVoteElement.on('click', (e) => {
          let id = e.target.parentNode.id
          console.log(id)
        })        
        
        // DELETE MESSAGE
        var $deleteElement = $(`<i class="fa fa-trash pull-right delete"></i>`)
        $deleteElement.on('click', (e) => {
          let id = e.target.parentNode.id
          
          messageAppReference
          .ref(`messages/${id}`)
          .remove()
            .then(function() {
              console.log("Remove succeeded.")
            })
            .catch(function(error) {
              console.log("Remove failed: " + error.message)
            });
        })

        var $votes = $(`<div class="pull-right">${allMessages[msg].votes}</div>`)

        let $newMessage = $(`<li id=${msg}>${allMessages[msg].message}</li>`);

        $newMessage
          .append($votes)
          .append($deleteElement)
          .append($downVoteElement)
          .append($upVoteElement)

        $messageBoardDiv.append($newMessage);
      }
    })
  }



  
  
  
  getFanMessages()
})
