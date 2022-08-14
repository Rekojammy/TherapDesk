$(document).ready(function () {
  $.blockUI({
    message: `<div class="spinner-border text-primary" role="status">
                </div> <div class="text-primary">
                <span class="fs-3">Please wait...</span>
              </div>`,
    css: { backgroundColor: "transparent", border: "none", },
  });
  getprofileUser();

  $("#password-btn").click((e) => {
    $.blockUI({
      message: `<div class="spinner-border text-primary" role="status">  
                </div> <div class="text-primary">
                <span class="fs-3">Loading...</span>
              </div>`,
      css: { backgroundColor: "transparent", border: "none" },
    });
    changeuserpassword();
  });

  $("#updatedetails").click((e) => {
    $.blockUI({
      message: `<div class="spinner-border text-primary" role="status">  
                  </div> <div class="text-primary">
                  <span class="fs-3">Loading...</span>
                </div>`,
      css: { backgroundColor: "transparent", border: "none" },
    });
    updateuserdetails();
  });
  
  createUploader("user_profile_photo", api_link,
                fnSuccessImage, {
                    "userid": getItem('userid'),
                    "docname": "profile",
                    "cleared": getItem('cleared'),
                    "type": "profile",
                    "content_type": 'profileimage',
                    "upload_type": "icon",
                    "sessionid": getItem('sessionid')
                }, "image/jpeg");
});

