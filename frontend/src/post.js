class Post {
  constructor({id, title, description, reward, contact, deadline, location, user_id}) {
    this.id = id
    this.title = title
    this.description = description
    this.reward = reward
    this.contact = contact
    this.deadline = deadline
    this.location = location
    this.user_id = user_id
    this.constructor.all.push(this)
  }//end of constructor
//hot potato hot potato
  toHTMLIndex() {
    const postCard = document.createElement('div');
    postCard.className = "card"
    postCard.setAttribute('data-post-id', `${this.id}`);
    postCard.innerHTML = `
    <h4>${this.title}</h4>
    <p>Location: ${this.location}</p>
    <p>Deadline: ${this.deadline}</p>
    `
    return postCard;
  };//end of method

  toHTMLShow() {
    const showCard = document.createElement('div');
    showCard.className = "big-card"
    showCard.innerHTML = `
    <div class="big-card">
    <h3>${this.title}</h3>
    <p>Description: ${this.description}</p>
    <p>Reward: ${this.reward}</p>
    <p>Contact Info: ${this.contact}</p>
    <p>Location: ${this.location}</p>
    <p>Deadline: ${this.deadline}</p>
    <p>Posted by: ${this.user_id}</p>
    </div>
    `
    return showCard
  };//end of method

  render(domNode, func) {
    if (func === this.toHTMLIndex) {
      domNode.appendChild(func.bind(this)());
    } else {
      domNode.innerHTML = '';
      domNode.appendChild(func.bind(this)());
    }
  }

  static renderAll(domNode) {
    domNode.innerHTML = '';
    this.all.forEach(post => {
      post.render(domNode, post.toHTMLIndex)
    })//end of forEach
  }//end of method

  static findById(postId) {
    return this.all.find(post => post.id === postId)
  };//end of method
}//end of class
Post.all = [];
