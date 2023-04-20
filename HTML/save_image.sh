#!/bin/bash
echo "Content-Type: text/plain"
echo ""

# 设置图片保存路径
upload_dir="../images/"

# 检查上传目录是否存在
if [ ! -d "$upload_dir" ]; then
    mkdir -p "$upload_dir"
fi

# 从POST数据中提取文件信息
boundary="$(grep -i content-type <&0 | sed 's/.*boundary=//')"
filename="$(grep -a "filename=" <&0 | awk -F '"' '{print $2}')"

# 保存图片
{
    cat <&0
    echo -ne "--$boundary--"
} | sed -e '1,/^$/d' > "${upload_dir}${filename}"

echo "图片上传成功"