function getprofileUser() {
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
      console.log(json);

      if (json.statuscode == 0) {
        var firstname = json.data.firstname;
        var lastname = json.data.lastname;
        var fullname = json.data.firstname + " " + json.data.lastname;
        var useremail = json.data.email;
        var phonenumber = json.data.phone;
        var userrole = json.data.role;
        var department = json.data.department;
        var position = json.data.position;
        var addressstate = json.data.address_state;
        var addresscity = json.data.address_city;
        var addressstreet = json.data.address_street;
        var fulladdress =
          json.data.address_street +
          ", " +
          json.data.address_city +
          ", " +
          json.data.address_state;
        var office_role = json.data.office_role;
        var gender = json.data.gender;
        var marital_status = json.data.marital_status;
        var staff_id_no = json.data.staff_id_no;

        // overview
        $(".user-profile-fullname").text(fullname);
        $(".user-email").text(useremail);
        $(".user-phonenumber").text(phonenumber);
        $(".fulladdress").text(fulladdress);
        $(".user-role").text(userrole);
        $(".office-role").text(office_role);
        $(".department").text(department);
        $(".position").text(position);
        $(".gender").text(gender);
        $(".marital_status").text(marital_status);
        $(".staff_id_no").text(staff_id_no);

        // get old values 
        $("#firstname").val(firstname);
        $("#lastname").val(lastname);
        $("#phone").val(phonenumber);
        $("#department").val(department);
        $("#position").val(position);
        $("#office_role").val(office_role);
        $("#address_state").val(addressstate);
        $("#address_city").val(addresscity);

        $("#address_street").val(addressstreet);
        $("#gender").val(gender);
        $("#marital_status").val(marital_status);
        $("#staff_id_no").val(staff_id_no);



        const img = new Image();
        img.src = "data:image/jpg;base64," + json.data.profile_photo;
        $("#profile_photo").attr("src", img.src);
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
          html: json.status,
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

function changeuserpassword() {
  dopost({
    url: api_link,
    data: {
      action: "change_password_admin",
      datafield: {
        session_id: getItem("session_id"),
        session_user: getItem("session_user"),
        email: getItem("session_user"),
        old_password: $("#currentpassword").val(),
        new_password: $("#newpassword").val(),
        confirm_password: $("#renewpassword").val(),
      },
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

function updateuserdetails() {
  dopost({
    url: api_link,
    data: {
      action: "update_profile_admin",
      datafield: {
        session_id: getItem("session_id"),
        session_user: getItem("session_user"),
        email: getItem("session_user"),
        firstname: $("#firstname").val(),
        lastname: $("#lastname").val(),
        phone: $("#phone").val(),
        department: $("#department").val(),
        position: $("#position").val(),
        office_role: $("#office_role").val(),
        address_city: $("#address_city").val(),
        address_state: $("#address_state").val(),
        address_street: $("#address_street").val(),
        gender: $("#gender").val(),
        marital_status: $("#marital_status").val(),
        staff_id_no: $("#staff_id_no").val(),
        // photo: $("#photo").val()
      },
    },
    type: "POST",
    processData: false,
    contentType: false,
    cache: false,
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




var fnSuccessImage = function(file, response, obj, extra = '') {
  try {
      var json = JSON.parse(response);
      if (json.statuscode == 0) {
          callSweetMsgNormal("eCampus Portal", "Upload was Successful", "success");
          obj.removeFile(file);
          $(".form-button").show();
          window.location.reload();
      } else
          callSweetMsgNormal("eCampus Portal", "Could not upload file", "error");
  } catch (e) {
      console.log(e.message);
  }
};

function createUploader(el, uploadPath, fnSucc, jsonData, mimeType, progfn = function(file, progress, bytesSent) {}) {
  Dropzone.autoDiscover = false;
  var config = {
      url: uploadPath,
      parallelUploads: 1,
      uploadMultiple: false,
      maxFiles: 1,
      maxFilesize: 50,
      autoProcessQueue: false,
      addRemoveLinks: true,
      acceptedFiles: mimeType,
      uploadprogress: progfn,
      accept: function(file, done) {
          var reader = new FileReader();
          reader.onload = (event) => {
              var base64String = event.target.result;
              var fileName = file.name
              dropZoneObj = this;
              if (fileName.indexOf(".pdf") > -1)
                  uploadDropZoneFile({ upload: { filename: file.upload.filename }, dataURL: base64String }, fnSucc, this, uploadPath, (typeof(jsonData) == 'function' ? jsonData() : jsonData));
          };
          reader.readAsDataURL(file);


      },
      init: function() {
          this.createThumbnailFromUrl = function(file, image, callback, crossOrigin) {
              // console.error(JSON.stringify(file));
              var fileData = { upload: { filename: file.upload.filename }, dataURL: file.dataURL };
              uploadDropZoneFile(fileData, fnSucc, this, uploadPath, (typeof(jsonData) == 'function' ? jsonData() : jsonData));

          };
          this.on("error", function(file, response) {

              if (!(mylocation.indexOf('file://') == 0 || mylocation.indexOf('filex://') == 0))
                  successfulMessage(response);
              switch (file.type) {
                  case 'image/jpeg':
                      break;
                  case 'image/png':
                      break;
                  case 'image/jpg':
                      break;
                  case 'application/pdf':
                      break;
                  default:
                      doalert('Please upload correct file format' + response);
                      break;
              }
          });
          this.on("canceled", function(file, response) {
              isFileInProgress = false;

              window.onbeforeunload = function() {
                  / unbind /
              };
          });
          this.on('success', function(file, response, a, b) {
              fnSucc(file, !response ? JSON.stringify({ statuscode: -1, status: "Upload was not successful." }) : response, this);
          });
          this.on('addedfile', function(a) {
              $.blockUI({
                message: `<div class="spinner-border text-primary" role="status">
                            </div> <div class="text-primary">
                            <span class="fs-3">Loading...</span>
                          </div>`,
                css: { backgroundColor: "transparent", border: "none", },
              });
              this.options.params = (typeof(jsonData) == 'function' ? jsonData() : jsonData);
              this.processFile(a);


          });
          this.on("complete", function(file) {
              $.unblockUI('hide');
              this.removeAllFiles(true);
          });
      },

  };
  if (iOSversion() == "none")
      config['capture'] = "camera";
  $(el).dropzone(config);
}

var uploadDropZoneFile = (file, fn, obj, path, data) => {
  var uploadingFile = file;
  var mylocation = window.location.href;
  if (mylocation.indexOf('file://') == 0 || mylocation.indexOf('filex://') == 0) {
      $.blockUI({
          message: '<div class="bg-transparent" id="preloader"><div class="bg-transparent" id="status"><div class="spinner-border text-primary" role="status"><span class="sr-only">Loading...</span></div></div></div>',
          baseZ: 4000
      });
      data["src"] = file.upload.filename;
      data["photo"] = file.dataURL;
      data['action'] = 'upload_photo_staff';
      dopost({
          "url": path,
          "type": "POST",
          "data": data,
          "success": (response) => {
              var id = "";
              $.unblockUI();
              try {
                  try {
                      var json = JSON.parse(response);
                      if (json.statuscode != 0) {
                          $(obj).parent().find('.dropzone-item').addClass("bg-danger");
                          $(obj).parent().find('.dropzone-filename').addClass("text-white");
                          $(obj).parent().find('.flaticon2-cross').addClass("text-white");
                      } else {
                          $(obj).parent().find('.dropzone-item').addClass("bg-success");
                          $(obj).parent().find('.dropzone-filename').addClass("text-white");
                          $(obj).parent().find('.flaticon2-cross').addClass("text-white");
                          $(obj).parent().find('.dropzone-error').hide();
                      }
                  } catch (e) {}
                  console.log("calling function at success");
                  console.log(response);
                  fn(file, response, obj);
                  obj.removeAllFiles(true);
              } catch (e) {
                  console.log(e.stack);
              }
          }
      });
  }
};


createUploader(
  "#profile_photo",
  api_link,
  fnSuccessImage,
  {
     userid: localStorage.getItem("userid"),
    //  mealid: localStorage.getItem("mealid"),
     docname: "profileimage",
     type: "profileimage",
     content_type: "profileimage",
     upload_type: "icon",
     sessionid: localStorage.getItem("sessionid"),
  },
  "image/jpeg"
);