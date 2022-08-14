$(document).ready(function () {
  // JQUERY VALIDATION
  $("#receptionForm").validate({
    // errorPlacement: function ($error, $element) {
    //   $error.appendTo($element.closest("div"));
    // },
    rules: {
      FirstName: {
        required: true,
      },
      LastName: {
        required: true,
      },
      PhoneNumber: {
        required: true,
        matches: "[0-9]+",
        minlength: 11,
        maxlength: 11
      },
      address_city: {
        required: true,
      },
      address_state: {
        required: true,
      },
      address_street: {
        required: true,
      },
      messages: {
        FirstName: "Valid first name is required",
        LastName: "Valid last name is required",
        PhoneNumber: "Valid Phone number is required",
        address_city: "Please select a valid state",
        address_state: "Please select a valid city",
        address_street: "Please select a valid street"
      }
    },
  });

  $("#reception_btn").click((e) => {
    let firstname = $("#FirstName");
    if (firstname.val() == "") {
      $("#messaging").text("Please fill in the required field")
      $("#messaging").css("color", "red")
    } else {
      $("#messaging").text("")
      e.preventDefault();
      $.blockUI({
        message: `<div class="spinner-border text-primary" role="status">
             
            </div> <div class="text-primary"><span class="fs-3">Creating Account...</span></div>`,
        css: { backgroundColor: "transparent", border: "none" },
      });
      createReceptionistAccount();
    }
  });
});

function createReceptionistAccount() {
  var formData = readFormData($("#receptionForm"), true).data;
  console.log(formData);
  formData["session_id"] = getItem("session_id");
  formData["session_user"] = getItem("session_user");
  dopost({
    url: api_link,
    data: {
      action: "create_receptionist_admin",
      datafield: formData,
    },
    type: "POST",
    success: function (response) {
      $.unblockUI("hide");
      // try {
      console.log(response);
      var json = JSON.parse(response);
      if (json.statuscode == 0) {
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
      } else {
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
      // }
      // catch (e) {
      //     console.log(e.message);
      // }
    },
    error: function (jqXHR, textStatus) {
      //$.mobile.loading('hide');
      //$.unblockUI();
    },
  });
}
