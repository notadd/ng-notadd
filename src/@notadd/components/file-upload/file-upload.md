# file-upload

# Usage
```
<file-upload></file-upload>
```

### @input 属性
##### accept：允许选择的文件类型 `默认值：'image/*'`
> accept 属性接受一个逗号分隔的 MIME 类型字符串, 如:  
accept="image/png" or accept=".png" — 只接受 png 图片.  
accept="image/png, image/jpeg" or accept=".png, .jpg, .jpeg" — PNG/JPEG 文件.  
accept="image/*" — 接受任何图片文件类型.   
accept=".doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document" — 接受任何 MS Doc 文件类型.   
'\*'为不限制

##### maxFileSize: 允许上传文件大小的最大值，单位MB `默认值：5`
##### maxFiles：允许一次选择文件数量的最大值 `默认值：5`
##### fileCount：允许上传文件的总数量 `默认值：5`
##### fileExtensions：允许上传文件的后缀名 `默认值：'JPG, GIF, PNG'`
> fileExtensions 属性接受一个逗号分隔的字符串，不区分大小写，如：  
'JPG, GIF, PNG'; '*'为不限制
##### fileUrls：文件路径字符串数组，用来指定初始文件
### @output属性
uploadChange：返回当前文件路径的字符串数组
