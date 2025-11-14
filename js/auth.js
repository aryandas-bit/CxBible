// Firebase configuration
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// Google Auth Provider
const provider = new firebase.auth.GoogleAuthProvider();

// Auth state observer
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    console.log('User signed in:', user.email);
    updateUIForLoggedInUser(user);
    storeUserData(user);
  } else {
    // User is signed out
    console.log('User signed out');
    updateUIForLoggedOutUser();
  }
});

// Sign in with Google
function signInWithGoogle() {
  auth.signInWithPopup(provider)
    .then((result) => {
      console.log('Sign in successful');
    })
    .catch((error) => {
      console.error('Sign in error:', error);
      alert('Sign in failed: ' + error.message);
    });
}

// Sign out
function signOut() {
  auth.signOut()
    .then(() => {
      console.log('Sign out successful');
    })
    .catch((error) => {
      console.error('Sign out error:', error);
    });
}

// Update UI for logged in user
function updateUIForLoggedInUser(user) {
  const authButton = document.getElementById('authButton');
  if (authButton) {
    authButton.textContent = 'Logout';
    authButton.onclick = signOut;
  }

  const userInfo = document.getElementById('userInfo');
  if (userInfo) {
    userInfo.textContent = `Logged in as: ${user.email}`;
    userInfo.style.display = 'block';
  }
}

// Update UI for logged out user
function updateUIForLoggedOutUser() {
  const authButton = document.getElementById('authButton');
  if (authButton) {
    authButton.textContent = 'Login with Gmail';
    authButton.onclick = signInWithGoogle;
  }

  const userInfo = document.getElementById('userInfo');
  if (userInfo) {
    userInfo.style.display = 'none';
  }
}

// Store user data in Firestore
function storeUserData(user) {
  db.collection('users').doc(user.uid).set({
    email: user.email,
    displayName: user.displayName,
    lastLogin: firebase.firestore.FieldValue.serverTimestamp(),
    loginCount: firebase.firestore.FieldValue.increment(1)
  }, { merge: true })
  .then(() => {
    console.log('User data stored successfully');
  })
  .catch((error) => {
    console.error('Error storing user data:', error);
  });
}

// Initialize auth
function initializeAuth() {
  console.log('Auth initialized');
}

// Export functions for use in other scripts
window.signInWithGoogle = signInWithGoogle;
window.signOut = signOut;
window.initializeAuth = initializeAuth;
