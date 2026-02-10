class RepostParser {
    parseRepost (posts) {
        return posts.map(post => ({
            id: post.id,
            repost: post.reposts.count
        }));
    };
};

export default RepostParser;