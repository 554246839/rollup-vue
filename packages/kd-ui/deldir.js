const fs = require('fs')

function delDir(path){
  if(fs.existsSync(path)){
    fs.readdirSync(path).forEach((file, index) => {
      let curPath = path + "/" + file;
      if(fs.statSync(curPath).isDirectory()){
        delDir(curPath); //递归删除文件夹
      } else {
        fs.unlinkSync(curPath); //删除文件
      }
    });
    fs.rmdirSync(path);
  }
}

module.exports.delDir = delDir
