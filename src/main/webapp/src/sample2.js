global.jQuery = require('jquery');
global.$ = global.jQuery;
require('./jquery.file-upload');

(function($) {
  'use strict';
  $('#upload').fileUpload({
    enableDragAndDrop: false,
    rowHtml: '<div>' + 
      '<span class="fileName"></span>&nbsp;' +
      '<span class="transferStatus"></span>' +
      '</div>' ,
    rowEl: {
      $fileName: '.fileName',
      $transferStatus: '.transferStatus'
    },
    startUploadCallBack: function() {
      this.$fileName.text(this.fileName);
    },
    progressCallBack: function() {
      var progressStatus = this.loadedSize / this.fileSize;
      if (progressStatus === 1) {
        this.$transferStatus.text('アップロード完了');
      } else {
        this.$transferStatus.text(progressStatus * 100 + '%');
      }
    },
    failUploadCallBack: function(xhr, textStatus, errorThrown) {
      if (this.explicitStop) return;
      if (xhr.status === 409) {
        this.$transferStatus.text('同名のファイルがあります');
      } else {
        this.$transferStatus.text('ファイルサイズの上限を超えています');
      }
    }
  });
})(jQuery);
