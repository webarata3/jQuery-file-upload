(function(global, $) {
  'use strict';

  var _settings = {};

  var _defaults = {
    url: 'upload',
    uploadButton: '#uploadButton',
    fileButton: '#file',
    uploadInfo: '.uploadInfo',
    uploadInfoRowClass: 'uploadInfoRow',
    progressCallBack: function() {},
    abortCallBack: function() {},
    doneCallBack: function() {},
    failCallBack: function() {},
    stopCallBack: function() {
      if (this.ajax) {
        this.ajax.abort();
      }
    },
    // 行内の要素
    rowHtml:
      '<div class="fileName"></div>' +
      '<div class="transferSize"></div>' +
      '<div class="transferStatus"><div class="progressBar"></div></div>' +
      '<div class="operation">' +
      '<input type="button" class="stopButton" value="停止">' +
      '<input type="button" class="deleteButton hide" value="削除">' +
      '</div>',
    rowEl: {
      $fileName: '.fileName',
      $transferSize: '.transferSize',
      $transferStatus: '.transferStatus',
      $progressBar: '.progressBar',
      $stopButton: '.stopButton',
      $deleteButton: '.deleteButton'
    }
  };

  // ajaxので不変な設定
  var _defaultAjaxSettings = {
    type: 'post',
    processData: false,
    contentType: false, // 送信するデータをFormDataにする場合、こうしないといけない。
    cache: false,
    dataType: 'json'
  };

  var _$fileButton;

  var FileUpload = function(uploadFile, $upload) {
    // コンストラクタ
    this.$upload = $upload;
    this.$uploadInfo = this.$upload.find(_settings.uploadInfo);
    this.$uploadInfoRow = $('<div>').addClass(_settings.uploadInfoRowClass);
    this.$uploadInfo.append(this.$uploadInfoRow);
    this.fileName = uploadFile.name;
    this.fileSize = uploadFile.size;
    this.loadedSize = 0;

    // 行内の要素
    this.$uploadInfoRow.html(_settings.rowHtml);
    for (var prop in _settings.rowEl) {
      if (_settings.rowEl.hasOwnProperty(prop)) {
        this[prop] = this.$uploadInfoRow.find(_settings.rowEl[prop]);
      }
    }

    this.formData = new FormData();
    this.formData.append("file", uploadFile);

    // イベント処理
    var self = this;
    this.$stopButton.on('click', function() {
      _settings.stopCallBack.call(self);
    });
  };

  FileUpload.prototype.start = function() {
    var self = this;
    var _ajaxSettings = $.extend({
      xhr: function() {
        var xhr = new global.XMLHttpRequest();
        // アップロードの進捗
        xhr.upload.addEventListener('progress', function(event) {
          self.progress.call(self, event);
        }, false);
        // 中止の場合
        xhr.addEventListener('abort', function(event) {
          self.abort.call(self, event);
        }, false);

        return xhr;
      },
      url: _settings.url,
      data: self.formData
    }, _defaultAjaxSettings);

    self.ajax = $.ajax(_ajaxSettings).done(function(data) {
      _settings.doneCallBack.call(self, data);
      self.ajax = null;
    }).fail(function(xhr, textStatus, errorThrown) {
      _settings.failCallBack.call(self, xhr, textStatus, errorThrown);
      self.ajax = null;
    });
  };

  /**
   * アップロード処理中のコールバック。<br>
   * アップロードしたサイズを記録する。
   * @param event イベント
   */
  FileUpload.prototype.progress = function(event) {
    if (event.lengthComputable) {
      this.loadedSize = event.loaded;
      if (this.loadedSize > this.fileSize) this.loadedSize = this.fileSize;
    }
    _settings.progressCallBack.call(this, event);
  };

  /**
   * アップロードが中断された時のコールバック
   * @param event イベント
   */
  FileUpload.prototype.abort = function(event) {
    _settings.abortCallBack.call(this, event);
  };

  /**
   * アップロードを明示して停止する際のメソッド
   */
  FileUpload.prototype.stop = function() {
    _settings.stopCallBack();
  };

  /**
   * 表示用のファイルサイズ
   * @param plainSize 実際のファイルサイズ（バイト）
   * @returns {string} 表示用のファイルサイズ
   */
  FileUpload.prototype.getDispFileSize = function(plainSize) {
    var SIZE_UNIT = ['B', 'KB', 'MB', 'GB', 'TB'];

    var size = parseInt(plainSize, 10);

    for (var i = 0; i < SIZE_UNIT.length; i++) {
      if (size < 1000) break;
      size = size / 1024;
    }

    if (size === Math.floor(size)) {
      size = Math.floor(size);
    } else {
      size = size.toPrecision(3);
    }

    return size + SIZE_UNIT[i];
  };

  $.fn.fileUpload = function(options) {
    _settings = $.extend(_defaults, options);
    var $this = this;

    _$fileButton = $(_settings.fileButton);
    $(_settings.uploadButton).on('click', function() {
      _$fileButton.trigger('click');
    });

    // ファイルが選択されたらアップロードする。
    _$fileButton.on('change', function() {
      // ファイルの情報を取得
      var uploadFiles = _$fileButton[0].files;
      for (var i = 0; i < uploadFiles.length; i++) {
        var fileUpload = new FileUpload(uploadFiles[i], $this);
        fileUpload.start();
      }
    });
  };
})(window, jQuery);
