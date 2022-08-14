// function previewFile() {
// var preview = document.querySelector('img');
// var file    = document.querySelector('input[type=file]').files[0];
// var reader  = new FileReader();

// reader.onloadend = function () {
// preview.src = reader.result;
// }

// if (file) {
// reader.readAsDataURL(file);
// } else {
// preview.src = "";
// }
// }

function myClick (){
  let image = document.getElementById('image')
  let file = document.querySelector('input[type=file]').files[0];
  let reader  = new FileReader();

  reader.onloadend = function () {
    image.src = reader.result;
}

if (file) {
  reader.readAsDataURL(file);
  } else {
  image.src = "../img/profile-image.png";
  }

  document.getElementById('getFile').click()
  }

