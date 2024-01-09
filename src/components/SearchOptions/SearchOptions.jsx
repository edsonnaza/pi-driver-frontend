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
      <label  htmlFor="team">Team: </label>
        
        <select name="team" value={filterOptions.team} onChange={onFilterChange}>
          <option value="">Select Team</option>
          {teams.map((team,index) => (
            <option key={index} value={team}>
              {team}
            </option>
          ))}
        </select>
      

      <label htmlFor="origin"> Origin:</label>
        <select name="origin" value={filterOptions.origin} onChange={onFilterChange}>
        < option value='All'> ALL</option>
         < option value='API'>API</option>
         <option value='DDBB'>DDBB</option>
        </select>
      

      {/* Ordenamiento */}
<label htmlFor="sortBy">Sort by:</label>
  <select name="sortBy" value={sortOptions.sortBy} onChange={onSortChange}>
  <option value="resetAll">Reset All</option>
    <option value="forename_asc">Name (A-Z)</option>
    <option value="forename_desc">Name (Z-A)</option>
    <option value="dob_asc">DOB (Asc)</option>
    <option value="dob_desc">DOB (Desc)</option>
  </select>
    </div>
  );
};

export default SearchOptions;
