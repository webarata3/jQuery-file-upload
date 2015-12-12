global.jQuery = require('jquery');
global.$ = global.jQuery;
require('./jquery.file-upload');

(function($) {
  'use strict';
  $('#upload').fileUpload({
    startUploadCallBack: function() {
      this.$fileName.text(this.fileName);
    },
    progressCallBack: function() {
      var loadedSize = this.loadedSize;
      var fileSize = this.fileSize;

      this.$transferSize.text(this.getDispFileSize(loadedSize) + ' / ' +
        this.getDispFileSize(fileSize));

      var barWidth = this.$progressBar.width() ? this.$progressBar.width() : 1;
      var progressStatus = loadedSize / fileSize;
      if (progressStatus === 1) {
        this.$transferStatus.text('アップロード完了');
        this.$stopButton.hide();
        this.$deleteButton.show();
      } else {
        var borderLeftWidth = Math.floor(progressStatus * barWidth);
        this.$progressBar.css('border-left-width', borderLeftWidth + 'px');
      }
    },
    doneUploadCallBack: function(data) {
      this.fileId = data.fileId;
    },
    failUploadCallBack: function(xhr, textStatus, errorThrown) {
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
    doneDeleteCallBack: function() {
      this.$transferStatus.text('サーバーから削除しました');
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
