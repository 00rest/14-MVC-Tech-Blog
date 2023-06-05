function hideLoginBox() {
    document.getElementById('login-box').setAttribute("class", "hide");
    document.getElementById('signup-box').setAttribute("class", "");
};

function hideSignupBox() {
  document.getElementById('signup-box').setAttribute("class", "hide");
  document.getElementById('login-box').setAttribute("class", "");
};

const loginFormHandler = async (event) => {
  event.preventDefault();

  // Collect values from the login form
  const email = document.querySelector('#email-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace('/dashboard');
    } else {
      alert('Incorrect email or password, please try again');

    }
  }
};

const signupFormHandler = async (event) => {
  event.preventDefault();

  const user_name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (user_name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ user_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
};

document
  .getElementById('login-btn')
  .addEventListener('click', loginFormHandler);

document
  .getElementById('signup-btn')
  .addEventListener('click', signupFormHandler);
