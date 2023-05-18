import { Axios } from "axios";
import React, { useState } from "react";

async function fetchData () {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [list, setList] = useState([]);

    try {
        const response = await Axios({
            URL : "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain"
        });
        setList(response.data.teams);
        return response;
    } catch (error) {
        console.log(error)
    }
}
export default fetchData;