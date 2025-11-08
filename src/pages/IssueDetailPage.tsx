import { useNavigate, useParams } from "react-router-dom";
import IssueDetails from "../components/IssueDetails";
import { useAddRecent } from "../hooks/useAddRecent";
import { useFetchIssue } from "../hooks/useFetchIssue";
import { usePolling } from "../hooks/usePolling";
import { useIssuesStore } from "../store/useIssuesStore";

export const IssueDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { issues, fetchIssues, isLoading } = useIssuesStore();

  usePolling(fetchIssues);
  const issue = useFetchIssue(id!, issues);
  useAddRecent(issue);

  return (
    <main style={{ padding: "1rem" }}>
      <div className="page-header">
        <button onClick={() => navigate(-1)} className="">
          Back
        </button>
      </div>
      {isLoading ? <div>Loading...</div> : <IssueDetails issue={issue} />}
    </main>
  );
};
