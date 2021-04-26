//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const _ = require('lodash');
const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb+srv://atlas-cherry:Chiku1906@blog-site.l87pc.mongodb.net/postsDB?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});
const postSchema = ({
  title: String,
  content : String
});
const Post = mongoose.model("Post",postSchema);


const homeStartingContent = "Hey Welcome to my blog site.Thanks for being here. You might not find many blogs here as I am an ocassional writer but you can give some of my works a read. So have fun! ";
const aboutContent = "I am currently pursuing a BTech degree. I like to spend my time at the intersection of tech and creativity, I could be characterized by empathy and expressed emotional capacity. I like myself when I am intuitive and engrossed in whatever I do. I ain't a blogger but I do like to write occasionally though I am a bit old-school so I prefer letters and all that. Also, I am a developer, a designer, and sometimes a doodle artist as well. I am pretty determined and I never give up until I get that thing right. Also, I'm pretty good at multi-tasking";



app.get("/", function(req, res) {
  Post.find({} ,function(err,foundPost){
    res.render("home", {
      homeContent: homeStartingContent,
      posts: foundPost
    });

  })
});
//about
app.get("/about", function(req, res) {
  res.render("about", {
    aboutcon: aboutContent
  });
});
//contact

app.get("/contact", function(req, res) {
  res.render("contact");
});
//compose page
app.get("/compose", function(req, res) {
  res.render("compose");
});
app.post("/compose", function(req, res) {
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  post.save(function(err){

   if (!err){

     res.redirect("/");

   }

 });



});
//custom url
// app.get("/posts/:topic", function(req, res) {
//   // if(req.params.topic === posts.Title){
//   //   console.log("Match found");
//   let requestedTitle = _.lowerCase(req.params.topic);
//
//   posts.forEach(function(post) {
//     const storedTitle = _.lowerCase(post.Title);
//     if (storedTitle === requestedTitle) {
//       res.render("post", {
//         pos: post
//       });
//     }
//
//   });
// });
app.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;

  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  });

});


app.listen(process.env.PORT ||3000, function(){
  console.log("Server is running on port 3000");
});
