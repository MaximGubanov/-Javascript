const fs = require('fs')
const path = require('path')

const cart_path = path.resolve(__dirname, './cart.json')

fs.readFile(cart_path, 'utf-8', (err, data) => {
    if(!err) {
        const d = JSON.parse(data)
        let result = d.find(item => item.id == 2);
        // console.log(result)

        const idx = d.indexOf(result)
        console.log(idx)
        if (idx > -1) {
            d.splice(idx, 1);
            fs.writeFile(cart_path, JSON.stringify(d), 'utf-8', (err, data) => {
                console.log('deleted')
            })
          }
    } else {
        console.log(err)
    }
})
