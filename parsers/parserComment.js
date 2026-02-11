class CommentParser { 
    parseComment (posts) {
        try {
            return posts.map(post => ({
                id: post.id,
                comment: post.comments.count
            }));
        }
        catch (error) {
            console.error("parseComment Error: ", error.message);
            return [];
        }
    };
};

export default CommentParser;