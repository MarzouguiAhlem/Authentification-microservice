import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Divider from '@mui/material/Divider';
import "./Features.css";

export default function MediaCard() {
  return (
    <div id="features" >
    <Container maxWidth="lg" sx={{ marginTop: "100px" }} >
        <h3 className="textStyle" >
        SMART WATERING IS A CLOUD-CONNECTED HARDWARE THAT AUTOMATES IRRIGATION AND FERTILIZATION IN YOUR ORCHARD AND
        </h3>
        <Divider variant="middle" sx={{width:'200px', margin:"auto" ,marginBottom:"40px",marginTop:"40px", borderBottomWidth: 5}}/>
      <Stack
        direction="row"
        spacing={2}
        justifyContent="space-between"
        alignItems="flex-start"
      >
        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://smart-watering.com/wp-content/uploads/2020/12/prinos.png"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align="center">
              SAVES TIME, MONEY, FERTILIZER AND WATER
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Because you control the entire irrigation and fertilization system
              remotely via a web app.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://smart-watering.com/wp-content/uploads/2019/11/kappokap.png"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align="center">
              HELPS YOU MAKE TIMELY DECISIONS
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Thanks to the real-time data and analytics.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ maxWidth: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image="https://smart-watering.com/wp-content/uploads/2019/11/podaci.png"
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" align="center">
              ENSURES OPTIMAL YIELDS
            </Typography>
            <Typography variant="body2" color="text.secondary" align="center">
              Because plants always get optimal dose of water and fertilizer -
              not more, not less than needed
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Container>
    </div>
  );
}
