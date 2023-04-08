const got = require('@/utils/got');
const baseUrl = 'https://www.catholic.com';
const wpUrl = `https://cdn.catholic.com/wp-json/wp/v2/article`;

module.exports = async (ctx) => {
    const title = 'Catholic Answers Magazine';
    const { data: response } = await got.get(String(wpUrl), {
        searchParams: {
            _embed: '',
            'article-type': '105618',
            page: 1,
        },
    });
    const items = response.map((item) => ({
        title: item.title.rendered,
        link: item.link,
        description: item.content.rendered,
        pubDate: new Date(`${item.date_gmt}Z`),
        author: item._embedded.author.name,
    }));
    ctx.state.data = {
        title,
        link: baseUrl,
        image: `${baseUrl}/favicon.ico`,
        item: items,
    };
};
