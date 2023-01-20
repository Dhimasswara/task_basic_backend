const {
    selectAllCustomer,
    selectCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId,
    registerCustomer,
    findEmail,
  } = require("../model/customer");
const commonHelper = require("../helper/common");
const bcrypt = require('bcrypt')
const {v4 : uuidv4} = require('uuid')
const authHelper = require('../helper/AuthHelper');
const jwt = require('jsonwebtoken');
  

const customerController = {

    getAllCustomer: async(req, res) => {
      try {
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 5;
        const offset = (page - 1) * limit;
        let sortBY = req.query.sortBY || "id_customer";
        let sort = req.query.sort || 'ASC';
        let searchParam = req.query.search || "";
        const result = await selectAllCustomer(limit, offset, searchParam,sortBY,sort);
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


    getDetailCustomer: async (req, res) => {
      const id = req.params.id;
      const { rowCount } = await findId(id);
        if (!rowCount) {
          return res.json({message: "ID is Not Found"})
        }
      selectCustomer(id)
        .then((result) => {
          commonHelper.response(res, result.rows, 200, "get data success");
        })
        .catch((err) => res.send(err));
    },

    updateCustomer: async (req, res) => {
      try {
        const id = req.params.id;
        const {name, gender, phone, email, password, dob} = req.body;
        const { rowCount } = await findId(id);
        if (!rowCount) {
          return res.json({message: "ID is Not Found"})
        }

        const salt = bcrypt.genSaltSync(10);
		    const passwordHash = bcrypt.hashSync(password, salt);

        const data = {
          id,
          name,
          gender,
          phone,
          email,
          password: passwordHash,
          dob,
          role: 'customer'
        };
        updateCustomer(data)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Customer updated")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },


    deleteCustomer: async (req, res) => {
      try {
        const id = req.params.id;
        const { rowCount } = await findId(id);

        if (!rowCount) {
          return res.json({message: "ID is Not Found"})
        }
        deleteCustomer(id)
          .then((result) =>
            commonHelper.response(res, result.rows, 200, "Customer deleted")
          )
          .catch((err) => res.send(err));
      } catch (error) {
        console.log(error);
      }
    },

    registerCustomer : async (req, res) => {
        try {
          const {name, gender, phone, email, password, dob} = req.body
          const {rowCount} = await findEmail(email);

          if (rowCount) {
              res.json({
                  message: "Email already use!"
              })
          }

          const salt = bcrypt.genSaltSync(10);
          const passwordHash = bcrypt.hashSync(password, salt);
          const id = uuidv4();

          const data = {
              id,
              name,
              gender,
              phone,
              email,
              password: passwordHash,
              dob,
              role: 'customer'
          }

          registerCustomer(data)
          .then(result => {
              commonHelper.response(res, result.rows, 201, "Registered Succes!");
          }).catch(error => {
              res.send(error)
          })

      } catch (error) {
          console.log(error);
      }
    },

    loginCustomer: async (req, res) => {
      try {
        const { email, password } = req.body;
        const { rows: [user] } = await findEmail(email);
  
        if (!user) return res.json({ message: "Email Not Register!" });
  
  
        const validatePassword = bcrypt.compareSync(password, user.password);
        if (!validatePassword) return res.json({ message: "Password Incorect" });
  
  
        delete user.password;
        delete user.gender;
        delete user.dob;
        delete user.id_customer;
  
        let payload = {
          email: user.email,
          role: user.role
        }
  
        user.token = authHelper.generateToken(payload);
        user.refreshToken = authHelper.generateRefreshToken(payload)
  
        commonHelper.response(res, user, 201, "Login Successfull")
  
      } catch (error) {
        console.log(error);
      }
    },


    refreshTokenCustomer: (req, res) => {
      try {
        const { refreshToken } = req.body;
        let decode = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
  
        const payload = {
          email: decode.email,
          role: decode.role
        }
  
        const result = {
          token: authHelper.generateToken(payload),
          refreshToken: authHelper.generateRefreshToken(payload)
        }
  
        commonHelper.response(res, result, 200)
      } catch (error) {
        console.log(error);
      }
    },

    profileCustomer: async (req, res) => {
		try {
			const email = req.payload.email
			const { rows: [user] } = await findEmail(email);
      const role = req.payload.role;
  
      if (role !== 'customer') return res.json({ message: `Permission Denied, cannot get customer!` });

      delete user.id_customer;
			delete user.password
      delete user.role

			commonHelper.response(res, user, 200);
		} catch (error) {
			console.log(error);
		}
	}


  };
  
  module.exports = customerController;