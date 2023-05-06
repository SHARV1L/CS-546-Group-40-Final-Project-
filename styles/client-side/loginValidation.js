function validateLoginForm(form) {
    const username = form.username.value.trim();
    const password = form.password.value.trim();
  
    if (!username || username.length < 4) {
      alert('Username is required and must be at least 4 characters long.');
      return false;
    }
  
    if (!password || password.length < 6) {
      alert('Password is required and must be at least 6 characters long.');
      return false;
    }
  
    return true;
  }
  
  const loginButton = document.getElementById('login-btn');
  loginButton.addEventListener('click', function(event) {
    event.preventDefault(); // prevent the default form submission behavior
  
    const form = document.getElementById('login-form');
  
    // Perform form validation
    if (!validateLoginForm(form)) {
      return;
    }
  
    form.submit(); // submit the form if validation is successful
  });