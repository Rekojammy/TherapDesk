function _(id) {
    return document.getElementById(id)
}

const firstname = _('firstname');
const lastname = _('lastname');
const email = _('email');
const phone = _('phone');
const password = _('password');
const Gnerr = _('Gnerr');
const form = _('form');


const user = []

const addUser = (firstname, lastname, email, phone, password) => {
    user.push({
        first_name: firstname,
        last_name: lastname,
        email: email,
        phone: phone,
        password: password
    })

    localStorage.setItem("user", JSON.stringify(user))

    return { firstname, lastname, email, phone, password }


}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    let exist = user.length && JSON.parse(localStorage.getItem('user')).some(data =>
        data.first_name.toLowerCase() == firstname.value.toLowerCase() &&
        data.last_name.toLowerCase() == lastname.value.toLowerCase()
    );

    if (!exist) {
        addUser(
            firstname.value,
            lastname.value,
            email.value,
            phone.value,
            password.value
        )
        // firstname.value = ""
        // lastname.value = ""
        // uname.value = ""
        // email.value = ""
        // add.value = ""
        // password.value = ""
    } else {
        Gnerr.innerText = "Duplicate Acoount Found. Sign Up with Another Account"
    }
})
