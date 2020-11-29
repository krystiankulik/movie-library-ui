import React from "react";
import {ColDef, DataGrid, ValueFormatterParams} from '@material-ui/data-grid';
import styles from "./MainDashboard.module.sass";
import {useMediaQuery} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {useGetAllMoviesQuery} from "../../hooks/useGetAllMoviesQuery";
import {useCurrentUserQuery} from "../../hooks/useCurrentUserQuery";
import {utils} from "../../common/utils";
import {RatingStarsView} from "../RatingStars/RatingStarsView";


const columns: ColDef[] = [
    {
        field: 'name',
        headerName: 'Name',
        width: 150
    },
    {
        field: 'releaseDate',
        headerName: 'Release Date',
        width: 150,
        type: 'date',
        valueFormatter: params => (params.value as Date).toLocaleDateString("en-US")
    },
    {
        field: 'duration',
        headerName: 'Duration',
        type: 'number',
        width: 150
    },
    {
        field: 'actors',
        headerName: 'Actors',
        sortable: false,
        width: 150
    },
    {
        field: 'averageNote',
        headerName: 'Average Note',
        renderCell: (params: ValueFormatterParams) => <RatingStarsView value={(Number(params.value))}/>,
        sortable: true,
        type: "number",
        width: 150
    },
];

const getColumns = (bigScreen: boolean): ColDef[] => bigScreen ? columns.map(column => ({
    ...column,
    flex: 1
})) : columns;


const MainDashboard = () => {
    const {data, error} = useGetAllMoviesQuery();
    const bigScreen = useMediaQuery('(min-width:48rem)');
    const currentUser = useCurrentUserQuery();
    const history = useHistory();

    console.log(error);

    if (error) {
        return <p>Error :(</p>;
    }

    const renderSignInHint = () => currentUser.data?.currentUser.username ? null :
        (<div className={styles.infoDialog}>
            <Link to="/sign-in">Sing In</Link> to share and rate movies!
        </div>);

    const displayMovie = (movieId: string) => {
        history.push("/movies/" + movieId);
    }

    return (
        <div className={styles.dashboardContainer}>
            <h1>Movie Library</h1>
            {renderSignInHint()}

            <div className={styles.dataGridContainer}>
                <DataGrid rows={(data?.getAllMovies ?? []).map(movie => utils.mapMovieToDisplayRow(movie))}
                          columns={getColumns(bigScreen)} pageSize={10}
                          onSelectionChange={param => displayMovie(String(param.rowIds[0]))}/>
            </div>
        </div>
    );
};

export default MainDashboard;
