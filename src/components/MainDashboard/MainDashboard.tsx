import React, {useEffect, useState} from "react";
import {
    ColDef,
    ColParams,
    DataGrid,
    SortDirection,
    SortModel,
    SortModelParams,
    ValueFormatterParams
} from '@material-ui/data-grid';
import styles from "./MainDashboard.module.sass";
import {makeStyles, useMediaQuery} from "@material-ui/core";
import {Link, useHistory} from "react-router-dom";
import {useGetAllMoviesQuery} from "../../hooks/queries/useGetAllMoviesQuery";
import {useCurrentUserQuery} from "../../hooks/queries/useCurrentUserQuery";
import {utils} from "../../common/utils";
import {RatingStarsView} from "../RatingStars/RatingStarsView";
import {useSorting} from "../../hooks/useSorting";


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
        width: 150,
    },
    {
        field: 'actors',
        headerName: 'Actors',
        sortable: false,
        width: 150,
        valueFormatter: (params) => (params.value as string[]).join(", ")
    },
    {
        field: 'averageNote',
        headerName: 'Average Note',
        renderCell: (params: ValueFormatterParams) => <RatingStarsView value={(Number(params.value))}/>,
        sortable: true,
        type: "number",
        width: 150,
    },
];

const makeColumnsResponsive = (columns: ColDef[], bigScreen: boolean): ColDef[] => bigScreen ? columns.map(column => ({
    ...column,
    flex: 1,
    cellClassName: 'cellStyle',
})) : columns;


const useStyles = makeStyles({
    root: {
        '& .cellStyle': {
            cursor: "pointer",
            lineHeight: "1.5rem !important",
            overflow: "auto",
            whiteSpace: "pre-wrap"
        }
    }
});

const MainDashboard = () => {
    const classes = useStyles();
    const {data, error} = useGetAllMoviesQuery();
    const bigScreen = useMediaQuery('(min-width:48rem)');
    const currentUser = useCurrentUserQuery();
    const history = useHistory();
    const [column, direction, setSorting, removeSorting] = useSorting();

    const [sortModel, setSortModel] = useState<SortModel>([]);

    useEffect(() => {
        if (column && direction) {
            setSortModel([{field: column as string, sort: direction as SortDirection}])
        }
    }, [])

    const handleSortModelChange = (params: SortModelParams) => {
        if (params.sortModel !== sortModel) {
            setSortModel(params.sortModel);
            const newSortModel = params.sortModel[0];
            if (!newSortModel.sort) {
                removeSorting();
            } else {
                setSorting(newSortModel.field, newSortModel.sort)
            }
        }
    };

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
                          columns={makeColumnsResponsive(columns, bigScreen)}
                          pageSize={10}
                          onSelectionChange={param => displayMovie(String(param.rowIds[0]))}
                          className={classes.root}
                          sortModel={sortModel}
                          onSortModelChange={handleSortModelChange}
                />
            </div>
        </div>
    );
};

export default MainDashboard;
