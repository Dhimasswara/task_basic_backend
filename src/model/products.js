const Pool = require('../config/db');

const selectAllProduct = (limit, offset, searchParam,sortBY,sort) =>{
  return Pool.query(`select product.*, category.name_category from product inner join category using (id_category) WHERE product.name LIKE '%${searchParam}%' ORDER BY ${sortBY} ${sort} LIMIT ${limit} OFFSET ${offset}`);
}

const selectProduct = (id) =>{
  return Pool.query(`select product.*, category.name_category from product inner join category using (id_category) WHERE id_products='${id}'`);
}

const insertProduct = (data) =>{
    const { id,name,stock,price,photo,description,id_category} = data;
    return Pool.query(`INSERT INTO product (id_products,name,stock,price,photo,description,id_category) VALUES('${id}','${name}',${stock},'${price}','${photo}','${description}','${id_category}')`);
}

const updateProduct = (data) =>{
    const { id,name,stock,price,photo,description,id_category} = data;
    return Pool.query(`UPDATE product SET name='${name}', stock=${stock}, price=${price}, photo='${photo}',description='${description}', id_category=${id_category} WHERE id_products='${id}'`);
}

const deleteProduct = (id) =>{
    return Pool.query(`DELETE FROM product WHERE id_products='${id}'`);
}

const countData = () =>{
    return Pool.query('SELECT COUNT(*) FROM product')
  }
  
const findId =(id)=>{
    return  new Promise ((resolve,reject)=> 
    Pool.query(`SELECT id_products FROM product WHERE id_products='${id}'`,(error,result)=>{
      if(!error){
        resolve(result)
      }else{
        reject(error)
      }
    })
    )
  }

module.exports = {
    selectAllProduct,
    selectProduct,
    insertProduct,
    updateProduct,
    deleteProduct,
    countData,
    findId
}