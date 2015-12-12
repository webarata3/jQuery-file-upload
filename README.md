# jQuery.file-upload
jQueryによるファイルのアップロードを補助するプラグインです。

次のような機能を簡単に実装することができます。

- 複数ファイルのアップロード
- アップロードの進捗状況の表示
- ドラッグアンドドロップによるアップロード
- アップロード途中での停止
- アップロードしたファイルの削除

イメージとしては、次のようなものになります。

![動作イメージ](https://webarata.github.io/jQuery-file-upload/image/fileupload.gif)

## 使い方

基本的な使い方としては、jQueryに続いてjquery.file-uploadプラグインを読み込みます。

```HTML
<script src="jquery.js"></script>
<script src="jquery.file-upload.min.js"></script>
```

プラグインで指定する要素は通常のdiv等の要素になります。要素内に、input[type=file]の要素を持つ要素を指定します。例えば次のように指定します。

```HTML
<div id="upload">
 <div class="dropArea">
  <input type="button" id="uploadButton" value="ファイルを選択">
  <input type="file" id="file" multiple="multiple">
  <div class="uploadInfo"></div>
 </div>
</div>
```

というHTMLに対して、

```JavaScript
$('#upload').fileUpload({ オプション });
```

とします。

基本的に設定項目が多いため、同梱しているsample1とsample2を参考にして設定するのがいいと思います。

## 設定

### url

アップロードするファイルを送信するURL。このURLに1ファイルに対して、1回POSTメソッドのリクエストが発行されます。デフォルトは`upload`です。

### deleteUrl

deleteButtonを押された時に実行されるURLです。このURLに対してDELETEメソッドのリクエストが発行されます。デフォルトは`upload`です。

### uploadButton

アップロードするファイルを選択するボタンのセレクタです。このボタンが押された時に、次のfileButtonが押されます。デフォルトは`#uploadButton`です。

### fileButton

input[type=file]を示すセレクタです。`uploadButton`が押された時に、押されます。この要素は非表示になります。デフォルトは`#file`です。

### uploadInfo

ファイルのアップロードの状況を表示する領域のセレクタです。デフォルトは`.uploadInfo`です。

### uploadInfoRowClass

uploadInfoの中にアップロードするファイル1つにつき1つ作られるdiv要素のclass属性の値です。デフォルトは`uploadInfoRow`です。

### stopButton

アップロードの途中で停止するためのボタンのセレクタです。このボタンはファイル1つにつき1つ作成されます。また、ファイルの送信中のみ表示されます。デフォルトは、`.stopButton`です。

### deleteButton

アップロードしたファイルを削除するボタンのセレクタです。このボタンはファイル1つにつき1つ作成されます。また、ファイルのアップロード完了後のみ表示されます。デフォルトは`.deleteButton`です。

### enableDragAndDrop

trueの場合ドラッグアンドドロップのファイルアップロード機能を有効にします。デフォルトは`true`です。

### dropArea

ファイルをドロップできる場所のセレクタです。デフォルトは`.dropArea`です。

### startUploadCallBack

ファイルがアップロードされる直前に呼び出される関数です。デフォルトは何もしません。

### progressCallBack

ファイル送信中に定期的に呼び出されるprogressイベントの際に呼び出される関数です。ファイルのアップロードの進捗状居の表示等に使用できます。デフォルトは何もしません。

### abortCallBack

ファイルの送信中にエラーがあった場合に呼び出される関数です。デフォルトは何もしません。

### doneUploadCallBack

ファイルの送信が完了した時に呼び出される関数です。削除ボタンの表示等に使用できます。デフォルトは何もしません。

### failUploadCallBack

ファイルの送信が失敗した時に呼び出される関数です。デフォルトは何もしません。

### stopCallBack

ファイルの送信中に`stopButton`が押されたときに呼び出される関数です。デフォルトは何もしません。

### doneDeleteCallBack

ファイルの削除が完了した時に呼び出される関数です。デフォルトは何もしません。

### failDeleteCallBack

ファイルの削除が失敗した時に呼び出される関数です。デフォルトは何もしません。

### dragEnterCallBack

`dropArea`に対して、dragenterイベントが起きた場合に呼び出される関数です。デフォルトは何もしません。

### dragLeave

`dropArea`に対して、dragLeaveイベントが起きた場合に呼び出される関数です。デフォルトは何もしません。

### dragOver

`dropArea`に対して、dragOverイベントが起きた場合に呼び出される関数です。デフォルトは何もしません。

### rowHtml

アップロードするファイル１つに対し、uploadInfoの中に作られるHTMLです。デフォルトは次のとおりです。

```JavaScript
'<div class="fileName"></div>' +
'<div class="transferSize"></div>' +
'<div class="transferStatus"><div class="progressBar"></div></div>' +
'<div class="operation">' +
'<input type="button" class="stopButton" value="停止">' +
'<input type="button" class="deleteButton hide" value="削除">' +
'</div>',
```

### rowEL

rowHtmlで定義したHTMLを操作するために指定するために変数名に対するセレクタをマッピングするオブジェクトです。デフォルトは次のとおりです。

```JavaScript
{
  $fileName: '.fileName',
  $transferSize: '.transferSize',
  $transferStatus: '.transferStatus',
  $progressBar: '.progressBar'
}
```

## ライセンス

Apache 2.0 License