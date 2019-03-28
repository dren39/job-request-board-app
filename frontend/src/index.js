document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  //variables
  const postUrl = "http://localhost:3000/posts";
  const userUrl = "http://localhost:3000/users"
  const postMethod = 'POST';
  const patchMethod = 'PATCH';
  const deleteMethod = 'DELETE';
  const divContainer = document.querySelector("#container");
  const divIndexContainer = document.querySelector("#index-container");
  const divShowContainer = document.querySelector("#show-container");
  const form = document.querySelector("#form");
  const signform = document.querySelector('#sign-form');
  const signDiv = document.querySelector('#sign-div');
  const greet = document.querySelector('#greet');
  //functions

  //this fetches all objects from API and passes to render
  function fetchPosts() {
    divIndexContainer.innerHTML = '';
    divShowContainer.innerHTML = '';
    fetch(postUrl)
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
      renderPost(post)
      })
    })//end of fetch
  }//end of this function

  //this creates each card for each object and adds to container
  function renderPost(post) {
    divIndexContainer.innerHTML += `
    <div class="index-card p-3 mb-2 bg-light border rounded border-primary" style="width: 20rem;" data-post-id="${post.id}">
      <div class="card-body">
        <h4 class="card-title">${post.title}</h4>
        <p class="card-text">Reward: ${post.reward}</p>
        <p class="card-text">Location: ${post.location}</p>
        <a class="btn btn-primary see-quest" href="#" data-post-id="${post.id}">See Quest</a>
      </div>
    </div>
    `
  };//end of this function

  //this fetches for specific object and passes to showPost function
  function getPost(postId) {
    fetch(`${postUrl}/${postId}`)
    .then(response => response.json())
    .then(post => {
      showPost(post);
    })
  }//end of this function

  //this takes the object and renders the "show" page for that object
  function showPost(post) {
    divIndexContainer.innerHTML = '';
    divShowContainer.innerHTML = `
    <div id="show-card" class="card border-primary mb-3">
      <br><h3 class="show-attr" >${post.title}</h3><br>
      <span class="show-attr">${post.description}</span>
      <br><span>Reward:
      <span class="show-attr">${post.reward}</span>
      <br></span><br>
      <span>Contact:
      <span class="show-attr">${post.contact}</span>
      <br></span><br>
      <span>Location:
      <span class="show-attr">${post.location}</span>
      <br></span><br>
      <span>Username:
      <span class="show-attr">${post.user_id}</span>
      <br></span><br>
      <button type="button" id="edit" class="btn btn-primary" data-edit-id="${post.id}">Edit</button><br>
      <button type="button" id="delete" class="btn btn-danger" data-delete-id="${post.id}">Delete</button><br>
    </div>
    `
  };//end of this function

  //this handles the patch and post fetch requests and calls the function passes in
  function patchPostFetch(method, inputs, func, postId='') {
    fetch(`${postUrl}/${postId}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: postId,
        title: inputs.title.value,
        description: inputs.description.value,
        reward: inputs.reward.value,
        contact: inputs.contact.value,
        location: inputs.location.value,
        username: inputs.username.value
      })
    })//end of fetch
    .then(response => response.json())
    .then(post => {
      func(post)
    });
  };//end of function

  //this makes a delete request for a specific object
  function deletePost(postId) {
    fetch(`${postUrl}/${postId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      }
    })//end of fetch
    .then(response => response.json())
    .then(post => {
      fetchPosts()
    });
  };//end of function

  //this generates just the form html for edit and calls the populate function
  function generateForm(parentNode, postId) {
    divShowContainer.innerHTML = '';
    divShowContainer.innerHTML = `
    <div class="card border-primary mb-3">
      <div class="card-body">
        <form id="edit-form"">
        <input type="text" id="edit-title" class="form-control" placeholder="Title"><br>
        <textarea id="edit-description" class="form-control" placeholder="Description"></textarea><br>
        <input type="text" id="edit-reward" class="form-control" placeholder="Reward"><br>
        <input type="text" id="edit-location" class="form-control" placeholder="Location"><br>
        <input type="text" id="edit-contact" class="form-control" placeholder="Contact"><br>
        <input type="text" id="edit-username" class="form-control" placeholder="Username"><br>
        <input type="submit" id="edit-submit" class="form-control btn btn-primary" data-edit-submit-id="${postId}">
        </form><br>
      </div>
    </div>
    `
    populateForm(parentNode)
  };//end of function

  //this populates the edit form fields with the values from the passed object
  function populateForm(parentNode) {
    document.querySelector('#edit-title').value = parentNode.title
    document.querySelector('#edit-description').value = parentNode.description
    document.querySelector('#edit-reward').value = parentNode.reward
    document.querySelector('#edit-location').value = parentNode.location
    document.querySelector('#edit-contact').value = parentNode.contact
    document.querySelector('#edit-username').value = parentNode.username
  };//end of function

  function fetchLogin(login) {
    fetch(userUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: login.username
      })
    })//end of fetch
    .then(response => response.json())
    .then(user => {
      makeUser(user)
    })
  };//end of this function

  function makeUser(user) {
    signDiv.innerHTML = '';
    signDiv.innerHTML = `
    <button type="button" id="log-out" class="btn btn-primary">Logout</button>
    `
    greet.innerText = `Hi, ${user.username}`
  };//end of this function

  function logout() {
    greet.innerText = "You have signed out!"
    signDiv.innerHTML = '';
    signDiv.innerHTML = `
      <form id="sign-form" class="form-inline">
        <input id="sign-username" class="form-control mr-2 align-baseline" placeholder="Username">
        <input type="password" id="sign-pw" class="form-control mr-2" placeholder="Password">
        <input type="submit" id="sign-submit" class="btn btn-primary">
      </form><br>
    `
  };//end of this function

  function clearForm(inputs) {
    inputs.title.value = '';
    inputs.description.value = '';
    inputs.reward.value = '';
    inputs.contact.value = '';
    inputs.location.value = '';
    inputs.username.value = '';
  };//end of this function

  //event listeners

  divIndexContainer.addEventListener('click', event => {
    let postId = event.target.dataset.postId
    if (event.target.matches(".see-quest")) {
      getPost(postId);
    }
  });

  divShowContainer.addEventListener('click', event=> {
    event.preventDefault();
    if(event.target.matches("#edit")) {
      let postId = event.target.dataset.editId;
      const parentNode = {
        title: event.target.parentNode.getElementsByClassName("show-attr")[0].innerText,
        description: event.target.parentNode.getElementsByClassName("show-attr")[1].innerText,
        reward: event.target.parentNode.getElementsByClassName("show-attr")[2].innerText,
        contact: event.target.parentNode.getElementsByClassName("show-attr")[3].innerText,
        location: event.target.parentNode.getElementsByClassName("show-attr")[4].innerText,
        username: event.target.parentNode.getElementsByClassName("show-attr")[5].innerText
      }
      generateForm(parentNode, postId)
    }
    else if (event.target.matches("#edit-submit")) {
      postId = event.target.dataset.editSubmitId
      const inputs = {
        title: document.querySelector('#edit-title'),
        description: document.querySelector('#edit-description'),
        reward: document.querySelector('#edit-reward'),
        location: document.querySelector('#edit-location'),
        contact: document.querySelector('#edit-contact'),
        username: document.querySelector('#edit-username')
      }
      patchPostFetch(patchMethod, inputs, fetchPosts, postId);
    }
    else if (event.target.matches("#delete")) {
      postId = event.target.dataset.deleteId
      deletePost(postId)
    }
  })//end of this event listener

  form.addEventListener('submit', event => {
    event.preventDefault()
    const inputs = {
      title: document.querySelector('#title'),
      description: document.querySelector('#description'),
      reward: document.querySelector('#reward'),
      contact: document.querySelector('#contact'),
      location: document.querySelector('#location'),
      username: document.querySelector('#username')
    }
    patchPostFetch(postMethod, inputs, renderPost);
    clearForm(inputs);
    $('#request-modal').modal('hide');
  });//end of this event

  signform.addEventListener('submit', event => {
    event.preventDefault();
    const login = {
      username: document.querySelector("#sign-username").value,
    }
    $('#login-modal').modal('hide');
    fetchLogin(login)
  });//end of this event

  signDiv.addEventListener('click', event => {
    if (event.target.matches('#log-out')) {
      logout();
    }
  });//end of this event
  fetchPosts();
});
