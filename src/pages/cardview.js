import React from "react";
import { useNavigate } from "react-router-dom"
import PreviewBlog from "../component/blogpreview";
import { useTheme } from "../util/ThemeContext";
import "./cardview.css"

function CardContainer({ children }) {
    return (
        <div name="card_container" style={{
            "marginLeft": "100px",
            "marginRight": "100px",
            "display": "flex",
            "flex-flow": "row wrap",
            "flex": "flex-grow",
            "gap": "10px",
            "column-gap": "20px",
            "justify-content": "flex-start",
            "align-item": "flex-start"
        }}>
            {children}
        </div>
    )
}

function PreviewCard({ children }) {
    const { theme } = useTheme()
    return (
        <div style={{
            display: "flex",
            height: 194,
            background: theme.colors.secondary,
            "align-items": "flex-start",
            "justify-content": "flex-start",
            "font-size": "9px",
            "border-radius": "10px",
            "overflow": "hidden",
        }}>
            {children}
        </div>
    )
}

function Card({ children, documentId, onClick }) {
    return (
        <div className="card" name="card" documentId={documentId}
            onClick={onClick}>
            {children}
        </div>
    )
}

function CreateCard() {
    const { theme } = useTheme()
    return (
        <div style={{
            display: "flex",
            textAlign:"center",
            height: 194,
            "align-items": "center",
            "justify-content": "center",
            background: theme.colors.secondary,
            "font-size": "9px",
            "border-radius": "5px"
        }}>
            <div style={{ "font-size": "41px","text-align":"center" }} >
                +
            </div>
        </div>)
}

function CardHeader({ children }) {
    const { theme } = useTheme()
    return (
        <div style={{
            "marginTop":"7px",
            padding: "2px",
            "font-size": theme.typography.fontSize.small,
            "font-style": "normal",
            "font-weight": 602,
            "text-align":"center"
        }}>{children}
        </div>
    )
}

export default function CardView(params) {
    // const { documents } = useLoaderData();
    // const documents = useRouteLoaderData("home")
    const documents = params['documents']
    const navigate = useNavigate();
    return (
        <CardContainer>
            <Card name="card" onClick={() => { navigate("/blog/create") }}>
                <CreateCard />
                <CardHeader>Blank</CardHeader>
            </Card>

            {
                documents === undefined ? <></> : documents.map((document) => {
                    const data = document.data();
                    return (
                        <Card documentId={document.id} onClick={(e) => { navigate("/blog/" + e.currentTarget.getAttribute('documentId')) }}>
                            <PreviewCard>
                                <div style={{ padding: "5px", "word=qrap": "break-word" }}>
                                    <PreviewBlog content={data.content} />
                                </div>
                            </PreviewCard>
                            <CardHeader >{data.header}</CardHeader>
                        </Card>)
                })
            }
        </CardContainer>
    )
}