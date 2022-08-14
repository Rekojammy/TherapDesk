let myForm = document.getElementById("myForm")
let firstName = document.getElementById('firstName')
let lastName = document.getElementById('lastName')
let otherNames = document.getElementById('otherNames');
let radio = document.getElementsByName('radio')
let dob = document.getElementById('dob')
let email = document.getElementById('email')
let password = document.getElementById('password')
let repeatPassword = document.getElementById('repeatPassword')
let country = document.getElementById('country')
let code = document.getElementById('code') 
let phone = document.getElementById('phone')
let input = document.querySelectorAll('input')


function validate(){
  if(myForm.elements[0].value == ""){
    document.getElementById('error1').textContent = "Please provide your First Name"
    firstName.classList.remove("border-primary")
    firstName.classList.add("border-danger")
  }else if(myForm.elements[1].value == ""){
    document.getElementById('error2').textContent = "Please provide your Last Name"
    lastName.classList.remove("border-primary")
    lastName.classList.add("border-danger")
  }else if(myForm.elements[2].value == ""){
    document.getElementById('error3').textContent = "Please provide other names"
    otherNames.classList.remove("border-primary")
    otherNames.classList.add("border-danger")
  }else if(myForm.dob.value === ""){
    document.getElementById('error4').textContent = "Please provide your date of birth"
    dob.classList.remove("border-primary")
    dob.classList.add("border-danger")
  }else if(myForm.phone.value === ""){
    document.getElementById('error').textContent = "Provide your phone number"
    phone.classList.remove("border-primary")
    phone.classList.add("border-danger")
  }else if(myForm.email.value === ""){
    document.getElementById('error5').textContent = "Please provide your email"
    email.classList.remove("border-primary")
    email.classList.add("border-danger")
   } else if(repeatPassword.value != password.value){
    document.getElementById('error7').textContent = "The password does not match"
    repeatPassword.classList.remove("border-primary")
    repeatPassword.classList.add("border-danger")
    window.location.href = "./reg.html"
  }else if(myForm.password.value === ""){
    password.classList.remove("border-primary")
    password.classList.add("border-danger")
   } else if(myForm.password.value != myForm.repeatPassword.value){
    document.getElementById('error7').textContent = "Password do not match"
      password.classList.remove("border-primary")
      password.classList.add("border-danger")
  }else if(radio[0].checked == false && radio[1].checked == false){
    document.getElementById('error8').textContent = "Please select your gender"
  }  else {
    window.location.href = "./reg.html"
  }  
} 



country.addEventListener('change', function(e){
  if (e.target.value ==='Nigeria'){
    code.innerHTML = "<option> +234 </option>"
  }else  if (e.target.value ==='UK'){
    code.innerHTML = "<option> +44 </option>"
  }
})


myForm.addEventListener('submit', function(e){
  e.preventDefault();
  for(let i =0; i < input.length; i++){
    if(input[i]. value == ''){
      input[i].classList.remove("border-primary") 
      input[i].classList.add("border-danger")
      input[i].placeholder = "Field is empty"    
    }
    else{
      input[i].classList.remove("border-danger") 
      input[i].classList.add("border-primary")
    }
  }
  if(input[8].value != input[9].value){
    input[9].classList.remove("border-primary") 
    input[9].classList.add("border-danger")
    document.getElementById('error7').textContent = "Passwords do not match"
    return;    
  }
  else{
    input[9].classList.remove("border-danger") 
    input[9].classList.add("border-primary")
    document.getElementById('error7').textContent = ""
  }
  validate()
})



