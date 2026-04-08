import * as React from 'react';
import { Box, Text } from '../../ink.js';
import { env } from '../../utils/env.js';

export type ClawdPose = 'default' | 'arms-up' // both arms raised (used during jump)
| 'look-left' // both pupils shifted left
| 'look-right'; // both pupils shifted right

type Props = {
  pose?: ClawdPose;
};

// ============================================================================
// 🎨 图标模板系统 - 支持多种动物图标和用户自定义
// ============================================================================
// 可用图标: 'cat' (小猫), 'elephant' (大象), 'ape' (猿猴), 'dog' (小狗), 'clawd' (原始)
// 设置方式:
//   1. 环境变量: CLAUDE_CODE_AVATAR=elephant
//   2. 在 .env 文件中添加: CLAUDE_CODE_AVATAR=dog
// ============================================================================

// Standard-terminal pose fragments. Each row is split into segments so we can
// vary only the parts that change (eyes, arms) while keeping the body/bg spans
// stable. All poses end up 9 cols wide.
type Segments = {
  /** row 1 left (no bg): optional raised arm + side */
  r1L: string;
  /** row 1 eyes (with bg): left-eye, forehead, right-eye */
  r1E: string;
  /** row 1 right (no bg): side + optional raised arm */
  r1R: string;
  /** row 2 left (no bg): arm + body curve */
  r2L: string;
  /** row 2 right (no bg): body curve + arm */
  r2R: string;
};

// ============================================================================
// 🐱 小猫图标 (默认)
// ============================================================================
export const CAT_POSES: Record<ClawdPose, Segments> = {
  default: {
    r1L: '▗▟',
    r1E: '▛▗▗▗▜',
    r1R: '▙▖',
    r2L: '▝▜',
    r2R: '▛▘'
  },
  'look-left': {
    r1L: '▗▟',
    r1E: '▟▗▗▗▟',
    r1R: '▙▖',
    r2L: '▝▜',
    r2R: '▛▘'
  },
  'look-right': {
    r1L: '▗▟',
    r1E: '▙▗▗▗▙',
    r1R: '▙▖',
    r2L: '▝▜',
    r2R: '▛▘'
  },
  'arms-up': {
    r1L: '▗▟',
    r1E: '▛▗▗▗▜',
    r1R: '▙▖',
    r2L: ' ▜',
    r2R: '▛ '
  }
};

// ============================================================================
// 🐘 大象图标 - 长鼻子特征
// ============================================================================
export const ELEPHANT_POSES: Record<ClawdPose, Segments> = {
  default: {
    r1L: '▝▟',
    r1E: '▛▄▄▄▜',
    r1R: '▙▘',
    r2L: '▝▜▙',
    r2R: '▛▘ '
  },
  'look-left': {
    r1L: '▝▟',
    r1E: '▟▄▄▄▟',
    r1R: '▙▘',
    r2L: '▝▜▙',
    r2R: '▛▘ '
  },
  'look-right': {
    r1L: '▝▟',
    r1E: '▙▄▄▄▙',
    r1R: '▙▘',
    r2L: '▝▜▙',
    r2R: '▛▘ '
  },
  'arms-up': {
    r1L: '▗▟',
    r1E: '▛▄▄▄▜',
    r1R: '▙▖',
    r2L: '▝▜▙',
    r2R: '▛▘ '
  }
};

// ============================================================================
// 🦍 猿猴图标 - 宽额头特征
// ============================================================================
export const APE_POSES: Record<ClawdPose, Segments> = {
  default: {
    r1L: ' ▐',
    r1E: '▛▀▀▀▜',
    r1R: '▌',
    r2L: '▝▜▙',
    r2R: '▛▘▝'
  },
  'look-left': {
    r1L: ' ▐',
    r1E: '▟▀▀▀▟',
    r1R: '▌',
    r2L: '▝▜▙',
    r2R: '▛▘▝'
  },
  'look-right': {
    r1L: ' ▐',
    r1E: '▙▀▀▀▙',
    r1R: '▌',
    r2L: '▝▜▙',
    r2R: '▛▘▝'
  },
  'arms-up': {
    r1L: '▗▟',
    r1E: '▛▀▀▀▜',
    r1R: '▙▖',
    r2L: ' ▜▙',
    r2R: '▛▘▝'
  }
};

