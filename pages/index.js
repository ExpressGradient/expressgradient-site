import Head from "next/head";

function Hero() {
    return (
        <div className="text-center">
            <h1 className="text-3xl lg:text-4xl font-bold text-amber-400">
                ExpressGradient
            </h1>
            <p className="text-sm lg:text-base mt-1">
                The &ldquo;Full-Stack Web&rdquo; Cookbook
            </p>
        </div>
    );
}

function SearchBar() {
    return (
        <form className="lg:w-3/4 lg:mx-auto flex flex-row gap-x-2">
            <label htmlFor="recipe-search" className="hidden">
                Search for Recipes
            </label>
            <input
                id="recipe-search"
                type="search"
                placeholder="Search for Recipes"
            />
            <button type="submit" className="primary-btn">
                Search
            </button>
        </form>
    );
}

export default function Home() {
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
        </>
    );
}
