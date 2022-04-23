import React from "react";
import { Card, CardContent, CardActions, Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import SimpleImageSlider from "react-simple-image-slider";
import { RemoveScrollBar } from "react-remove-scroll-bar";

import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

import useStyles from "./style";

const Main = ({ categories }) => {
  const classes = useStyles();
  const images = [
    {
      url: "https://staging.tfdiet.com/wp-content/uploads/2019/01/clothes-hanging.jpg",
    },
    {
      url: "https://hatroom.eu/images/bildspel/shallow-focus-photo-of-man-in-blue-denim-jacket-1964073-liten-76706.jpg",
    },
    {
      url: "https://im.whatshot.in/img/2019/Jun/pjimage-23-1560504588.jpg?wm=1&w=1200&h=630&cc=1",
    },
    {
      url: "https://stylecaster.com/wp-content/uploads/2016/10/best-leather-jackets.jpeg",
    },
    {
      url: "https://www.gqmiddleeast.com/2021/06/Mens_Leather_Jacket_GQME.jpg",
    },
    {
      url: "https://assetscdn1.paytm.com/images/catalog/view_item/220855/1552666891616.jpg?imwidth=1600&impolicy=hq",
    },
    {
      url: "https://media.gq-magazine.co.uk/photos/5db72aaa96d5cc0008ed88fd/master/pass/20191028-Trousers-06.jpg",
    },
    {
      url: "https://www.stylesnic.com/wp-content/uploads/2020/07/latest-and-classy-Cambridge-Summer-Collection-for-men.jpg",
    },
    {
      url: "https://ksr-ugc.imgix.net/assets/012/588/282/9d97fff43045bcd60bc2fa58b2ff976f_original.jpg?ixlib=rb-4.0.2&crop=faces&w=1552&h=873&fit=crop&v=1464787121&auto=format&frame=1&q=92&s=f486244e473405595ac0c0f28e5a19e9",
    },
  ];

  return (
    <>
      <RemoveScrollBar />
      <Card className={classes.root}>
        <div>
          <SimpleImageSlider
            width={1370}
            height={504}
            images={images}
            showBullets={true}
            showNavs={true}
            loop={true}
            autoPlay={true}
            autoPlayDelay={5}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CardActions disableSpacing className={classes.cardActions}>
            <Link
              to="/products"
              style={{
                textDecoration: "none",
                color: "gray",
                fontSize: "30px",
              }}
            >
              <Button variant="danger">Shop Now</Button>
            </Link>
          </CardActions>
        </div>
      </Card>
      <Typography color="textSecondary" style={{ textAlign: "center" }}>
        created by ©2022 BuyYou.com
      </Typography>
    </>
  );
};

export default Main;
