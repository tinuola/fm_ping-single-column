/* 
ToDo:
- Set email state back to null after clearing error 
- Set form height to prevent ping image "jump"
- Transition form out after successful submit
- Add success message 
? How to validate on type/input
*/

let emailInput = document.getElementById( 'email-input' )
let errMsgDisplay = document.querySelectorAll( '.error-msg' )
let errMsgMobile = document.getElementById( 'error-msg__mobile' )
let errMsgDesktop = document.getElementById( 'error-msg__desktop' )
let submitBtn = document.querySelector( 'button' )

let isEmailInputValid = null
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


/*
 * Toggle display position of error message depending
 * on window/screen size
 */
function displayErrorMsg () {
  let msg = `Please provide a valid email address`

  if ( window.innerWidth < 800 ) {

    errMsgMobile.style.display = 'block'
    errMsgMobile.innerHTML = msg

    errMsgDesktop.style.display = 'none'
    errMsgDesktop.innerHTML = ''

  } else {

    errMsgDesktop.style.display = 'block'
    errMsgDesktop.innerHTML = msg

    errMsgMobile.style.display = 'none'
    errMsgMobile.innerHTML = ''
  }
}


/*
 * Reset input field after incorrect input 
 */
function clearErrorState ( e ) {
  if ( ( !isEmailInputValid || emailInput.length < 1 ) && e.key !== 'Enter' ) {

    emailInput.classList.remove( 'error-state' )

    errMsgDisplay.forEach( field => field.style.display = 'none' )

    window.removeEventListener( 'resize', displayErrorMsg )
  }
}


/*
 * If email is invalid, update UI and add listener to window 
 * object to change placement of error message depending on 
 * window size; add listener to input field to clear incorrect 
 * user input
*/
function validateEmail ( e ) {
  e.preventDefault();

  let emailInputData = emailInput.value

  if ( emailInputData.length === 0 || !emailRegex.test( emailInputData ) ) {

    isEmailInputValid = false

    emailInput.classList.add( 'error-state' )

    displayErrorMsg()

    window.addEventListener( 'resize', displayErrorMsg )

    emailInput.addEventListener( 'keyup', clearErrorState )

  } else {

    // Reset form
    emailInput.value = ''
    isEmailInputValid = null

    // Display success message

  }
}


submitBtn.addEventListener( 'click', validateEmail )