# 🎨 Custom Avatar Guide

Claude Code Easiest supports multiple built-in animal avatars that users can easily switch between.

## Available Avatars

| Avatar | Name | Description |
|--------|------|-------------|
| 🐱 | `cat` | Cute cat with ears (default) |
| 🐘 | `elephant` | Elephant with trunk |
| 🦍 | `ape` | Ape with wide forehead |
| 🐶 | `dog` | Dog with floppy ears |
| 🐾 | `clawd` | Original Clawd icon |

## Configuration

### Method 1: Configure in `.env` file (Recommended)

Add to your `.env` file in the project root:

```env
# Select avatar (cat, elephant, ape, dog, clawd)
CLAUDE_CODE_AVATAR=cat
```

### Method 2: Command-line environment variable

**Windows (PowerShell):**
```powershell
$env:CLAUDE_CODE_AVATAR="elephant"
bun --env-file=.env ./src/entrypoints/cli.tsx
```

**macOS / Linux:**
```bash
CLAUDE_CODE_AVATAR=dog bun --env-file=.env ./src/entrypoints/cli.tsx
```

## Creating Custom Avatars

To create your own custom avatar, edit `src/components/LogoV2/Clawd.tsx`:

### 1. Define your avatar poses

```typescript
// 🎨 My custom avatar
const MY_CUSTOM_POSES: Record<ClawdPose, Segments> = {
  default: {
    r1L: 'your chars',
    r1E: 'eye chars',
    r1R: 'right chars',
    r2L: 'bottom-left chars',
    r2R: 'bottom-right chars'
  },
  'look-left': { /* looking left pose */ },
  'look-right': { /* looking right pose */ },
  'arms-up': { /* arms raised pose */ }
};
```

### 2. Register in avatarMap

Add to the `getAvatarPoses()` function:

```typescript
const avatarMap: Record<string, Record<ClawdPose, Segments>> = {
  'cat': CAT_POSES,
  'elephant': ELEPHANT_POSES,
  'ape': APE_POSES,
  'dog': DOG_POSES,
  'clawd': CLAWD_POSES,
  'myicon': MY_CUSTOM_POSES,  // add your avatar
  'default': CLAWD_POSES
};
```

### 3. Use your custom avatar

```env
CLAUDE_CODE_AVATAR=myicon
```

## Character Reference

Avatars use Unicode block element characters:

- `█` - Full block
- `▛▜▙▟` - Quadrants (top-left, top-right, bottom-left, bottom-right)
- `▗▖▝▘` - Octants (for details)
- `▄▀` - Lower/upper half blocks
- `▐▌` - Left/right half blocks

## Example: Creating a simple smiley face

```typescript
const SMILEY_POSES: Record<ClawdPose, Segments> = {
  default: {
    r1L: ' ╔',
    r1E: '▄●●▄',
    r1R: '╗ ',
    r2L: '▐',
    r2R: '▌'
  },
  // ... other poses
};
```

## Technical Details

- Avatar width is fixed at 9 characters
- Rendered using React components
- Supports special rendering mode for Apple Terminal
- All poses include: `default`, `look-left`, `look-right`, `arms-up`
