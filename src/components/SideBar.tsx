import { useNavigate } from "react-router-dom";
import { useGetRecent } from "../hooks/useGetRecent";

const SideBar = () => {
  const recent = useGetRecent();
  const navigate = useNavigate();

  return (
    <div className="sidebar">
      <h2 className="header">Recent Issues</h2>
      <div className="content">
        {recent.length === 0 ? (
          <div>No recently visted issues</div>
        ) : (
          recent.map((item) => (
            <div
              key={item.id}
              className="item"
              onClick={() => navigate(`/issue/${item.id}`)}
            >
              <p>{item.title}</p>
              <p>Status: {item.status}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SideBar;
