import { Post } from "../models/posts";

//GET /
export const indexPage = (req, res, next) => {
  res.render('index')
}
//GET /home
export const homePage = (req, res, next) => {
  Post.find({}).exec((err, post) => {
    if(err){
      res.json({success: false, message: "Query Failed"})
    }
    else{
      res.write(JSON.stringify(post))
      res.end()
    }
  })
}

//GET /api/posts/:id
export const postPage = (req, res, next) => {
	Post.findById(req.params.id).exec((err, post) => {
		if(err){
			res.json({success: false, message: "Query Failed"})
		  }
		  else{
			res.write(JSON.stringify(post))
			res.end()
		  }
	})
}

export const newPost = (req, res, next) => {
	res.render('newpost')
}

//POST /api/posts/new
export const newPostAPI = (req, res, next) => {
  let post = new Post(req.body)
  post.save(err => {
    if(err){
      res.json({success: false, message: "Could not add post!"})
      res.end()
    }
    else{
      res.end()
    }
  })
}

//PUT /api/posts/:id/like
export const updateLikes = (req, res, next) => {
  Post.findOne({_id: req.params.id}).exec((err, post) => {
      if(err){
          res.json({success: false, message: "unable to update"})
          res.end()
      }
      else{
          post.votes = post.votes + 1
          post.save(err => {
              if(err){
                  res.json({success: false, message: "unable to update"})
                  res.end()
              }
              else{
                  res.end()
              }
          })
      }
  })
}

//DELETE /api/posts/:id
export const deletePost = (req, res, next) => {
  Post.findByIdAndDelete(req.params.id, err => {
    if(err){
      res.json({success: false, message: "Quote deletion failed"})
      res.end()
    }
    else{
      res.end()
    }
  })
}