# 微信小程序自动部署配置指南

## 前置条件

1. **获取小程序 AppID**
   - 登录 [微信公众平台](https://mp.weixin.qq.com/)
   - 开发 → 开发管理 → 开发设置
   - 复制 AppID

2. **生成上传密钥**
   - 开发 → 开发管理 → 开发设置
   - 小程序代码上传 → 生成上传密钥
   - 下载密钥文件 `private.*.key`

## GitHub 配置

在 GitHub 仓库设置中添加 Secrets：

1. 进入仓库 → Settings → Secrets and variables → Actions
2. 添加以下 secrets：

   - `WECHAT_APPID`: 你的小程序 AppID
   - `WECHAT_PRIVATE_KEY`: 上传密钥文件的完整内容（打开 `.key` 文件，复制全部内容）

## 触发部署

- **自动触发**: 推送代码到 `main` 分支
- **手动触发**: GitHub → Actions → 部署到微信小程序 → Run workflow

## 部署后

1. 登录微信公众平台
2. 版本管理 → 开发版本
3. 选择刚上传的版本
4. 提交审核 → 发布

## 故障排查

### 错误: appid 不正确
- 检查 `WECHAT_APPID` 是否正确

### 错误: 私钥不正确
- 确保 `WECHAT_PRIVATE_KEY` 包含完整的密钥内容
- 密钥格式应该是 `-----BEGIN PRIVATE KEY-----` 开头

### 错误: 项目配置文件不存在
- 确保 `app.json` 存在且格式正确

### 上传成功但看不到版本
- 检查微信公众平台的"成员管理"，确保 CI 机器人有权限
- 开发管理 → 开发设置 → 小程序代码上传 → 配置 IP 白名单（如需要）

## 注意事项

- 每次推送都会触发部署，建议使用分支保护
- 版本号使用 Git commit SHA 前 7 位
- 上传后需要手动提交审核和发布
