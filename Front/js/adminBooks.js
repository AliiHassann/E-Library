function getBooks() {
  const userToken = localStorage.getItem("user_token");

  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  myHeaders.append(
    "Cookie",
    "csrftoken=H99ORq0DNoL102KaCifu43JNLyBWlEHt; sessionid=ipv6ezib0vrkq53owq426yq8283a0iks"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch("http://127.0.0.1:8000///api/app/getAllbooks/", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      displayBooks(result);
    })
    .catch((error) => console.error(error));
}

document.addEventListener("DOMContentLoaded", getBooks);

let BTable = document.getElementById("booksTable");
function displayBooks(arr) {
  var temp = ``;
  for (let i = 0; i < arr.length; i++) {
    temp += `<tr>
    <td>${arr[i].ID}</td>
    <td>${arr[i].authorName}</td>
    <td>${arr[i].bookName}</td>
    <td>${arr[i].category.name}</td>
    <td>${arr[i].description}</td>
    <td>${arr[i].userBorrow == null ? "No Borrow" : arr[i].userBorrow.username}</td>
    <td><button class="updateB" onclick="updateB(${
      arr[i].ID
    })">Update</button></td>
    <td><button class="DeleteB" onclick="deleteB(${
      arr[i].ID
    })">Delete</button></td> 
    </tr>`;
  }
  BTable.innerHTML = temp;
}

function deleteB(id) {
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const userToken = localStorage.getItem("user_token");

      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${userToken}`);
      myHeaders.append(
        "Cookie",
        "csrftoken=H99ORq0DNoL102KaCifu43JNLyBWlEHt; sessionid=ipv6ezib0vrkq53owq426yq8283a0iks"
      );

      const requestOptions = {
        method: "DELETE",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(`http://127.0.0.1:8000//api/app/deleteBook/${id}`, requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete book");
          }
          return response.json();
        })
        .then((result) => {
          console.log(result);
          Swal.fire({
            title: "Success!",
            text: `Book deleted successfully`,
            icon: "success",
            confirmButtonText: "Ok",
          }).then(() => {
            getBooks();
          });
        })
        .catch((error) => {
          console.error(error);
          Swal.fire({
            title: "Error!",
            text: "Failed to delete book",
            icon: "error",
            confirmButtonText: "Ok",
          });
        });
    }
  });
}

function updateB(id) {
  document.getElementById("updateBook").style.display = "flex";
  document.getElementById("update").addEventListener("click", () => {
    let newBookName = document.getElementById("NewBookName").value;
    let newBookCategory = document.getElementById("newBookCategory").value;
    let newBookDSescription = document.getElementById("Newdescription").value;
    if (newBookName && newBookCategory && newBookDSescription) {
      updateBook(id, newBookName, newBookCategory, newBookDSescription);
    } else {
      Swal.fire({
        title: "Error!",
        text: "Please fill all fields correctly",
        icon: "error",
        confirmButtonText: "Try again",
      });
    }
  });
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("updateBook").style.display = "none";
});

function updateBook(id, newName, newCategory, newdescription) {
  console.log(newName, newCategory, newdescription);
  const myHeaders = new Headers();
  myHeaders.append(
    "Authorization",
    `Bearer ${localStorage.getItem("user_token")}`
  );
  myHeaders.append(
    "Cookie",
    "csrftoken=H99ORq0DNoL102KaCifu43JNLyBWlEHt; sessionid=ipv6ezib0vrkq53owq426yq8283a0iks"
  );

  const formdata = new FormData();
  formdata.append("bookName", newName);
  formdata.append("category", newCategory);
  formdata.append("description", newdescription);

  const requestOptions = {
    method: "PATCH",
    headers: myHeaders,
    body: formdata,
    redirect: "follow",
  };

  fetch(`http://127.0.0.1:8000/api/app/updateBook/${id}`, requestOptions)
    .then((response) => response.text())
    .then((result) => {
      console.log(result);
      Swal.fire({
        title: "Success!",
        text: "Book Updated Successfully",
        icon: "success",
        confirmButtonText: "Ok",
      }).then(() => {
        document.getElementById("updateBook").style.display = "none";
        clearUpdateForm();
        getBooks();
      });
    })
    .catch((error) => console.error(error));
}
function clearUpdateForm() {
  document.getElementById("NewBookName").value = "";
  document.getElementById("newBookCategory").value = "";
  document.getElementById("Newdescription").value = "";
}
document.getElementById("logout").addEventListener("click", (e) => {
  localStorage.removeItem("user_token");
  e.preventDefault();
  window.location.href = "index.html";
});