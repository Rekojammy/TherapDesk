$("#signup").click((e) => {
  $('#formdata').hide(50)
  showAjax('', './signup.html', 'form', () => {
    $('#formdata').show()
  });
});

$("#forgot").click((e) => {
  $('#formdata').hide(50)
  showAjax('', './forgot.html', 'form', () => {
    $('#formdata').show()
  });
});

$("#addReceptionist").click((e) => {
  $('#formdata').hide(50)
  showAjax('', '../dashboard/add_receptionist.html', 'data', () => {
    $('#formdata').show()
  });
});

$("#addStaff").click((e) => {
  $('#formdata').hide(50)
  showAjax('', '../dashboard/admin_staff_list.html', 'data', () => {
    $('#formdata').show()
  });
})

$("#appointment").click((e) => {
  $('#formdata').hide(50)
  showAjax('', '../dashboard/appointment_dashboard.html', 'data', () => {
    $('#formdata').show()
  });
})
