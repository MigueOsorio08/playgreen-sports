import React, { useState, useEffect } from "react";
import axios from "axios";

function MyComponent() {
    const [list, setList] : any = useState([]);

    useEffect(() => {
        fetchData(setList);
    }, []);

    return (
        <div>
            {list.map((item: { name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }) => (
                <div>{item.name}</div>
            ))}
        </div>
    );
}

async function fetchData (setList: (arg0: any) => void) {
    try {
        const response = await axios({
            url: "https://www.thesportsdb.com/api/v1/json/3/search_all_teams.php?s=Soccer&c=Spain"
        });
        setList(response.data.teams);
    } catch (error) {
        console.log(error)
    }
}

export default MyComponent;
