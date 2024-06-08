const UN = document.getElementById("username");
const pass = document.getElementById("password");
const confirmPassword = document.getElementById("confirm-password");
const email = document.getElementById("email");
const isAdmin = document.getElementById("is-admin");

function validateUsername(username) {
  const nameregex = /^[A-Za-z]{3,10}$/;
  return nameregex.test(username);
}

function validateEmail(email) {
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

function validatePassword(password) {
  const passregex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return passregex.test(password);
}

function validateRepassword(repassword) {
  return repassword == pass.value;
}

UN.addEventListener("input", () => {
  if (UN.value == "") {
    UN.classList.remove("valid");
    UN.classList.remove("invalid");
  } else {
    if (validateUsername(UN.value)) {
      UN.classList.add("valid");
      UN.classList.remove("invalid");
    } else {
      UN.classList.add("invalid");
      UN.classList.remove("valid");
    }
  }
});
UN.addEventListener("blur", () => {
  if (UN.value == "") {
    UN.classList.remove("valid");
    UN.classList.remove("invalid");
  } else {
    if (validateUsername(UN.value)) {
      UN.classList.add("valid");
      UN.classList.remove("invalid");
    } else {
      UN.classList.add("invalid");
      UN.classList.remove("valid");
    }
  }
});

pass.addEventListener("blur", () => {
  if (pass.value == "") {
    pass.classList.remove("valid");
    pass.classList.remove("invalid");
  } else {
    if (validatePassword(pass.value)) {
      pass.classList.add("valid");
      pass.classList.remove("invalid");
    } else {
      pass.classList.add("invalid");
      pass.classList.remove("valid");
    }
  }
});
pass.addEventListener("input", () => {
  if (pass.value == "") {
    pass.classList.remove("valid");
    pass.classList.remove("invalid");
  } else {
    if (validatePassword(pass.value)) {
      pass.classList.add("valid");
      pass.classList.remove("invalid");
    } else {
      pass.classList.add("invalid");
      pass.classList.remove("valid");
    }
  }
});

confirmPassword.addEventListener("input", () => {
  if (confirmPassword.value == "") {
    confirmPassword.classList.remove("valid");
    confirmPassword.classList.remove("invalid");
  } else {
    if (validateRepassword(confirmPassword.value)) {
      confirmPassword.classList.add("valid");
      confirmPassword.classList.remove("invalid");
    } else {
      confirmPassword.classList.add("invalid");
      confirmPassword.classList.remove("valid");
    }
  }
});
confirmPassword.addEventListener("blur", () => {
  if (confirmPassword.value == "") {
    confirmPassword.classList.remove("valid");
    confirmPassword.classList.remove("invalid");
  } else {
    if (validateRepassword(confirmPassword.value)) {
      confirmPassword.classList.add("valid");
      confirmPassword.classList.remove("invalid");
    } else {
      confirmPassword.classList.add("invalid");
      confirmPassword.classList.remove("valid");
    }
  }
});

email.addEventListener("input", () => {
  if (email.value == "") {
    email.classList.remove("valid");
    email.classList.remove("invalid");
  } else {
    if (validateEmail(email.value)) {
      email.classList.add("valid");
      email.classList.remove("invalid");
    } else {
      email.classList.add("invalid");
      email.classList.remove("valid");
    }
  }
});
email.addEventListener("blur", () => {
  if (email.value == "") {
    email.classList.remove("valid");
    email.classList.remove("invalid");
  } else {
    if (validateEmail(email.value)) {
      email.classList.add("valid");
      email.classList.remove("invalid");
    } else {
      email.classList.add("invalid");
      email.classList.remove("valid");
    }
  }
});

function register() {
  if (
    validateUsername(UN.value) &&
    validatePassword(pass.value) &&
    validateRepassword(confirmPassword.value)
  ) {
    const formdata = new FormData();
    formdata.append("username", UN.value);
    formdata.append("password", pass.value);
    formdata.append("confirmPassword", confirmPassword.value);
    formdata.append("is_admin", isAdmin.value);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      mode: "cors",
    };

    fetch("http://127.0.0.1:8000/api/auth/signup/", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.text();
      })
      .then((result) => {
        console.log(result);
        Swal.fire({
          title: "Success",
          text: "Account created successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
      })
      .catch((error) =>{
        console.error(
          "There has been a problem with your fetch operation:",
          error
        )
        Swal.fire({
          title: 'Error!',
          text: `Username already exists`,
          icon: 'error',
          confirmButtonText: 'Try again',
        })
      }
      );
  } else {
    Swal.fire({
      title: "Error!",
      text: "Please fill all fields correctly",
      icon: "error",
      confirmButtonText: "Try again",
    });
  }
}

document.getElementById("register").addEventListener("click", register);
