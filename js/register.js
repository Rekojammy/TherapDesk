// $(function(){
//   var $registerform = $("#signupform");
//   if($registerform.length){
//     $registerform.validate({
//       rules:{
//         firstname:{
//           required: true
//         }
//       },
//       messages:{
//         firstname:{
//           required:"This field is required"
//         }
//       }
//     })
//   }
// })
$(document).ready(function(){
  $("#signupform").validate({
    rules: {
      email: {
        required: true,
        email: true
      }
    }
  })
})