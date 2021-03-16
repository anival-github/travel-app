import React from 'react';
import {
  Typography, CardMedia, Grid, Card, CardContent, CardActions,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';

type PropsType = {
  ISOCode: string,
  imageUrl: string,
  countryName: string,
};

const CountryCard: React.FC<PropsType> = ({
  ISOCode, imageUrl, countryName,
}: PropsType) => (
  <Grid item key={ISOCode} xs={12} sm={6} md={4}>
    <Card>
      <CardMedia
        className="cardmedia"
        image={imageUrl}
        title="Image title"
      />
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {countryName}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary">
          View
        </Button>
      </CardActions>
    </Card>
  </Grid>
);

export default CountryCard;
