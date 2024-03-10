const { poolPromise } = require("../database/config");
const newProduct = async (req, res) => {
  try {
    // const {
    //   Name,
    //   Description,
    //   Content,
    //   Specifications,
    //   Origin,
    //   Image,
    //   Link,
    //   Price,
    //   PriceOrigin,
    //   PriceText,
    //   Selling,
    //   Sort,
    //   ListProductCate,
    //   Show,
    //   ProductCateID,
    // } = req.body;
    // if (
    //   !Name ||
    //   !Description ||
    //   !Content ||
    //   !Specifications ||
    //   !Origin ||
    //   !Image ||
    //   !Link ||
    //   !Price ||
    //   !PriceOrigin ||
    //   !PriceText ||
    //   !Selling ||
    //   !Sort ||
    //   !ListProductCate ||
    //   !Show ||
    //   !ProductCateID
    // ) {
    //   res.status(400);
    //   res.send("All fields are required");
    //   return;
    // }
    // await poolPromise.connect();
    // const query = `INSERT INTO Product (Name, Description, Content, Specifications, Origin, Image, Link, Price, PriceOrigin, PriceText, Selling, Sort, ListProductCate, Show, ProductCateID) VALUES ('${Name}', '${Description}', '${Content}', '${Specifications}', '${Origin}', '${Image}', '${Link}', '${Price}', '${PriceOrigin}', '${PriceText}', '${Selling}', '${Sort}', '${ListProductCate}', '${Show}', '${ProductCateID}')`;
    // const result = await poolPromise.request().query(query);
    // res.json({
    //   message: "Product added successfully",
    //   data: result.recordset,
    // });
    const { name, des } = req.body;
    if (!name || !des) {
      res.status(400);
      res.send("All fields are required");
      return;
    }
    await poolPromise.connect();
    const query = `INSERT INTO Product (Name, Description) VALUES ('${name}', '${des}')`;
    const result = await poolPromise.request().query(query);
    res.json({
      message: "Product added successfully",
      data: result.recordset,
    });
  } catch (error) {
    res.status(500);
  }
};

const getProduct = async (req, res) => {
  try {
    await poolPromise.connect();
    const query = `SELECT * FROM Product`;
    const result = await poolPromise.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
  }
};

const getProductById = async (req, res) => {
  try {
    await poolPromise.connect();
    const { id } = req.params;
    console.log(id);
    const query = `SELECT * FROM Product WHERE id_Product = ${id}`;
    const result = await poolPromise.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, des } = req.body;
    if (!name || !des) {
      res.status(400);
      res.send("All fields are required");
      return;
    }
    await poolPromise.connect();
    const query = `UPDATE Product SET Name = '${name}', Description = '${des}' WHERE id_Product = ${id}`;
    const result = await poolPromise.request().query(query);
    res.json({
      message: "Product updated successfully",
      data: result.recordset,
    });
  } catch (error) {
    res.status(500);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await poolPromise.connect();
    const query = `DELETE FROM Product WHERE id_Product = ${id}`;
    const result = await poolPromise.request().query(query);
    res.json({
      message: "Product deleted successfully",
      data: result.recordset,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  newProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
