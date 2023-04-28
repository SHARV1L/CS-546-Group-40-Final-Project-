const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        body: JSON.stringify({username: email, password: password})
      });    

    const result = await response.json();
        if (result.message === 'Invalid credentials') {
            throw 'Invalid credentials';
        } else {
            location.href = '/users';
        }
});

const signUpForm = document.getElementById('signup-form');

signUpForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const accountType = document.getElementById('accountType').value;

  if (!firstName || !lastName || !email || !password || !phoneNumber || !accountType) {
    throw 'Please fill in all required fields';
  }
  // Send the sign up request to the server
  const response = await fetch('/sign-up', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstName, lastName, email, password, phoneNumber, accountType })
  });

  if (response.ok) {
    // Successful sign up, redirect to the login page
    window.location.href = '/login';
  } else {
    // Sign up failed, display the error message
    alert(response.message);
  }
});

//user-prefer button submit
const userpref = document.getElementById('user-pref');

userpref.addEventListener("submit", async (event) => {
  event.preventDefault();

  var buttonVal = event.submitter.value;

  const response = await fetch('user-pref', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ buttonVal })
  });

  if (response.ok) {
    // Successful sign up, redirect to the login page
    window.location.href = '/user-pref';
  } else {
    alert('error');
  }

})

const search_rentals = document.getElementById('search_rentals');

search_rentals.addEventListener('submit', async (event) => {
  event.preventDefault();

  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const availability = document.getElementById('availability').value;
  const amenities = document.getElementById('amenities').value;
  //const role = document.getElementById('role').value;

  if ( !location || !price || !available || !amenities ) {
    throw 'Please fill in all required fields';
  }
  // Send the sign up request to the server
  const response = await fetch('/search_rentals', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ location, price, availability, amenities})
  });

//   if (response.ok) {
//     // Successful sign up, redirect to the login page
//     window.location.href = '/login';
//   } else {
//     // Sign up failed, display the error message
//     alert(response.message);
//   }
});

const reviews = document.getElementById('reviews');

search_rentals.addEventListener('submit', async (event) => {
  event.preventDefault();

  const location = document.getElementById('reviews').value;

  if ( !reviews ) {
    throw 'Please fill in the review';
  }
  // Send the sign up request to the server
  const response = await fetch('/property/reviews', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ reviews })
  });

});
