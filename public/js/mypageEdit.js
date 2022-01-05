import validate from './validate.js';

const $completeButton = document.querySelector('.complete-button');
const $email = document.querySelector('.mypage-form-email > input');
const $name = document.querySelector('.mypage-form-name > input');
const $phone = document.querySelector('.mypage-form-phone > input');
const $password = document.querySelector('.mypage-form-password > input');

let nowUserPassword;
let
  nowUserId;

window.onload = async () => {
  const {
    data: user
  } = await axios.get('/jjongBin');
  console.log('GET', user);

  $email.value = user.email;
  $name.value = user.name;
  $phone.value = user.phone;

  nowUserId = user.id;
  nowUserPassword = user.password;

  console.log($email.value);
};

document.querySelector('.mypage-form').oninput = e => {
  if (e.target.matches('#name')) {
    validate.nameValidate(e.target.value, 0, $completeButton);
  } else if (e.target.matches('#phone')) {
    validate.phoneValidate(e.target.value, 1, $completeButton);
  } else if (e.target.matches('#password')) {
    validate.passwordValidate(e.target.value, 2, $completeButton);
  } else if (e.target.matches('#confirm-password')) {
    validate.passwordConfirmValidate(document.querySelector('#password').value !== e.target.value, 3, $completeButton);
  }
};

$completeButton.onclick = async e => {
  e.preventDefault();
  try {
    await axios.patch(`/users/${nowUserId}`, {
      name: $name.value,
      phone: $phone.value,
      password: $password.value,
    });

    window.location.href = '/mypage';
  } catch (e) {
    console.error(e);
  }
};

const $modal = document.querySelector('.popup');
const $modalError = $modal.querySelector('.error');
const popupHandle = () => {
  document.querySelector('.cover').classList.toggle('hidden');
  $modal.classList.toggle('hidden');
  $modalError.textContent = '';
};

document.querySelector('.withdraw-button').onclick = e => {
  e.preventDefault();
  popupHandle();
};
$modal.querySelector('.cancle-button').onclick = () => {
  popupHandle();
};

const $deletePasswordCheck = $modal.querySelector('.delete-password');
$deletePasswordCheck.oninput = async () => {
  if ($deletePasswordCheck.value === nowUserPassword) {
    $modal.querySelector('.delete-button').removeAttribute('disabled');
    // await axios.delete(`/users/${nowUserId}`);
    // window.location.href = '/signin.html';
    $modalError.textContent = '';
  } else {
    $modalError.textContent = '비밀번호가 일치하지 않습니다!';
  }
};