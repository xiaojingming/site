<template>
  <div class="github-icon cursor-pointer" @click="openGithub">
    <div class="github-svg">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M12 0C5.374 0 0 5.373 0 12C0 17.302 3.438 21.8 8.207 23.387C8.806 23.498 9 23.126 9 22.81V20.576C5.662 21.302 4.967 19.16 4.967 19.16C4.421 17.773 3.634 17.404 3.634 17.404C2.545 16.659 3.717 16.675 3.717 16.675C4.922 16.763 5.556 17.91 5.556 17.91C6.626 19.746 8.363 19.216 9.048 18.909C9.155 18.134 9.466 17.604 9.81 17.305C7.145 17 4.343 15.971 4.343 11.374C4.343 10.063 4.812 8.993 5.579 8.146C5.455 7.843 5.044 6.629 5.696 4.977C5.696 4.977 6.704 4.655 8.997 6.207C9.954 5.941 10.98 5.808 12 5.803C13.02 5.808 14.047 5.941 15.006 6.207C17.297 4.655 18.303 4.977 18.303 4.977C18.956 6.629 18.545 7.843 18.421 8.146C19.191 8.993 19.656 10.063 19.656 11.374C19.656 15.983 16.849 16.998 14.177 17.295C14.606 17.667 15 18.397 15 19.517V22.81C15 23.129 15.192 23.505 15.801 23.386C20.566 21.797 24 17.3 24 12C24 5.373 18.627 0 12 0Z"
          fill="currentColor"
        />
      </svg>
    </div>
    <span v-if="githubStars > 0" class="star-count">{{ formattedStarCount }}</span>
  </div>
</template>

<script setup lang="ts">
import { useGithubStars } from '@/composables/useGithubStars'

const { githubStars, formattedStarCount } = useGithubStars()

const openGithub = () => {
  window.open('https://github.com/zgsm-ai/costrict')
}
</script>

<style lang="less" scoped>
.github-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--space-1);
  opacity: 0.7;
  color: var(--color-text-primary);
  margin-right: var(--space-3);
  transition: color var(--transition-fast);

  &:hover {
    color: var(--color-text-primary);
    opacity: 1;
  }

  .github-svg {
    width: 24px;
    height: 24px;

    svg {
      width: 100%;
      height: 100%;
    }
  }

  .star-count {
    margin-left: var(--space-2);
    font-size: var(--font-sm);
    color: var(--color-text-primary);
    opacity: 0.8;
    white-space: nowrap;
  }
}

.github-icon.mobile-layout {
  margin-right: 0;
  justify-content: flex-start;
}
</style>
