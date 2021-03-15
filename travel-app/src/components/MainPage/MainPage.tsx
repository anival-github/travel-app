import React from 'react';
import {
  Container,
  Typography,
  CardMedia,
  Grid,
  Card,
  CardContent,
  CardActions,

} from '@material-ui/core';
import Button from '@material-ui/core/Button';

const cards = [1, 2, 3, 4, 5, 6, 7, 8];

const MainPage:React.FC = () => (
  <div>
    <Container className="mainpage" maxWidth="md">
      <Grid container spacing={4}>
        {cards.map((card) => (
          <Grid item key={card} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia
                className="cardmedia"
                image="https://source.unsplash.com/random"
                title="Image title"
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  CountryPage
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

    </Container>
  </div>
);

export default MainPage;
