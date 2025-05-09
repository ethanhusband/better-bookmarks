<script lang="ts">
  export let direction: 'right' | 'left' | 'up' | 'down' = 'right';
  export let size: number = 16;
  export let color: string = 'currentColor';
  export let strokeWidth: number = 2;
  
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: 270
  } as const;
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 8 8"
  xmlns="http://www.w3.org/2000/svg"
  style="transform: rotate({rotations[direction]}deg);"
  aria-hidden="true"
  focusable="false"
>
  <path
    d="M2 1 L6 4 L2 7"
    fill="none"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
  />
</svg>