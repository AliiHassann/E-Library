let Bid = document.getElementById("bookID");
let BN = document.getElementById("bookN");
let author = document.getElementById("author");
let category = document.getElementById("category");
let desc = document.getElementById("desc");

function addBook() {
  if (Bid.value && BN.value && author.value && category.value && desc.value) {
    const myHeaders = new Headers();
    myHeaders.append(
      "Authorization",
      `Bearer ${localStorage.getItem("user_token")}`
    );

    const formdata = new FormData();
    formdata.append("category", category.value);
    formdata.append("bookName", BN.value);
    formdata.append("authorName", author.value);
    formdata.append("description", desc.value);
    formdata.append("ID", Bid.value);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch("http://127.0.0.1:8000//api/app/createBook/", requestOptions)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((error) => {
          throw new Error(JSON.stringify(error));
        });
      }
      return response.json();
    })
    .then((result) => {
      Swal.fire({
        title: "Success!",
        text: `Book ${result.bookName} created successfully`,
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        clearform()
      });
    })
    .catch((error) => {
      let errorMessage = "An unexpected error occurred";
      try {
        const errorObj = JSON.parse(error.message);
        if (errorObj.hasOwnProperty("ID")) {
          const idError = errorObj["ID"][0];
          if (idError.includes("A valid integer is required.")) {
            errorMessage = "ID must be an integer";
          } else {
            errorMessage = idError;
          }
        }
      } catch (e) {
        console.log("Error parsing error message:", e);
      }
      Swal.fire({
        title: "Error!",
        text: errorMessage,
        icon: "error",
        confirmButtonText: "Try again",
      });
    });
  }else {
    Swal.fire({
      title: "Error!",
      text: "All fields are required",
      icon: "error",
      confirmButtonText: "Try again",
    });
  }
}


function clearform() {
  Bid.value = "";
  BN.value = "";
  author.value = "";
  category.value = "";
  desc.value = "";
}

document.getElementById("logout").addEventListener("click", (e) => {
  localStorage.removeItem("user_token");
  e.preventDefault();
  window.location.href = "index.html";
});


document.getElementById('addButton').addEventListener('click', addBook)