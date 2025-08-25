import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { format } from 'date-fns';

export default function PostList() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios
            .get("http://localhost:8080/api/posts")
            .then((res) => {
                setPosts(res.data.result)
            })
            .catch((err) => {
                console.error("게시글 목록 조회 실패", err)
            })
    }, [])

    return (
        <div>
            <h3 className="text-lg font-bold mb-4">게시글 목록</h3>
            <ul className="space-y-3">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <li
                            key={post.postId}
                            className="p-4 bg-white rounded shadow"
                        >
                            <div className="flex items-center justify-between">
                                <Link
                                    to={`/posts/${post.postId}`}
                                    className="text-base font-semibold hover:underline truncate"
                                >
                                    {post.title}
                                </Link>
                                <span className="text-xs text-gray-500 shrink-0">
                                    {post.nickname} · {format(new Date(post.createdAt), "yyyy.MM.dd HH:mm")}
                                </span>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-gray-500">게시글이 없습니다.</p>
                )}
            </ul>
        </div>
    )
}