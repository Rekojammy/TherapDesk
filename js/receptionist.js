$(document).ready(function () {
  $.blockUI({
    message: `<div class="spinner-border text-primary" role="status">  
                </div> <div class="text-primary">
                <span class="fs-3">Loading...</span>
              </div>`,
    css: { backgroundColor: "transparent", border: "none" },
  });
  getReceptionist();
});

function getReceptionist() {
  dopost({
    url: api_link,
    data: {
      action: "get_all_receptionists_admin",
      datafield: {
        session_id: getItem("session_id"),
        session_user: getItem("session_user"),
      },
    },
    type: "POST",
    success: function (response) {
      $.unblockUI("hide");
      console.log(response);
      var json = JSON.parse(response);
      if (json.statuscode == 0) {
        // SUCCESS MESSAGE
        console.log(json);
        $("#receptionist_table").DataTable({
          data: json.data,
          order: [[1, "desc"]],
          dom:
            "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
            "<'row'<'col-sm-12'tr>>" +
            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
          processing: true,
          serverside: true,
          buttons: [
            "copy",
            {
              extend: "excel",
              messageTop:
                "The information in this table is copyright to Sirius Cybernetics Corp.",
            },
            {
              extend: "pdf",
              messageBottom: null,
            },
            {
              extend: "print",
              messageTop: function () {
                printCounter++;

                if (printCounter === 1) {
                  return "This is the first time you have printed this document.";
                } else {
                  return (
                    "You have printed this document " + printCounter + " times"
                  );
                }
              },
              messageBottom: null,
            },
          ],
          columns: [
            { title: "Role", data: "role" },
            { title: "Firstname", data: "first_name" },
            { title: "Lastname", data: "last_name" },
            { title: "Email", data: "email" },
            { title: "Phone No", data: "phone" },
            { title: "Date Created", data: "created_at" },
            { title: "Status", data: "isverified" },
            { title: "Actions" },
          ],

          columnDefs: [
            {
              targets: [-1],
              orderable: true,
              searchable: true,
              className: "text-truncate",
              render: function (data, type, row) {
                var id = row.receptionist_id;
                var retStr = ` <div class="dropdown">
                      <button class="btn btn-lg dropdown-toggle" type="button" id="dropdownMenuButton1"
                        data-bs-toggle="dropdown" aria-expanded="false">
                        <i class="bi bi-three-dots-vertical fs-5"></i>
                      </button>
                      <ul class="dropdown-menu  bg-white border-0" aria-labelledby="dropdownMenuButton1">
                        <a class="btn btn-lg mx-auto fw-bold text-primary" href="#" onclick="showAjax('', 'edit_receptionist_dashboard.html', 'main')">Edit</a>
                        <a class="btn btn-md fs-5 mx-auto fw-bold my-2 rounded-3 text-warning">Suspend</a>
                        <a class="btn btn-md fs-5 text-danger mx-auto fw-bold rounded-3">Delete</a>
                      </ul>
                    </div>`;
                // var retStr = `<a href='#' onclick='getPositionDetailsById(${platform_id}, ${id});' class='btn btn-sm btn-light btn-active-light-primary'>Actions</a>`;
                return retStr;
              },
            },
            {
              targets: [1],
              orderable: true,
              searchable: true,
              render: function (data, type, row) {
                var myStr = row.firstname.substring(0, 30) + "...";
                var retStr = `<span class="text-truncate" title="${row.firstname}">${myStr}</span>`;
                return retStr;
              },
            },
            {
              targets: [2],
              orderable: true,
              searchable: true,
              render: function (data, type, row) {
                var myStr = row.lastname.substring(0, 30) + "...";
                var retStr = `<span class="text-truncate" title="${row.lastname}">${myStr}</span>`;
                return retStr;
              },
            },
            {
              targets: [6],
              orderable: true,
              searchable: true,
              render: function (data, type, row) {
                var myClass = "success";
                var myValue = "Verified";
                if (
                  row.isverified == 0 ||
                  row.isverified == "" ||
                  row.isverified == null
                ) {
                  myClass = "danger";
                  myValue = "Not Verified";
                }
                var retStr = `<span class="badge bg-${myClass} p-2 rounded-pill">${myValue}</span>`;
                return retStr;
              },
            },
          ],
        });
      } else if (json.statuscode == -500) {
        // ERROR MESSAGE
        Swal.fire({
          title: "GateHouse",
          text: json.status,
          icon: "error",
          button: "OK",
        }).then(() => {
          window.location.href = "/";
        });
      } else {
        Swal.fire({
          title: "GateHouse",
          text: json.status,
          icon: "error",
          button: "OK",
        });
      }
    },
    error: function (jqXHR, textStatus) {
      //$.mobile.loading('hide');
      //$.unblockUI();
    },
  });
}
