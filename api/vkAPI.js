import axios from "axios";
import API from './API.js';

class VKAPI extends API {

    // settings for VK API
    constructor (config) {
        super(config);
        this.baseURL='https://api.vk.com/method/';
        this.version='5.199';
        this.accessToken=null;
    }

    // set current token
    setToken(token) {
        this.accessToken=token;
    }

    // universal request VK API
    async getData (method, params = {}) {
        const response = await axios.get(`${this.baseURL}${method}`, {
            params: {
                ...params, 
                access_token: this.accessToken,
                v: this.version
            }
        });

        if (response.data.error) {
            throw new Error(response.data.error.error_msg);
        };

        return response.data.response;
    };

    // get posts
    async getWall (domainId, not_pinned = null) { 
        const allPosts = [];
        const count = 100;
        let offset = 0;

        while (true) {
            try {
                const response = await this.getData('wall.get', {
                    domain: domainId,
                    count,
                    offset,
                    filter: 'owner'
                });

                const items = response.items;
                if (!items || items.length === 0) break;

                for (const post of items) {
                    if (not_pinned && post.date < not_pinned) {
                        if (!post.is_pinned) return allPosts;
                        else continue; 
                    }
                    allPosts.push(post);
                }

                if (items.length < count) break;
                offset=offset+count;
            } catch (error) {
                console.error("getWall error: ", error.message);
                break;
            };
        };
        return allPosts;
    };
};

export default VKAPI;