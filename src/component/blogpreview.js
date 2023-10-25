import React, { useState } from "react";

export default function PreviewBlog(params) {
    const header = params['title']
    const description = params['description']
    const content = params['content']
    return (
        <article>
            <header>
                <h2>{header}</h2>
                <p>{description}</p>
            </header>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </article>
    )
}