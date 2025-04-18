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
    text = text.replace(/(\r\n|\n|\r)/gm, " ");
    console.log("recieved: "+text)


    exec("echo '"+ text + "' | ./../piper/piper/piper --model ./../piper/de_DE-thorsten-low.onnx --output_file tts.wav", () =>{

        console.log("pipered");
        var filePath = path.join(__dirname, 'tts.wav');
        var stat = fs.statSync(filePath);

        res.writeHead(200, { 'Content-Type': 'audio/wave',
            'Content-Length': stat.size });
        let readStream = fs.createReadStream("tts.wav")
        readStream.pipe(res);
        
    });


});

app.listen(PORT,function () {
    console.log('started listening on port ' + PORT);
});