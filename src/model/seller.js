const Pool = require('../config/db');

const selectAllSeller = (limit, offset, searchParam,sortBY,sort) =>{
  return Pool.query(`SELECT * FROM seller WHERE fullname LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset} `);
}

const selectSeller = (id) =>{
    return Pool.query(`SELECT * FROM seller WHERE id_seller='${id}'`);
}

const insertSeller = (data) =>{
    const { id,name,gender,phone,email,password,dob, role} = data;
    return Pool.query(`INSERT INTO Seller(id_seller,fullname,gender,phone,email,password,dob, role) VALUES(${id},'${name}','${gender}','${phone}','${email}','${password}','${dob}','${role}')`);
}

const updateSeller = (data) =>{
    const { id,name,gender,phone,email,password,dob, role} = data;
    return Pool.query(`UPDATE Seller SET fullname='${name}', gender='${gender}', phone='${phone}', email='${email}',password='${password}',dob='${dob}', role='${role}' WHERE id_seller='${id}'`);
}

const deleteSeller = (id) =>{
    return Pool.query(`DELETE FROM Seller WHERE id_seller='${id}'`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM seller')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id_seller FROM seller WHERE id_seller='${id}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

// AUTHENTICATION

const registerSeller = (data) => {
  const {id,name,gender, phone, email, password, dob, role } = data

  return Pool.query(`INSERT INTO seller (id_seller,fullname,gender,phone,email,password,dob,role) VALUES('${id}','${name}','${gender}','${phone}','${email}','${password}','${dob}','${role}')`);
}


const findEmail = (email) => {
  return new Promise((resolve, reject) => {
      Pool.query(`SELECT * FROM seller WHERE email='${email}'`, (error, result) => {
          if (!error) {
              resolve(result);
          } else {
              reject(error);
          }
      });
  });
};

module.exports = {
    selectAllSeller,
    selectSeller,
    insertSeller,
    updateSeller,
    deleteSeller,
    countData,
    findId,
    registerSeller,
    findEmail
}