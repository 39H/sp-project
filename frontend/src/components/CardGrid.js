import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { GridList, GridListTile } from 'material-ui/GridList';
import Subheader from 'material-ui/List/ListSubheader';

import WorkCard from './WorkCard';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        overflow: 'hidden',
    },
    gridList: {
        minWidth: 800,
        maxWidth: 1024,
    },
    tile: {
        padding: [12, 8],
        height: 'auto',
    },
});

function getTitle(type) {
    switch(type) {
        case 'likes':
            return 'Most liked works';
        default:
            return 'Recent works';
    }
}

function CardGrid(props) {
    const { classes, data, type } = props;

    const works = data.toJS();

    return (
        <div className={classes.container}>
            <GridList cellHeight={'auto'} className={classes.gridList} cols={4} spacing={8}>
                <GridListTile key="Subheader" cols={4} style={{height: 'auto', marginBottom: -12}}>
                    <Subheader component="div">{getTitle(type)}</Subheader>
                </GridListTile>
                {works.map(work => (
                    <GridListTile classes={{tile: classes.tile}} key={work.id}>
                        <WorkCard id={work.id} img={work.thumbnail} subject={work.subject} likes={work.likes} userName={work.userName} displayName={work.displayName} createdAt={work.createdAt} />
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default withStyles(styles)(CardGrid);