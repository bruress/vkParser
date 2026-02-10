class CommentParser { 
    parseComment (posts) {
        return posts.map(post => ({
            id: post.id,
            comment: post.comments.count
        }));
    };
};

export default CommentParser;