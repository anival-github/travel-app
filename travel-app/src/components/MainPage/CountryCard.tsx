import React, { useState } from 'react';
import {
  Typography, CardMedia, Grid, Card, CardContent, CardActions,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { NavLink } from 'react-router-dom';
import { ButtonsType } from '../../redux/localisation-reducer';

type PropsType = {
  ISOCode: string,
  imageUrl: string,
  countryName: string,
  buttonsNames: ButtonsType,
};

const CountryCard: React.FC<PropsType> = ({
  ISOCode, imageUrl, countryName, buttonsNames,
}: PropsType) => {
  const [isRaised, setIsRaised] = useState(false);

  return (
    <Grid item key={ISOCode} xs={12} sm={6} md={4}>
      <Card
        raised={isRaised}
        onMouseOver={() => setIsRaised(true)}
        onMouseOut={() => setIsRaised(false)}
      >
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
          <Button
            size="small"
            color="primary"
            component={NavLink}
            to={`/country/${ISOCode}`}
          >
            {buttonsNames.view}
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );
};

export default CountryCard;
