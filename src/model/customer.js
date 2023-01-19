const Pool = require('../config/db');

const selectAllCustomer = (limit, offset, searchParam,sortBY,sort) =>{
  return Pool.query(`SELECT * FROM customer WHERE fullname LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset} `);
}

const selectCustomer = (id) =>{
    return Pool.query(`SELECT * FROM customer WHERE id_customer='${id}'`);
}

const insertCustomer = (data) =>{
    const { id,name,gender, phone, email, password, dob, role} = data;
    return Pool.query(`INSERT INTO customer (id_customer,fullname,gender,phone,email,password,dob,role) VALUES('${id}','${name}','${gender}','${phone}','${email}','${password}','${dob}','${role}')`);
}

const updateCustomer = (data) =>{
    const { id,name,gender, phone, email, password, dob, role} = data;
    return Pool.query(`UPDATE customer SET fullname='${name}', gender='${gender}', phone='${phone}',email='${email}', password='${password}',dob='${dob}', role='${role}' WHERE id_customer='${id}'`);
}

const deleteCustomer = (id) =>{
    return Pool.query(`DELETE FROM customer WHERE id_customer='${id}'`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM customer')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id_customer FROM customer WHERE id_customer='${id}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

// AUTHENTICATION

const registerCustomer = (data) => {
  const {id,name,gender, phone, email, password, dob, role } = data

  return Pool.query(`INSERT INTO customer (id_customer,fullname,gender,phone,email,password,dob,role) VALUES('${id}','${name}','${gender}','${phone}','${email}','${password}','${dob}','${role}')`);
}


const findEmail = (email) => {
  return new Promise((resolve, reject) => {
      Pool.query(`SELECT * FROM customer WHERE email='${email}'`, (error, result) => {
          if (!error) {
              resolve(result);
          } else {
              reject(error);
          }
      });
  });
};

module.exports = {
    selectAllCustomer,
    selectCustomer,
    insertCustomer,
    updateCustomer,
    deleteCustomer,
    countData,
    findId,
    registerCustomer,
    findEmail
}