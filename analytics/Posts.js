class WallPosts {
    constructor (vkAPI, periodFilter) {
        this.vkAPI = vkAPI;
        this.periodFilter = periodFilter;
    }

    async getPosts (domainId, period) {
        const posts = await this.vkAPI.getWall(domainId);
        return this.periodFilter.filter(posts, period)
    }
}

export default WallPosts;