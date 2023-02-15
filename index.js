const fs=require('fs');
const http=require('http');

var productsDB=JSON.parse(fs.readFileSync("products.json",'utf-8'))

const server=http.createServer(function(request,response)
{
    
    let urls=request.url.split('/');
    // console.log(urls);
    if(urls[1]=='home')
    {
        response.write("<b>welcome to our APIs</b>");
    }
    else if((urls[1]=='products') && isFinite(urls[2]))
    {
        // let products = JSON.stringify(productsDB)
        let id = urls[2]
        let product = productsDB[parseInt(id)]
        products = JSON.stringify(product)
        console.log(id);
        response.write(products)
    }
    else if((urls[1]=='products'))
    {
        let products = JSON.stringify(productsDB)
        response.write(products)
    }
    else
    {
        response.writeHead(404);
        response.write('<h1>Error 404</h1>')
    }
    response.end()
    // response.writeHead(203);
    //     response.write("hi from server")
    //     response.end()
})

server.listen(4000,function()
{
    console.log('hi i listen in port 4000');
})