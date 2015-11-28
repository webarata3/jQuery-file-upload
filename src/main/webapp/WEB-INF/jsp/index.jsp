<%@page language="java"  pageEncoding="utf-8" %><%--
--%><%@page contentType="text/html; charset=utf-8" %><%--
--%><!DOCTYPE html>
<html lang="ja">
 <head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width,initial-scale=1.0">
  <title>ファイルアップロード</title>
  <link rel="stylesheet" href="css/main.css">
 </head>
 <body>
  <div id="upload">
   <div class="dropArea">
    <input type="button" id="uploadButton" value="ファイルを選択">
    <input type="file" id="file" multiple="multiple">
    <div class="uploadInfo"></div>
   </div>
  </div>
  <script src="js/lib/jquery-2.1.4.min.js"></script>
  <script src="js/jquery.file-upload.js"></script>
  <script>
(function($) {
  $('#upload').fileUpload({
    progressCallBack: function() {
      var loadedSize = this.loadedSize;
      var fileSize = this.fileSize;

      this.$fileName.text(this.fileName);
      this.$transferSize.text(this.getDispFileSize(loadedSize) + ' / ' +
                              this.getDispFileSize(fileSize));

      var barWidth = this.$progressBar.width() ? this.$progressBar.width() : 1;
      var progressStatus = loadedSize / fileSize;
      if (progressStatus === 1) {
        this.$transferStatus.text('アップロード完了');
        this.$stopButton.hide();
        this.$deleteButton.show();
      } else {
        var borderLeftWidth = Math.floor(progressStatus * barWidth);
        this.$progressBar.css('border-left-width', borderLeftWidth + 'px');
      }
    },
    doneCallBack: function(data) {
      this.fileId = data.fileId;
    },
    failCallBack: function(xhr, textStatus, errorThrown) {
      if (this.explicitStop) return;
      if (xhr.status === 409) {
        this.$transferStatus.text('同名のファイルがあります');
      } else {
        this.$transferStatus.text('ファイルサイズの上限を超えています');
      }
      if (this.$stopButton) this.$stopButton.hide();
      if (this.$deleteButton) this.$deleteButton.hide();
    },
    stopCallBack: function() {
      this.explicitStop = true;
      if (this.ajax) {
        this.ajax.abort();
      }
      this.$transferStatus.text('アップロードを停止しました');
      if (this.$stoppButton) this.$stopButton.hide();
    },
    dragEnterCallBack: function($dropArea) {
      $dropArea.removeClass('dragLeave');
      $dropArea.addClass('dragEnter');
    },
    dragLeaveCallBack: function($dropArea) {
      $dropArea.removeClass('dragEnter');
      $dropArea.addClass('dragLeave');
    },
    dragOverCallBack: function($dropArea) {
      $dropArea.removeClass('dragLeave');
      $dropArea.addClass('dragEnter');
    }
  });
})(jQuery);
  </script>
 </body>
</html>
