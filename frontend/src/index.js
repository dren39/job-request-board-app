document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');

  //variables
  const postUrl = "http://localhost:3000/posts";
  const divContainer = document.querySelector("#container");
  const body = document.getElementsByTagName("body")[0];

  //functions
  function renderPost(post) {
    divContainer.innerHTML += `
      <div class="card" data-post-id="${post.id}"> ${post.title}
      <p>Specialty: ${post.specialty}</p>
      <p>Location: ${post.location}</p>
      <p>Deadline: ${post.deadline}</p>
      </div>
    `
  };//end of function

  function fetchPosts() {
    fetch(postUrl)
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
      renderPost(post)
      })
    })//end of fetch
  }//end of function

  function getPost(postId) {
    fetch(`${postUrl}/${postId}`)
    .then(response => response.json())
    .then(post => {
      showPost(post);
    })
  }//end of function

  function showPost(post) {
    divContainer.innerHTML = '';
    divContainer.innerHTML = `
    <div class="big-card">
    <h3>${post.title}</h3>
    <p>Specialty: ${post.specialty}</p>
    <p>Description: ${post.description}</p>
    <p>Reward: ${post.reward}</p>
    <p>Contact Info: ${post.contact}</p>
    <p>Location: ${post.location}</p>
    <p>Deadline: ${post.deadline}</p>
    <p>Posted by: ${post.user_id}</p>
    </div>
    `
    // console.log('everythings gone')
  };//end of function

  //event listener
  divContainer.addEventListener('click', event => {
    const postId = event.target.dataset.postId
    if (event.target.className === "card") {
      console.log(postId)
      getPost(postId);
      // showPost();

    }
  })//end of event listener
  fetchPosts();
});
