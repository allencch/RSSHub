import { Route } from '@/types';
import got from '@/utils/got';

export const route: Route = {
    path: '/blog',
    categories: ['religious'],
    example: '/blog',
    parameters: {},
    features: {
        requireConfig: false,
        requirePuppeteer: false,
        antiCrawler: false,
        supportBT: false,
        supportPodcast: false,
        supportScihub: false,
    },
    radar: [],
    name: 'Catholic Answers Blog',
    maintainers: ['Allen'],
    handler,
};

async function handler() {
    const baseUrl = 'https://www.catholic.com';
    const wpUrl = `https://cdn.catholic.com/wp-json/wp/v2/article`;

    const title = 'Catholic Answers Blog';

    const { data: response } = await got.get(String(wpUrl), {
        searchParams: {
            _embed: '',
            'article-type': '105618',
            page: 1,
        },
    });
    const items = response.map((item) => ({
        title: item.title.rendered,
        link: item.link.replace('cdn.catholic.com/article', 'www.catholic.com/magazine/blog'),
        description: item.content.rendered,
        pubDate: new Date(`${item.date_gmt}Z`),
        author: item._embedded.author.name,
    }));

    return {
        title,
        link: baseUrl,
        item: items,
    };
}
