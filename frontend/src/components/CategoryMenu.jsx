import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryMenu.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function CategoryMenu() {
    const API_BASE_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();
    const [categories, setCategory] = useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`${API_BASE_URL}/category`);
                const data = res.data.result;
                setCategory(data);
                console.log(data);
            } catch (err) {
                console.log("카테고리 전체 조회 실패", err)
            }
        }
        fetchCategory();
    }, [])
    return (
        <div className="category-container">
            {categories.length > 0 ? categories.map((cat) => (
                <div className="category-item" key={cat.parentName}>
                    <button className="category-button">
                        {cat.parentName}
                    </button>
                    <div className="child-menu">
                        {cat.childNames.map((child) => (
                            <button
                                key={child.id}
                                onClick={() => window.location.href = `/posts?category_parent=${cat.parentName}&category_child=${child.name}`}
                            >
                                {child.name}
                            </button>
                        ))}
                    </div>
                </div>
            )) : "카테고리 로드 실패"}
        </div>
    );
}
