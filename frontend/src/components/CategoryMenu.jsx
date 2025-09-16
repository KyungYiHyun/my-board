import React from "react";
import { useNavigate } from "react-router-dom";
import "./CategoryMenu.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function CategoryMenu() {
    const navigate = useNavigate();
    const [categories, setCategory] = useState([]);
    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/category`);
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
            {categories.map((cat) => (
                <div className="category-item" key={cat.parentName}>
                    <button className="category-button">
                        {cat.parentName}
                    </button>
                    <div className="child-menu">
                        {cat.childNames.map((child) => (
                            <button
                                key={child.id}
                                onClick={() => navigate(`/posts?category=${child.id}`)}
                            >
                                {child.name}
                            </button>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}
