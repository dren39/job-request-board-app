document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  //variables
  const postUrl = "http://localhost:3000/posts";
  const divContainer = document.querySelector("#container");
  const form = document.querySelector("#form");
  const postMethod = 'POST';
  const patchMethod = 'PATCH';
  const deleteMethod = 'DELETE';

  //functions
  function renderPost(post) {
    divContainer.innerHTML += `
      <div class="card" data-post-id="${post.id}">
      <h4>${post.title}</h4>
      <p>Reward: ${post.reward}</p>
      <p>Location: ${post.location}</p>
      </div>
    `
  };//end of function

  function fetchPosts() {
    divContainer.innerHTML = '';
    fetch(postUrl)
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
      renderPost(post)
      })
    })//end of fetch
  }//end of function

  function fetchNewPost(method, inputs='', func, postId='') {
    console.log(postId);
    fetch(`${postUrl}/${postId}`, {
      method: `${method}`,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: postId,
        title: inputs.title,
        description: inputs.description,
        reward: inputs.reward,
        contact: inputs.contact,
        location: inputs.location,
        username: inputs.username
      })
    })//end of fetch
    .then(response => response.json())
    .then(post => {
      func(post)
    });
  };//end of function

  function getPost(postId) {
    fetch(`${postUrl}/${postId}`)
    .then(response => response.json())
    .then(post => {
      showPost(post);
    })
  }//end of function

  function deletePost(postId) {
    fetch(`${postUrl}/${postId}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: postId
      })
    })//end of fetch
    .then(response => response.json())
    .then(post => {
      fetchPosts(post)
    });
  };//end of function

  function showPost(post) {
    divContainer.innerHTML = '';
    divContainer.innerHTML = `
    <div class="show-card">
    <h3 class="show-attr">${post.title}</h3>
    <span>Description:
      <span class="show-attr">${post.description}</span>
    </span><br>
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
    <button type="button" id="edit" data-edit-id="${post.id}">Edit</button>
    <button type="button" id="delete" data-delete-id="${post.id}">Delete</button>
    </div>
    `
  };//end of function

  function populateForm(parentNode) {
    document.querySelector('#edit-title').value = parentNode.title
    document.querySelector('#edit-description').value = parentNode.description
    document.querySelector('#edit-reward').value = parentNode.reward
    document.querySelector('#edit-location').value = parentNode.location
    document.querySelector('#edit-contact').value = parentNode.contact
    document.querySelector('#edit-username').value = parentNode.username
  };//end of function

  function generateForm(parentNode, postId) {
    divContainer.innerHTML = '';
    divContainer.innerHTML = `
    <form id="edit-form">
      <label>Title</label>
      <input type="text" id="edit-title"><br>
      <label>Description</label><br>
      <textarea id="edit-description"></textarea><br>
      <label>Reward</label>
      <input type="text" id="edit-reward"><br>
      <label>Location</label>
      <input type="text" id="edit-location"><br>
      <label>Contact</label>
      <input type="text" id="edit-contact"><br>
      <label>Username</label>
      <input type="text" id="edit-username"><br>
      <input type="submit" id="edit-submit" data-edit-submit-id="${postId}">
    </form><br>
    `
    populateForm(parentNode)
  };//end of function

  //event listener
  divContainer.addEventListener('click', event => {
    let postId = event.target.dataset.postId
    event.preventDefault()
    if (event.target.matches(".card")) {
      getPost(postId);
    }else if (event.target.matches("#edit")) {
      postId = event.target.dataset.editId;
      const parentNode = {
        title: event.target.parentNode.getElementsByClassName("show-attr")[0].innerText,
        description: event.target.parentNode.getElementsByClassName("show-attr")[1].innerText,
        reward: event.target.parentNode.getElementsByClassName("show-attr")[2].innerText,
        contact: event.target.parentNode.getElementsByClassName("show-attr")[3].innerText,
        location: event.target.parentNode.getElementsByClassName("show-attr")[4].innerText,
        username: event.target.parentNode.getElementsByClassName("show-attr")[5].innerText
      }
      generateForm(parentNode, postId)
    } else if (event.target.matches("#edit-submit")) {
      postId = event.target.dataset.editSubmitId
      const inputs = {
       title: document.querySelector('#edit-title').value,
       description: document.querySelector('#edit-description').value,
       reward: document.querySelector('#edit-reward').value,
       location: document.querySelector('#edit-location').value,
       contact: document.querySelector('#edit-contact').value,
       username: document.querySelector('#edit-username').value
      }
      fetchNewPost(patchMethod, inputs, fetchPosts, postId);
    }else if (event.target.matches("#delete")) {
      postId = event.target.dataset.deleteId
      deletePost(postId)
    }

  })//end of event listener

  form.addEventListener('submit', event => {
    event.preventDefault()
    const postId = event.target.dataset
    const inputs = {
      title: document.querySelector('#title').value,
      description: document.querySelector('#description').value,
      reward: document.querySelector('#reward').value,
      contact: document.querySelector('#contact').value,
      location: document.querySelector('#location').value,
      username: document.querySelector('#username').value
    }
    fetchNewPost(postMethod, inputs, renderPost);
  });//end of event listener
  fetchPosts();
});
