import {
  Container,
  Grid,
  List,
  ListItem,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { SET_VIDEOS } from "../context/action.types";
import { PlaylistContext } from "../context/PlaylistContext";
import { VideoListContext } from "../context/VideoListContext";
import { youtubeRequest } from "../utils/youtubeAPI";
import VideoCard from "./VideoCard";

const useStyles = makeStyles({
  heading: {
    padding: "0.3em",
    margin: "0.3em",
  },
  videoList: {
    maxHeight: "88vh",
    overflow: "auto",
    margin: "0.4em 0",
  },
});

const CreateCourse = () => {
  const classes = useStyles();
  const { playlistId } = useContext(PlaylistContext);
  const { state, dispatch } = useContext(VideoListContext);

  const [videos, setVideos] = useState();
  const [loadingPlaylistItems, setLoadingPlaylistItems] = useState(true);

  // https://youtube.googleapis.com/youtube/v3/
  // playlistItems?part=snippet&playlistId=PLRAV69dS1uWSxUIk5o3vQY2-_VKsOpXLD&key=[YOUR_API_KEY]

  const fetchPlaylist = async () => {
    setLoadingPlaylistItems(true);
    const { status, data } = await youtubeRequest.get("/playlistItems", {
      params: {
        playlistId,
      },
    });

    if (status === 200) {
      let videosArray = [];
      data.items.forEach((videoObject) => {
        let video = {
          videoId: videoObject.snippet?.resourceId.videoId,
          thumb: videoObject.snippet?.thumbnails.medium.url,
          videoTitle: videoObject.snippet?.title,
          channelTitle: videoObject.snippet?.channelTitle,
        };
        videosArray.push(video);
      });
      // save data to state
      // setVideos(videosArray);
      // save data to context
      await dispatch({
        type: SET_VIDEOS,
        payload: videosArray,
      });
      // setVideos(state);
      setLoadingPlaylistItems(false);
    }
  };

  useEffect(() => {
    if (playlistId) {
      fetchPlaylist();
    }
  }, [playlistId]);

  return (
    <div>
      <Container maxWidth={false}>
        <Grid container spacing={0}>
          {/* left half portion */}
          <Grid
            container
            item
            sm={6}
            spacing={2}
            direction="row"
            justify="center"
            alignItems="center"
          >
            <Typography component="h5" variant="h5" className={classes.heading}>
              List of Videos for course
            </Typography>
            <List className={classes.videoList}>
              {loadingPlaylistItems ? (
                <p>Wait we are loading</p>
              ) : (
                state.map((mVideo) => (
                  <ListItem key={mVideo.videoId} maxWidth="100%">
                    <VideoCard mVideo={mVideo} />
                  </ListItem>
                ))
              )}
            </List>
          </Grid>
          {/* right half portion */}
          <Grid container item sm={6}>
            Hello
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CreateCourse;
