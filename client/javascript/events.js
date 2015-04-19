/*Template.streamTemplate.events({
  "click [data-action='facebook-share']": function (e,t) {
    // var url = e.currentTarget.data('url');
    var url = e.currentTarget.getAttribute('data-url');
    var _id = e.currentTarget.id;
    FB.ui({
      display: 'popup',
      method: 'share_open_graph',
      action_type: 'og.likes',
      action_properties: JSON.stringify({
          object: url,
      })
    }, function(response){});
  }
});*/










