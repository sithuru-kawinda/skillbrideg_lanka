import React from 'react';

const JobFilter = ({ filters, onFilterChange, onClearFilters, uniqueLevels, uniqueJobNames }) => {
  return (
    <div className="search-form">
      <div className="form-group">
        <label className="form-label">Search Jobs</label>
        <input
          type="text"
          name="search"
          value={filters.search}
          onChange={(e) => onFilterChange('search', e.target.value)}
          className="form-input"
          placeholder="Search by job title or description..."
        />
      </div>

      <div className="form-group">
        <label className="form-label">Job Level</label>
        <select
          name="level"
          value={filters.level}
          onChange={(e) => onFilterChange('level', e.target.value)}
          className="form-input"
        >
          <option value="">All Levels</option>
          {uniqueLevels.map(level => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Job Type</label>
        <select
          name="jobName"
          value={filters.jobName}
          onChange={(e) => onFilterChange('jobName', e.target.value)}
          className="form-input"
        >
          <option value="">All Types</option>
          {uniqueJobNames.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

      <button 
        onClick={onClearFilters}
        className="btn btn-secondary"
        style={{ alignSelf: 'end' }}
      >
        Clear Filters
      </button>
    </div>
  );
};

export default JobFilter;