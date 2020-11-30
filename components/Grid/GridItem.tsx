import React, { ReactNode } from "react";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    position: "relative" as "relative",
    width: "100%",
    minHeight: "1px",
    paddingRight: "15px",
    paddingLeft: "15px",
  },
};

const useStyles = makeStyles(styles);

type Props = {
  children: ReactNode;
  className?: string;
  xs?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  sm?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  md?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  lg?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
};

export default function GridItem({
  children,
  className = "",
  xs,
  ...rest
}: Props) {
  const classes = useStyles();
  return (
    <Grid item {...rest} xs={xs} className={classes.grid + " " + className}>
      {children}
    </Grid>
  );
}
