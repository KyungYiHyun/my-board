import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <nav className="bg-white shadow p-4 flex justify-between">
            <Link to="/" className="text-xl font-bold">My Board</Link> |
            <Link to="/create" className="bg-blue-500 text-white px-4 py-2 rounded">
                글쓰기
            </Link>
        </nav>
    );
}
