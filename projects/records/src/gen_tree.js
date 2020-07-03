var recursive = require('recursive-readdir');

// recursive('./files', function(err, files) {
//   console.log(files);
// })

var n = 0;

var fs = require('fs'),
    path = require('path');
 
function dirTree(filename) {
    var stats = fs.lstatSync(filename),
        info = {
            value: '/'+filename,
            label: path.basename(filename)
        };

    n += 1;
 
    if (stats.isDirectory()) {
        info.children = fs.readdirSync(filename).filter(
        		child => !child.includes('.DS_Store')
        	).map(function(child) {
            return dirTree(filename + '/' + child);
        });
    }
 
    return info;
}

let data = JSON.stringify([dirTree('files')]);
fs.writeFileSync('src/tree.json', data);
 
// if (module.parent == undefined) {
//     // node dirTree.js ~/foo/bar
//     var util = require('util');
//     console.log(util.inspect(dirTree(process.argv[2]), false, null));
// }