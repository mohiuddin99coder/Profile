const Name = document.querySelector('#Name')
const dob = document.querySelector('#dob')
const phoneNum = document.querySelector('#phoneNum')
const education = document.getElementsByName('Education')
const languages = document.getElementsByName('Language')
const email = document.querySelector('#email')
const movie = document.querySelector('#movies')
const aboutSelf = document.querySelector('#aboutself')
const profileModal = document.querySelector('#profile-modal')
const modalTable = document.querySelector('.modal-table');

let errMsg;
const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
const elements = [Name, dob, phoneNum, education, languages, email, movie, aboutSelf]

const btnSubmit = document.querySelector('.btn-submit')
btnSubmit.addEventListener('click', () => {
    Validation()
    blur()
})

const btnReset = document.querySelector('.btn-reset')
btnReset.addEventListener('click', () => {
    Name.value = ""
    Name.value = ""
    dob.value = ""
    phoneNum.value = ""
    education.value = ""
    email.value = ""
    movie.value = ""
    aboutSelf.value = ""
    btnSubmit.classList.remove('disabled')
    btnSubmit.removeAttribute('data-bs-toggle', 'modal')
    btnSubmit.removeAttribute('data-bs-target', '#profile-modal')
    for (let i = 0; i < education.length; i++) education[i].checked = false
    for (let i = 0; i < languages.length; i++) languages[i].checked = false
    for (element of elements) {
        let elName = element.name
        removeMsg(element, elName)
    }
})

function errorMsg(element, errMsg) {
    countError++
    if (element == education) {
        document.querySelector('.educationMsg').innerHTML = errMsg
    } else if (element == languages) {
        document.querySelector('.languageMsg').innerHTML = errMsg
    } else {
        element.nextElementSibling.innerHTML = errMsg;
        element.classList.add('errorBox')
    }
}
function removeMsg(element, elName) {
    let course, language;
    if (element == education) {
        for (let i = 0; i < education.length; i++) {
            if (education[i].checked) course = education[i].value
        }
        document.querySelector(`#modal-Education`).innerHTML = course
        document.querySelector('.educationMsg').innerHTML = ""
    } else if (element == languages) {
        if(languages[0].checked && languages[1].checked && languages[2].checked) language = `${languages[0].value},${languages[1].value},${languages[2].value}`
        else if(languages[0].checked && languages[1].checked ) language = `${languages[0].value},${languages[1].value}`
        else if(languages[0].checked && languages[2].checked ) language = `${languages[0].value},${languages[2].value}`
        else if(languages[1].checked && languages[2].checked ) language = `${languages[1].value},${languages[2].value}`
        else if(languages[0].checked) language = `${languages[0].value}`
        else if(languages[1].checked) language = `${languages[1].value}`
        else if(languages[2].checked) language = `${languages[2].value}`
        document.querySelector(`#modal-Language`).innerHTML = language
        document.querySelector('.languageMsg').innerHTML = ""
    } else {
        document.querySelector(`#modal-${elName}`).innerHTML = element.value
        element.nextElementSibling.innerHTML = "";
        element.classList.remove('errorBox')
    }

}
function blur() {
    for (let i = 0; i < elements.length; i++) {
        if (elements[i] == education || elements[i] == languages) {
            for (let j = 0; j < elements[i].length; j++) {
                elements[i][j].addEventListener('blur', Validation)
            }
        } else {
            elements[i].addEventListener('blur', Validation)
        }
    }
}
function Validation() {
    countError = 0;
    elements.forEach((element) => {
        let elName = element.name
        if (isNaN(phoneNum.value)) {
            errMsg = "❌not a valid number"
            errorMsg(phoneNum, errMsg)
        } else if (phoneNum.value.length < 10 || phoneNum.value.length > 10) {
            errMsg = "❌number length should 10"
            errorMsg(phoneNum, errMsg)
        }
        if (!email.value.match(mailFormat)) {
            errMsg = '❌enter valid email-id'
            errorMsg(email, errMsg)
        }
        if (element == education || element == languages) {
            let check = 0
            for (let i = 0; i < element.length; i++) {
                if (element[i].checked == false) {
                    check++
                }
            }
            if (check == element.length) {
                errMsg = element == education ? '❌ Select your education' : '❌ please select atleast one language'
                errorMsg(element, errMsg)
            } else {
                removeMsg(element, elName)
            }
        } else {
            errMsg = `❌ ${elName} is required`
            element.value == "" ? errorMsg(element, errMsg) : removeMsg(element, elName)
        }

        if (countError != 0) {
            btnSubmit.classList.add('disabled')
        } else if(countError == 0) {
            btnSubmit.classList.remove('disabled')
            btnSubmit.setAttribute('data-bs-toggle', 'modal')
            btnSubmit.setAttribute('data-bs-target', '#profile-modal')
        }
    })
}

