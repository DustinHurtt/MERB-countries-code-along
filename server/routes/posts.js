var express = require('express');
var router = express.Router();

const Post = require('../models/Post');
const User = require('../models/User')

router.get('/', (req, res, next) => {
  Post.find()
    .populate('contributor')
    .populate('country')
    .sort({createdAt: -1})
    .then((foundPosts) => {
        res.json(foundPosts)
    })
    .catch((err) => {
        console.log(err)
    })
});


router.post('/create-post/:userId', (req, res, next) => {

    let newPost = {
        title: req.body.title,
        story: req.body.story,
        date: req.body.date,
        contributor: req.params.userId,
        country: req.body.country
    }

    Post.create(newPost)
        .then((createdPost) => {
            res.json(createdPost)
        })
        .catch((err) => {
            console.log(err)
        })
    
})

router.post('edit-post/:postId/:userId', (req, res, next) => {

    Post.findByIdAndUpdate(req.params.postId, 
        {
        title: req.body.title,
        story: req.body.story,
        date: req.body.date,
        }, 
        {new: true}
        )
        .then((updatedPost) => {
            res.json(updatedPost)
        })
        .catch((err) => {
            console.log(err)
        })

})

router.get('/delete-post/:postId/:userId', (req, res, next) => {
    User.findById(req.params.userId)
        .then((foundUser) => {
            if (foundUser.posts.includes(req.params.postId)) {
                Post.findByIdAndDelete(req.params.postId)
                    .then((deletedPost) => {
                        res.json(deletedPost)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } else {
                res.json({message: "You can't delete this post"})
            }
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;