// ============================================================================
// 🐶 小狗图标 - 垂耳特征
// ============================================================================
export const DOG_POSES: Record<ClawdPose, Segments> = {
  default: {
    r1L: '▗▌',
    r1E: '▛▄█▄▜',
    r1R: '▐▖',
    r2L: '▝▜',
    r2R: '▛▘'
  },
  'look-left': {
    r1L: '▗▌',
    r1E: '▟▄█▄▟',
    r1R: '▐▖',
    r2L: '▝▜',
    r2R: '▛▘'
  },
  'look-right': {
    r1L: '▗▌',
    r1E: '▙▄█▄▙',
    r1R: '▐▖',
    r2L: '▝▜',
    r2R: '▛▘'
  },
  'arms-up': {
    r1L: '▗▟',
    r1E: '▛▄█▄▜',
    r1R: '▙▖',
    r2L: ' ▜',
    r2R: '▛ '
  }
};

// ============================================================================
// 🐾 原始 Clawd 图标 (保留兼容)
// ============================================================================
export const CLAWD_POSES: Record<ClawdPose, Segments> = {
  default: {
    r1L: ' ▐',
    r1E: '▛███▜',
    r1R: '▌',
    r2L: '▝▜',
    r2R: '▛▘'
  },
  'look-left': {
    r1L: ' ▐',
    r1E: '▟███▟',
    r1R: '▌',
    r2L: '▝▜',
    r2R: '▛▘'
  },
  'look-right': {
    r1L: ' ▐',
    r1E: '▙███▙',
    r1R: '▌',
    r2L: '▝▜',
    r2R: '▛▘'
  },
  'arms-up': {
    r1L: '▗▟',
    r1E: '▛███▜',
    r1R: '▙▖',
    r2L: ' ▜',
    r2R: '▛ '
  }
};

// ============================================================================
// 根据环境变量选择图标类型
// ============================================================================
function getAvatarPoses(): Record<ClawdPose, Segments> {
  const avatarType = (env as any).CLAUDE_CODE_AVATAR || process.env.CLAUDE_CODE_AVATAR || 'cat';
  
  const avatarMap: Record<string, Record<ClawdPose, Segments>> = {
    'cat': CAT_POSES,
    'elephant': ELEPHANT_POSES,
    'ape': APE_POSES,
    'dog': DOG_POSES,
    'clawd': CLAWD_POSES,
    'default': CLAWD_POSES
  };
  
  return avatarMap[avatarType.toLowerCase()] || CAT_POSES;
}

const POSES = getAvatarPoses();

// Apple Terminal uses a bg-fill trick (see below), so only eye poses make
// sense. Arm poses fall back to default.
const APPLE_EYES: Record<ClawdPose, string> = {
  default: ' ▗   ▖ ',
  'look-left': ' ▘   ▘ ',
  'look-right': ' ▝   ▝ ',
  'arms-up': ' ▗   ▖ '
};

export function Clawd({ pose = 'default' }: Props = {}): React.ReactElement {
  if (env.terminal === 'Apple_Terminal') {
    return <AppleTerminalClawd pose={pose} />;
  }
  const p = POSES[pose];
  return (
    <Box flexDirection="column">
      <Text>
        <Text color="clawd_body">{p.r1L}</Text>
        <Text color="clawd_body" backgroundColor="clawd_background">
          {p.r1E}
        </Text>
        <Text color="clawd_body">{p.r1R}</Text>
      </Text>
      <Text>
        <Text color="clawd_body">{p.r2L}</Text>
        <Text color="clawd_body" backgroundColor="clawd_background">
          █████
        </Text>
        <Text color="clawd_body">{p.r2R}</Text>
      </Text>
      <Text color="clawd_body">
        {'  '}▘▘ ▝▝{'  '}
      </Text>
    </Box>
  );
}

function AppleTerminalClawd({ pose }: { pose: ClawdPose }): React.ReactElement {
  // Apple's Terminal renders vertical space between chars by default.
  // It does NOT render vertical space between background colors
  // so we use background color to draw the main shape.
  return (
    <Box flexDirection="column" alignItems="center">
      <Text>
        <Text color="clawd_body">▗</Text>
        <Text color="clawd_background" backgroundColor="clawd_body">
          {APPLE_EYES[pose]}
        </Text>
        <Text color="clawd_body">▖</Text>
      </Text>
      <Text backgroundColor="clawd_body">{' '.repeat(7)}</Text>
      <Text color="clawd_body">▘▘ ▝▝</Text>
    </Box>
  );
}
