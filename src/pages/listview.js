import React from "react";
import { useNavigate } from "react-router-dom"
import PreviewBlog from "../component/blogpreview";
import { useTheme } from "../util/ThemeContext";

import "./listview.css"
function ListContainer({ children }) {
    const { theme } = useTheme()
    return (
        <div vertical layout style={{
            marginLeft: "80px",
            marginRight: "80px",
            display: "flex",
            "flex-direction": "column",
            "border-radius":"10px",
            backgroundColor:theme.colors.secondary
        }}>
            {children}
        </div>
    )
}

function ListItem({ children, documentId }) {
    const navigate = useNavigate();
    const { theme } = useTheme()
    return (
        <div className="item" horizontal layout name="layout" documentId={documentId}
            onClick={(e) => { navigate("/blog/" + e.currentTarget.getAttribute('documentId')) }}
            style={{
                display: "flex",
                "gap": "5px",
                "background-color": theme.colors.primary ,
                margin: "20px",
                "border-radius":"10px",
                "padding":"10px",
                height:"100px"
            }}>
            {children}
        </div>
    )
}

function PreviewContainer({ children }) {
    return (
        <div vertical layout style={{
            "margin-top": "1px",
            display: "flex",
            "flex-direction": "column",
            "flex-wrap": "nowrap",
            "justify-content": "flex-start",
            "align-items": "flex-start",
            "line-height": 0.7,
            "overflow": "hidden",
            "white-space": "-moz-pre-space",
            "text-overflow": "ellipsis",
            "padding":"10p"
        }}>
            {children}
        </div>
    )
}

export default function ListView(params) {
    const { theme } = useTheme()
    // const documents = useRouteLoaderData("home")
    const documents = params['documents']
    return (
        <div>
            {
                documents === undefined ? <></> :
                    <ListContainer>
                        {
                            documents.map(
                                (doc) => {
                                    const data = doc.data();
                                    return (
                                        <ListItem documentId={doc.id} >
                                            {/* <div preview style={{
                                                display: "flex",
                                                width: 150,
                                                height: 150,
                                                background: '#D9D9D9',
                                            }}>
                                            </div> */}
                                            <PreviewContainer>
                                                {/* <article>
                                                    <p style={{ "font-weight": "bold" }}>{data.header}</p>
                                                    <p style={{ "font-weight": "normal", "font-size": "12px", }}>{data.description}</p>
                                                </article> */}
                                                <PreviewBlog title={data.header} description={data.description} ></PreviewBlog>

                                            </PreviewContainer>
                                        </ListItem>

                                    )
                                })
                        }
                    </ListContainer>

            }
        </div >

    )
}