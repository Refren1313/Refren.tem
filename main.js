const sign_up = document.querySelector('.sign_up');

const verify = document.querySelector('.verify');

const main_page = document.querySelector('.main_page');

const task_page = document.querySelector('.task_page');

const help_page = document.querySelector('.help_page');

const about_page = document.querySelector('.about_page');

const no_task_page = document.querySelector('.no_task_page');

const already_applied_page = document.querySelector('.already_applied_page');

const notification_page = document.querySelector('.notification_page');

const wrongPassword = document.querySelector('.wrongPassword');

const signup = document.getElementById('SignUp');

const cards = document.querySelectorAll('.cards');

const NHEM = document.querySelector('.not_have_enough_money');



import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, updateProfile, onAuthStateChanged, sendEmailVerification } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc, updateDoc, collection, query, where, deleteDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";


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
    
    
    const docSnap = await getDoc(doc(db, 'users', res.uid));
    const userData = docSnap.data();
    
    const taskSnap = await getDoc(doc(db, 'pendingTask', res.uid));
    const taskData = taskSnap.data();
    
    const referSnap = await getDoc(doc(db, 'pendingTask', userData.referedBy));
    const referData = referSnap.data();
    
    const referingSnap = await getDoc(doc(db, 'users', userData.referedBy));
    const referingData = referingSnap.data();
    
    const depositSnap = await getDoc(doc(db, 'deposit', res.uid));
    const depositData = depositSnap.data();
    
    const withdrawSnap = await getDoc(doc(db, 'withdraw', res.uid));
    const withdrawData = withdrawSnap.data();
    
    if (depositData) {
      if (depositData.accepted) {
        let newWalletBalance = userData.walletBalance + depositData.amount;
        await updateDoc(doc(db, 'users', res.uid), {
          walletBalance: newWalletBalance,
          deposit: false,
          notificationInd: true,
          notification: arrayUnion({
            msg: `You have deposited ${depositData.amount}$.`
          }),
        });
        await deleteDoc(doc(db, 'deposit', res.uid));
        location.reload();
      }
      if (depositData.denied) {
        await updateDoc(doc(db, 'users', res.uid), {
          deposit: false,
          notificationInd: true,
          notification: arrayUnion({
            msg: `Your deposit application is denied.`
          }),
        });
        await deleteDoc(doc(db, 'deposit', res.uid));
        location.reload();
      }
    }
    
    if (withdrawData) {
      if (withdrawData.accepted) {
        let newWalletBalance = userData.walletBalance - withdrawData.amount;
        await updateDoc(doc(db, 'users', res.uid), {
          walletBalance: newWalletBalance,
          deposit: false,
          notificationInd: true,
          notification: arrayUnion({
            msg: `You have withdrawn ${withdrawData.amount}$.`
          }),
        });
        await deleteDoc(doc(db, 'withdraw', res.uid));
        location.reload();
      }
      if (withdrawData.denied) {
        await updateDoc(doc(db, 'users', res.uid), {
          withdraw: false,
          notificationInd: true,
          notification: arrayUnion({
            msg: `Your withdraw application is denied.`
          }),
        });
        await deleteDoc(doc(db, 'deposit', res.uid));
        location.reload();
      }
    }

    
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
      
      if (taskData.completed == taskData.target) {
        let newBalance = userData.balance + taskData.return_amount;
        await updateDoc(doc(db, 'users', res.uid), {
          balance: newBalance,
          task: false,
          notificationInd: true,
          taskCardsDisabled: false,
          notification: arrayUnion({
            msg: `You have completed the task. You got ${taskData.return_amount} $.`,
          }),
        });
        await deleteDoc(doc(db, 'pendingTask', res.uid));
        location.reload();
      }
    };
    
    const balance = document.querySelector('.balance');
    balance.textContent = userData.balance;
    
    const notifications = userData.notification;
    notifications.forEach((m) => {
      const notification_content = document.querySelector('.notification_content');
      if (m) {
        notification_content.innerHTML = notification_content.innerHTML+`<div class="notificationBox"><span>${m.msg}</span></div>`;
      }
    });
    
    const wallet_balance = document.querySelector('.wallet_balance');
    wallet_balance.textContent = userData.walletBalance;
    
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
    
    
    
    if (userData.notificationInd) {
      const indicator = document.getElementById('indicator');
      indicator.classList.add('active_indicator');
    }
    
    if (userData.taskCardsDisabled) {
      cards.forEach((c) => {
        c.disabled = true;
      });
    }
    
    const PT = document.getElementById('PT');
    PT.addEventListener('click', () => {
      main_page.style.display = 'none';
      if (userData.task) {
        task_page.style.display = 'block';
      } else {
        no_task_page.style.display = 'block';
      }
    });
    
    const applied_page = document.querySelector('.applied_page')
    
    const deposit = document.getElementById('deposit');
    deposit.addEventListener('click', () => {
      wallet_page.style.display = 'none';
      if (!userData.deposit) {
        deposit_page.style.display = 'block';
      } else {
        applied_page.style.display = 'block';
      }
    });
    
    const withdraw = document.getElementById('withdraw');
    withdraw.addEventListener('click', () => {
      wallet_page.style.display = 'none';
      if (!userData.withdraw) {
        withdraw_page.style.display = 'block';
      } else {
        applied_page.style.display = 'block';
      }
    });
    
    const notificationBack = document.getElementById('notificationBack');
    notificationBack.addEventListener('click', async () => {
      const indicator = document.getElementById('indicator');
      indicator.classList.remove('active_indicator');
      notification_page.style.display = 'none';
      main_page.style.display = 'block';
      await updateDoc(doc(db, 'users', res.uid), {
        notificationInd: false,
      })
    });
    
    const card3 = document.getElementById('card3');
    card3.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 1) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 1,
          return_amount: 1.5,
          target: 3,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 1;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card5 = document.getElementById('card5');
    card5.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 1.5) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 1.5,
          return_amount: 2.5,
          target: 5,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 1.5;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card7 = document.getElementById('card7');
    card7.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 2) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 2,
          return_amount: 3.5,
          target: 7,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 2;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card10 = document.getElementById('card10');
    card10.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 2.5) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 2.5,
          return_amount: 4.5,
          target: 10,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 2.5;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card12 = document.getElementById('card12');
    card12.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 3) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 3,
          return_amount: 5.5,
          target: 12,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 3;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card15 = document.getElementById('card15');
    card15.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 3.5) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 3.5,
          return_amount: 6.5,
          target: 15,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 3.5;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card17 = document.getElementById('card17');
    card17.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 4) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 4,
          return_amount: 7.5,
          target: 17,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 4;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card20 = document.getElementById('card20');
    card20.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 4.5) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 4.5,
          return_amount: 8.5,
          target: 20,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 4.5;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card25 = document.getElementById('card25');
    card25.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 5) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 5,
          return_amount: 10,
          target: 25,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 5;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card50 = document.getElementById('card50');
    card50.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 10) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 10,
          return_amount: 20,
          target: 50,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 10;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    const card100 = document.getElementById('card100');
    card100.addEventListener('click', async () => {
      NHEM.textContent = '';
      if (userData.walletBalance >= 20) {
        await setDoc(doc(db, 'pendingTask', res.uid), {
          payment: 20,
          return_amount: 50,
          target: 100,
          completed: 0,
        });
        let newWalletBalance = userData.walletBalance - 20;
        await updateDoc(doc(db, 'users', res.uid), {
          task: true,
          taskCardsDisabled: true,
          walletBalance: newWalletBalance,
        });
        if (referData) {
          await updateDoc(doc(db, 'pendingTask', userData.referedBy), {
            completed: referData.completed + 1,
          });
        }
        location.reload();
      } else {
        NHEM.textContent = 'You do not have enough money in your wallet to open this task card.'
      }
    });
    
    
    const trToWa = document.getElementById('TrToWa');
    trToWa.addEventListener('submit', (e) => {
      e.preventDefault();
      ttwSet();
    });
    const ttwSet = async () => {
      const ttw_amount = parseFloat(document.getElementById('ttw_amount').value);
      const ttw_password = document.getElementById('ttw_password').value;

      const wrong_password_ttw = document.querySelector('.wrong_password_ttw');
      const wrong_amount_ttw = document.querySelector('.wrong_amount_ttw');
      wrong_amount_ttw.textContent = '';
      wrong_password_ttw.textContent = '';

      if (ttw_amount <= userData.balance) {
        if (ttw_password == userData.password) {
          let newBalance = userData.balance - ttw_amount;
          await updateDoc(doc(db, 'users', res.uid), {
            balance: newBalance,
          });
          let newWalletBalance = userData.walletBalance + ttw_amount;
          await updateDoc(doc(db, 'users', res.uid), {
            walletBalance: newWalletBalance,
          });
          location.reload();
        } else {
          wrong_password_ttw.textContent = 'Wrong password.';
        }
      } else {
        wrong_amount_ttw.textContent = 'Insufficient amount';
      }
    };
    
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
      
      const fndSnap = await getDoc(doc(db, 'users', fnd_account));
      const fndData = fndSnap.data();
      if (fndData) {
        if (ttf_amount <= userData.walletBalance) {
          if (ttf_password == userData.password) {
            let newWalletBalance = userData.walletBalance - ttf_amount;
            await updateDoc(doc(db, 'users', res.uid), {
              walletBalance: newWalletBalance,
            });
            let newFndWalletBalance = fndData.walletBalance + ttf_amount;
            await updateDoc(doc(db, 'users', fnd_account), {
              walletBalance: newFndWalletBalance,
            });
            location.reload();
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
          binance: dip_binance,
          amount: dip_amount,
          order_ID,
          accepted: false,
          denied: false,
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
          binance: wit_binance,
          amount: wit_amount,
          accepted: false,
          denied: false,
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
    
    } else {
      verify.style.display = 'block';
      await sendEmailVerification(auth.currentUser)
        .then(() => {
          alert('verification link sent.')
        });
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
        sign_up.style.display = 'none';
          try {
            await updateProfile(res.user, {
              displayName,
              phoneNumber,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              name: displayName,
              accountNo: res.user.uid,
              phoneNumber,
              email,
              password,
              balance: 0,
              referedBy,
              walletBalance: 0,
              task: false,
              deposit: false,
              withdraw: false,
              taskCardsDisabled: false,
              notification: [],
              notificationInd: false,
            });
            
            await sendEmailVerification(auth.currentUser)
            .then(() => {
              alert('verification link sent.')
            });
          } catch (e) {
            const err = document.querySelector('.err');
            err.textContent = 'Sign up failed';
          }
          const verification_email = document.querySelector('.verification_email');
          verification_email.textContent = `${email}`;
          
          verify.style.display = 'block';
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
  }
});
