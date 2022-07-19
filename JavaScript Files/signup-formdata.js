function _(id) {
    return document.getElementById(id)
}

const firstName = _('firstname');
const lastName = _('lastname');
const Email = _('email');
const phoneNo = _('phone');
const passWord = _('password');
const gnerr = _('Gnerr');
const signupform = _('signupform');


const user = []



const addUser = (firstName, lastName, Email, phoneNo, passWord) => {
    user.push({
        first_name: firstName,
        last_name: lastName,
        email: Email,
        phone: phoneNo,
        password: passWord
    })

    localStorage.setItem("user", JSON.stringify(user))

    return { firstName, lastName, Email, phoneNo, passWord }


}

signupform.addEventListener('submit', (e) => {
        e.preventDefault();

        let exist = user.length && JSON.parse(localStorage.getItem('user')).some(data =>
            data.first_name.toLowerCase() == firstName.value.toLowerCase() &&
            data.last_name.toLowerCase() == lastName.value.toLowerCase() &&
            data.email.toLowerCase() == Email.value.toLowerCase()
        );

        if (!exist) {
            addUser(
                firstName.value,
                lastName.value,
                Email.value,
                phoneNo.value,
                passWord.value
            )
            // firstName.value = ""
            // lastName.value = ""
            // phoneNo.value = ""
            // Email.value = ""
            // passWord.value = ""
        } else {
            gnerr.innerText = "Duplicate Account Found. Sign Up with Another Account"
        }
})
