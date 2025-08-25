import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PostList from "./pages/PostList";
// import PostDetail from "./pages/PostDetail";
// import PostCreate from "./pages/PostCreate";

function App() {
  return (
    <Router>
      {/* 네비게이션 바 */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">My Board</Link>
          <div>
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/posts">게시글 목록</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create">글쓰기</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>


      <div className="container">
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts" element={<PostList />} />
          {/* <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/create" element={<PostCreate />} /> */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
