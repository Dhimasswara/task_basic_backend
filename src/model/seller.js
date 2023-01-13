const Pool = require('../config/db');

const selectAllSeller = (limit, offset, searchParam,sortBY,sort) =>{
  return Pool.query(`SELECT * FROM seller WHERE name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset} `);
}

const selectSeller = (id) =>{
    return Pool.query(`SELECT * FROM seller WHERE id_seller=${id}`);
}

const insertSeller = (data) =>{
    const { id,name,phone,password,email,gender,dob} = data;
    return Pool.query(`INSERT INTO Seller(id_seller,names_seller,phone,password,email,gender,dob) VALUES(${id},'${name}','${phone}','${password}','${email}','${gender}','${dob}')`);
}

const updateSeller = (data) =>{
    const { id,name,phone,password,email,gender,dob} = data;
    return Pool.query(`UPDATE Seller SET names_seller='${name}', phone='${phone}', password='${password}', email='${email}',gender='${gender}',dob='${dob}' WHERE id_seller=${id}`);
}

const deleteSeller = (id) =>{
    return Pool.query(`DELETE FROM Seller WHERE id_seller=${id}`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM seller')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id_seller FROM seller WHERE id_seller=${id}`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    selectAllSeller,
    selectSeller,
    insertSeller,
    updateSeller,
    deleteSeller,
    countData,
    findId
}