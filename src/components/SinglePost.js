import React, {useEffect, useState} from "react";
import Axios from "axios";
import { useParams, Link } from "react-router-dom";

import Page from './Page';

function SinglePost() {

    const { id } = useParams()
    const [isLoading, setIsLoading] = useState(true)
    const [post, setPost] = useState()

    useEffect(() => {
        async function fetchPost() {
            try {
                const response = await Axios.get(`/post/${id}`)
                console.log(response.data)
                setIsLoading(false)
                setPost(response.data)
            }catch(e) {
                console.log("There was a problem")
            }   
        }
        fetchPost()
    })

    if(isLoading) return (
                        <Page title="...">
                            <div>Loading...</div>
                        </Page>
                    )

    // const date = new Date(post.createdDate)
    // const dateFormatted = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`

    return (
        
        <Page>
            <div className="d-flex justify-content-between">
                <h2>{post.title}</h2>
                <span className="pt-2">
                <a href="#" className="text-primary mr-2" title="Edit"><i className="fas fa-edit"></i></a>
                <a className="delete-post-button text-danger" title="Delete"><i className="fas fa-trash"></i></a>
                </span>
            </div>

            <p className="text-muted small mb-4">
                <Link to={`/profile/${post.author.username}`}>
                <img className="avatar-tiny" src={post.author.avatar} />
                </Link>
                Posted by <Link to={`/profile/${post.author.username}`}>{post.author.username}</Link> on {post.createdDate}
            </p>

            <div className="body-content">
                {post.body}             
            </div>
        </Page>
    )
}

export default SinglePost