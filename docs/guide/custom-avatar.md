# 🎨 自定义图标指南

Claude Code Easiest 支持多种内置动物图标,用户可以通过简单配置切换。

## 可用图标

| 图标 | 名称 | 预览 | 说明 |
|------|------|------|------|
| 🐱 | `cat` | 小猫图标 (默认) | 带耳朵的可爱猫咪 |
| 🐘 | `elephant` | 大象图标 | 长鼻子大象 |
| 🦍 | `ape` | 猿猴图标 | 宽额头的猿猴 |
| 🐶 | `dog` | 小狗图标 | 垂耳小狗 |
| 🐾 | `clawd` | 原始图标 | 原始 Clawd 图标 |

## 配置方式

### 方式 1: 在 `.env` 文件中配置 (推荐)

在项目根目录的 `.env` 文件中添加:

```env
# 选择图标 (cat, elephant, ape, dog, clawd)
CLAUDE_CODE_AVATAR=cat
```

### 方式 2: 命令行环境变量

**Windows (PowerShell):**
```powershell
$env:CLAUDE_CODE_AVATAR="elephant"
bun --env-file=.env ./src/entrypoints/cli.tsx
```

**macOS / Linux:**
```bash
CLAUDE_CODE_AVATAR=dog bun --env-file=.env ./src/entrypoints/cli.tsx
```

## 自定义图标

如果你想创建自己的图标,编辑 `src/components/LogoV2/Clawd.tsx` 文件:

### 1. 添加新的图标定义

```typescript
// 🎨 我的自定义图标
const MY_CUSTOM_POSES: Record<ClawdPose, Segments> = {
  default: {
    r1L: '你的字符',
    r1E: '眼睛字符',
    r1R: '右侧字符',
    r2L: '左下字符',
    r2R: '右下字符'
  },
  'look-left': { /* 向左看的姿态 */ },
  'look-right': { /* 向右看的姿态 */ },
  'arms-up': { /* 举手的姿态 */ }
};
```

### 2. 注册到 avatarMap

在 `getAvatarPoses()` 函数中添加:

```typescript
const avatarMap: Record<string, Record<ClawdPose, Segments>> = {
  'cat': CAT_POSES,
  'elephant': ELEPHANT_POSES,
  'ape': APE_POSES,
  'dog': DOG_POSES,
  'clawd': CLAWD_POSES,
  'myicon': MY_CUSTOM_POSES,  // 添加你的图标
  'default': CLAWD_POSES
};
```

### 3. 使用自定义图标

```env
CLAUDE_CODE_AVATAR=myicon
```

## 字符说明

图标使用 Unicode 块元素字符构建:

- `█` - 实心块
- `▛▜▙▟` - 四分之一块 (左上、右上、左下、右下)
- `▗▖▝▘` - 八分之一块 (用于细节)
- `▄▀` - 上下半块
- `▐▌` - 左右半块

## 示例:创建一个简单的笑脸图标

```typescript
const SMILEY_POSES: Record<ClawdPose, Segments> = {
  default: {
    r1L: ' ╔',
    r1E: '▄●●▄',
    r1R: '╗ ',
    r2L: '▐',
    r2R: '▌'
  },
  // ... 其他姿态
};
```

## 技术细节

- 图标宽度固定为 9 个字符
- 使用 React 组件渲染
- 支持 Apple Terminal 的特殊渲染模式
- 所有姿态包括: `default`, `look-left`, `look-right`, `arms-up`
