const lineByLine = require('n-readlines')
const liner = new lineByLine('./imglink.txt')

let line
while(line = liner.next()) {
    console.log(line.toString('utf-8'))
}