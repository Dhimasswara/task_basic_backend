const {
    selectAllSeller,
    selectSeller,
    insertSeller,
    updateSeller,
    deleteSeller,
    countData,
    findId,
  } = require("../model/seller");
  const commonHelper = require("../helper/common");
  
  const sellerController = {

    getAllSeller: async (req, res) => {
      try {
        const result = await selectAllSeller();
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }
    },


    getDetailSeller: async (req, res) => {
      const id = Number(req.params.id);
      selectSeller(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },


    createSeller: async (req, res) => {
      const { name, phone, password, email, gender, dob } = req.body;
      const {
        rows: [count],
      } = await countData();
      const id = Number(count.count) + 1;
      const data = {
        id,
        name,
        phone,
        password,
        email,
        gender,
        dob,
      };
      insertSeller(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Product created")
        )
        .catch((err) => res.send(err));
    },


    updateSeller: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const {name, phone, password, email, gender, dob} = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        const data = {
          id,
          name,
          phone,
          password,
          email,
          gender,
          dob,
        };
        updateSeller(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },


    deleteSeller: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        deleteSeller(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = sellerController;