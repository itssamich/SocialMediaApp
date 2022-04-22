import { Post } from "../models/posts";
import {Comment} from '../models/comments'
import { previousTuesday } from "date-fns";

//GET /
export const indexPage = (req, res, next) => {
  res.render('index')
}
//GET /home
export const homePageAPI = (req, res, next) => {
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

//POST /api/comment/new
export const newCommentAPI = (req, res, next) => {
  let comment = new Comment(req.body)
  comment.save(err => {
    if(err){
      res.json({success: false, message: "Could not add comment!"})
      res.end()
    }
    else{
      let val = JSON.stringify(comment._id)
      res.write(val)
      Post.findOne({_id: comment.post}).exec((err, post) => {
        if(err){
            res.json({success: false, message: "unable to update"})
        }
        else{
          post.comments.push(comment._id)
          post.save()
        }
      })
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
          post.likes = post.likes + 1
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
  Post.findById(req.params.id).exec((err, post) => {
		if(err){
			res.json({success: false, message: "Query Failed"})
		  }
		  else{
        if(post.comments){
          for(let i = 0; i < post.comments.length; i++){
            Comment.findByIdAndDelete(post.comments[i]._id).exec((err, cmt) => {
              
            })
          }
        }
		  }
	})

  Post.findByIdAndDelete(req.params.id, err => {
    if(err){
      res.json({success: false, message: "post deletion failed"})
      res.end()
    }
    else{
      res.end()
    }
  })
}

export const getAllComments = (req, res, next) => {
  let commentList = []
  Post.findById(req.params.id).exec((err, post) => {
		if(err){
			res.json({success: false, message: "Query Failed"})
		  }
		  else{    
        if(post.comments){
          for(let i = 0; i < post.comments.length; i++){
            Comment.findById(post.comments[i]).exec((err, cmt) => {
              if(!err){
                // console.log(i, "+", JSON.stringify(cmt))
                commentList.push(cmt)
                if(commentList.length == post.comments.length){ //This is a really weird fix, For some reason it almost seems randomized on which value comes first and then the list clears
                  res.write(JSON.stringify(commentList))
                  res.end()

                }
              }
              
            })
          }
        }
		  }
	})
}
