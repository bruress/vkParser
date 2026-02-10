class TextParser {
    parseText (posts) {
        return posts.map(post => ({
            id: post.id,
            text: post.text
        }));
    };
};

export default TextParser;