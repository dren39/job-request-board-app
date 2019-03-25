user1 = User.create(username:"dean", password:"impala")
user2 = User.create(username:"sam", password:"moose")
user3 = User.create(username:"cass", password:"family")

post1 = Post.create(title:"Need help setting vcr", description:"Just bought a new vcr but I don't know how to set up this damn thing. Looking for someone to help me set this up", reward:"A cold beer", contact:"123-456-7899", deadline:"before the next episode housewives air", specialty:0, location: "Kansas", user_id:1)

post2 = Post.create(title:"Opinion on my new flannel", description:"Just bought another flannel and I'd like another's opinion on it", reward:"lunch", contact:"987-654-3210", deadline:"none", specialty:5, location:"near denver", user_id:2)

post3 = Post.create(title:"Looking for peanut butter recipes", description:"I really like peanut butter and I'm looking for someone to share some awesome peanut butter recipes with me", reward:"$10", contact:"111-222-3333", deadline:"none", specialty:2, location:"the bunker", user_id:3)
