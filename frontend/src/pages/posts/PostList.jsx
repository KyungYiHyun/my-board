import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { format } from "date-fns";
import { ca } from "date-fns/locale";



export default function PostList({ highlightPostId, initialPage }) {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const query = new URLSearchParams(location.search);

    const [searchParams, setSearchParams] = useSearchParams();
    const [posts, setPosts] = useState([]);
    const [pageInfo, setPageInfo] = useState({});
    const [readPosts, setReadPosts] = useState([]);
    const [sortIndex, setSortIndex] = useState("created_at");
    const [orderType, setOrderType] = useState("desc");
    const [keywordInput, setKeywordInput] = useState(""); // 입력용
    const [keyword, setKeyword] = useState(""); // 실제 검색용
    const categoryParent = query.get("category_parent") || ""
    const categoryChild = query.get("category_child") || ""
    const [hot, setHot] = useState(0);




    const navigate = useNavigate();
    const page = Number(searchParams.get("page")) || initialPage || 1;


    // 검색어 하이라이팅 컴포넌트
    function HighlightText({ text, highlight }) {
        if (!highlight) return <>{text}</>;

        const regex = new RegExp(`(${highlight})`, "gi");
        const parts = text.split(regex);

        return (
            <>
                {parts.map((part, idx) =>
                    regex.test(part) ? (
                        <span key={idx} className="bg-yellow-200">{part}</span>
                    ) : (
                        part
                    )
                )}
            </>
        );
    }

    // 로컬스토리지에서 읽은 글
    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("readPosts") || "[]");
        setReadPosts(stored);
    }, []);

    // 게시글 fetch
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(
                    `${API_BASE_URL}/posts`,
                    {
                        params: {
                            page,
                            sort_index: sortIndex,
                            order_type: orderType,
                            keyword: keyword || undefined,
                            category_parent: categoryParent,
                            category_child: categoryChild,
                            hot: hot
                        }
                    }
                );
                const data = res.data.result;
                setPosts(data.list);
                setPageInfo({
                    pageNum: data.pageNum,
                    pageSize: data.pageSize,
                    total: data.total,
                    pages: data.pages,
                    hasNextPage: data.hasNextPage,
                    hasPreviousPage: data.hasPreviousPage,
                    navigatepageNums: data.navigatepageNums,
                });
            } catch (err) {
                console.error("게시글 목록 조회 실패", err);
            }
        };
        fetchPosts();
    }, [page, sortIndex, orderType, keyword, categoryChild, categoryParent, hot]);



    const handleSort = (column) => {
        if (sortIndex === column) setOrderType(orderType === "asc" ? "desc" : "asc");
        else setSortIndex(column);
        setSearchParams({ page: 1, sort_index: column, order_type: orderType, keyword, category_parent: categoryParent, category_child: categoryChild, hot: hot });
    };

    const handlePageClick = (pageNum) => {
        setSearchParams({ page: pageNum, sort_index: sortIndex, order_type: orderType, keyword, category_child: categoryChild, category_parent: categoryParent, hot: hot });
    };

    const handleHotPosts = () => {
        const newHot = hot === 1 ? 0 : 1
        setHot(newHot);
        setSearchParams({ page: 1, sort_index: sortIndex, order_type: orderType, keyword, category_child: categoryChild, category_parent: categoryParent, hot: newHot });
    }

    const handlePostClick = (postId) => {
        if (!readPosts.includes(postId)) {
            const updated = [...readPosts, postId];
            setReadPosts(updated);
            localStorage.setItem("readPosts", JSON.stringify(updated));
        }
        navigate(`/posts/${postId}?page=${page}&keyword=${keyword}`);
    };

    const handleSearch = () => {
        setKeyword(keywordInput); // Enter나 버튼 클릭 시 실제 검색용 state 업데이트
        setSearchParams({ page: 1, sort_index: sortIndex, order_type: orderType, keyword: keywordInput, category_child: categoryChild, category_parent: categoryParent });
    };

    return (
        <div className="max-w-4xl mx-auto mt-6 px-4">
            <div className="flex items-center  mb-4 border-b pb-2">
                <h3 className="text-lg font-bold">
                    {categoryChild ? categoryChild : "통합"} 게시판
                </h3>
                <button
                    onClick={handleHotPosts}
                    className="ml-4 px-3 py-1 bg-red-500 text-white rounded hover hover:bg-red-600"
                >
                    🔥Hot글
                </button>
            </div>
            <div className="mb-4 flex space-x-2">

                <input
                    type="text"
                    value={keywordInput}
                    placeholder="검색어를 입력하세요"
                    onChange={(e) => setKeywordInput(e.target.value)} // 입력용 state만 업데이트
                    className="border px-2 py-1 flex-1"
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <button onClick={handleSearch} className="px-4 py-1 bg-blue-500 text-white rounded">
                    검색
                </button>
            </div>

            {posts.length > 0 ? (
                <>
                    <table className="w-full text-sm border-t">
                        <thead className="bg-gray-100 text-gray-600">
                            <tr>
                                <th className="py-2 px-2 text-left w-3/5">카테고리</th>
                                <th className="py-2 px-2 text-left w-3/5">제목</th>
                                <th className="py-2 px-2 text-center w-1/5">작성자</th>
                                <th
                                    className="py-2 px-2 text-center w-2/5 whitespace-nowrap cursor-pointer"
                                    onClick={() => handleSort("views")}
                                >
                                    조회수 {sortIndex === "views" ? (orderType === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th
                                    className="py-2 px-2 text-center w-1/6 cursor-pointer whitespace-nowrap"
                                    onClick={() => handleSort("likeCount")}
                                >
                                    추천 {sortIndex === "likeCount" ? (orderType === "asc" ? "▲" : "▼") : ""}
                                </th>
                                <th
                                    className="py-2 px-2 text-center w-1/5 cursor-pointer"
                                    onClick={() => handleSort("created_at")}
                                >
                                    작성일 {sortIndex === "created_at" ? (orderType === "asc" ? "▲" : "▼") : ""}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {posts.map((post, idx) => {
                                const isRead = readPosts.includes(post.postId);
                                const isHighlight = highlightPostId === post.postId;
                                return (
                                    <tr
                                        key={post.postId}
                                        className={`border-b hover:bg-gray-50 ${idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"} ${isHighlight ? "bg-yellow-50" : ""}`}
                                    >
                                        <td>{post.categoryChildName}</td>
                                        <td className="py-2 px-2">
                                            <button
                                                onClick={() => handlePostClick(post.postId)}
                                                className={`font-medium ${isRead ? "text-gray-500" : "text-blue-600 hover:underline"}`}
                                            >
                                                {post.hot ? <span>🔥</span> : <></>}<HighlightText text={post.title} highlight={keyword} /> {post.commentCount > 0 && `[${post.commentCount}]`}
                                            </button>
                                        </td>

                                        <td className="py-2 px-2 text-center">{post.nickname}</td>
                                        <td className="py-2 px-2 text-center">{post.views}</td>
                                        <td className="py-2 px-2 text-center">{post.likeCount || 0}</td>
                                        <td className="py-2 px-2 text-center">{format(new Date(post.createdAt), "yyyy.MM.dd")}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>

                    {/* 페이지네이션 */}
                    <div className="mt-4 flex justify-center space-x-1">
                        <button
                            className={`px-3 py-1 border rounded ${!pageInfo.hasPreviousPage ? "text-gray-400 cursor-not-allowed" : ""}`}
                            disabled={!pageInfo.hasPreviousPage}
                            onClick={() => handlePageClick(page - 1)}
                        >
                            이전
                        </button>
                        {pageInfo.navigatepageNums?.map((num) => (
                            <button
                                key={num}
                                className={`px-3 py-1 border rounded ${page === num ? "bg-blue-500 text-white" : ""}`}
                                onClick={() => handlePageClick(num)}
                            >
                                {num}
                            </button>
                        ))}
                        <button
                            className={`px-3 py-1 border rounded ${!pageInfo.hasNextPage ? "text-gray-400 cursor-not-allowed" : ""}`}
                            disabled={!pageInfo.hasNextPage}
                            onClick={() => handlePageClick(page + 1)}
                        >
                            다음
                        </button>
                    </div>
                </>
            ) : (
                <p className="text-gray-500 text-center py-10">게시글 불러오는중...</p>
            )}
        </div>
    );
}
