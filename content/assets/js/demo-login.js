(function () {
  'use strict';

  var demoUsername = 'demo@trithuctrebooks.vn';
  var demoPassword = '123456';

  function completeDemoLogin(event) {
    if (event) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }

    var button = document.getElementById('btn-login');
    localStorage.setItem('ttb-demo-authenticated', 'true');
    localStorage.setItem('ttb-demo-user', demoUsername);

    if (button) {
      button.disabled = true;
      button.querySelector('span').textContent = '\u0110\u0103ng nh\u1eadp th\u00e0nh c\u00f4ng';
    }

    window.setTimeout(function () {
      window.location.href = 'index.html';
    }, 350);
  }

  function initDemoLogin() {
    var form = document.getElementById('loginForm');
    var originalButton = document.getElementById('btn-login');
    if (!form || !originalButton) return;

    var username = form.querySelector('input[name="UserName"]');
    var password = form.querySelector('input[name="Password"]');
    if (username) {
      username.value = demoUsername;
      username.autocomplete = 'username';
    }
    if (password) {
      password.value = demoPassword;
      password.autocomplete = 'current-password';
    }

    var button = originalButton.cloneNode(true);
    originalButton.replaceWith(button);
    button.addEventListener('click', completeDemoLogin);
    form.addEventListener('submit', completeDemoLogin);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDemoLogin);
  } else {
    initDemoLogin();
  }
})();
