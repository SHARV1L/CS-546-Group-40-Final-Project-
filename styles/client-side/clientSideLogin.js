// const loginForm = document.getElementById('login-form');

// loginForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const email = document.getElementById('email').value;
//     const password = document.getElementById('password').value;

//     console.log(email, "is the email entered");

//     const response = await fetch('/login', {
//         method: 'POST',
//         body: JSON.stringify({username: email, password: password})
//       });    

//     const result = await response.json();
//         if (result.message === 'Invalid credentials') {
//             throw 'Invalid credentials';
//         } else {
//             location.href = '/users';
//         }
// });

// const signUpForm = document.getElementById('signup-form');

// signUpForm.addEventListener('submit', async (event) => {
//   event.preventDefault();

//   const firstName = document.getElementById('firstName').value;
//   const lastName = document.getElementById('lastName').value;
//   const email = document.getElementById('email').value;
//   const password = document.getElementById('password').value;
//   const phoneNumber = document.getElementById('phoneNumber').value;
//   const accountType = document.getElementById('accountType').value;
//   const role = document.getElementById('role').value;

//   if (!firstName || !lastName || !email || !password || !phoneNumber || !accountType || !role) {
//     throw 'Please fill in all required fields';
//   }
//   // Send the sign up request to the server
//   const response = await fetch('/sign-up', { 
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ firstName, lastName, email, password, phoneNumber, accountType, role })
//   });

//   if (response.ok) {
//     // Successful sign up, redirect to the login page
//     window.location.href = '/login';
//   } else {
//     // Sign up failed, display the error message
//     alert(response.message);
//   }
// });

async function  handleUserPref(ev) {
  
  let buttonVal=ev.target.value;
        
       
  const response = await fetch('/user-pref', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accountType: buttonVal})
    });
  let data = await response.json();
 
    if (response.ok) {
     
      window.location.href=data.redirectUrl;
     
    } else {
      throw "Invalid Button Value, only click on the given button";
    }
  
}




// search rental listner: client side validation
const search_rentals = document.getElementById('search_rentals');

search_rentals.addEventListener('submit', async (event) => {
  event.preventDefault();

  const location = document.getElementById('location').value;
  const price = document.getElementById('price').value;
  const availability = document.getElementById('availability').value;
  const amenities = document.getElementById('amenities').value;
  const role = document.getElementById('role').value;

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

function initMap() {
  var myLatLng = {lat: latitude, lng: longitude};

  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 12,
    center: myLatLng
  });

  var marker = new google.maps.Marker({
    position: myLatLng,
    map: map,
    title: 'My Location'
  });
}