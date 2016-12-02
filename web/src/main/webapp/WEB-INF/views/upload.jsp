<%-- 
    Document   : upload
    Created on : 1 Dec, 2016, 2:16:19 AM
    Author     : anshul
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
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
    </body>
</html>
