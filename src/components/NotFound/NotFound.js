import React from "react"
import {Link} from "react-router-dom";

export default function NotFound() {
    return(
        <div className="container">
            <div className="jumbotron">
                <h1>Page Not Found</h1>
                <Link  to="/">Back to Home Page</Link>
            </div>
            
        </div>
        )
}