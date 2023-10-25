import React, { useState } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router";
import PreviewBlog from "../component/blogpreview";
import { Popup } from "../component/popup/confirmpopup";
import { db } from "../firebase/config";
import { FirestoreAPI } from "../firebase/operation";
import { AiOutlineEdit,AiOutlineDelete } from 'react-icons/ai'
import { useTheme } from "../util/ThemeContext";
const api = new FirestoreAPI(db);

export default function BlogView() {  
    const [popupstate,setPopupstate] = useState(false);
    const { theme } = useTheme()
    const navigate = useNavigate();
    const document = useLoaderData()
    const data = document.data()
    function handleEditButtonClick(id){
        navigate("/blog/"+id+"/edit")
    }
    function handleDeleteButtonClick(id){
        setPopupstate(!popupstate);
    }
    return (
        <div id="blog-view" documentId={document.id}>
            <div style={{
                "margin": "25px 25px 25px ",
                "background-color": theme.colors.secondary,
                "padding": "10px 10px 20px 10px",
                "border-radius": "5px",
                "border-color": "#1613ca",
            }}>
                <PreviewBlog title={data.header} description={data.description} content={data.content}></PreviewBlog>
            </div>
            <div horizontal layout flex
                style={{
                    position: 'fixed',
                    bottom: '16px',
                    right: '16px',
                    display: "flex",
                    "flex-wrap": "nowrap",
                    "justify-content": "flex-end",
                    padding: 5,
                    gap: "10px"
                }}>
                <button onClick={() => handleEditButtonClick(document.id)}>Edit <AiOutlineEdit/></button>
                <button onClick={() => handleDeleteButtonClick(document.id)}>Delete <AiOutlineDelete/></button>
                {
                    popupstate?(
                        <Popup text="Are you sure you want to delete document?" closePopup={()=>{handleDeleteButtonClick()}}
                        yesPopup={async ()=>{
                            await api.deleteDoc("Blogs",document.id)
                            handleDeleteButtonClick();
                            navigate("/")
                        }}></Popup>
                    ):<></>
                }
            </div>
        </div>
    )
}