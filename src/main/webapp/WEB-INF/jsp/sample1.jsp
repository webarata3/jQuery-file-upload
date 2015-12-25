<%@page language="java"  pageEncoding="utf-8" %>
<%@page contentType="text/html; charset=utf-8" %>
<!DOCTYPE html>
<html lang="ja">
 <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>ファイルアップロード</title>
  <link rel="stylesheet" href="css/sample1.css">
 </head>
 <body>
  <div id="upload">
   <div class="dropArea">
    <input type="button" id="uploadButton" value="ファイルを選択">
    <input type="file" id="file" multiple="multiple">
    <div class="uploadInfo"></div>
   </div>
  </div>
  <script src="js/jquery.file-upload.sample1.min.js"></script>
 </body>
</html>
