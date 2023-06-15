const form = document.getElementById("my-form");

form.addEventListener('submit', StoreuserData);
form.addEventListener('click', deleteelment);

function StoreuserData(e) {
  // get user input
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const telephone = document.getElementById('phonenumber').value;

  e.preventDefault();

  const newUser = {
    name: name,
    email: email,
    phonenumber: telephone,
  };

  axios.post("https://crudcrud.com/api/cfc93094d65549bcbb80fe33bbc4be69/appointmentData", newUser)
    .then((response) => {
      console.log(response);
      // add new user to the screen
      showuseronscreen(newUser);
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener('DOMContentLoaded', () => {
  // Fetch data from the API
  axios.get("https://crudcrud.com/api/cfc93094d65549bcbb80fe33bbc4be69/appointmentData")
    .then((response) => {
      console.log(response);
      const userData = response.data;
      userData.forEach(user => {
        showuseronscreen(user);
      });
    })
    .catch((error) => {
      console.log(error);
    });
});

function showuseronscreen(newUser) {
  const element = document.createElement('li');
  element.textContent = newUser.name + '-' + newUser.email + '-' + newUser.phonenumber;
  form.appendChild(element);

  const del = document.createElement('button');
  del.classList.add('delete');
  del.textContent = 'delete';
  del.addEventListener('click', function() {
    if (confirm('Are You Sure?')) {
      var li = del.parentElement;
      form.removeChild(li);
      // Remove user data from the API
      axios.delete(`https://crudcrud.com/api/cfc93094d65549bcbb80fe33bbc4be69/appointmentData/${newUser._id}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  const edit = document.createElement('button');
  edit.classList.add('edit');
  edit.textContent = 'edit';
  edit.addEventListener('click', function() {
    const li = edit.parentElement;
    const name = li.textContent.split('-')[0];
    const email = li.textContent.split('-')[1];
    const phone = li.textContent.split('-')[2];
    document.getElementById('name').value = name;
    document.getElementById('email').value = email;
    document.getElementById('phonenumber').value = phone;
    form.removeChild(li);
    form.removeChild(del);
    form.removeChild(edit);
  });

  element.appendChild(del);
  element.appendChild(edit);
}

function deleteelment(e) {
  if (e.target.classList.contains('delete')) {
    const li = e.target.parentElement;
    const userId = li.dataset.userId;
    if (confirm('Are You Sure?')) {
      form.removeChild(li);
      // Remove user data from the API
      axios.delete(`https://crudcrud.com/api/cfc93094d65549bcbb80fe33bbc4be69/appointmentData/${userId}`)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }
}
