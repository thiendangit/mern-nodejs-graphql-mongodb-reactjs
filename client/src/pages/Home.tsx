import {
  Box,
  Grid,
  styled,
} from "@mui/material";
import React from "react";
import {usePostsQuery} from "../generated/graphql";
import PostCard from "components/PostCard";


const Title = styled('div')(({theme}) => ({
  ...theme.typography.h4,
  padding: theme.spacing(1),
  textAlign: 'left',
  color: theme.palette.text.secondary,
}));

const Home: React.FC = () => {
    const {data, loading} = usePostsQuery();
    const posts = data?.getPosts;
    console.log({posts})

    if (loading) {
      return (
        <div >
          Loading.......
        </div >
      )
    }

    return (
      <>
        <Box sx={{width: '100%'}} >
          <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}} >
            <Grid item xs={12} >
              <Title >Recent Posts</Title >
            </Grid >
            {
              posts?.map((item) => {
                return (
                  <Grid item xs={4} key={item.id} marginBottom={'15px'} >
                    <PostCard {...item} />
                  </Grid >
                )
              })
            }
          </Grid >
        </Box >
      </>
    )
  }
;

export default Home;
