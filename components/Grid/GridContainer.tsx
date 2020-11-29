import React, { ReactNode } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    marginRight: "-15px",
    marginLeft: "-15px",
    width: "auto",
  },
};

const useStyles = makeStyles(styles);

type Props = {
  children: ReactNode;
  className?: string;
  spacing?: number;
};

export default function GridContainer({
  children,
  className = "",
  spacing,
  ...rest
}: Props) {
  const classes = useStyles();
  return (
    <Grid container {...rest} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}
