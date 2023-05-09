const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    alert("hey hey");
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    console.log(email, "is the email entered");

    try {
      
    } catch (error) {
      
    }
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
  const age = document.getElementById('age').value;
  const phoneNumber = document.getElementById('phoneNumber').value;
  const accountType = document.getElementById('accountType').value;
  const role = document.getElementById('role').value;

  if (!firstName || !lastName || !email || !password || !phoneNumber || !accountType || !role, !age) {
    throw 'Enter all the details';
  }

  if (firstName.length < 2) {
    errors.push('First name must be at least 2 characters long.');
  }

  if (lastName.length < 2) {
    errors.push('Last name must be at least 2 characters long.');
  }

  if (!email.includes('@')) {
    errors.push('Email must contain an "@" symbol.');
  } 

  // Check email format
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address.');
    return false;
  }

  if(age < 13)
    alert('You cannot be under 13 to register');

  // Check password strength
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!passwordRegex.test(password)) {
    alert('Please enter a password with at least 8 characters, including at least one letter and one number.');
    return false;
  }

  // Check phone number format
  const phoneRegex = /^\d{10}$/;
  if (!phoneRegex.test(phoneNumber)) {
    alert('Please enter a valid 10-digit phone number.');
    return false;
  }

  // Send the sign up request to the server
  const response = await fetch('/sign-up', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ firstName, lastName, email, password, phoneNumber, accountType, role })
  });

  if (response.ok) {
    // Successful sign up, redirect to the login page
    window.location.href=data.redirectUrl;
    window.location.href = '/login';
   
  } else {
    // Sign up failed, display the error message
    alert(response.message);
  }
});

async function  handleUserPref(event) {
  
  let buttonVal=event.target.value;
        
  const response = await fetch('/user-pref', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountType: buttonVal})
    });
    
  let data = await response.json();

  if (response.ok) {

    window.location.href = data.redirectUrl;

  } else {
    throw "Invalid Button Value, only click on the given button";
  }

}


// search rental listner: client side validation
const search_rentals = document.getElementById('search_rentals');
if (search_rentals) {
  search_rentals.addEventListener('submit', async (event) => {
    event.preventDefault();

    const location = document.getElementById('location').value;
    const price = document.getElementById('price').value;
    const availability = document.getElementById('availability').value;
    const amenities = document.getElementById('amenities').value;
    const role = document.getElementById('role').value;

    if (!location || !price || !available || !amenities) {
      throw 'Please fill in all required fields';
    }
    // Send the sign up request to the server
    const response = await fetch('/search_rentals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ location, price, availability, amenities })
    });

    //   if (response.ok) {
    //     // Successful sign up, redirect to the login page
    //     window.location.href = '/login';
    //   } else {
    //     // Sign up failed, display the error message
    //     alert(response.message);
    //   }
  });

//   if (response.ok) {
//     // Successful sign up, redirect to the login page
//     window.location.href = '/login';
//   } else {
//     // Sign up failed, display the error message
//     alert(response.message);
//   }
}

// review through AJAX request
const reviews = document.getElementById('reviews');
if (reviews) {
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
    body: JSON.stringify({ review, property_id: req.params.id })
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'My Location'
  });
