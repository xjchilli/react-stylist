/**
 * 删除目录下的文件
 */
var fs = require('fs');


function deleteDirFiles(path) {
    let files = [];
    if (fs.existsSync(path)) {
        files = fs.readdirSync(path);
        files.forEach(function(file, index) {  
            var curPath = path + "/" + file;  
            if(fs.statSync(curPath).isDirectory()) { // recurse  
                deleteDirFiles(curPath);  
            } else { // delete file  
                fs.unlinkSync(curPath);  
            }  
        });  
    }
}

module.exports = deleteDirFiles;