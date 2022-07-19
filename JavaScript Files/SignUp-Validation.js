function _(id) {
    return document.getElementById(id);
}
function __(query) {
    return document.querySelector(query);
}
function ___(queryAll) {
    return document.querySelectorAll(queryAll);
}

const form = __("form");
const inputs = ___(".input");
const err = ___(".err");
const firstname = _("firstname");
const lastname = _("lastname");
const email = _("email");
const phone = _("phone");
const password = _("password");
const password2 = _("confirmpassword");
const Gnerr = _("Gnerr");
const submit = _("signup_btn");
const p1err1 = _("p1err1");
const p1err2 = _("p1err2");
const p2err1 = _("p2err1");
const p2err2 = _("p2err2");


const phonerr = _("phonerr");
const mailerr = _("mailerr");

const accept = _("accept");



form.addEventListener('submit', (e) => {
    e.preventDefault();
    validate();
});

// submit.addEventListener('click', () => {
//     console.log('clicked')
//     form.style.backgroundColor = 'red'
// })

phone.addEventListener("keypress", (e) => {
    if (e.keyCode < 48 || e.keyCode > 57) {
        phonerr.innerHTML = "Please enter only a phone number";
        e.preventDefault();
    } else {
        phonerr.innerHTML = "";
    }

    if (phone.value.length > 10) {
        e.preventDefault();
        phonerr.innerHTML = "Phone number should be 11 digits";
        setTimeout(() => {
            phonerr.innerHTML = "";
        }, 2000);

    }

});

email.addEventListener("keyup", (e) => {
    if (!email.value.includes("@") || !email.value.includes(".com")) {
        mailerr.innerHTML = "Please enter a valid email e.g. " + `<i>you@mail.com`;
    } else {
        mailerr.innerHTML = "";
    }
});


password.addEventListener("keyup", (e) => {
    if (password.value.length < 8) {
        p1err1.innerHTML = "Password should be at least 8 characters";
    } else {
        p1err1.innerHTML = "";
    }
    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    function containsCapLetter(str) {
        const specialChars = /[A-Z]/;
        return specialChars.test(str);
    }

    function containsLetter(str) {
        const specialChars = /[a-z]/;
        return specialChars.test(str);
    }

    if (!containsSpecialChars(password.value) && !containsCapLetter(password.value) && !containsLetter(password.value)) {
        p1err2.innerHTML = '❌ Very Weak Password';
        setTimeout(() => {
            p1err2.innerHTML = "";
        }, 2000);
    } else if (!containsSpecialChars(password.value) && !containsCapLetter(password.value)) {
        p1err2.innerHTML = '⚠️ Password not strong enough';
        setTimeout(() => {
            p1err2.innerHTML = "";
        }, 2000);
    }
    if (containsSpecialChars(password.value) && containsCapLetter(password.value) && containsLetter(password.value)) {
        p1err2.textContent = '✅ Very Strong Password';
        p1err2.style.color = "green";
        setTimeout(() => {
            p1err2.innerHTML = "";
        }, 5000);
    }
});


password2.addEventListener("keyup", (e) => {
    if (password2.value.length < 8) {
        p2err1.innerHTML = "Password should be at least 8 characters";
    } else {
        p2err1.innerHTML = "";
    }
    function containsSpecialChars(str) {
        const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
        return specialChars.test(str);
    }

    function containsCapLetter(str) {
        const specialChars = /[A-Z]/;
        return specialChars.test(str);
    }

    function containsLetter(str) {
        const specialChars = /[a-z]/;
        return specialChars.test(str);
    }

    if (!containsSpecialChars(password2.value) && !containsCapLetter(password2.value) && !containsLetter(password2.value)) {
        p2err2.innerHTML = '❌ Very Weak Password';
        setTimeout(() => {
            p2err2.innerHTML = "";
        }, 2000);
    } else if (!containsSpecialChars(password2.value) && !containsCapLetter(password2.value)) {
        p2err2.innerHTML = '⚠️ Password not strong enough';
        setTimeout(() => {
            p2err2.innerHTML = "";
        }, 2000);
    } else if (containsSpecialChars(password2.value) && containsCapLetter(password2.value) && containsLetter(password2.value)) {
        p2err2.innerHTML = '✅ Very Strong Password';
        setTimeout(() => {
            p2err2.innerHTML = "";
        }, 5000);
    }
});


accept.addEventListener("change", (e) => {
    if (accept.checked = true) {
        submit.disabled = false;
    } else {
        submit.disabled = true;
    }
});


function validate() {
    for (let i = 0; i < inputs.length; i++) {
        let item = inputs[i];
        if (item.value === "") {
            Gnerr.innerHTML = "Please fill all Required fields *";
        }
        else {
            Gnerr.innerHTML = "";
        }

        for (let j = 0; j < err.length; j++) {
            let elem = err[j];

            if (item.value === "" && i == j) {
                elem.innerHTML = "Please fill this field"
            } else if (!item.value == "" && i == j) {
                elem.innerHTML = ""
            }
        }
    }

    if (password.value !== password2.value) {
        p1err1.innerHTML = "Passwords do not match";
        p2err1.innerHTML = "Passwords do not match";
    }

    if (phone.value.length >= 1 && phone.value.length < 10) {
        phonerr.innerHTML = "Phone number should be 11 digits";

    }

    // for (let i = 0; i < select.length; i++) {
    //     let item = select[i];
    //     for (let j = 0; j < errval.length; j++) {
    //         let elem = errval[j]

    //         if (item.value === "" && i == j) {
    //             elem.innerHTML = "Please fill this field"
    //         } else if (!item.value == "" && i == j) {
    //             elem.innerHTML = ""
    //         }
    //     }
    // }

    if (p1err1.innerHTML.length > 0) {
        document.body.style.backgroundColor = 'red'
    } else {
        document.body.style.backgroundColor = 'green';
    }

    

}