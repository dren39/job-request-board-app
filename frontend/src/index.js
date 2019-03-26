document.addEventListener('DOMContentLoaded', (event) => {
  console.log('DOM fully loaded and parsed');
  
  const app = new App();
  app.allEventListeners();

  const postUrl = "http://localhost:3000/posts";

  function fetchPosts() {
    fetch(postUrl)
    .then(response => response.json())
    .then(posts => {
      posts.forEach(post => {
        return new Post(post)
      })
      Post.renderAll(app.divContainer)
    })//end of fetch
  }//end of function

  fetchPosts();
});
