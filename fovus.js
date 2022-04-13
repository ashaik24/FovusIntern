async function onSubmit(){
    console.log('in class');
    
        var filePath = fileData.value;
        var filename = "";
        if (filePath) {
            var startIndex = (filePath.indexOf('\\') >= 0 ? filePath.lastIndexOf('\\') : filePath.lastIndexOf('/'));
            filename = filePath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
        }
        var data = await toBase64(fileData.files[0]);
        var form = document.querySelector("#inputForm");
          data = {
            inputText : form.querySelector('input[name="inputText"]').value,
            fileData : data,
            fileName: filename
          }
  
          let response = await fetch('https://59395et375.execute-api.us-east-2.amazonaws.com/Prod/fovus-file-upload', {                  
                  method: 'POST', 
                  headers: {                      
                      'Content-Type': 'application/json'                    
                  },
                  body: JSON.stringify(data),
          }).then(response=>response.json()).then(data=>{
              if(data)
              {                
                alert(data.statusText);
              }
          });
}

async function fileToByteArray(file) {
    return await new Promise((resolve, reject) => {
        try {
            let reader = new FileReader();
            let fileByteArray = [];
            reader.readAsArrayBuffer(file);
            reader.onloadend = (evt) => {
                if (evt.target.readyState == FileReader.DONE) {
                    let arrayBuffer = evt.target.result,
                        array = new Uint8Array(arrayBuffer);
                    for (byte of array) {
                        fileByteArray.push(byte);
                    }
                }
                resolve(fileByteArray);
            }
        }
        catch (e) {
            reject(e);
        } 
    })
}

const toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
});
