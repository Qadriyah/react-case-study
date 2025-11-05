import dayjs from "dayjs";
import React from "react";

type PageHeaderProps = {
  search: string;
  lastSyncedAt: string | null;
  onSearch: (query: string) => void;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  search,
  lastSyncedAt,
  onSearch,
}) => {
  return (
    <header className="page-header">
      <div className="page-header__header">
        <h1>Board</h1>
        <div style={{ flex: 1 }}>
          <input
            type="search"
            placeholder="Search issues..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="search"
          />
        </div>
      </div>
      <p>
        {`Last synced: ${dayjs(lastSyncedAt).format("DD MMM, YYYY hh:mm A")}`}
      </p>
    </header>
  );
};

export default PageHeader;
