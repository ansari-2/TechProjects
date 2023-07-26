import React from 'react';
import SearchbyName from './SearchbyName';
import SearchbyID from './SearchbyId';
import SearchbyDesg from './SearchbyDesg';

const SearchPage = () => {
  return (
    <><div>
          <SearchbyName />

      
              <SearchbyID />

    
              <SearchbyDesg />

          </div></>
  );
};

export default SearchPage;