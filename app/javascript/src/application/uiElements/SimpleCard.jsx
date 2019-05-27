import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const companyCardStyles = {
  card: {
    minWidth: '30vw',
    marginLeft: '1vw',
    marginRight: '1vw',
    display: 'inline-flex',
    flexDirection: "row",
    wrap: "wrap",
    justifyContent: 'space-around'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  paragraph: {
    maxWidth: '50vw'
  }
};
const info = {
  companyName: 'comapnyName',
  sector: 'sector',
  ceo: 'ceo',
  description: 'description',
  website: 'website',
}
function SimpleCompanyCard(props) {
  const { classes } = props;
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          Company Information
        </Typography>
        <Typography variant="h5" component="h2">
          {info.companyName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Sector: {info.sector}
        </Typography>
        <Typography component="h6">
          CEO: {info.ceo}
        </Typography>
        <Typography paragraph className={classes.paragraph}>
          {info.description}
        </Typography>
        <Typography component="h6">
          <a href={info.website} target="_blank">{info.website}</a>
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(e) => console.log(e.target)}>More</Button>
      </CardActions>
    </Card>
  );
}

SimpleCompanyCard.propTypes = {
  classes: PropTypes.object.isRequired,
  info: PropTypes.object,
};

export default withStyles(companyCardStyles)(SimpleCompanyCard);
