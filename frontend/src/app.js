class App {
  constructor() {
    this.divContainer = document.querySelector("#container");
    this.form = document.querySelector("#form");
  }//end of constructor

  showCardEvent(event) {
    const postId = parseInt(event.target.dataset.postId)
    if (event.target.matches(".card")) {
      const post = Post.findById(postId)
      post.render(this.divContainer, post.toHTMLShow)
    }
  };//end of method

  submitHandler(event) {
    event.preventDefault()
    const postUrl = "http://localhost:3000/posts";
    const title = document.querySelector("#title").value;
    const description = document.querySelector("#description").value;
    const reward = document.querySelector("#reward").value;
    const contact = document.querySelector("#contact").value;
    const deadline = document.querySelector("#deadline").value;
    const location = document.querySelector("#location").value;
    const username = document.querySelector("#username").value;
    fetch(postUrl, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description,
        reward: reward,
        contact: contact,
        deadline: deadline,
        location: location,
        username: username
      })
    })//end of fetch
    .then(response => response.json())
    .then(post => {
      const newPost = new Post(post)
      return newPost.render(this.divContainer, newPost.toHTMLIndex)
    });
  };//end of method

  allEventListeners() {
    this.divContainer.addEventListener('click', this.showCardEvent.bind(this))
    this.form.addEventListener('submit', this.submitHandler.bind(this))

  }//end of method
}//end of class
