async function uploadImage(ev){
  //let formData = new FormData(ev.target.files[0]);
  let base64img  = await getBase64(ev.target.files[0]);
  const response = await fetch('/guest/upload', {
              method: 'POST',
              headers: {
                  'Content-Type': 'image/jpeg'
                },
              body: base64img
            }); 
    const result = await response.json();  
    console.log("result:",result); 
    }
  function getBase64(file) {
 var reader = new FileReader();
 reader.readAsDataURL(file);
 reader.onload = function () {
   return reader.result;
 };
 reader.onerror = function (error) {
   console.log('Error: ', error);
 };
}