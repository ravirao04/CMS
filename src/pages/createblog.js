import React, { useState } from "react";
import { FirestoreAPI } from "../firebase/operation";
import { db } from "../firebase/config"
import { async } from "regenerator-runtime";
import { useLoaderData, useNavigate } from "react-router";
import PreviewBlog from "../component/blogpreview";
import { useTheme } from "../util/ThemeContext";
import { Firestore, Timestamp } from "firebase/firestore";

const api = new FirestoreAPI(db);

function SplitContainer({ children }) {
    return (
        <div horizontal layout style={{
            display: "flex",
            width: "100%",
            "flex-direction": "row",
            "flex-wrap": "nowrap",
            "margin": 10,
            columnGap: "20px"
        }}>
            {children}
        </div>
    )
}

function ContentForm({ children }) {
    return (
        <div
            style={{
                width: "50%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                rowGap: "20px",
                alignItems: "stretch",
                flex: 1,
                height: "100vh", // Set the container's height to 100%
            }}
        >
            {children}

        </div>
    )
}

function PreviewContainer({ children }) {
    const { theme } = useTheme()
    return (
        <div vertical layout
            style={{
                background: "D4D4D4",
                "border-radius": "10px",
                width: "50%",
                display: "flex",
                flexDirection: "column",
                flexWrap: "nowrap",
                "background-color": theme.colors.primary,

            }}>
            {children}
        </div>
    )
}

function ActionFooter({ children }) {
    const { theme } = useTheme()
    return (
        <div style={{
            "box-shadow": "0px -2px 4px rgba(0, 0, 0, 0.25)",
            "background": theme.colors.primary,
            position: 'fixed',
            bottom: '1px', // Adjust this value for desired vertical placement
            width: "100%",
            display: "flex",
            padding: "5px",
            justifyContent: "flex-end",
            "flex-direction": "row"
        }}>
            {children}
        </div>
    )
}

function EditButtons({ title, description, content, documentId }) {
    const navigate = useNavigate()
    return (
        <div>
            <button style={{ marginRight: "15px" }}
                onClick={async () => {
                    await api.updateDocument({
                        header: title,
                        description: description,
                        content: content,
                        updatedAt:Timestamp.now(),
                    }, "Blogs", documentId)
                    navigate("/")
                }}
            >Update</button>
            <button style={{ marginRight: "15px" }} onClick={() => { navigate(-1) }}>Cancel</button>
        </div>
    )
}

export default function BlogForm() {
    const { theme } = useTheme()
    const navigate = useNavigate();
    const document = useLoaderData();
    const editable = document !== undefined
    const data = editable ? document.data() : undefined

    const [title, setTitle] = useState(editable ? data['header'] : "");
    const [description, setDescription] = useState(editable ? data['description'] : "");
    const [blogContent, setBlogContent] = useState(editable ? data['content'] : "");





    return (
        <div>
            <SplitContainer>
                <ContentForm>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required={true} // Use curly braces to indicate a boolean value
                        style={{ width: "100%", height: "50px", "border-radius": "5px", "border-color": "rgba(50, 62, 10, 0.52)" }}
                        placeholder="Blog's Title"
                    />
                    <input
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required={true}
                        style={{ width: "100%", height: "50px", "border-radius": "5px", "border-color": "rgba(50, 62, 10, 0.52)" }}
                        placeholder="Blog's Description"
                    />
                    <textarea
                        value={blogContent}
                        onChange={(e) => setBlogContent(e.target.value)}
                        required={true}
                        style={{ width: "100%", height: "100%", flex: 1, resize: 'none', "border-radius": "5px", "border-color": "rgba(50, 62, 10, 0.52)" }}
                        placeholder="Blog's Content"
                    />
                </ContentForm>
                <PreviewContainer>
                    <div style={{
                        "margin": "25px 25px 25px ",
                        "background-color": theme.colors.secondary,
                        "padding": "10px 10px 20px 10px",
                        "border-radius": "5px",
                        "border-color": "#1613ca",
                    }}>
                        <PreviewBlog title={title} description={description} content={blogContent} />
                    </div>
                    {/* <h5>{title}</h5>
                    <p>{description} </p>
                    <div>
                        <div dangerouslySetInnerHTML={{ __html: blogContent }} />
                    </div> */}

                </PreviewContainer>
            </SplitContainer>

            <ActionFooter>
                {
                    editable ?
                        <EditButtons title={title} description={description} content={blogContent} documentId={document.id} />
                        :
                        <button
                            style={{ marginRight: "15px" }}
                            onClick={async () => {
                                const data = {
                                    header: title,
                                    description: description,
                                    content: blogContent,
                                    createdAt: Timestamp.now(),
                                }
                                const docref = await api.addDocument(data, "Blogs")
                                navigate("/")
                            }}
                        >
                            Create
                        </button>
                }

            </ActionFooter>

            {/* <div>
                <footer style={{ padding: 10 }}>
                    <div horizontal layout style={{
                        "display": "flex",
                        "flex-flow": "nowrap",
                        "gap": "10px",
                        rowGap: "20px",
                        "justify-content": "flex-end",
                    }}>
                        <button>Create</button>
                    </div>
                </footer>
            </div> */}
        </div>

    )
}