import http from 'http';

http.createServer((req,res)=>{
    switch(req.url) {
        case '/':
            res.end('<h1>Home Page</h1>');
            break;
        default:
            res.end('<h1>Page Not Found!</h1>');
            break;
    }
}).listen(8000,()=>{
    console.log('Server Started on 8000');
});