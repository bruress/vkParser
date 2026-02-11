import TextParser from "../parsers/parserText.js";
import LikeParser from '../parsers/parserLike.js';
import RepostParser from '../parsers/parserRepost.js';
import CommentParser from '../parsers/parserComment.js';
import ViewParser from '../parsers/parserView.js';

class WallAnalytic {
    
    constructor(vkAPI, periodFilter) {
        // vkAPI && from/to
        this.vkAPI = vkAPI,
        this.periodFilter = periodFilter;
        // all parsers
        this.parsers = {
            text: new TextParser(),
            comments: new CommentParser(),
            likes: new LikeParser(),
            reposts: new RepostParser(),
            views: new ViewParser(),
        };
    };

    // all posts with period
    async getAll (domainId, period) {

        try {
            // convert to seconds for working with vkAPI
            const start = Math.floor(period.from.getTime() / 1000);

            const posts = await this.vkAPI.getWall(domainId, start);
            const filtered = this.periodFilter.filter(posts, period);
            const formatDate = fd => new Date(fd * 1000).toISOString().slice(0, 10);
            
            // start all parsers and wait when it will end with errors or without
            const results = await Promise.allSettled([
                this.parsers.text.parseText(filtered),
                this.parsers.comments.parseComment(filtered),
                this.parsers.likes.parseLike(filtered),
                this.parsers.reposts.parseRepost(filtered),
                this.parsers.views.parseView(filtered),
            ]);
            // to not fall
            const [text, comments, likes, reposts, views]=results.map(r =>
                r.status === "fulfilled" ? r.value : filtered.map(() => ({
                    text: "",
                    comment: 0,
                    like: 0,
                    repost: 0,
                    view: 0
                }))
            );

            return filtered.map((post, i) => ({
                id: post.id,
                date: formatDate(post.date),
                text: text[i].text,
                comments: comments[i].comment,
                likes: likes[i].like,
                reposts: reposts[i].repost,
                views: views[i].view
            }));

        } catch (error) {
            console.error("getAll Error: ", error.message);
        }

    };
};


export default WallAnalytic;