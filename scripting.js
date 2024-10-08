showLogin();

function showLogin() {
    document.getElementById("loginForm").style.display = "flex";
    document.getElementById("registerForm").style.display = "none";
    document.getElementById("welcomeMessage").innerText = "Welcome! Please login.";
}

function showRegister() {
    document.getElementById("registerForm").style.display = "flex";
    document.getElementById("loginForm").style.display = "none";
    document.getElementById("welcomeMessage").innerText = "Create an account.";
}

document.getElementById("loginButton").addEventListener("click", function() {
    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;

    const user = localStorage.getItem(username);
    if (user) {
        const parsedUser = JSON.parse(user);
        if (parsedUser.password === password) {
            localStorage.setItem("user", JSON.stringify(parsedUser));
            alert("Login successful!");
            window.location.href = "login.html";
        } else {
            document.getElementById("loginAlert").innerText = "Incorrect password";
        }
    } else {
        document.getElementById("loginAlert").innerText = "User not found";
    }
});

document.getElementById("registerButton").addEventListener("click", function() {
  const name = document.getElementById("registerName").value.trim();
  const username = document.getElementById("registerUsername").value.trim();
  const password = document.getElementById("registerPassword").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  // const countryCode = document.getElementById("registerCountryCode").value;
  const contact = document.getElementById("registerContact").value.trim();
  const email = document.getElementById("registerEmail").value.trim();
  const remark = document.getElementById("registerRemark").value.trim();

  // Check if any field is empty
  // !countryCode
  if (!name || !username || !password || !confirmPassword || !contact || !email || !remark) {
      document.getElementById("registerAlert").innerText = "All fields are required.";
      return;
  }

  // Check if passwords match
  if (password !== confirmPassword) {
      document.getElementById("registerAlert").innerText = "Passwords do not match.";
      return;
  }

  // Validate contact number
  if (!/^[\+\w]{1,15}$/.test(contact)) {
      document.getElementById("registerAlert").innerText = "Contact format is Invalid";
      return;
  }

  // Validate email format
  if (!/\S+@\S+\.\S+/.test(email)) {
      document.getElementById("registerAlert").innerText = "Invalid email format.";
      return;
  }
  // countryCode + 
  const user = {
      name: name,
      username: username,
      password: password,
      contact: contact,
      email: email,
      remark: remark
  };

  console.table(user);
  console.log(user);

  localStorage.setItem(username, JSON.stringify(user));
  alert("Registration successful! Please login.");
  showLogin();
});


// Validate contact number on input change
function validateContact() {
    const contactInput = document.getElementById("registerContact");
    if (!/^[\+\w]{1,15}$/.test(contactInput.value)) {
        document.getElementById("registerAlert").innerText = "Contact must be 10 digits";
    } else {
        document.getElementById("registerAlert").innerText = "";
    }
}

// Validate email on input change
function validateEmail() {
    const emailInput = document.getElementById("registerEmail");
    if (!/\S+@\S+\.\S+/.test(emailInput.value)) {
        document.getElementById("registerAlert").innerText = "Invalid email format";
    } else {
        document.getElementById("registerAlert").innerText = "";
    }
}


const registerButton = document.getElementById("registerButton");
const registerInputs = [
    document.getElementById("registerName"),
    document.getElementById("registerUsername"),
    document.getElementById("registerPassword"),
    document.getElementById("confirmPassword"),
    document.getElementById("registerContact"),
    document.getElementById("registerEmail"),
    document.getElementById("registerRemark")
];


function checkRegisterInputs() {
    let allFilled = true;

    // Check if all input fields have values
    registerInputs.forEach(input => {
        if (input.value.trim() === "") {
            allFilled = false;
        }
    });

    
    registerButton.disabled = !allFilled;
}


registerInputs.forEach(input => {
    input.addEventListener("input", checkRegisterInputs);
});

