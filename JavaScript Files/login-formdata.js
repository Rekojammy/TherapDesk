function _(id) {
    return document.getElementById(id)
}

const email = _('email');
const password = _('password');
const Gnerr = _('Gnerr');
const form = _('login_form');

let user = JSON.parse(localStorage.getItem('user')) || []





form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let exist = user.length && JSON.parse(localStorage.getItem('user')).some(data =>
        data.email.toLowerCase() == email.value.toLowerCase() &&
        data.password.toLowerCase() == password.value.toLowerCase()
    );
        if (!exist) {
            Gnerr.innerHTML = 'Wrong Username or Password!'
        } else {
            Gnerr.style.color = "green";
            Gnerr.innerHTML = 'Login Successful!';
            form.submit();
            location.href = "therapist_dashboard.html";
        }
    
})

