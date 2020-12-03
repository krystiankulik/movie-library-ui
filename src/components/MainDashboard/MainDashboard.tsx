import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {
    ColDef,
    DataGrid,
    SortDirection,
    SortModel,
    SortModelParams,
    ValueFormatterParams
} from '@material-ui/data-grid';
import styles from "./MainDashboard.module.sass";
import {useMediaQuery} from "@material-ui/core";
import {makeStyles} from '@material-ui/styles';
import {Link, useHistory} from "react-router-dom";
import {utils} from "../../common/utils";
import {RatingStarsView} from "../RatingStars/RatingStarsView";
import {useSorting} from "../../hooks/useSorting";
import dayjs from "dayjs";
import {MovieInfo} from "../../apiSchema";
import {MyMoviesToggle} from "../MyMoviesToggle/MyMoviesToggle";


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
        valueFormatter: params => utils.formatDate(dayjs(params.value as string))
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
        cellClassName: 'actorsCellStyle',
        renderCell: (params) => (
            <div className={styles.actorsCell}>
                {(params.value as string[]).join(", ")}
            </div>
        )
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
    cellClassName: column.cellClassName ?? 'cellStyle'
})) : columns;

const useStyles = makeStyles({
    root: {
        backgroundColor: "white",
        '& .cellStyle': {
            cursor: "pointer"
        },
        '& .actorsCellStyle': {
            cursor: "pointer",
            whiteSpace: "pre-wrap",
            overflow: "auto"
        }
    }
});


type Props = {
    movies: MovieInfo[];
    loggedUser?: string;
    showMyMovies: boolean;
    setShowMyMovies: Dispatch<SetStateAction<boolean>>;
}

const MainDashboard = (props: Props) => {
    const classes = useStyles();
    const bigScreen = useMediaQuery('(min-width:60rem)');
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
            if (!newSortModel?.sort) {
                removeSorting();
            } else {
                setSorting(newSortModel.field, newSortModel.sort)
            }
        }
    };


    const renderSignInHint = () => props.loggedUser ? null :
        (<div className={styles.infoDialog}>
            <Link to="/sign-in">Sing In</Link> to share and rate movies!
        </div>);

    const displayMovie = (movieId: string) => {
        history.push("/movies/" + movieId);
    }

    const mapMoviesToDisplayRows = () => props.movies.map(movie => utils.mapMovieToDisplayRow(movie));

    const getRows = () => props.showMyMovies && props.loggedUser ?
        mapMoviesToDisplayRows().filter(movieRow => movieRow.username === props.loggedUser)
        : mapMoviesToDisplayRows();

    return (
        <div className={styles.dashboardContainer}>
            <h1>Movie Library</h1>
            <div>
                {renderSignInHint()}
            </div>
            <div className={styles.dataGridContainer}>
                {props.loggedUser && <MyMoviesToggle showMyMovies={props.showMyMovies} setShowMyMovies={props.setShowMyMovies}/>}
                <DataGrid rows={getRows()}
                          columns={makeColumnsResponsive(columns, bigScreen)}
                          pageSize={10}
                          onSelectionChange={param => displayMovie(String(param.rowIds[0]))}
                          className={classes.root}
                          sortModel={sortModel}
                          onSortModelChange={handleSortModelChange}
                          rowHeight={80}
                />
            </div>
        </div>
    );
};

export default MainDashboard;
