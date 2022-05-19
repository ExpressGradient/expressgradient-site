export default async function revalidate(req, res) {
    try {
        const { slug } = req.body.data;
        const reqRevalSecret = req.headers.Authorization.split(" ")[1];

        if (reqRevalSecret !== process.env.REVAL_SECRET) {
            return res.status(401).json({
                error: "Unauthorized",
            });
        } else {
            await res.unstable_revalidate(`/chapters/${slug}`);
            return res.status(200);
        }
    } catch (error) {
        res.status(500).json({
            message: "Something went wrong while revalidating",
            error,
        });
    }
}
