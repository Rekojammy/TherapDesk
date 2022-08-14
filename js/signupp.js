$(document).ready(function () {
  $("#signupform").validate({
    rules: {
      firstname: {
        required: true
      },
      lastname: {
        required: true
      },
      phone: {
        required: true
      },
      password: {
        required: true,
      },
      email: {
        required: true,
        email: true
      }
    }
  })

  // ONCLICK EVENT FOR THE SIGNUP BUTTON
  $("#signup_btn").click((e) => {
    e.preventDefault();
    // BLOCK UI
    $.blockUI({
      message: `<div class="spinner-border text-primary" role="status">
             
            </div> <div class="text-primary"><span class="fs-3">Creating Account...</span></div>`,
      css: { backgroundColor: "transparent", border: "none" },
    });
    signupUser();
  });
})

function signupUser() {
  var formData = readFormData($("#signupform"), true).data;
  console.log(formData);
  dopost({
    "url": api_link,
    "data": {
      "action": "sign_up_auth",
      "datafield": formData,

    },
    "type": "POST",
    "success": function (response) {
      $.unblockUI('hide');
      // try {
      console.log(response)
      var json = JSON.parse(response);

      if (json.statuscode == 0) {
        Swal.fire({
          title: "GateHouse",
          text: "Account " + json.status + " check email for verification link",
          icon: "success",
          button: "OK",
        })
      } else {
        Swal.fire({
          title: "GateHouse",
          text: " " + json.status + " ",
          icon: "error",
          button: "OK",
        })
      }
      // }
      // catch (e) {
      //     console.log(e.message);
      // }
    },
    "error": function (jqXHR, textStatus) {
      //$.mobile.loading('hide');
      //$.unblockUI();
    }
  });

}










