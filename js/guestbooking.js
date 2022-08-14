$(document).ready(function () {
  // JQUERY VALIDATION
      $("#staff_guest_form").validate({
        rules: {
          guest_first_name: {
            required: true,
          },
          guest_last_name: {
            required: true,
          },
          guest_phone: {
            required: true,
          },
          guest_address_state: {
            required: true,
          },
          guest_address_city: {
            required: true,
          },
          guest_address_street: {
            required: true,
          },
        },
      });


  $("#staff_guest_form").submit((e) => {
    let firstname = $("#guest_first_name");
    if (firstname.val() == "") {
      $("#messg").text("Please fill in the required field")
      $("#messg").css("color", "red")
    } else {
      // BLOCK UI
      $.blockUI({
        message: `<div class="spinner-border text-primary" role="status">
             
            </div> <div class="text-primary"><span class="fs-3">Adding Guest...</span></div>`,
        css: { backgroundColor: "transparent", border: "none" },
      });

      guestbooking();
    }
  });
});

function guestbooking() {
  var formData = readFormData($("#staff_guest_form"), true).data;
  formData.session_id = getItem("session_id");
  formData.session_user = getItem("session_user");
  formData.email = getItem("session_user");
  formData.staff = getItem("session_user");

  console.log(formData);
  dopost({
    url: api_link,
    data: {
      action: "schedule_appointment_staff",
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
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
        }).then(() => {
          $("#staff_guest_form").trigger("reset");
        });
      } else {
        Swal.fire({
          title: "GateHouse",
          html: json.status,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "OK",
          customClass: {
            confirmButton: "btn fw-bold btn-light-primary",
          },
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
