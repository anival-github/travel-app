import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
  CardMedia,
  Grid,
  Card,
  CardContent,
  CardActions,
  
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
     flexGrow:1
  },
  form:{
      margin: theme.spacing(1),
      width: '25vh',
    },
  title:{
    flexGrow:1
  },
   CardMedia: {
     paddingTop:"56.25%"
   },
   CardContent:{
     flexGrow:1
   },
   cardGrid:{
     marginTop: theme.spacing(12)
   }
}));
    const cards = [1, 2, 3, 4, 5, 6, 7, 8]
export default function App() {
  const classes = useStyles();

  return (
    <>
       <AppBar position = "fixed">
     <Container fixed>
       <Toolbar>
        <Typography variant = "h6" className = {classes.title}>Travel app</Typography>
        
           < form className = {classes.form} 
           noValidate autoComplete = "off" >
           <TextField id="outlined-basic"  label="Change country" variant="outlined" />
           </form>
            <Box mr = {3}>
           <Button color = "inherit" variant = "outlined">Log In</Button>
           <Button color = "secondary" variant = "contained">Sign Up</Button>
         </Box>
          <Button variant="contained" >Change language</Button>
       </Toolbar>
     </Container>
   </AppBar>
   <main>
    
     <Container className = {classes.cardGrid} maxWidth = "md">
       <Grid container spacing = {4}>
          {cards.map((card) =>(
            <Grid item key = {card} xs = {12} sm={6} md= {4}>
              <Card className = {classes.card}>
                <CardMedia
                className = {classes.CardMedia}
                image = "https://source.unsplash.com/random"
                title = "Image title"
                />
                <CardContent className = {classes.cardContent}>
                  <Typography variant = "h5" gutterBottom>
                    CountryPage
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button size = "small" color = "primary">
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid >
          ))}
       </Grid>

     </Container>
   </main>
   <footer>
      <Container>
      <Typography align = "center" color = "textSecondary" component = "p" variant = "subtitle">
        Made in 2021
      </Typography>
        <Button size = "small" color = "primary">
                      Link_gitHub1
                      Link_gitHub2
                      Link_gitHub3
                      Link_gitHub4
                    </Button>
     
      </Container>
   </footer>
   </>
  );
}
