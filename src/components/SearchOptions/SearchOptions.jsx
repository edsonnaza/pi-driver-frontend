import React, { useEffect, useState } from "react";
import classes from "./SearchOptions.module.scss";
import getTeams from "../../utils/getTeams";


const SearchOptions = ({ filterOptions, sortOptions, onFilterChange, onSortChange }) => {
 const [teams, setTeams] = useState([]);

 useEffect(()=>{
    const fetchTeams = async () => {
        const teamsData = await getTeams();
        setTeams(teamsData);
    }

    fetchTeams();
 },[]);
 
    return (
    <div className={classes.searchOptions}>
      {/* Filtros */}
      <label>
        Team:
        <select name="team" value={filterOptions.team} onChange={onFilterChange}>
          <option value="">Select Team</option>
          {teams.map((team) => (
            <option key={team.id} value={team}>
              {team}
            </option>
          ))}
        </select>
      </label>

      <label>
        Origin:
        <select name="origin" value={filterOptions.origin} onChange={onFilterChange}>
         < option value='API'> API</option>
         <option value='DDBB'>DDBB</option>
        </select>
      </label>

      {/* Ordenamiento */}
      <label>
        Sort By:
        <select name="sortBy" value={sortOptions.sortBy} onChange={onSortChange}>
         <option value='dob'>Date of Birth</option>
         <option value='driver'>Drivers Name</option>
        </select>
      </label>

      <label>
        Sort Order:
        <select name="sortOrder" value={sortOptions.sortOrder} onChange={onSortChange}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </label>
    </div>
  );
};

export default SearchOptions;
