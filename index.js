const polka = require('polka');
const { json } = require('body-parser');
const fs = require('fs');
const { exec } = require('child_process');
const app =  polka();
var c = 0;
const PORT = process.env.PORT || 3445;
path = require('path');

app.use(json());
app.get("/", (req,res)=> {
    console.log("recieved")
    
    res.end();
});
app.post("/", async (req,res)=>{

  
    let text = req.body.text;
    console.log("recieved: "+text)


    exec("echo '"+ + "' | ./../piper/piper --model ./../piper/de_DE-thorsten-high.onnx --output_file tts.wav", () =>{

        console.log("pipered");
        var filePath = path.join(__dirname, 'tts.wav');
        var stat = fileSystem.statSync(filePath);

        res.writeHead(200, { 'Content-Type': 'audio/wave',
            'Content-Length': stat.size });
        let readStream = fs.createReadStream("tts.wav")
        readStream.pipe(response);
        
    });
    

});

app.listen(PORT,function () {
    console.log('started listening on port ' + PORT);
});