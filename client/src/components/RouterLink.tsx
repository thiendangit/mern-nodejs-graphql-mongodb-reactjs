import React from 'react';
import {Link} from 'react-router-dom';
import {makeStyles} from '@mui/styles';


const useStyles = makeStyles(() => ({
  root: {
    textDecoration: 'none',
    color: 'inherit',
    flexDirection: 'row',
    display: 'flex',
    padding: '15px'
  },
}));

export const RouterLink = (props) => {
  const styles = useStyles()
  return (
    <Link {...props} className={styles.root} />
  )
};
