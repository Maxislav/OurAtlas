/**
 * Created by maxislav on 29.12.16.
 */
let connection;
let socket;

const hashKeys = [];

function getRandom(min, max, int) {
  var rand = min + Math.random() * (max - min);
  if(int){
    rand = Math.round(rand)
  }
  return rand;
}

function getUserIdByHash(arrData) {
  return new Promise((resolve, reject)=>{
    const  query = 'SELECT `id` FROM `user` WHERE `name`=?';
    connection.query(query, arrData, (err, rows)=>{
      if(err){
        reject(err);
        return;
      }
      resolve(rows[0].id)
    })
  })
}

function setUserHash(id) {

}

class OnEnter{

  constructor(){
    
  }

  onEnter(data){
    const tepmlate = ['name', 'pass'];
    const arrData = [];
    tepmlate.forEach(item => {
      arrData.push(data[item])
    });
    const query = 'SELECT * from user WHERE `name`=? order by `id` desc limit 150';
    connection.query(query, arrData, (err, rows) => {
      if (err) {
        console.error('onEnter', err)
        return
      }
      console.log(rows);
      if(rows.length){
        if(rows.length == 1 && rows[0].pass == data.pass){
          this.setHash(arrData)
        }else{
          socket.emit('onEnter', {
            result: false,
            message: 'user or password incorrect'
          })  
        }
        
      }else{
        socket.emit('onEnter', {
          result: false,
          message: 'User not exist'
        })
      }

    })

  }
  getHash(){
    const $possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let hash = '';
    for(let i=0; i<32; i++){
      hash += ''+$possible[getRandom(0,61, true)] ;
    };
    if(-1<hashKeys.indexOf[hash]){
      return this.getHash()
    }else{
      return hash;
    }
  }

  setHash(arrData){
    const hash =  this.getHash();
    getUserIdByHash(arrData)
      .then(id=>{

        connection.query('INSERT INTO `hash` (`id`, `user_id`, `key`) VALUES (NULL, ?, ?)', [id, hash], (err, results)=>{
          if(err){
            socket.emit('onEnter', {
              result: false,
              message: err
            })
          }else{
            socket.emit('onEnter', {
              result: 'ok',
              hash: hash
            })
          }
        })
      });

  }

  setHashKeys(){
    const query = 'SELECT * FROM `hash`';
    this.connection.query(query, (err, rows)=>{
      if(err){
        console.error('SELECT * FROM `hash', err)
        return;
      }
      console.log(rows);
      rows.forEach(item=>{
        hashKeys.push(item.key)
      })

    })
  }

  set connection(con){
    connection = con;
    connection.connect((err)=>{
      if (err) {
        console.error('error connecting: ' + err.stack);
        return;
      }
      console.log('connected as id ' + connection.threadId);
      this.setHashKeys()
    })
  }
  get connection(){
    return connection;
  }

  get socket(){
    return socket;
  }
  set socket(s){
    socket = s;
    socket.on('onEnter', this.onEnter.bind(this))
  }
}

module.exports = new OnEnter();