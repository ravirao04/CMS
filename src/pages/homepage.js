import React, { useState } from "react";
import CardView from "./cardview"
import ListView from "./listview"
import { Outlet, useLoaderData } from "react-router";
import { useNavigate } from "react-router";
import { AiOutlineUnorderedList } from 'react-icons/ai'

import { HiSquares2X2 } from 'react-icons/hi2'


function HorizontalLayout({ children }) {
    return (
        <div horizontal around-justified layout style={{
            "display": "flex",
            "flex-flow": "nowrap",
            "flex": "flex-grow",
            "gap": "10px",
            "column-gap": "20px",
            "justify-content": "flex-end",
            "justify-Content": "space-evenly",
            "margin": "15px"
        }}>
            {children}
        </div>
    )
}

export default function HomePage() {
    let [toggleState, setToggleState] = useState(true);
    let documents = useLoaderData();
    const navigate = useNavigate();

    return (
        <div vertical layout >
            <HorizontalLayout>
                {
                    toggleState === false ? <button onClick={() => { navigate('/blog/create') }}>Create Blank</button> : <></>
                }
                <button onClick={() => {
                    setToggleState(!toggleState)
                }}> {!toggleState ? <HiSquares2X2 /> : <AiOutlineUnorderedList />}</button>
            </HorizontalLayout>

            {toggleState ?
                <CardView documents={documents} /> :
                <ListView documents={documents} />}
            {/* <Outlet /> */}
        </div>
    )

}