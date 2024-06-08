let UN = document.getElementById("username");
let pass = document.getElementById("password");
let isadmin = document.getElementById("is-admin");

function validateUsername(username) {
  const nameregex = /^[A-Za-z]{3,10}$/;
  return nameregex.test(username);
}

function validatePassword(password) {
  const passregex = /^[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return passregex.test(password);
}

function login() {
  {
    const formdata = new FormData();
    formdata.append("username", UN.value);
    formdata.append("password", pass.value);

    const requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
      mode: "cors",
    };

    fetch("http://127.0.0.1:8000///api/auth/login/", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
      })
      .then((result) => {
        console.log(result);
        localStorage.setItem("user_token", result.token);
        Swal.fire({
          title: "Success",
          text: "Welcome Back",
          icon: "success",
          confirmButtonText: `${result.data.is_admin? "Welcome Admin" : "Welcome User"}`,
        }).then(() => {
          if(result.data.is_admin){
            window.location.href = "Admin.html"
          }
          else{
            window.location.href ="User.html"
          }
        });
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
        Swal.fire({
          title: "Error!",
          text: `Invalid username or password`,
          icon: "error",
          confirmButtonText: "Try again",
        });
      });
  }
}

document.getElementById("login").addEventListener("click", login);
