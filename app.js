const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// firestore
const db = firebase.firestore();
let moneyRef;
let uid;

// Database Reference
moneyRef = db.collection("money data");

auth.onAuthStateChanged((user) => {
  if (user) {
    // signed in
    dashboard.hidden = false;
    btnlogin.hidden = true;
    uid = user.uid;
    document.getElementById("usname").innerText = user.displayName;
    document.getElementById("uid").innerText = user.uid;
    document.getElementById("dp").src = user.photoURL;
    document.getElementById("dp2").src = user.photoURL;

    // firestore
    moneyRef
      .where("uid", "==", user.uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          document.getElementById("paise").innerText = doc.data()["hasmoney "];
        });
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  } else {
    // not signed in
    dashboard.hidden = true;
    btnlogin.hidden = false;
  }
});

function moneyrefresh() {
  moneyRef = db.collection("money data");

  moneyRef
    .where("uid", "==", uid)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        document.getElementById("paise").innerText = doc.data()["hasmoney "];
      });
    })
    .catch((error) => {
      console.log("Error getting documents: ", error);
    });
}

function pay() {
  document.getElementById("home").hidden = true;
  document.getElementById("pay").hidden = false;
  document.getElementById("withdrawal").hidden = true;
}
function home() {
  document.getElementById("home").hidden = false;
  document.getElementById("pay").hidden = true;
  document.getElementById("withdrawal").hidden = true;
}
function withdrawal() {
  document.getElementById("home").hidden = true;
  document.getElementById("pay").hidden = true;
  document.getElementById("withdrawal").hidden = false;
}

function payy() {
  // moneyRef.add({
  //   uid: document.getElementById("payam").value,
  //   hasmoney: document.getElementById("payid").value
  // });

  moneyRef.where("uid", "==", uid).add({
    uid: document.getElementById("payam").value,
    hasmoney: document.getElementById("payid").value,
  });
}
