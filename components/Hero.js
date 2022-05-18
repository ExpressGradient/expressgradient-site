import Link from "next/link";

export default function Hero() {
    return (
        <div className="text-center">
            <Link href="/">
                <a>
                    <h1 className="text-3xl font-bold lg:text-4xl text-amber-400">
                        ExpressGradient
                    </h1>
                </a>
            </Link>
            <p className="mt-1 text-sm lg:text-base">
                The &ldquo;Full-Stack Web&rdquo; Cookbook
            </p>
        </div>
    );
}
