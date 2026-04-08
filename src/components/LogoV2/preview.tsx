/**
 * 图标预览脚本 - 显示所有可用的图标
 * 运行方式: bun run src/components/LogoV2/preview.tsx
 */

import { CAT_POSES, ELEPHANT_POSES, APE_POSES, DOG_POSES, CLAWD_POSES } from './Clawd.tsx';

const avatars = [
  { name: '🐱 小猫 (cat)', poses: CAT_POSES },
  { name: '🐘 大象 (elephant)', poses: ELEPHANT_POSES },
  { name: '🦍 猿猴 (ape)', poses: APE_POSES },
  { name: '🐶 小狗 (dog)', poses: DOG_POSES },
  { name: '🐾 原始 (clawd)', poses: CLAWD_POSES }
];

console.log('\n=== Claude Code Easiest - 图标预览 ===\n');

for (const avatar of avatars) {
  console.log(`${avatar.name}:`);
  console.log('  default:    ' + avatar.poses.default.r1L + avatar.poses.default.r1E + avatar.poses.default.r1R);
  console.log('              ' + avatar.poses.default.r2L + '█████' + avatar.poses.default.r2R);
  console.log('                ▘▘ ▝▝');
  console.log('  look-left:  ' + avatar.poses['look-left'].r1L + avatar.poses['look-left'].r1E + avatar.poses['look-left'].r1R);
  console.log('  look-right: ' + avatar.poses['look-right'].r1L + avatar.poses['look-right'].r1E + avatar.poses['look-right'].r1R);
  console.log('  arms-up:    ' + avatar.poses['arms-up'].r1L + avatar.poses['arms-up'].r1E + avatar.poses['arms-up'].r1R);
  console.log();
}

console.log('配置方式:');
console.log('  1. 在 .env 文件中设置: CLAUDE_CODE_AVATAR=cat');
console.log('  2. 或使用环境变量: CLAUDE_CODE_AVATAR=elephant');
console.log('  3. 可选值: cat, elephant, ape, dog, clawd');
console.log();
