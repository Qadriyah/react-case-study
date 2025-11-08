import React from "react";
import assigness from "../../data/assignees.json";
import { FilterType } from "../../types";

const severity = [1, 2, 3, 4, 5, 6, 7, 8, 9];

type FilterPanelProps = {
  filters: FilterType;
  onSetFilter: (filters: FilterType) => void;
};

const FilterPanel: React.FC<FilterPanelProps> = ({ filters, onSetFilter }) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { id, value } = event.target;
    onSetFilter({ [id]: id === "severity" ? +value : value });
  };

  return (
    <div className="filters">
      <select
        className="input"
        id="assignee"
        value={filters.assignee}
        onChange={onChange}
      >
        <option value="">Filter by assignee</option>
        {assigness.map((assignee) => (
          <option value={assignee.name} key={assignee.id}>
            {assignee.name}
          </option>
        ))}
      </select>
      <select
        className="input"
        id="severity"
        value={filters.severity}
        onChange={onChange}
      >
        <option value="">Filter by severity</option>
        {severity.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
      <button onClick={() => onSetFilter({ assignee: "", severity: "" })}>
        Reset
      </button>
    </div>
  );
};

export default FilterPanel;
