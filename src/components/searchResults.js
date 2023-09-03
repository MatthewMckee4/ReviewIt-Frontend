import React from "react";
import { Link } from "react-router-dom";

function SearchResults({ artists, token, clearSearchBar }) {
  return (
    <>
      {artists.length > 0 && (
        <ul className="search-results">
          {artists.map((artist) => (
            <li key={artist.id}>
              <Link
                to={{
                  pathname: `/artist/${artist.id}`,
                  search: `?token=${encodeURIComponent(
                    token
                  )}&artistId=${encodeURIComponent(artist.id)}`,
                }}
                onClick={clearSearchBar}
              >
                {artist.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default SearchResults;
