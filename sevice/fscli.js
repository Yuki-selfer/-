var fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout;
// const { dirname } = require('path');
fs.readdir(__dirname, function(err, files) {
    console.log(files);
    if (!files.length) {
        return console.log('no files to show')
    }
    console.log('select which file enter');


    file(0);

    function file(i) {
        var filename = files[i];
        2
        fs.stat(__dirname + '/' + filename, function(err, stat) {


            if (stat.isDirectory()) {
                console.log(" " + i + '   ' + filename + "");
            } else {
                console.log(" " + i + '   ' + filename + "");
            }
            i++;
            if (i == files.length) {

                // console.log('');
                // stdout.write('\033[33mEnteryourchice：\033[39m');
                // stdin.resume();
                read()

            } else {
                file(i)
            }
        })


        function read() {
            console.log("工作目录" + process.cwd());
            console.log("文件夹绝对路径" + __dirname);
            stdout.write('\033[33mEnteryourchice：\033[39m');
            stdin.resume();
            stdin.setEncoding('utf-8');
            stdin.on('data', option)
        }

        function option(data) {
            console.log(data);
            console.log("工作目录" + process.cwd());
            console.log("文件夹绝对路径" + __dirname);
            
            if (!files[Number(data)]) {
                stdout.write('\033[33mEnteryourchice：\033[39m')
            } else {
                stdin.pause();
                fs.readFile(__dirname + "/" + filename, 'utf-8', function(err, data) {
                    console.log('');
                    console.log("\033[90m" + data.replace(/(.*)/g, '      $1') + "\022[39m");
                })
            }

        }

    }
})