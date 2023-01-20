  const {
    selectAllProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId,
  } = require("../model/products");

  const { v4: uuidv4 } = require('uuid');
  const commonHelper = require("../helper/common");
  const productController = {

    getAllProduct: async(req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        let sortBY = req.query.sortBY || "name";
        let sort = req.query.sort || 'ASC';
        let searchParam = req.query.search || "";
        const result = await selectAllProduct(limit, offset, searchParam,sortBY,sort);
        const {
          rows: [count],
        } = await countData();
        const totalData = parseInt(count.count);
        const totalPage = Math.ceil(totalData / limit);
        const pagination = {
          currentPage: page,
          limit: limit,
          totalData: totalData,
          totalPage: totalPage,
        };
        commonHelper.response(res , result.rows, 200, "get data success",pagination);
      } catch (error) {
        console.log(error);
      }
    },


    getDetailProduct: async (req, res) => {
      const id = req.params.id;
      const { rowCount } = await findId(id);
        if (!rowCount) {
          return res.json({message: "ID is Not Found"})
        }
      selectProduct(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },



    createProduct: async (req, res) => {
      const photo = req.file.filename;
      const PORT = process.env.PORT || 5000;
      const HOST = process.env.HOST || 'localhost';
      const role = req.payload.role;
  
      if (role !== 'seller') return res.json({ message: `Permission Denied, You're not Seller` });
      const { name,stock,price,description,id_category} = req.body;
      const id = uuidv4();

      const data = {
        id,
        name,
        stock,
        price,
        photo: `http://${HOST}:${PORT}/img/${photo}`,
        description,
        id_category
      };
  
      insertProduct(data)
      .then((result) => {
        commonHelper.response(res, result.rows, 201, 'Product Created!');
      })
      .catch((error) => {
        res.send(error);
      });
    },


    updateProduct: async (req, res) => {
      const id = req.params.id;
      const photo = req.file.filename;
      const PORT = process.env.PORT || 5000;
      const HOST = process.env.HOST || 'localhost';
      const role = req.payload.role;
  
      if (role !== 'seller') return res.json({ message: `Permission Denied, you're not a seller!` });
  
      const { rowCount } = await findId(id);
  
      if (!rowCount) return res.json({ message: 'Product Not Found!' });
  
  
      const {name,stock,price,description,id_category} = req.body;
  
      const data = {
          id,
          name,
          stock,
          price,
          photo: `http://${HOST}:${PORT}/img/${photo}`,
          description,
          id_category,
      };
  
        updateProduct(data)
        .then((result) => {
          commonHelper.response(res, result.rows, 201, 'Product Updated!');
        })
        .catch((error) => {
          res.send(error);
        });
    },


    deleteProduct: async (req, res) => {
      const id = req.params.id;
      const role = req.payload.role;
  
      if (role !== 'seller') return res.json({ message: 'Permission Denied, you are not a seller!' });
  
      const { rowCount } = await findId(id);
      if (!rowCount) return res.json({ message: 'Product Not Found' });
  
  
      deleteProduct(id)
      .then((result) => {
        commonHelper.response(res, result.rows, 200, 'Product Deleted!');
      })
      .catch((error) => {
        res.send(error);
      });
    },
  };
  
  module.exports = productController;