class TextParser {
    parseText (posts) {
        try {
            return posts.map(post => ({
                id: post.id,
                text: post.text
            }));
        }
        catch (error) {
            console.error("parseText Error: ", error.message);
            return [];
        } 
    };
};

export default TextParser;