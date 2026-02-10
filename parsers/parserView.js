class ViewParser {

    parseView(posts) {
        return posts.map(post => ({
            id: post.id,
            view: post.views.count
        }));
    };
};

export default ViewParser;