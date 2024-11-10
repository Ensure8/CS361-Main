function login(form) {
  form.addEventListener('submit', (event) => {
      event.preventDefault();

      const username = document.getElementById('loginUsernameInput').value;
      const password = document.getElementById('loginPasswordInput').value;

      fetch('/getCredentials').then(response => response.text()).then(data => {
              const lines = data.split('\n');
              const credentials = lines.filter(line => line.includes(username + ':' + password));
              if (credentials.length > 0) {
                  const expiration = new Date();
                  expiration.setDate(expiration.getDate() + 1);
                  document.cookie = `username=${username}; expires=${expiration.toUTCString()}; SameSite=Lax;`;
                  window.location.href = 'Dashboard.html';
              } else {
                  alert('Invalid username or password.');
              }
          });
  });
}

function checkCookieCredentials(){
    let loggedIn = false;
    let cookieStrings = document.cookie.split(';');

    for (let cookie of cookieStrings) {
        if (cookie.startsWith('username')) {
          loggedIn = true;
          if (loggedIn){
            
            return;
          }
        } 
    }
    if (!loggedIn) {window.location.href = 'Login.html';}
}

/*
function hideAuthButtons(){
  let cookieStrings = document.cookie.split(';');

    for (let cookie of cookieStrings) {
      if (cookie.startsWith('username')) {
        const loginButtons = document.getElementById('LoginSignUpButtons');
        loginButtons.innerHTML = `<a href="Logout.html">Logout</a>`;
      }
    }
}

/*
  if (window.location.href === 'Login.html' || window.location.href === 'Signup.html') {window.location.href = 'Dashboard.html';}
}

function handleLogout() {
  // Clear the session cookie or other authentication tokens
  document.cookie = 'username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  // Redirect to the login page or other appropriate action
  window.location.href = 'login.html';
}*/