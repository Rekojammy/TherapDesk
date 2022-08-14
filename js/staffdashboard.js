$(document).ready(function () {
    
    setItem("session_id", newQueryString("session"));
    setItem("session_user", newQueryString("session_user"));
    
    getCurrentUser();
    getStaffAppointments();

    $(".navv a").on("click", function () {
        $(".navv").find(".collapsed").removeClass("collapsed");
        $(this).parent().addClass("collapsed");
    });

    $("#homeLink").click((e) => {
        window.location.href = `../dashboard/admin_dashboard.html?session=${json.data.session_id}&session_user=${json.data.session_user}`;
    });
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
        signOutUser();
    });
});
  
    // FUNCTION FOR SIGNOUT AUTHENTICATION
    function signOutUser() {
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
                        signOutUser();
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
                $.mobile.loading('hide');
                console.log(textStatus);
                $.unblockUI();
            },
        });
    }

    function getStaffAppointments() {
        // $.blockUI({
        //     message: `<div class="spinner-border text-primary" role="status"></div>
        //                     <div class="text-primary">
        //                     <span class="fs-3">loading</span>
        //                 </div>`,
        //     css: { backgroundColor: "transparent", border: "none" },
        // });
        dopost({
            url: api_link,
            data: {
            action: "get_appointments_by_staff",
            datafield: {
                session_id: getItem("session_id"),
                session_user: getItem("session_user"),
            },
            },
            type: "POST",
            success: function (response) {            
                var json = JSON.parse(response);
                let expected = 0;
                let received = 0;
                let declined = 0;
                if (json.statuscode == 0) {
                    var length = json.data.length;
                    console.log(json.data)
                    for(let i = 0; i < json.data.length;i++){
                        if(json.data[i].staff_status == "accepted"){
                            expected++
                        }
                        if(json.data[i].session == "Session Ended" && json.data[i].staff_status == "accepted"){
                            received++
                        }
                        if(json.data[i].staff_status == "declined"){
                            declined++
                        }
                    }
                    $("#total_guests").text(length)
                    $("#expected_visitors").text(expected);
                    $("#received_visitors").text(received);
                    $("#declined_visitors").text(declined)
                    $("#total").text(length)
                        $.unblockUI();
                    $("#staff_appointment_table").DataTable({
                        data: json.data,
                        order: [
                            [1, "desc"]
                        ],
                        dom: "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
                            "<'row'<'col-sm-12'tr>>" +
                            "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",
                        processing: true,
                        serverside: true,
                        buttons: [
                            "copy",
                            {
                            extend: "excel",
                            messageTop: "The information in this table is copyright to GateHouse Intl.",
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
                        columns: [{
                            title: "Purpose",
                            data: "purpose"
                            },
                            {
                            title: "Guest",
                            data: "guest_name"
                            },
                            {
                            title: "Expected Time",
                            data: "expected_time"
                            },
                            {
                            title: "Staff Phone",
                            data: "staff_data.phone"
                            },
                            {
                            title: "Date",
                            data: "entry_date"
                            },
                            {
                            title: "Appointment Status",
                            data: "staff_status"
                            },
                            {
                            title: "Status",
                            data: "session"
                            },
                            {
                            title: "Actions"
                            },
                        ],

                        columnDefs: [{
                            targets: [-1],
                            orderable: true,
                            searchable: true,
                            className: "text-truncate",
                            render: function (data, type, row) {
                            var id = row.appointments_id;
                            
                            let retStr = "";
                            let count = 0
                            if (row.staff_status === null || row.staff_status === "") {
                                retStr =
                                `<a href='#' onclick='acceptAppointments(event, "${id}");' class='btn btn-sm btn-success rounded-3'>Accept</a>
                                <a href='#' onclick='declineAppointments(event, "${id}");' class='btn btn-sm btn-danger rounded-3'>Decline</a>`;
                            } else if (row.staff_action == 'Declined') {
                                retStr = `<a href='#' onclick='getAppointmentDetails(event, "${id}");' class='btn btn-sm btn-primary rounded-3'>View Details</a>`;
                            }  else if (row.session == 'Session Ended') {
                                retStr = `<a href='#' onclick='getAppointmentDetails(event, "${id}");' class='btn btn-sm btn-primary rounded-3'>View Details</a>`;
                            }  else if (row.session == 'In Progress') {
                                retStr = `<a href='#' onclick='endSession(event, "${id}");' class='btn btn-sm btn-danger rounded-3'>End Session</a>`;
                            } else {
                                retStr =
                                `<a href='#' onclick='startSession(event, "${id}");' class='btn btn-sm btn-success rounded-3'>Start Session</a>
                                <a href='#' onclick='endSession(event, "${id}");' class='btn btn-sm btn-danger rounded-3'>End Session</a>`;
                            }
                            return retStr;
                            },
                        },
                        {
                            targets: [0],
                            orderable: true,
                            searchable: true,
                            render: function (data, type, row) {
                            var myStr = row.purpose.substring(0, 30) + "...";
                            var retStr =
                                `<span class="text-truncate" title="${row.purpose}">${myStr}</span>`;
                            return retStr;
                            },
                        },
                        {
                            targets: [1],
                            orderable: true,
                            searchable: true,
                            render: function (data, type, row) {
                            var myStr = row.guest_name.substring(0, 40) + "...";
                            var retStr = `<span class="text-truncate" title="${row.guest_name}">${myStr}</span>`;
                            return retStr;
                            },
                        },
                        {
                            targets: [2],
                            orderable: true,
                            searchable: true,
                            render: function (data, type, row) {
                            var myStr = row.expected_time.substring(0, 40) + "...";
                            var retStr =
                                `<span class="text-truncate" title="${row.expected_time}">${myStr}</span>`;
                            return retStr;
                            },
                        },
                        {
                            targets: [4],
                            orderable: true,
                            searchable: true,
                            render: function (data, type, row) {
                            var myStr = row.entry_date;
                            var retStr = `<span class="text-truncate" title="${myStr}">${myStr}</span>`;
                            return retStr;
                            },
                        },
                        {
                            targets: [6],
                            orderable: true,
                            searchable: true,
                            render: function (data, type, row) {
                            var myClass = "danger";
                            var myValue = "Session Ended";
                            if (
                                row.session == "inactive" ||
                                row.session == 0 ||
                                row.session == "" ||
                                row.session == null
                            ) {
                                myClass = "warning";
                                myValue = "Inactive";
                            } else if (row.session == "In Progress") {
                                myClass = "success";
                                myValue = "Active Session";
                            }
                            var retStr =
                                `<span class="badge text-${myClass} p-2 w-100 m-0 rounded-pill">${myValue}</span>`;
                            return retStr;
                            },
                        },
                        ],
                    });
                } else if (json.statuscode == -500) {
                    $.unblockUI();             
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
                        signOutUser();
                    });
                } else {
                    $.unblockUI();
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
                $.mobile.loading('hide');
                console.log(textStatus);
                $.unblockUI();
            },
        });
    }

    function declineAppointments(e, appointments_id) {
        e = e || window.event;
        dopost({
            url: api_link,
            type: "POST",
            data: {
                action: "set_appointment_status_staff",
                datafield: {
                    status_action: "declined",
                    session_id: getItem("session_id"),
                    session_user: getItem("session_user"),
                    appointments_id: appointments_id
                },
            },
            success: function (response) {
                $.unblockUI("hide");
                
                var json = JSON.parse(response);
                
                if (json.statuscode == 0) {
                        $.unblockUI();
                    // SUCCESS MESSAGE
                    Swal.fire({
                    title: "GateHouse",
                    html: json.status,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                    }).then(() => {
                    window.location.reload(true);
                    // e.target.style.display = "none"
                    // $('#staff_appointment_table').DataTable().ajax.reload();
                    });
                } else if (json.statuscode == -500) {
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
                $.mobile.loading('hide');
                $.unblockUI();
            },
        });
    }

    function acceptAppointments(event, appointments_id) {
        event = event || window.event;
        dopost({
            url: api_link,
            data: {
                action: "set_appointment_status_staff",
                datafield: {
                    status_action: "accepted",
                    session_id: getItem("session_id"),
                    session_user: getItem("session_user"),
                    appointments_id: appointments_id
                },
            },
            type: "POST",
            success: function (response) {
                $.unblockUI("hide");
                
                var json = JSON.parse(response);
                
                if (json.statuscode == 0) {
                    // SUCCESS MESSAGE
                    Swal.fire({
                    title: "GateHouse",
                    html: json.status,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                    }).then(() => {
                    window.location.reload(true);
                    // getStaffAppointments();
                    // event.target.style.display = "none";
                    // $('#staff_appointment_table').DataTable().ajax.reload();
                    });
                } else if (json.statuscode == -500) {
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
            $.mobile.loading('hide');
            $.unblockUI();
            },
        });
    }

    function endSession(e, appointments_id) {
        e = e || window.event;
        dopost({
            url: api_link,
            type: "POST",
            data: {
                action: "set_time_out_staff",
                datafield: {
                    session_id: getItem("session_id"),
                    session_user: getItem("session_user"),
                    appointments_id: appointments_id
                },
            },
            success: function (response) {
                $.unblockUI("hide");
                
                var json = JSON.parse(response);
                
                if (json.statuscode == 0) {
                    // SUCCESS MESSAGE
                    Swal.fire({
                    title: "GateHouse",
                    html: json.status,
                    icon: "success",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                    }).then(() => {
                    window.location.reload(true);
                    // getStaffAppointments();
                    e.target.style.display = "none"
                    // $('#staff_appointment_table').DataTable().ajax.reload();
                    });
                } else if (json.statuscode == -500) {
                    Swal.fire({
                        title: "GateHouse",
                        html: json.status,
                        icon: "error",
                        buttonsStyling: false,
                        confirmButtonText: "OK",
                        customClass: {
                            confirmButton: "btn fw-bold btn-light-primary"
                        }
                    }).then(function(res){
                        signOutUser();
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
                $.mobile.loading('hide');
                $.unblockUI();
            },
        });
    }

    function startSession(event, appointments_id) {
        event = event || window.event;
        dopost({
            url: api_link,
            data: {
            action: "set_time_in_staff",
            datafield: {
                session_id: getItem("session_id"),
                session_user: getItem("session_user"),
                appointments_id: appointments_id
            },
            },
            type: "POST",
            success: function (response) {
            $.unblockUI("hide");
            
            var json = JSON.parse(response);
            
            if (json.statuscode == 0) {
                // SUCCESS MESSAGE
                Swal.fire({
                title: "GateHouse",
                html: json.status,
                icon: "success",
                buttonsStyling: false,
                confirmButtonText: "OK",
                customClass: {
                    confirmButton: "btn fw-bold btn-light-primary"
                }
                }).then(() => {
                window.location.reload(true);
                // getStaffAppointments();
                event.target.style.display = "none";
                // $('#staff_appointment_table').DataTable().ajax.reload();
                });
            } else if (json.statuscode == -500) {
                Swal.fire({
                    title: "GateHouse",
                    html: json.status,
                    icon: "error",
                    buttonsStyling: false,
                    confirmButtonText: "OK",
                    customClass: {
                        confirmButton: "btn fw-bold btn-light-primary"
                    }
                }).then(function(res){
                    signOutUser();
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
            $.mobile.loading('hide');
            console.target(textStatus)
            $.unblockUI();
            },
        });
    }

    function getAppointmentDetails(event, appointments_id) {
        $.ajax({
            url: api_link,
            type: "POST",
            dataType: "json",
            data: {
                "action": "get_appointments_by_id_staff",
                datafield: {
                    session_id: getItem("session_id"),
                    session_user: getItem("session_user"),
                    appointments_id:appointments_id,
                }
            },
            beforeSend: function () {
                $.blockUI({
                    message: '<div class="sk-spinner sk-spinner-wave" style="margin-top:10%;"><div class="sk-rect1"></div><div class="sk-rect2"></div><div class="sk-rect3"></div><div class="sk-rect4"></div><div class="sk-rect5"></div></div>',
                    css: {
                        border: "none",
                        backgroundColor: "transparent"
                    },
                    overlayCSS: {
                        backgroundColor: "#fff",
                        opacity: 0.8,
                        cursor: "wait"
                    }
                });
            },
            success: function (json) {
                $.unblockUI();
                if (json.statuscode == 0) {
                    var data = json.data[0];
                    
                    $.each(data, function (keys, vals){
                        $('#'+ keys).text(vals);
                        if (keys == "guest") {
                            $.each(vals, function (key, val) {
                                $('#' + key).text(val);
                                console.table(key, val);
                            });
                        }
                        // console.log(keys);
                    });
                    $('#appointmentDetails').modal('show');
                } else if (json.statuscode == -500) {
                    $.unblockUI();
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
                    $.unblockUI();
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
                $.mobile.loading('hide');
                console.log(textStatus);
                $.unblockUI();
            },
        });
    }
  