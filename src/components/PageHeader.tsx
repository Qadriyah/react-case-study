import dayjs from "dayjs";
import React from "react";
import { FilterType } from "../types";
import FilterPanel from "./filters/FilterPanel";
import SearchBar from "./filters/SearchBar";

type PageHeaderProps = {
  search: string;
  lastSyncedAt: string | null;
  filters: FilterType;
  onSearch: (query: string) => void;
  onSetFilter: (filters: FilterType) => void;
};

const PageHeader: React.FC<PageHeaderProps> = ({
  search,
  lastSyncedAt,
  filters,
  onSearch,
  onSetFilter,
}) => {
  return (
    <header className="page-header">
      <div className="header">
        <h1>Board</h1>
        <div style={{ flex: 1 }}>
          <SearchBar search={search} onSearch={onSearch} />
        </div>
      </div>
      <div className="header filter-wrapper">
        <p>
          {`Last synced: ${
            lastSyncedAt
              ? dayjs(lastSyncedAt).format("DD MMM, YYYY hh:mm:ss A")
              : "-"
          }`}
        </p>
        <FilterPanel filters={filters} onSetFilter={onSetFilter} />
      </div>
    </header>
  );
};

export default PageHeader;
