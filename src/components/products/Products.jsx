import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import Product from "./product/Product";
import useStyles from "./style";
import { Menu, MenuItem, Fade } from "@material-ui/core";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";

const Products = ({ products, onAddToCart, categories }) => {
  const classes = useStyles();

  const [data, setData] = useState(products);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const filterResult = (catItem, a, b) => {
    const result = products.filter(
      (product) =>
        product.categories[0].name === catItem ||
        product.categories[0].name === a ||
        product.categories[0].name === b
    );
    setData(result);
  };

  return (
    <main className={classes.content}>
      <div className={classes.toolbar} />

      <div style={{ marginBottom: 20 }}>
        <Button
          id="fade-button"
          variant="warning"
          aria-controls={open ? "fade-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
        >
          Select Category
        </Button>
        <Menu
          id="fade-menu"
          MenuListProps={{
            "aria-labelledby": "fade-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          {categories.map((category) => (
            <MenuItem
              key={category.id}
              onClick={() => filterResult(`${category.name}`)}
            >
              {category.name}
            </MenuItem>
          ))}
          <MenuItem
            key="k1"
            onClick={() => filterResult("Children", "Men", "Women")}
          >
            ALL
          </MenuItem>
        </Menu>
      </div>

      <Grid container justify="center" spacing={4}>
        {data.map((product) => (
          <Grid
            item
            key={product.id}
            xs={12}
            sm={6}
            md={4}
            lg={3}
            style={{ backgroundColor: "#a903fc" }}
          >
            <Product
              product={product}
              key={product.id}
              onAddToCart={onAddToCart}
            />
          </Grid>
        ))}
      </Grid>
    </main>
  );
};

export default Products;
