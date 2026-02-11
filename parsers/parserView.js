class ViewParser {

    parseView(posts) {
        try {
            return posts.map(post => ({
                id: post.id,
                view: post.views.count
            }));
        } catch (error) {
            console.error("parseView Error: ", error.message);
            return [];
        }
    };
};

export default ViewParser;