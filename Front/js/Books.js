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
    <td>
  <button onclick="BorrowBook(${arr[i].ID})" class="borrow-button">Borrow </button>
    </td>
    </tr>`;
  }
  BTable.innerHTML = temp;
}

function getAllAvailableBools() {
  const userToken = localStorage.getItem("user_token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  myHeaders.append(
    "Cookie",
    "csrftoken=CsXwykeI8C91c6GrSMsNxBJTWbXx9ir3; sessionid=hx1dnh4q8gerks0842256zgjofb7bcq5"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(
    "http://127.0.0.1:8000///api/app/getAllbooks/?is_avalible_only=true",
    requestOptions
  )
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      displayBooks(result);
    })
    .catch((error) => console.error(error));
}

function BorrowBook(id) {
  const userToken = localStorage.getItem("user_token");
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${userToken}`);
  myHeaders.append(
    "Cookie",
    "csrftoken=CsXwykeI8C91c6GrSMsNxBJTWbXx9ir3; sessionid=hx1dnh4q8gerks0842256zgjofb7bcq5"
  );

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow",
  };

  fetch(`http://127.0.0.1:8000//api/app/borrowBook/${id}/`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      Swal.fire({
        title: "Success",
        text: `Book Borrowed Successfully`,
        icon: "success",
        confirmButtonText: "OK",
      });
      getAllAvailableBools();
    })
    .catch((error) => console.error(error));
}

document.addEventListener("DOMContentLoaded", getAllAvailableBools);

document.getElementById("logout").addEventListener("click", (e) => {
  localStorage.removeItem("user_token");
  e.preventDefault();
  window.location.href = "index.html";
});