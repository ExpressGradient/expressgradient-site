import redis from "../../utils/redis_client";
import gqlClient from "../../utils/gql_client";

export default async function views(req, res) {
    if (req.method === "PATCH") {
        const { slug, ip } = req.body;

        const { chapter } = await gqlClient.request(
            `
            query GetViews($slug: String!) {
                chapter(where: {slug: $slug}) {
                    views
                }
            }
        `,
            { slug }
        );

        await gqlClient.request(
            `
            mutation UpdateViews($slug: String!, $views: Int!) {
                updateChapter(where: {slug: $slug}, data: {views: $views}) {
                    id
                    views
                }
            }
        `,
            {
                slug,
                views: chapter.views + 1,
            }
        );

        await gqlClient.request(
            `
            mutation PublishChapterView($slug: String!) {
                publishChapter(where: {slug: $slug}) {
                    id
                }
            }
        `,
            { slug }
        );

        await redis.setex(`${ip}:${slug}`, 300, "1");

        res.status(201).end();
    }
}
