import React from "react";
import gif from "./giphy.webp"

export default function PrivateHome() {
    return (
        <div className="container-p5">
            <h1 className="display-3 text-light mb-4">
                Private Home
            </h1>
            <img src={gif} />
        </div>
    )
}