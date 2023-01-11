const {
    selectAllCategory,
    selectCategory,
    insertCategory,
    updateCategory,
    deleteCategory,
    countData,
    findId,
  } = require("../model/category");
  const commonHelper = require("../helper/common");
  
  const categoryController = {

    getAllCategory: async (req, res) => {
      try {
        const result = await selectAllCategory();
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }
    },


    getDetailCategory: async (req, res) => {
      const id = Number(req.params.id);
      selectCategory(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },


    createCategory: async (req, res) => {
      const { name, price, deskripsi, stock, rating,size} = req.body;
      const {
        rows: [count],
      } = await countData();
      const id = Number(count.count) + 1;
      const data = {
        id,
        name,
        price,
        deskripsi,
        stock,
        rating,
        size,
      };
      insertCategory(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Product created")
        )
        .catch((err) => res.send(err));
    },


    updateCategory: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const {name, price, deskripsi, stock, rating , size} = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        const data = {
          id,
          name,
          price,
          deskripsi,
          stock,
          rating,
          size,
        };
        updateCategory(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },


    deleteCategory: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        deleteCategory(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = categoryController;