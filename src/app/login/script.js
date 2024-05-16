const pass = document.getElementById('pass');
const passwordItem = document.getElementById('passwordItem');
const togglePassword = document.querySelector('#passwordItem ion-icon[name="eye"]');

pass.addEventListener('input', () => {
  const isPasswordEmpty = pass.value.trim() === '';
  togglePassword.style.display = isPasswordEmpty ? 'none' : 'flex';
});

togglePassword.addEventListener('click', () => {
  const type = pass.getAttribute('type') === 'password' ? 'text' : 'password';
  pass.setAttribute('type', type);
  togglePassword.name = type === 'password' ? 'eye' : 'eye-off';
});
