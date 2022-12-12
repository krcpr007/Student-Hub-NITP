import React, { useState, useEffect } from 'react'
import { toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import {
    collection,
    getDocs,
    query,
    orderBy,
    limit,
} from 'firebase/firestore';
import PostCard from '../../Components/Feed/PostCard'
import { db } from '../../Firebase'
function UserPosts({ uid }) {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPosts = async () => {
        try {
            // Get reference
            setLoading(true)
            const listingsRef = collection(db, 'posts')

            // Create a query
            const q = query(
                listingsRef,

                orderBy('postedAt', 'desc'),
                limit(10),

            )
            // Execute query
            const querySnap = await getDocs(q)

            // const lastVisible = querySnap.docs[querySnap.docs.length - 1]
            const posts = []

            querySnap.forEach((doc) => {
                if (doc.data().uid === uid) // getting only particular user post
                    return posts.push({
                        id: doc.id,
                        data: doc.data(),
                    })
            })
            // console.log('posts are', posts);
            setPosts(posts);
            // setListings(listings)
            setLoading(false)
        } catch (error) {
            toast.error('Could not fetch Posts')
        }
    }
    useEffect(() => {


        fetchPosts()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    if (loading) {
        return <Loader />
    }
    return (
        <>

            {posts.map((post) => {
                return <PostCard key={post.id} post={post.data} id={post.id} fetchPosts={fetchPosts} />
            })}
        </>
    )
}

export default UserPosts