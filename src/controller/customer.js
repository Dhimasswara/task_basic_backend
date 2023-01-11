const {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId,
  } = require("../model/customer");
  const commonHelper = require("../helper/common");
  
  const customerController = {

    getAllCustomer: async (req, res) => {
      try {
        const result = await selectAllCustomer();
        commonHelper.response(res, result.rows, 200, "get data success");
      } catch (error) {
        console.log(error);
      }
    },


    getDetailCustomer: async (req, res) => {
      const id = Number(req.params.id);
      selectCustomer(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },


    createCustomer: async (req, res) => {
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
      insertCustomer(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 201, "Product created")
        )
        .catch((err) => res.send(err));
    },


    updateCustomer: async (req, res) => {
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
        updateCustomer(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },


    deleteCustomer: async (req, res) => {
      try {
        const id = Number(req.params.id);
        const { rowCount } = await findId(id);
        if (!rowCount) {
          res.json({message: "ID is Not Found"})
        }
        deleteCustomer(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Product deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },
  };
  
  module.exports = customerController;