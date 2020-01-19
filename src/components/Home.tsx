import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) => ({
    mheight: {    
      marginTop: 100,    
    },
}));


const Home: React.FC = (props: any) => {

    const classes = useStyles();

    const onClickNewRequest = () => {
        props.history.push("/new-request");
    };

    return (
        <div className={"d-flex justify-content-center align-items-center"} >
            <div className={ classes.mheight }>
                <Button variant="contained" color="primary" onClick={onClickNewRequest}>NEW REQUEST</Button>
            </div>
        </div>
    );
  }
  

export default Home;  