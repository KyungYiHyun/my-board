import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/posts")
            .then((res) => {
                setPosts(res.result)
            })
            .catch((err) => {
                console.error("게시글 목록 조회 실패", err)
            })
    }, [])

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">게시글 목록
                <ul className="space-y-3">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <li key={post.postId} className="p-4 bg-white rounded shadow">
                                <Link to={`/posts/${post.postId}`} className="text-lg font-semibold hover:underline">
                                    {post.title}
                                </Link>
                                <p className="text-sm text-gray-500">
                                    {post.nickname} · {new Date(post.createdAt.toLocalDateString())}
                                </p>
                            </li>
                        ))
                    ) : (
                        <p className="text-gray-500">게시글이 없습니다.</p>
                    )}
                </ul>
            </h1>
        </div>
    )
}