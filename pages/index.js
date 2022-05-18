import { Disclosure, Transition } from "@headlessui/react";
import { TriangleRightIcon } from "@radix-ui/react-icons";
import { gql } from "graphql-request";
import Head from "next/head";
import client from "../utils/gql_client";
import Link from "next/link";
import Hero from "../components/Hero";

function SearchBar() {
    return (
        <form className="flex flex-row lg:w-3/4 lg:mx-auto gap-x-2">
            <label htmlFor="recipe-search" className="hidden">
                Search for Recipes
            </label>
            <input
                id="recipe-search"
                type="search"
                placeholder="Search for Recipes"
                required={true}
            />
            <button type="submit" className="primary-btn">
                Search
            </button>
        </form>
    );
}

function ChapterList({ categories }) {
    return (
        <ul>
            {categories.map((category) => (
                <li key={category.id} className="mb-2">
                    <Disclosure defaultOpen={true}>
                        {({ open }) => (
                            <>
                                <Disclosure.Button className="flex items-center w-full p-1.5 hover:bg-gray-700 transition-colors duration-200 ease-in-out rounded-md">
                                    <TriangleRightIcon
                                        className={`transition-transform ease-in-out duration-200 ${
                                            open ? "rotate-90" : ""
                                        }`}
                                    />
                                    <p className="text-xl font-semibold capitalize">
                                        {category.name}
                                    </p>
                                </Disclosure.Button>

                                <Transition
                                    show={open}
                                    enter="transition duration-200 ease-out"
                                    enterFrom="transform scale-95 opacity-0"
                                    enterTo="transform scale-100 opacity-100"
                                    leave="transition duration-200 ease-out"
                                    leaveFrom="transform scale-100 opacity-100"
                                    leaveTo="transform scale-95 opacity-0"
                                >
                                    <Disclosure.Panel static={true}>
                                        <ul className="bulleted-list">
                                            {category.chapters.map(
                                                (chapter) => (
                                                    <li key={chapter.id}>
                                                        <Link
                                                            href={`/chapters/${chapter.slug}`}
                                                        >
                                                            <a>
                                                                {chapter.name}
                                                            </a>
                                                        </Link>
                                                    </li>
                                                )
                                            )}
                                        </ul>
                                    </Disclosure.Panel>
                                </Transition>
                            </>
                        )}
                    </Disclosure>
                </li>
            ))}
        </ul>
    );
}

export default function Home({ categories }) {
    return (
        <>
            <Head>
                <title>ExpressGradient</title>
                <meta
                    name="desc"
                    content="The &ldquo;Full-Stack Web&rdquo; Cookbook"
                />
            </Head>

            <header className="flex flex-col gap-y-7">
                <Hero />
                <SearchBar />
            </header>

            <hr className="my-6" />

            <main>
                <section>
                    <ChapterList categories={categories} />
                </section>
            </main>
        </>
    );
}

export async function getServerSideProps() {
    const getAllCategoriesQuery = gql`
        query GetAllCategories {
            categories {
                id
                name
                chapters {
                    id
                    name
                    slug
                }
            }
        }
    `;

    const { categories } = await client.request(getAllCategoriesQuery);

    return {
        props: { categories },
    };
}
