import { gql } from "graphql-request";
import client from "../../utils/gql_client";
import Head from "next/head";
import Hero from "../../components/Hero";
import Link from "next/link";
import { marked } from "marked";
import hljs from "highlight.js";

export default function Chapter({ chapter }) {
    return (
        <>
            <Head>
                <title>ExpressGradient - {chapter.name}</title>
                <meta name="desc" content={chapter.description} />
            </Head>

            <header>
                <Hero />
            </header>

            <hr className="my-6" />

            <main>
                <section>
                    <article
                        className="w-full mx-auto prose prose-invert lg:prose-lg"
                        dangerouslySetInnerHTML={{
                            __html: chapter.content,
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
                        {chapter.category.chapters.map((otherChapter) => (
                            <li key={chapter.id}>
                                <Link href={`/chapters/${otherChapter.slug}`}>
                                    <a>{otherChapter.name}</a>
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
                description
                createdAt
                updatedAt
                views
                content
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

    marked.setOptions({
        highlight: (code) => hljs.highlightAuto(code).value,
    });

    chapter.content = marked.parse(chapter.content);

    return { props: { chapter }, revalidate: 300 };
}
