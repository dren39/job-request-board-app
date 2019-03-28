user1 = User.create(username:"dean", password:"impala")
user2 = User.create(username:"sam", password:"moose")
user3 = User.create(username:"cass", password:"family")

post1 = Post.create(title:"Need help setting vcr", description:"Just bought a new vcr but I don't know how to set up this damn thing. Looking for someone to help me set this up", reward:"A cold beer", contact:"123-456-7899", location: "Kansas", user_id:1)

post2 = Post.create(title:"Opinion on my new flannel", description:"Just bought another flannel and I'd like another's opinion on it", reward:"lunch", contact:"987-654-3210", location:"near denver", user_id:2)

post3 = Post.create(title:"Looking for peanut butter recipes", description:"I really like peanut butter and I'm looking for someone to share some awesome peanut butter recipes with me", reward:"$10", contact:"111-222-3333", location:"the bunker", user_id:3)

post4 = Post.create(title:"Need help building a fence", description:"Looking for a handy individual to help put up a fence around my moat", reward:"$50", contact:"345-678-2229", location:"my castle", user_id:1)

post5 = Post.create(title:"Fix my computer", description:"My computer screen keeps blacking out, need someone to help take a look", reward:"$30-50", contact:"dren@drenmail.com", location:"21 dren street", user_id:3)

post6 = Post.create(title:"Pest control", description:"I've got a small rat problem, looking for someone to help me put up traps", reward:"$15", contact:"475-237-7756", location:"hicksville", user_id:2)
