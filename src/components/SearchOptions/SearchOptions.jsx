import React, { useEffect } from "react";
import classes from "./SearchOptions.module.scss";
import { useDispatch, useSelector } from 'react-redux';
import { filterByTeam, filterByOrigin, resetFilters, actionLoadAllTeams,actionSortBy } from "../../redux/actions";

const SearchOptions = () => {
  const dispatch = useDispatch();

  const filterOptions = {
    teamFilter: useSelector((state) => state.teamFilter),
    originFilter: useSelector((state) => state.originFilter),
    sortBy: useSelector((state) => state.sortBy),
  };

  useEffect(() => {
    actionLoadAllTeams();
  }, [dispatch]);

  const handleFilterChange = (event) => {
    const { name, value } = event.target;

    if (name === 'team') {
      console.log('filter team change name:', name);
      dispatch(filterByTeam(value));
    } else if (name === 'origin') {
      dispatch(filterByOrigin(value));
    }

    // Evita llamar a dispatch(setTotalPages()) en cada cambio, si no es necesario.
  };

  const handleSortChange = (event) => {
    const {value } = event.target;
    console.log('sortBy:',name,value);
    if (value === 'resetAll') {
      dispatch(resetFilters());
    } else {
      // Lógica para manejar cambios en el orden de clasificación
      // Puedes agregar dispatch para acciones relacionadas con la clasificación aquí
     
      dispatch(actionSortBy(value));
    }
  };
 console.log('filterOptions:', filterOptions.teamFilter);
  return (
    <div className={classes.searchOptions}>
      <label htmlFor="team">Team: </label>
      <select name="team" value={filterOptions.teamFilter} onChange={handleFilterChange}>
        <option value="">Select Team</option>
        {useSelector((state) => state.teams).map((team, index) => (
          <option key={index} value={team}>
            {team}
          </option>
        ))}
      </select>

      <label htmlFor="origin"> Origin:</label>
      <select name="origin" value={filterOptions.originFilter} onChange={handleFilterChange}>
        <option value='All'> ALL</option>
        <option value='API'>API</option>
        <option value='DDBB'>DDBB</option>
      </select>

      <label htmlFor="sortBy">Sort by:</label>
      <select name="sortBy" value={filterOptions.sortBy} onChange={handleSortChange}>
        <option value="resetAll">Reset All</option>
        <option value="SORT_BY_NAME_ASC">Name (A-Z)</option>
        <option value="SORT_BY_NAME_DESC">Name (Z-A)</option>
        <option value="SORT_BY_DOB_ASC">Date of Birth (Asc)</option>
        <option value="SORT_BY_DOB_DESC">Date of Birth (Desc)</option>
      </select>
    </div>
  );
};

export default SearchOptions;
