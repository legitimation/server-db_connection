module.exports=function(app, Post)
{
    app.post("/post", (req,res) =>{
        var newPost = new Post();
        newPost.name = req.body.name;
        newPost.title = req.body.title;
        newPost.content = req.body.content;
        newPost.like=req.body.like;
        
        const query = { title: newPost.title }
// "findone"
        Post.findOne(query, (err, result) => {
            if (result == null) {
                newPost.save(function(err){
                    if (err){
                        console.error(err);
                        return;
                    }
                    res.status(200).send()
                })
            } else {
                res.status(400).send()
            }
        })
    });

    app.get("/post/all", (req, res) => {
        Post.find(function(err, posts){
            if(err) return res.status(500).send({error: 'database failure'});
            console.log(posts);
            console.log(typeof(posts[0]));
            res.status(200).json(posts)
        })
    });

    app.delete("/post/delete", (req,res) =>{
        const query = { title: req.body.title }

        Post.findOne(query, (err, result) => {
            if (result == null) {
                res.status(400).send()
            } else {
                Post.remove(query, function(err){
                    if (err){
                        console.error(err);
                        return;
                    }
                    res.status(200).send()
                })
            }
        })
    });


    app.post("/post/update", (req,res) =>{
        const updatePost={
            name:req.body.name,
            title: req.body.title,
            content:req.body.content,
            like:req.body.like
        }

        Post.update(updatePost, function(err, output){
            if(err) res.status(500);//.json({ error: 'database failure' });
            console.log(output);
            
            if(!output.n) return res.status(404);//.json({ error: 'Post not found' });
            res.status(200).send(JSON.stringify(updatePost))
        })
    
    });

}
