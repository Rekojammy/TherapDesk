$(document).ready(function () {
  $("#homeLink").click((e) => {
    window.location.href = `../dashboard/admin_dashboard.html?session=${json.data.session_id}&session_user=${json.data.session_user}`;
  });

  setItem("session_id", newQueryString("session"));
  setItem("session_user", newQueryString("session_user"));
  var a = getItem("session_id");
  var b = getItem("session_user");

  $.blockUI({
    message: `<div class="spinner-border text-primary" role="status"></div>
                      <div class="text-primary">
                      <span class="fs-3">Please wait..</span>
                   </div>`,
    css: { backgroundColor: "transparent", border: "none" },
  });
  getCurrentUser();

  // CLICK EVENT FOR THE SIGN OUT BUTTON
  $("#sign_out").click((e) => {
    e.preventDefault();
    // BLOCK UI
    $.blockUI({
      message: `<div class="spinner-border text-primary" role="status"></div>
                        <div class="text-primary">
                        <span class="fs-3">Logging Out...</span>
                     </div>`,
      css: { backgroundColor: "transparent", border: "none" },
    });
    signoutUser();
  });

  // ONCLICK EVENT FOR THE SIGNUP BUTTON
  $("#receptionist_btn").click((e) => {
    e.preventDefault();
    // BLOCK UI
    $.blockUI({
      message: `<div class="spinner-border text-primary" role="status">
                <span class="visually-hidden">Loading...</span>
              </div>`,
      css: { backgroundColor: "transparent", border: "none" },
    });
    createReceptionistAccount();
  });
});

// FUNCTION FOR SIGNOUT AUTHENTICATION
function signoutUser() {
  dopost({
    url: api_link,
    data: {
      action: "sign_out_admin",
      datafield: {
        session_id: getItem("session_id"),
        session_user: getItem("session_user"),
      },
    },
    type: "POST",
    success: function (response) {
      $.unblockUI("hide");
      
      var json = JSON.parse(response);
      if (json.statuscode == 0) {
        // SUCCESS MESSAGE
        window.location.href = "/";
      } else if (json.statuscode == -500) {
        // ERROR MESSAGE
        Swal.fire({
          title: "GateHouse",
          text: json.status,
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
        Swal.fire({
          title: "GateHouse",
          text: json.status,
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

// FUNCTION FOR Geting users name
function getCurrentUser() {
  dopost({
    type: "POST",
    url: api_link,
    data: {
      action: "get_current_user_admin",
      datafield: {
        session_id: getItem("session_id"),
        session_user: getItem("session_user"),
      },
    },
    success: function (response) {
      $.unblockUI("hide");
      // try {
      var json = JSON.parse(response);

      if (json.statuscode == 0) {
        
        var fullname = json.data.firstname + " " + json.data.lastname;
        var useremail = json.data.email;
        var phonenumber = json.data.phone;
        var userrole = json.data.role;
        $("#usersfirstname").text(json.data.firstname);
        $(".userfullname").text(fullname);
      } else if (json.statuscode == -500) {
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
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          title: "GateHouse",
          text: json.status,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary"
          }
        });
      }
      // } catch (e) {
      //     console.error(e.stack);
      // }
    },
  });
}
