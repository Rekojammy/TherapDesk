$(document).ready(function(){
  $("#resetButton").click((e) => {
    e.preventDefault();
    passwordReset(e);
  });
})