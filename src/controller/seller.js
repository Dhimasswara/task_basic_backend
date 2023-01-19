const {
    selectAllSeller,
    selectSeller,
    createSeller,
    updateSeller,
    deleteSeller,
    countData,
    findId,
    registerSeller,
    findEmail
  } = require("../model/seller");
  const commonHelper = require("../helper/common");
  const bcrypt = require('bcrypt');
  const { v4: uuidv4 } = require('uuid');
  const authHelper = require('../helper/AuthHelper');
  const jwt = require('jsonwebtoken');
  
  const sellerController = {

    getAllSeller: async(req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        let sortBY = req.query.sortBY || "fullname";
        let sort = req.query.sort || 'ASC';
        let searchParam = req.query.search || "";
        const result = await selectAllSeller(limit, offset, searchParam,sortBY,sort);
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


    getDetailSeller: async (req, res) => {
      const id = req.params.id;
      const { rowCount } = await findId(id);
        if (!rowCount) {
          return res.json({message: "ID is Not Found"})
        }
      selectSeller(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },


    updateSeller: async (req, res) => {
      try {
        const id = req.params.id;
        const {name,gender,phone,email,password,dob, role} = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
         return res.json({message: "ID is Not Found"})
        }
        const data = {
          id,
          name,
          gender,
          phone,
          email,
          password,
          dob,
          role,
        };
        updateSeller(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Seller updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },

    updateSeller: async (req, res) => {
      const id = req.params.id;
      const {name,gender,phone,email,password,dob, role} = req.body;
  
      const { rowCount } = await findId(id);
  
      if (!rowCount) return res.json({ message: "Seller Not Found!" });
  
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
  
      const data = {
        id,
        name,
        gender,
        phone,
        email,
        password : passwordHash,
        dob,
        role : 'seller',
      };
  
      updateSeller(data).then(result => {
        commonHelper.response(res, result.rows, 201, "Data Seller Updated!");
      }).catch(error => {
        res.send(error);
      })
    },


    deleteSeller: async (req, res) => {
      try {
        const id = req.params.id;
        const { rowCount } = await findId(id);
        if (!rowCount) {
         return res.json({message: "ID is Not Found"})
        }
        deleteSeller(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Seller deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },

    registerSeller: async (req, res) => {
      const { name,gender,phone,email,password,dob } = req.body;
      const { rowCount } = await findEmail(email);
  
      if (rowCount) return res.json({ message: "Email already exist!" })
  
      const salt = bcrypt.genSaltSync(10);
      const passwordHash = bcrypt.hashSync(password, salt);
      const id = uuidv4();
  
      const data = {
        id,
        name,
        gender,
        phone,
        email,
        password : passwordHash,
        dob,
        role: 'seller'
      }
  
      registerSeller(data)
      .then(result => {
        commonHelper.response(res, result.rows, 201, "Data Seller Created")
      })
      .catch(error => {
        res.send(error)
      })
    },

    loginSeller: async (req, res) => {
      try {
        const { email, password } = req.body;
        const { rows: [seller] } = await findEmail(email);
  
        if (!seller) return res.json({ message: "Email Not Register!" });
  
  
        const validatePassword = bcrypt.compareSync(password, seller.password);
        if (!validatePassword) return res.json({ message: "Password Incorect" });
  
  
        delete seller.password;
        delete seller.gender;
        delete seller.dob;
        delete seller.id_customer;
  
        let payload = {
          email: seller.email,
          role: seller.role
        }
  
        seller.token = authHelper.generateToken(payload);
        seller.refreshToken = authHelper.generateRefreshToken(payload)
  
        commonHelper.response(res, seller, 201, "Login Successfull")
  
      } catch (error) {
        console.log(error);
      }
    },

    refreshToken: (req, res) => {
      try {
        const refreshToken = req.body.refreshToken;
        let decode = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
  
        const payload = {
          email: decode.email,
          role: decode.role
        };
  
        const result = {
          token: authHelper.generateToken(payload),
          refreshToken: authHelper.generateRefreshToken(payload)
        };
  
        commonHelper.response(res, result, 200)
      } catch (error) {
        console.log(error);
      }
    },

    profileSeller: async (req, res) => {
      const email = req.payload.email;
      const { rows: [seller] } = await findEmail(email);
  
      delete seller.password;
      commonHelper.response(res, seller, 200);
    }

  };
  
  module.exports = sellerController;