import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getBlogBySlug } from "../services/blogService";

function BlogDetails() {

    const { slug } = useParams();

    const [blog, setBlog] = useState(null);

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        async function fetchBlog() {

            try {

                const data = await getBlogBySlug(slug);

                setBlog(data);

            } catch (error) {

                console.log(
                    "Blog details error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        }

        fetchBlog();

    }, [slug]);



    /* Loading */

    if (loading) {

        return (

            <section className="py-20">

                <h1 className="
                    text-center
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-slate-800
                ">

                    Loading article...

                </h1>

            </section>

        );

    }



    /* Not found */

    if (!blog) {

        return (

            <section className="py-20">

                <h1 className="
                    text-center
                    text-2xl
                    md:text-3xl
                    font-bold
                    text-slate-800
                ">

                    Article Not Found

                </h1>

            </section>

        );

    }



    return (

        <section className="
            bg-white
            py-12
            md:py-20
        ">

            <article className="
                max-w-4xl
                mx-auto
                px-4
                sm:px-6
                lg:px-8
            ">


                {/* Category */}

                {blog.category && (

                    <div className="mb-5">

                        <span className="
                            inline-block
                            bg-blue-100
                            text-blue-700
                            px-4
                            py-1.5
                            rounded-full
                            text-sm
                            font-semibold
                        ">

                            {blog.category}

                        </span>

                    </div>

                )}



                {/* Title */}

                <h1 className="
                    text-3xl
                    sm:text-4xl
                    md:text-5xl
                    font-bold
                    leading-tight
                    text-slate-900
                    mb-6
                    wrap-break-words">

                    {blog.title}

                </h1>



                {/* Excerpt */}

                {blog.excerpt && (

                    <p className="
                        text-base
                        sm:text-lg
                        md:text-xl
                        text-gray-600
                        leading-relaxed
                        mb-8
                    ">

                        {blog.excerpt}

                    </p>

                )}



                {/* Hero Image */}

                {blog.image && (

                    <div className="
                        w-full
                        mb-10
                        overflow-hidden
                        rounded-xl
                    ">

                        <img

                            src={`http://localhost:5000${blog.image}`}

                            alt={blog.title}

                            className="
                                w-full
                                h-auto
                                max-h-[500px]
                                object-cover
                            "

                        />

                    </div>

                )}



                {/* Article Content */}

                <div
                    className="
                        prose
                        prose-lg
                        max-w-none

                        text-gray-700

                        break-words

                        [&_img]:max-w-full
                        [&_img]:h-auto
                        [&_img]:rounded-lg

                        [&_iframe]:max-w-full

                        [&_table]:block
                        [&_table]:max-w-full
                        [&_table]:overflow-x-auto

                        [&_pre]:max-w-full
                        [&_pre]:overflow-x-auto

                        [&_code]:break-words

                        [&_a]:break-words
                        [&_a]:text-blue-600

                        prose-headings:text-slate-900
                        prose-p:leading-8
                    "

                    dangerouslySetInnerHTML={{
                        __html: blog.content
                    }}

                />



                {/* Tags */}

                {blog.tags && (

                    <div className="
                        flex
                        flex-wrap
                        gap-2
                        mt-10
                        pt-8
                        border-t
                        border-gray-200
                    ">

                        {blog.tags
                            .split(",")
                            .map((tag, index) => (

                                <span

                                    key={index}

                                    className="
                                        bg-gray-100
                                        text-gray-700
                                        px-3
                                        py-1
                                        rounded-full
                                        text-sm
                                    "

                                >

                                    #{tag.trim()}

                                </span>

                            ))
                        }

                    </div>

                )}


            </article>

        </section>

    );

}

export default BlogDetails;