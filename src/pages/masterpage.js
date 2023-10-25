import React from "react";
import "./masterpage.css"
function HorizontalLayout({ children }) {
    return (
        <div className="horizontalFlex">
            {children}
        </div>
    )
}
function VerticalLayout({ children, style }) {
    return (
        <div className="VerticalFlex" style={style}>
            {children}
        </div>
    )
}


export default function MasterView() {
    return (
        <>
            <HorizontalLayout>
                <VerticalLayout style={{ width: "30%", "background-color": "#d4dbdb" }}>
                    <HorizontalLayout style={{
                        "justify-content": "space-between",
                        "padding": "7px",
                        "gap": "5px",
                        "background-color":"black"
                    }}>
                        <input style={{
                            width: "100%", height: "24px",
                            "border-radius": "5px"
                        }}></input>
                        <button>New</button>
                    </HorizontalLayout>
                    <div>list</div>
                    <div>list</div>
                </VerticalLayout>
                <VerticalLayout>
                    <div>content</div>
                    <div>content</div>
                    <div>content</div>
                </VerticalLayout>
            </HorizontalLayout>
        </>
    )
}