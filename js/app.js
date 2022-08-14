$(document).ready(function () {
  // JQUERY VALIDATION
  $("#signin_form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
    },
  });
  $("#form").validate({
    rules: {
      email: {
        required: true,
        email: true,
      },
      confirm_code: {
        required: true,
      },
      password: {
        required: true,
      },
      confirm_password: {
        required: true,
      },
    },
  });
  // CLICK EVENT FOR THE SIGN IN BUTTON
  $("#SignIn_btn").click((e) => {
    e.preventDefault();

    // BLOCK UI
    $.blockUI({
      message: `<div class="spinner-border text-primary" role="status">
             
            </div> <div class="text-primary"><span class="fs-3">Signing In...</span></div>`,
      css: { backgroundColor: "transparent", border: "none" },
    });
    // SIGNIN FUNCTION EXECUTION
    signinUser();
  });

  // CLICK EVENT FOR THE RESET PASSWORD BUTTON
  $("#resetButton").click((e) => {
    e.preventDefault();

    // BLOCKUI
    $.blockUI({
      message: `<div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>`,
      css: { backgroundColor: "transparent", border: "none" },
    });

    // RESET PASSWORD FUNCTION EXECUTION
    passwordReset(e);
  });

  // CLICK EVENT FOR THE OTP BUTTON
  $("#confirmbutton").click((e) => {
    e.preventDefault();

    // bLOCKUI
    $.blockUI({
      message: `<div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>`,
      css: { backgroundColor: "transparent", border: "none" },
    });

    // OTP AUTHENTICATION FUNCTION EXECUTION
    resetPassword(e);
  });
});

// FUNCTION FOR SIGNIN AUTHENTICATION
function signinUser() {
  var formData = readFormData($("#signin_form"), true).data;
  dopost({
    url: api_link,
    data: {
      action: "sign_in_auth",
      datafield: formData,
    },
    type: "POST",
    success: function (response) {
      $.unblockUI("hide");
      console.log(response);
      var json = JSON.parse(response);
      if (json.statuscode == 0) {
        // SUCCESS MESSAGE
        window.location.href = `/dashboard/${json.data.role}_dashboard.html?session=${json.data.session_id}&session_user=${json.data.session_user}`;
      } else {
        // ERROR MESSAGE
        Swal.fire({
          title: "GateHouse",
          html: json.status,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary"
          }
        });
      }
    },
    error: function (jqXHR, textStatus) {
      //$.mobile.loading('hide');
      //$.unblockUI();
    },
  });
}

// FUNCTION FOR RESET PASSWORD AUTHENTICATION
function passwordReset(e) {
  dopost({
    url: api_link,
    data: {
      action: "reset_password_auth",
      email: $("#resetemail").val(),
    },
    type: "POST",
    success: function (response) {
      $.unblockUI("hide");
      console.log(response);
      var json = JSON.parse(response);
      console.log(json);
      if (json.statuscode == 0) {
        // SUCCESS MESSAGE
        Swal.fire({
          title: "GateHouse",
          html: json.status,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary"
          }
        }).then(() => {
          window.location.href = "reset.html";
        });
      } else {
        // ERROR MESSAGE
        Swal.fire({
          title: "GateHouse",
          html: json.status,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary"
          }
        });
      }
    },
    error: function (jqXHR, textStatus) {
      //$.mobile.loading('hide');
      //$.unblockUI();
    },
  });
}

// FUNCTION FOR OTP AUTHENTICATION
function resetPassword(e) {
  dopost({
    url: api_link,
    data: {
      action: "confirm_otp_auth",
      password: $("#password").val(),
      confirm_password: $("#confirm_password").val(),
      confirm_code: $("#confirm_code").val(),
    },
    type: "POST",
    success: function (response) {
      $.unblockUI("hide");
      console.log(response);
      var json = JSON.parse(response);
      console.log(json);
      if (json.statuscode == 0) {
        // SUCCESS MESSAGE
        Swal.fire({
          title: "GateHouse",
          html: json.status,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary"
          }
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        // ERROR MESSAGE
        Swal.fire({
          title: "GateHouse",
          html: json.status,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary"
          }
        });
      }
    },
    error: function (jqXHR, textStatus) {
      //$.mobile.loading('hide');
      //$.unblockUI();
    },
  });
}
