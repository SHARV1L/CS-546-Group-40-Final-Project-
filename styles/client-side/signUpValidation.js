function validateSignUpForm(form) {
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value.trim();
    const phoneNumber = form.phoneNumber.value.trim();
    const role = form.role.value.trim();
  
    if (!firstName) {
      alert('First Name is required.');
      return false;
    }
  
    if (!lastName) {
      alert('Last Name is required.');
      return false;
    }
  
    if (!email || !validateEmail(email)) {
      alert('A valid Email is required.');
      return false;
    }
  
    if (!password || password.length < 6) {
      alert('Password is required and must be at least 6 characters long.');
      return false;
    }
  
    if (!phoneNumber || !validatePhoneNumber(phoneNumber)) {
      alert('A valid Phone Number is required.');
      return false;
    }
  
    if (!role) {
      alert('Role is required.');
      return false;
    }
  
    return true;
  }
  
  function validateEmail(email) {
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
    return emailRegex.test(email);
  }
  
  function validatePhoneNumber(phoneNumber) {
    const phoneNumberRegex = /^\d{10}$/;
    return phoneNumberRegex.test(phoneNumber);
  }
  
  const signUpButton = document.getElementById('signup-btn');
  signUpButton.addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default form submission behavior
  
    const form = document.getElementById('sign-up-form');
  
    // Perform form validation
    if (!validateSignUpForm(form)) {
      return;
    }
  
    form.submit(); // submit the form if validation is successful
  });
  