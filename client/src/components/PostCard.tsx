import {Post} from "../generated/graphql";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import {makeStyles} from '@mui/styles';
import MoreVertIcon from "@mui/icons-material/MoreVert";
import React from "react";
import moment from "moment";
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import {RouterLink} from "components/RouterLink";

const useStyles = makeStyles(() => ({
  root: {
    position: "relative",
    height: "100%",
  },
  media: {
    height: 300
  }
}));

const PostCard = ({username, body, createdAt, id, likes, comments}: Post) => {
  const classes = useStyles();

  const onClickFavorite = () => {
    console.log('onClickFavorite')
  }

  const onClickComment = () => {
    console.log('onClickComment')
  }

  return (
    <Card className={classes.root} >
      <CardHeader
        avatar={
          <Avatar sx={{bgcolor: 'transparent'}} aria-label="recipe"
                  src={"https://www.businesstyc.com/wp-content/uploads/2019/03/avataaars-2.png"} >
            {username.substring(0, 1)}
          </Avatar >
        }
        action={
          <IconButton aria-label="settings" >
            <MoreVertIcon />
          </IconButton >
        }
        title={username}
        subheader={moment(createdAt).fromNow(true)}
        component={RouterLink} to={`/posts/${id}`}
      />
      <CardMedia
        component="img"
        image="https://picsum.photos/200/300"
        alt="post-card"
        className={classes.media}
      />
      <CardContent >
        <Typography variant="body2" color="text.secondary" >
          {body}
        </Typography >
      </CardContent >
      <CardActions >
        <IconButton aria-label="add to favorites" onClick={onClickFavorite} >
          {/*<FavoriteIcon clip={2} color="error"/>*/}
          <FavoriteIcon />
          <Box sx={{m: 0.5}} />
          <div >
            {`${likes.length}`}
          </div >
        </IconButton >
        <IconButton aria-label="add to favorites" onClick={onClickComment} >
          {/*<CommentIcon clip={2} color="error"/>*/}
          <CommentIcon />
          <Box sx={{m: 0.5}} />
          <div >
            {`${comments.length}`}
          </div >
        </IconButton >
      </CardActions >
    </Card >
  )
}

export default PostCard;
