
Template.insertBuzzForm.events({
  "keyup textarea#caption": function () {
    var l = 140;
    var str = $("textarea#caption").val();
     var len = str.length;
     if(len <= l) {
           $("#txtLen").val(l-len);
      } else {
           $("textarea#caption").val(str.substr(0, 140));
      }
  }
});