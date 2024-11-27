const dH = window.innerHeight;
const dW = window.innerWidth;

const page = document.querySelector('.page');
page.style.height = dH;
page.style.width = dW;

const sign_up = document.querySelector('.sign_up');

const sign_in = document.querySelector('.sign_in');

const verify = document.querySelector('.verify');

const main_page = document.querySelector('.main_page');

const d_applications = document.querySelector('.d_applications');

const w_applications = document.querySelector('.w_applications');

const d_application_page = document.querySelector('.d_application_page');

const w_application_page = document.querySelector('.w_application_page');

const tasks_page = document.querySelector('.tasks_page');

const task_page = document.querySelector('.task_page');

const help_page = document.querySelector('.help_page');

const about_page = document.querySelector('.about_page');

const notification_page = document.querySelector('.notification_page');

const no_task_page = document.querySelector('.no_task_page');

const profile_page = document.querySelector('.profile_page');

const transfer_to_fnd_page = document.querySelector('.transfer_to_fnd_page');

const deposit_page = document.querySelector('.deposit_page');

const withdraw_page = document.querySelector('.withdraw_page');

const applied_page = document.querySelector('.applied_page');

const err = document.querySelector('.err');


const toSignIn = document.getElementById('toSignIn');
toSignIn.addEventListener('click', () => {
  sign_up.style.display = 'none';
  sign_in.style.display = 'block';
});

const refresh = document.getElementById('refresh');
refresh.addEventListener('click', () => {
  location.reload();
});


const toSignUp = document.getElementById('toSignUp');
toSignUp.addEventListener('click', () => {
  sign_in.style.display = 'none';
  sign_up.style.display = 'block';
});

const userNamebtn = document.getElementById('userNamebtn');
userNamebtn.addEventListener('click', () => {
  main_page.style.display = 'none';
  profile_page.style.display = 'block';
});

const tasks = document.getElementById('tasks');
tasks.addEventListener('click', () => {
  main_page.style.display = 'none';
  tasks_page.style.display = 'block';
});

const transfer = document.getElementById('transfer');
transfer.addEventListener('click', () => {
  main_page.style.display = 'none';
  transfer_to_fnd_page.style.display = 'block';
});

const HELP = document.getElementById('H');
HELP.addEventListener('click', () => {
  main_page.style.display = 'none';
  help_page.style.display = 'block';
});
const ABOUT = document.getElementById('A');
ABOUT.addEventListener('click', () => {
  main_page.style.display = 'none';
  about_page.style.display = 'block';
});

const DApplications = document.getElementById('DApplications');
DApplications.addEventListener('click', () => {
  main_page.style.display = 'none';
  d_applications.style.display = 'block';
});

const DAsBack = document.getElementById('DAsBack');
DAsBack.addEventListener('click', () => {
  d_applications.style.display = 'none';
  main_page.style.display = 'block';
});

const WApplications = document.getElementById('WApplications');
WApplications.addEventListener('click', () => {
  main_page.style.display = 'none';
  w_applications.style.display = 'block';
});

const WAsBack = document.getElementById('WAsBack');
WAsBack.addEventListener('click', () => {
  w_applications.style.display = 'none';
  main_page.style.display = 'block';
});

const DapplicationBack = document.getElementById('DapplicationBack');
DapplicationBack.addEventListener('click', () => {
  d_application_page.style.display = 'none';
  d_applications.style.display = 'block';
});

const WapplicationBack = document.getElementById('WapplicationBack');
WapplicationBack.addEventListener('click', () => {
  w_application_page.style.display = 'none';
  w_applications.style.display = 'block';
});

const notificationBack = document.getElementById('notificationBack');
notificationBack.addEventListener('click', () => {
  notification_page.style.display = 'none';
  main_page.style.display = 'block'
});


const profileBack = document.getElementById('profileBack');
profileBack.addEventListener('click', () => {
  profile_page.style.display = 'none';
  main_page.style.display = 'block';
});

const tasksBack = document.getElementById('tasksBack');
tasksBack.addEventListener('click', () => {
  tasks_page.style.display = 'none';
  main_page.style.display = 'block';
});

const dipBack = document.getElementById('dipBack');
dipBack.addEventListener('click', () => {
  deposit_page.style.display = 'none';
  main_page.style.display = 'block';
});

const withdrawBack = document.getElementById('withdrawBack');
withdrawBack.addEventListener('click', () => {
  withdraw_page.style.display = 'none';
  main_page.style.display = 'block';
});

const appliedBack = document.getElementById('appliedBack');
appliedBack.addEventListener('click', () => {
  applied_page.style.display = 'none';
  main_page.style.display = 'block';
});

const ttfBack = document.getElementById('ttfBack');
ttfBack.addEventListener('click', () => {
  transfer_to_fnd_page.style.display = 'none';
  main_page.style.display = 'block';
});

const pendingBack = document.getElementById('pendingBack');
pendingBack.addEventListener('click', () => {
  task_page.style.display = 'none';
  main_page.style.display = 'block';
});

const helpBack = document.getElementById('helpBack');
helpBack.addEventListener('click', () => {
  help_page.style.display = 'none';
  main_page.style.display = 'block';
});

const aboutBack = document.getElementById('aboutBack');
aboutBack.addEventListener('click', () => {
  about_page.style.display = 'none';
  main_page.style.display = 'block';
});

const noPendingTaskBack = document.getElementById('noPendingTaskBack');
noPendingTaskBack.addEventListener('click', () => {
  no_task_page.style.display = 'none';
  main_page.style.display = 'block';
});
