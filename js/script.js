let emailInput = document.getElementById( 'email-input' )
let emailInputData = null

let errMsgDisplay = document.querySelectorAll( '.error-msg' )
let errMsgMobile = document.getElementById( 'error-msg__mobile' )
let errMsgDesktop = document.getElementById( 'error-msg__desktop' )

let submitBtn = document.querySelector( 'button' )

let emailValidityStatus = null
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


submitBtn.addEventListener( 'click', validateEmail )


function displayErrorMsg () {
  let msg = `Please provide a valid email address`

  if ( window.innerWidth < 800 ) {

    errMsgDisplay[ 0 ].style.display = 'block'
    errMsgMobile.innerHTML = msg

    errMsgDisplay[ 1 ].style.display = 'none'
    errMsgDesktop.innerHTML = ''

  } else {

    errMsgDisplay[ 1 ].style.display = 'block'
    errMsgDesktop.innerHTML = msg

    errMsgDisplay[ 0 ].style.display = 'none'
    errMsgMobile.innerHTML = ''
  }
}


function clearErrorState ( e ) {
  if ( ( !validEmailStatus || emailInput.length < 1 ) && e.key !== 'Enter' ) {

    emailInput.classList.remove( 'error-state' )

    errMsgDisplay.forEach( field => field.style.display = 'none' )

    window.removeEventListener( 'resize', displayErrorMsg )
  }
}


function validateEmail ( e ) {
  e.preventDefault();

  emailInputData = emailInput.value

  if ( emailInputData.length === 0 || !emailRegex.test( emailInputData ) ) {

    validEmailStatus = false

    emailInput.classList.add( 'error-state' )

    displayErrorMsg()

    window.addEventListener( 'resize', displayErrorMsg )

    emailInput.addEventListener( 'keyup', clearErrorState )

  } else {

    emailInput.value = ''

  }
}
