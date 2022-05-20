import { gql } from "graphql-request";
import client from "../../utils/gql_client";
import Head from "next/head";
import Hero from "../../components/Hero";
import Link from "next/link";

export default function Chapter({ chapter }) {
    return (
        <>
            <Head>
                <title>ExpressGradient</title>
                <meta
                    name="desc"
                    content="The &ldquo;Full-Stack Web&rdquo; Cookbook"
                />
            </Head>

            <header>
                <Hero />
            </header>

            <hr className="my-6" />

            <main>
                <section>
                    <article
                        className="prose prose-invert"
                        dangerouslySetInnerHTML={{
                            __html: chapter.content.html,
                        }}
                    />
                </section>
            </main>

            <hr className="my-6" />

            <footer className="flex flex-col space-y-3">
                <div>
                    <h3 className="text-xl font-bold">
                        Other Chapters in this category
                    </h3>

                    <ul className="bulleted-list">
                        {chapter.category.chapters.map((chapter) => (
                            <li key={chapter.id}>
                                <Link href={`/chapters/${chapter.slug}`}>
                                    <a>{chapter.name}</a>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>

                <div>
                    <h3 className="text-xl font-bold">Meta</h3>

                    <ul className="bulleted-list">
                        <li>Views: {chapter.views}</li>
                        <li>
                            Created At:{" "}
                            {new Date(chapter.createdAt).toLocaleString()}
                        </li>
                        <li>
                            Created At:{" "}
                            {new Date(chapter.updatedAt).toLocaleString()}
                        </li>
                    </ul>
                </div>
            </footer>
        </>
    );
}

export async function getStaticPaths() {
    const getAllChapterSlugsQuery = gql`
        query GetAllChapterSlugs {
            chapters {
                slug
            }
        }
    `;

    const { chapters } = await client.request(getAllChapterSlugsQuery);

    const paths = chapters.map((chapter) => ({
        params: { slug: chapter.slug },
    }));

    return {
        paths,
        fallback: "blocking",
    };
}

export async function getStaticProps({ params }) {
    const getChapterBySlugQuery = gql`
        query GetChapterBySlug($slug: String!) {
            chapter(where: { slug: $slug }) {
                id
                name
                slug
                createdAt
                updatedAt
                views
                content {
                    html
                }
                category {
                    id
                    name
                    chapters(where: { slug_not: $slug }) {
                        id
                        name
                        slug
                    }
                }
            }
        }
    `;

    const { chapter } = await client.request(getChapterBySlugQuery, {
        slug: params.slug,
    });

    return { props: { chapter }, revalidate: 300 };
}
