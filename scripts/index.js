$(function() {
  // components
  const form = $('#form-login');
  const email = $('#input-email');
  const password = $('#input-password');

  const modal = $('#login-modal');

  const loginButton = $('#btn-login');

  const navBar = $('.navbar-nav');

  // functions
  function doLogin(e) {
    e.preventDefault();

    const emailValue = email.val();
    const passwordValue = password.val();

    if (!emailValue || !passwordValue) {
      return alert('email or password is empty!');
    }

    const nextMinutes = new Date();
    nextMinutes.setMinutes(nextMinutes.getMinutes() + 10);

    // emailValue.split('@') => ['abc', 'email.com']
    document.cookie = `username=${emailValue.split('@')[0]}; expires=${nextMinutes.toUTCString()};`

    // close login modal
    $('body').removeClass('modal-open');
    modal.removeClass('show');
    $('.modal-backdrop').remove();

    showUsername();
  }

  // show username if it has in cookie
  function showUsername() {
    const cookies = decodeURIComponent(document.cookie).split(';');

    if (cookies.length < 1 || cookies[0] === "") {
      // if theres no cookie, do nothing
      return;
    }

    const username = cookies[0].split('=')[1];

    loginButton.hide();

    navBar.append(`
      <li class="nav-item">
        <a class="nav-link text-success" href="#">Welcome, ${username}</a>
      </li>
    `);
  }

  // event listeners
  form.on('submit', doLogin);

  showUsername();
})