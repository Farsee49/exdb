const express = require('express');
const postsRouter = express.Router();
const { getAllPosts, getPostById, createPost, deletePost } = require('../db');
const methodOverride = require('method-override');
postsRouter.use(methodOverride('_method'));

postsRouter.use('*', (req, res, next) => {
    console.log('Request for API/POSTS: GRANTED');
    
    next();
});

postsRouter.post('/', async (req, res, next) => {
    const { title, content } = req.body;
         const post = await createPost({ title, content });
        console.log(post);
        res.render('posts/singlePost.ejs', { post });
        //res.send(post);
       
    // console.log(req.body);
    // res.send('This is the post post route');
    // const { authorId, title, content } = req.body;
     
    // try {
    //     const post = await createPost({ authorId, title, content });
    //     console.log(post);
    //     res.send(post);
    // } catch ({ name, message }) {
    //     next({ name, message });
    // }
});

postsRouter.get('/new', (req, res, next) => {
    
    // res.send('This is the new post form');
    res.render('posts/newPosts.ejs')
   
});

postsRouter.get('/', async (req, res, next) => {
    const posts = await getAllPosts();
    console.log(posts);
    res.render('posts/showPosts.ejs', { posts });
    next();
});




//     try {
//         const post = await getPostById(postId);
//         console.log(post);
//         res.render('posts/singlePost.ejs', { post });
//         //res.send(post);
//     } catch ({ name, message }) {
//         next({ name, message });
//     }
// });

postsRouter.get('/:postId/sing', async (req, res, next) => {
    const { postId } = req.params;
    const post = await getPostById(postId);
    res.render('posts/singlePost.ejs', { post});
    next();
});

postsRouter.delete('/:postId', async (req, res, next) => {
    const { postId } = req.params;
    console.log('DELETE POST ROUTE');
    const posts = await getAllPosts();
    const post = await deletePost(postId);
    res.render('posts/showPosts.ejs', { posts });
    //     
    // } catch ({ name, message }) {
    //     next({ name, message });
    // }
})





module.exports = postsRouter;