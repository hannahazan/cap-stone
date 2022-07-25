
import "../style/index.scss";
import * as React from "react";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Avatar from "@mui/material/Avatar";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import IconButton from "@mui/material/IconButton";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CardHeader from "@mui/material/CardHeader";
import Tooltip from "@mui/material/Tooltip";
import HomePage from "./HomePage.js";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ButtonGroup from "@mui/material/ButtonGroup";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import AddReactionOutlinedIcon from "@mui/icons-material/AddReactionOutlined";


export default function ProfilAsso(props) {
  const [value, setValue] = React.useState("recents");
  const cards = [1, 2, 3, 4];
  const profilcards = [1, 2, 3, 4, , 5, 6];
  const imgAvatar= localStorage.getItem('imgUrl')
  return (
    <Container sx={{ py: 5 }} maxWidth="md" style={{background:"radial-gradient(#DF65CD69,#FBBC0580)"}}>
      <Grid
        container
        sx={{ height: "100%", display: "flex", flexDirection: "column" }}
      >
        <Grid container xs={12}>
          <Grid sx={{ height: "100%", display: "flex", flexDirection: "row" }}>
            
            <Grid xs={3} sx={{ height: "100%", display: "flex" }}>
              <Avatar
                alt="Remy Sharp"
                src={process.env.PUBLIC_URL + imgAvatar}
                sx={{ width: 90, height: 90 }}
              />
            </Grid>
{/* la ou commence le cote chiant avec las boutons et le texte */}
            <Grid
              xs={9}
              sx={{
                paddingLeft: 2,
                height: "100%",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <BottomNavigation
                container
                xs={12}
                sx={{ width: "100%", display: "flex", flexDirection: "row" }}
              >
                <Grid
                  xs={4}
                  sx={{
                    height: "50%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <BottomNavigationAction 
                    label="Follow"
                    value="follow"
                    icon={<AddReactionOutlinedIcon fontSize="large"className="iconP" />}
                  />
                  <p classeName="p_icons"style={{ textAlign: "center",fontFamily:"poppins",fontSize:"18px" }}>Follow</p>
                </Grid>

                <Grid
                  xs={4}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <BottomNavigationAction
                    label="Share"
                    value="share"
                    icon={<ShareIcon fontSize="large" className="iconP" />}
                  />
                  <p classeName="p_icons"style={{ textAlign: "center",fontFamily:"poppins",fontSize:"18px" }}>Share</p>
                </Grid>

                <Grid
                  xs={4}
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <BottomNavigationAction
                    label="Create"
                    value="create"
                    icon={<AddBoxIcon fontSize="large" className="iconP" />}
                    href="#"
                  />
                  <p classeName="p_icons"style={{ textAlign: "center", fontFamily:"poppins",fontSize:"18px" }}>Create</p>
                </Grid>
              </BottomNavigation>
            </Grid>
            
          </Grid>
        </Grid>

        <h1 className="myTitle">My Followers</h1>
        <Grid container spacing={3}>
          {profilcards.map((profilcard) => (
            <Grid item key={profilcard} xs={3}>
              <a href="#"sx={{height: "100%",display: "flex", flexDirection: "column",justifyContent: "center",
           }}
              >
                <Avatar
                  src={"https://source.unsplash.com/random"}
                  sx={{ width: 60, height: 60 }}
                />
              </a>
            </Grid>
          ))}
        </Grid>

        <h1 className="myTitle">My events</h1>
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid item key={card} xs={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <a href="#">
                  <CardMedia
                    component="img"
                    image="https://source.unsplash.com/random"
                    alt="random"
                  />
                </a>
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    gutterBottom
                    value="title"
                    variant="h5"
                    component="h2"
                    sx={{ textAlign: "center" }}
                  >
                    <strong>title</strong>
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}