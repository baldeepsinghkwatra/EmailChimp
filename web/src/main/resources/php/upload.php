<?php
$file = $_FILES['files']; //getting a file object
 
$file['name']; //name of the uploaded file 
$file['tmp_name']; //name of the file in the temporary storage
$destination = realpath('/home/anshul/temp'); //define folder
$filename = $destination."/".preg_replace("|[\\\/]|", "", $file["name"]); //set destination
if(move_uploaded_file($file["name"], $filename)) //move files
{
echo '{ "status": "server" }';
} else {
    echo '{ "status": "error" }';
}
?>