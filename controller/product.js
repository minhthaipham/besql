const { poolPromise } = require("../database/config");
const newProduct = async (req, res) => {
  try {
    const { name, des, img } = req.body;
    if (!name || !des) {
      res.status(400);
      res.send("All fields are required");
      return;
    }
    await poolPromise.connect();
    const query = `INSERT INTO ProductCar (Name, DescriptionCar,ImageCar) VALUES ('${name}', '${des}','${img}')`;
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
    const query = `SELECT * FROM ProductCar`;
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
    const query = `SELECT * FROM ProductCar WHERE id_ProductCar = ${id}`;
    const result = await poolPromise.request().query(query);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, des, img } = req.body;
    if (!name || !des) {
      res.status(400);
      res.send("All fields are required");
      return;
    }
    await poolPromise.connect();
    const query = `UPDATE ProductCar SET Name = '${name}', DescriptionCar = '${des}',ImageCar = '${img}' WHERE id_ProductCar = ${id}`;
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
    const query = `DELETE FROM ProductCar WHERE id_ProductCar = ${id}`;
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
