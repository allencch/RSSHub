import { Route } from '@/types';
import got from '@/utils/got';

export const route: Route = {
    path: '/magazine',
    categories: ['religious'],
    example: '/magazine',
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
    name: 'Catholic Answers Magazine',
    maintainers: ['Allen'],
    handler,
};

async function handler() {
    const baseUrl = 'https://www.catholic.com';
    const wpUrl = `https://cdn.catholic.com/wp-json/wp/v2/article`;

    const title = 'Catholic Answers Magazine';
    const { data: magazineItems } = await got.get(String(wpUrl), {
        searchParams: {
            _embed: '',
            'article-type': '70,71',
            page: 1,
        },
    });
    const items = magazineItems.map((item) => ({
        title: item.title.rendered,
        link: item.link.replace('cdn.catholic.com/article', 'www.catholic.com/magazine/online-edition'),
        description: item.content.rendered,
        pubDate: new Date(`${item.date_gmt}Z`),
        author: item._embedded.author.name,
    }));

    return {
        title,
        link: baseUrl,
        image: `${baseUrl}/favicon.ico`,
        item: items,
    };
}
