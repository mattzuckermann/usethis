import { useEffect, useState } from "react";
import Link from "next/link";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import styles from "../../assets/jss/nextjs-material-kit-pro/components/headerStyle.js";

const useStyles = makeStyles(styles);

export default function Header(props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const classes = useStyles();
  useEffect(() => {
    if (props.changeColorOnScroll) {
      window.addEventListener("scroll", headerColorChange);
    }
    return function cleanup() {
      if (props.changeColorOnScroll) {
        window.removeEventListener("scroll", headerColorChange);
      }
    };
  });
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const headerColorChange = () => {
    const { color, changeColorOnScroll } = props;

    const windowsScrollTop = window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  };
  const { color, links, brand, fixed, absolute } = props;
  const appBarClasses = classNames({
    [classes.appBar]: true,
    [classes[color]]: color,
    [classes.absolute]: absolute,
    [classes.fixed]: fixed,
  });
  return (
    <AppBar className={appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.title}>{brand}</div>
        {links.map((link, index) => (
          <Hidden
            key={index}
            smDown
            implementation="css"
            className={classes.hidden}
          >
            <Button size="medium">
              <Link href={link.path}>
                <a
                  target={link.targetBlank ? "_blank" : ""}
                  rel={link.targetBlank ? "noopener noreferrer" : ""}
                  className="noStyle"
                >
                  {link.name}
                </a>
              </Link>
            </Button>
          </Hidden>
        ))}

        <Hidden mdUp>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
      <Hidden mdUp implementation="js">
        <Drawer
          variant="temporary"
          anchor={"right"}
          open={mobileOpen}
          classes={{
            paper: classes.drawerPaper,
          }}
          onClose={handleDrawerToggle}
        >
          <div className={classes.appResponsive}>
            {links.map((link, index) => (
              <div key={index}>
                <Button size="medium" fullWidth={true}>
                  <Link href={link.path}>
                    <a
                      target={link.targetBlank ? "_blank" : ""}
                      rel={link.targetBlank ? "noopener noreferrer" : ""}
                      className="noStyle"
                    >
                      {link.name}
                    </a>
                  </Link>
                </Button>
                <hr style={{ opacity: "0.2" }} />
              </div>
            ))}
          </div>
        </Drawer>
      </Hidden>
      <style jsx>{`
        a.noStyle:link {
          text-decoration: inherit;
          color: inherit;
        }

        a.noStyle:visited {
          text-decoration: inherit;
          color: inherit;
        }
      `}</style>
    </AppBar>
  );
}

Header.defaultProp = {
  color: "white",
};

Header.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "info",
    "success",
    "warning",
    "danger",
    "transparent",
    "white",
    "rose",
    "dark",
  ]),
  links: PropTypes.arrayOf(PropTypes.object),
  brand: PropTypes.string,
  fixed: PropTypes.bool,
  absolute: PropTypes.bool,
  // this will cause the sidebar to change the color from
  // props.color (see above) to changeColorOnScroll.color
  // when the window.pageYOffset is heigher or equal to
  // changeColorOnScroll.height and then when it is smaller than
  // changeColorOnScroll.height change it back to
  // props.color (see above)
  changeColorOnScroll: PropTypes.shape({
    height: PropTypes.number.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "info",
      "success",
      "warning",
      "danger",
      "transparent",
      "white",
      "rose",
      "dark",
    ]).isRequired,
  }),
};
