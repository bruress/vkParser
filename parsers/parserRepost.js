class RepostParser {
    parseRepost (posts) {
        try {
            return posts.map(post => ({
                id: post.id,
                repost: post.reposts.count
            }));
        } catch (error) {
            console.error("parseRepost Error: ", error.message);
            return [];
        }
    };
};

export default RepostParser;