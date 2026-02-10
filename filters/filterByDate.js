class FilterDate {
    filter(posts, {from, to}) {
        return posts.filter(post=> {
            const date = new Date(post.date*1000);
            return (date >= from && date <= to);
        })
    }
}

export default FilterDate;