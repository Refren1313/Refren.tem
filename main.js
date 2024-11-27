import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, sendEmailVerification, signInWithEmailAndPassword, signOut } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, getDocs, updateDoc, collection, deleteDoc, arrayUnion, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


const sign_up = document.querySelector('.sign_up');

const sign_in = document.querySelector('.sign_in');

const verify = document.querySelector('.verify');

const main_page = document.querySelector('.main_page');

const task_page = document.querySelector('.task_page');

const help_page = document.querySelector('.help_page');

const about_page = document.querySelector('.about_page');

const profile_page = document.querySelector('.profile_page');

const no_task_page = document.querySelector('.no_task_page');

const already_applied_page = document.querySelector('.already_applied_page');

const notification_page = document.querySelector('.notification_page');

const wrongPassword = document.querySelector('.wrongPassword');

const signup = document.getElementById('SignUp');

const signin = document.getElementById('SignIn');

const cards = document.querySelectorAll('.cards');

const NHEM = document.querySelector('.not_have_enough_money');


const firebaseConfig = {
  apiKey: "AIzaSyDvAB1YlK4KYsK9_93vlLC130xa_0iBiq4",
  authDomain: "refren-1313.firebaseapp.com",
  projectId: "refren-1313",
  storageBucket: "refren-1313.firebasestorage.app",
  messagingSenderId: "961146785168",
  appId: "1:961146785168:web:05085a87977dd28eadb715",
  measurementId: "G-FL0YD8TLKN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


onAuthStateChanged(auth, async (user) => {
  if (user) {
    if (user.emailVerified) {
      const res = user;
      main_page.style.display = 'block';

      if (res.uid == 'g20a6vL6orTN3oamOjrZyJ0CVl12') {
        const DA = document.querySelector('.AdminD');
        const WA = document.querySelector('.AdminW');
        DA.style.display = 'inline-block';
        WA.style.display = 'inline-block';
        const depositCol = (await getDocs(collection(db, 'deposit'))).docs.map(doc => doc.data());
        if (depositCol) {
          depositCol.forEach((item) => {
            const dep_applications = document.querySelector('.dep_applications');
            dep_applications.innerHTML = dep_applications.innerHTML + `<button class="dap" id="${item.accountNo}">${item.name} (${item.amount})</button>`;
            const dap = document.querySelectorAll('.dap');
            dap.forEach((i) => {
              i.addEventListener('click', () => {
                const d_application_page = document.querySelector('.d_application_page');
                d_applications.style.display = 'none';
                d_application_page.style.display = 'block';
                const fnD = async () => {
                  const depositData = (await getDoc(doc(db, 'deposit', i.id))).data();
                  const userData = (await getDoc(doc(db, 'users', i.id))).data();
                  const dName = document.querySelector('.dName');
                  const dID = document.querySelector('.dID');
                  const dAmount = document.querySelector('.dAmount');
                  const dBinance = document.querySelector('.dBinance');
                  const dOrder = document.querySelector('.dOrder');
                  dName.textContent = depositData.name;
                  dID.textContent = depositData.accountNo;
                  dAmount.textContent = depositData.amount;
                  dBinance.textContent = depositData.binance;
                  dOrder.textContent = depositData.order_ID;

                  const Daccept = document.getElementById('Daccept');
                  Daccept.addEventListener('click', async () => {
                    let newBalance = userData.balance + depositData.amount;
                    await updateDoc(doc(db, 'users', i.id), {
                      balance: newBalance,
                      deposit: false,
                      notificationInd: true,
                      notification: arrayUnion({
                        msg: `You have deposited ${depositData.amount}$.`
                      }),
                    });
                    await deleteDoc(doc(db, 'deposit', i.id));
                    location.reload();
                  });

                  const Ddeny = document.getElementById('Ddeny');
                  Ddeny.addEventListener('click', async () => {
                    await updateDoc(doc(db, 'users', res.uid), {
                      deposit: false,
                      notificationInd: true,
                      notification: arrayUnion({
                        msg: 'Your deposit application is denied.'
                      }),
                    });
                    await deleteDoc(doc(db, 'deposit', res.uid));
                    location.reload();
                  });
                }
                fnD();
              });
            });
          });
        }

        const withdrawCol = (await getDocs(collection(db, 'withdraw'))).docs.map(doc => doc.data());
        if (withdrawCol) {
          withdrawCol.forEach((item) => {
            const wit_applications = document.querySelector('.wit_applications');
            wit_applications.innerHTML = wit_applications.innerHTML + `<button class="wap" value="${item.accountNo}">${item.name} (${item.amount})</button>`;
            const wap = document.querySelectorAll('.wap');
            wap.forEach((i) => {
              i.addEventListener('click', () => {
                const w_application_page = document.querySelector('.w_application_page');
                w_applications.style.display = 'none';
                w_application_page.style.display = 'block';
                const fnW = async () => {
                  const withdrawData = (await getDoc(doc(db, 'withdraw', i.value))).data();
                  const userData = (await getDoc(doc(db, 'users', i.value))).data();
                  const wName = document.querySelector('.wName');
                  const wID = document.querySelector('.wID');
                  const wAmount = document.querySelector('.wAmount');
                  const wBinance = document.querySelector('.wBinance');
                  wName.textContent = withdrawData.name;
                  wID.textContent = withdrawData.accountNo;
                  wAmount.textContent = withdrawData.amount;
                  wBinance.textContent = withdrawData.binance;

                  const Waccept = document.getElementById('Waccept');
                  Waccept.addEventListener('click', async () => {
                    let newBalance = userData.balance - withdrawData.amount;
                    await updateDoc(doc(db, 'users', i.value), {
                      balance: newBalance,
                      withdraw: false,
                      notificationInd: true,
                      notification: arrayUnion({
                        msg: `You have withdrawn ${withdrawData.amount}$.`
                      }),
                    });
                    await deleteDoc(doc(db, 'withdraw', i.value));
                    location.reload();
                  });

                  const Wdeny = document.getElementById('Wdeny');
                  Wdeny.addEventListener('click', async () => {
                    await updateDoc(doc(db, 'users', i.value), {
                      withdraw: false,
                      notificationInd: true,
                      notification: arrayUnion({
                        msg: 'Your withdraw application is denied.'
                      }),
                    });
                    await deleteDoc(doc(db, 'withdraw', i.value));
                    location.reload();
                  });
                }
                fnW();
              });
            });

          });
        }
      }

      const userData = (await getDoc(doc(db, 'users', res.uid))).data();

      const referData = (await getDoc(doc(db, 'pendingTask', userData.referedBy))).data();

      const referingData = (await getDoc(doc(db, 'users', userData.referedBy))).data();

      const refer2Data = (await getDoc(doc(db, 'pendingTask', referingData.referedBy))).data();

      const depositData = (await getDoc(doc(db, 'deposit', res.uid))).data();

      const withdrawData = (await getDoc(doc(db, 'withdraw', res.uid))).data();

      const taskData = (await getDoc(doc(db, 'pendingTask', res.uid))).data();


      const userNameMain = document.querySelector('.userNameMain');
      userNameMain.textContent = userData.name;

      const userName = document.querySelector('.userName');
      userName.textContent = userData.name;

      const userID = document.querySelector('.userID');
      userID.textContent = userData.accountNo;

      const userEmail = document.querySelector('.userEmail');
      userEmail.textContent = userData.email;

      const user_phone = document.querySelector('.user_phone');
      user_phone.textContent = userData.phoneNumber;

      const refID = document.querySelector('.refID');
      refID.textContent = referingData.accountNo;

      const refName = document.querySelector('.refName');
      refName.textContent = referingData.name;

      if (taskData) {
        if (taskData.completed >= taskData.target) {
          await deleteDoc(doc(db, 'pendingTask', res.uid));
          let newBalance = userData.balance + taskData.return_amount;
          await updateDoc(doc(db, 'users', res.uid), {
            balance: newBalance,
            task: false,
            notificationInd: true,
            notification: arrayUnion({
              msg: `You got ${taskData.return_amount} $ by completing task.`,
            }),
          });
          location.reload();
        }
      };

      const PT = document.getElementById('PT');
      PT.addEventListener('click', () => {
        main_page.style.display = 'none';
        task_page.style.display = 'block';
      });

      const dip = document.getElementById('Dip');
      dip.addEventListener('submit', (e) => {
        e.preventDefault();
        dipSet();
      });
      const dipSet = async () => {
        const dip_binance = document.getElementById('dip_binance').value;
        const dip_amount = parseFloat(document.getElementById('dip_amount').value);
        const order_ID = document.getElementById('order_ID').value;

        await setDoc(doc(db, 'deposit', res.uid), {
          name: userData.name,
          accountNo: userData.accountNo,
          binance: dip_binance,
          amount: dip_amount,
          order_ID,
        });
        await updateDoc(doc(db, 'users', res.uid), {
          deposit: true,
        });
        location.reload();
      };

      const wit = document.getElementById('Wit');
      wit.addEventListener('submit', (e) => {
        e.preventDefault();
        witSet();
      });
      const witSet = async () => {
        const wit_binance = document.getElementById('wit_binance').value;
        const wit_amount = parseFloat(document.getElementById('wit_amount').value);
        const wit_password = document.getElementById('wit_password').value;

        if (wit_amount <= userData.walletBalance) {
          await setDoc(doc(db, 'withdraw', res.uid), {
            name: userData.name,
            accountNo: userData.accountNo,
            binance: wit_binance,
            amount: wit_amount,
          });
          await updateDoc(doc(db, 'users', res.uid), {
            withdraw: true,
          });
          location.reload();
        } else {
          const IWA = document.querySelector('.insufficient_wit_amount');
          IWA.textContent = 'You do not have enough money.'
        }
      };

      await onSnapshot(doc(db, 'users', res.uid), async () => {
        const userDataReal = (await getDoc(doc(db, 'users', res.uid))).data();

        const balance = document.querySelector('.balance');
        balance.textContent = userDataReal.balance;

        if (userData.task) {
          cards.forEach((c) => {
            c.disabled = true;
          });
        }
        if (!userData.task) {
          PT.disabled = true;
        }

        const indicator = document.getElementById('indicator');
        if (userDataReal.notificationInd) {
          indicator.classList.add('active_indicator');
        } else {
          indicator.classList.remove('active_indicator');
        }

        const notification_content = document.querySelector('.notification_content');
        notification_content.innerHTML = '';
        const notifications = userDataReal.notification;
        notifications.forEach(async (m) => {
          if (m) {
            notification_content.innerHTML = notification_content.innerHTML + `<div class="notificationBox"><span>${m.msg}</span></div>`;
          }
        });
      });

      await onSnapshot(doc(db, 'pendingTask', res.uid), async () => {
        const taskData = (await getDoc(doc(db, 'pendingTask', res.uid))).data();
        if (taskData) {
          const payment = document.querySelector('.payment');
          payment.textContent = taskData.payment;
          const return_amount = document.querySelector('.return_amount');
          return_amount.textContent = taskData.return_amount;
          const profit = document.querySelector('.profit');
          profit.textContent = taskData.return_amount - taskData.payment;
          const target = document.querySelector('.target');
          target.textContent = taskData.target;
          const completed = document.querySelector('.completed');
          completed.textContent = taskData.completed;
        }
      });

      const toNotification = document.getElementById('toNotification');
      toNotification.addEventListener('click', async () => {
        main_page.style.display = 'none';
        notification_page.style.display = 'block';
        await updateDoc(doc(db, 'users', res.uid), {
          notificationInd: false,
        })
      });

      const applied_page = document.querySelector('.applied_page');
      const deposit = document.getElementById('deposit');
      deposit.addEventListener('click', () => {
        main_page.style.display = 'none';
        if (!userData.deposit) {
          deposit_page.style.display = 'block';
        } else {
          applied_page.style.display = 'block';
        }
      });

      const withdraw = document.getElementById('withdraw');
      withdraw.addEventListener('click', () => {
        main_page.style.display = 'none';
        if (!userData.withdraw) {
          withdraw_page.style.display = 'block';
        } else {
          applied_page.style.display = 'block';
        }
      });

      cards.forEach((item) => {
        item.addEventListener('click', async () => {
          NHEM.textContent = '';
          const payment = parseFloat(item.name);
          const return_amount = parseFloat(item.id);
          const target = parseInt(item.value);

          if (userData.balance >= payment) {
            await setDoc(doc(db, 'pendingTask', res.uid), {
              payment,
              return_amount,
              target,
              completed: 0,
            });
            let newBalance = userData.balance - payment;
            await updateDoc(doc(db, 'users', res.uid), {
              task: true,
              balance: newBalance,
            });
            if (referData) {
              await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
                completed: referData.completed + 1,
              });
            }
            if (refer2Data) {
              await updateDoc(doc(db, 'pendingTask', referingData.referedBy), {
                completed: refer2Data.completed + 0.5,
              });
            }
            location.reload();
          } else {
            NHEM.textContent = 'You do not have enough money in your wallet to open this task card.';
            setTimeout(() => {
              NHEM.textContent = '';
            }, 2000);
          }
        });
      });


      const trToFn = document.getElementById('TrToFn');
      trToFn.addEventListener('submit', (e) => {
        e.preventDefault();
        ttfSet();
      });
      const ttfSet = async () => {
        const fnd_account = document.getElementById('fnd_account').value;
        const ttf_amount = parseFloat(document.getElementById('ttf_amount').value);
        const ttf_password = document.getElementById('ttf_password').value;

        const fnd_unfound = document.querySelector('.fnd_unfound');
        const wrong_password_ttf = document.querySelector('.wrong_password_ttf');
        const wrong_amount_ttf = document.querySelector('.wrong_amount_ttf');
        wrong_amount_ttf.textContent = '';
        wrong_password_ttf.textContent = '';
        fnd_unfound.textContent = '';
        const fndData = (await getDoc(doc(db, 'users', fnd_account))).data();
        console.log(fndData);

        if (fndData) {
          if (ttf_amount <= userData.walletBalance) {
            if (ttf_password == userData.password) {
              let newBalance = userData.balance - ttf_amount;
              await updateDoc(doc(db, 'users', res.uid), {
                balance: newBalance,
                notificationInd: true,
                notification: arrayUnion({
                  msg: `You have sent you ${ttf_amount} $ to ${fndData.name}.`,
                }),
              });
              let newFndBalance = fndData.balance + ttf_amount;
              await updateDoc(doc(db, 'users', fnd_account), {
                balance: newFndBalance,
                notificationInd: true,
                notification: arrayUnion({
                  msg: `${userData.name} has sent you ${ttf_amount} $.`
                }),
              });
            } else {
              wrong_password_ttf.textContent = 'Wrong password.';
            }
          } else {
            wrong_amount_ttf.textContent = 'Insufficient amount.';
          }
        } else {
          fnd_unfound.textContent = 'Friend not found';
        }
      };


      const log_out = document.getElementById('log_out');
      log_out.addEventListener('click', async () => {
        await signOut(auth);
        location.reload();
      });


    } else {
      verify.style.display = 'block';
      await sendEmailVerification(auth.currentUser)
    }
  } else {
    sign_up.style.display = 'block';
    const signUp = async () => {
      const displayName = document.getElementById('displayName').value;
      const phoneNumber = document.getElementById('phone').value;
      const email = document.getElementById('email').value;
      const referedBy = document.getElementById('referedBy').value;
      const password = document.getElementById('password').value;
      const confirm_password = document.getElementById('confirm_password').value;

      const referingSnap = await getDoc(doc(db, 'users', referedBy));
      const referingData = referingSnap.data();
      if (referingData) {
        if (password === confirm_password) {
          const res = await createUserWithEmailAndPassword(auth, email, password);
          try {
            sign_up.style.display = 'none';
            await setDoc(doc(db, "users", res.user.uid), {
              name: displayName,
              accountNo: res.user.uid,
              phoneNumber,
              email,
              password,
              balance: 0,
              referedBy,
              task: false,
              deposit: false,
              withdraw: false,
              notification: [],
              notificationInd: false,
            });
            await sendEmailVerification(auth.currentUser);
          } catch (e) {
            const err = document.querySelector('.err');
            err.textContent = 'Sign up failed';
          }
          const verification_email = document.querySelector('.verification_email');
          verification_email.textContent = `${email}`;
          location.reload();
        } else {
          const wrongPass = document.querySelector('.wrongPass');
          wrongPass.textContent = 'Wrong Password';
        }
      } else {
        const user_not_found = document.querySelector('.user_not_found');
        user_not_found.textContent = 'User not found.'
      }
    }
    signup.addEventListener('submit', (e) => {
      e.preventDefault();
      signUp();
    });

    const signIn = async () => {
      const email = document.getElementById('signIn_email').value;
      const password = document.getElementById('signIn_password').value;
      const in_wrong_pass = document.querySelector('.in_wrong_pass');
      in_wrong_pass.textContent = '';
      try {
        await signInWithEmailAndPassword(auth, email, password)
        location.reload();
      } catch (e) {
        in_wrong_pass.textContent = 'Wrong password.';
      }
    }
    signin.addEventListener('submit', (e) => {
      e.preventDefault();
      signIn();
    });
  }
});
