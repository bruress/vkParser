class LikeParser {
    parseLike (posts) {
        try {
            return posts.map(post => ({
                id: post.id,
                like: post.likes.count
            }));
        } catch (error) {
            console.error("parseLike Error: ", error.message);
            return [];
        }
    };
};

export default LikeParser;