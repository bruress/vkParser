class LikeParser {
    parseLike (posts) {

        return posts.map(post => ({
            id: post.id,
            like: post.likes.count
        }));
    };
};

export default LikeParser;