<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import type { BlogArticle } from '../useBlogData'
import { tagClassMap } from '../useBlogData'

// Props
interface Props {
  article: BlogArticle
}

const props = defineProps<Props>()

// Emits
const emit = defineEmits<{
  (e: 'click', articleId: number): void
}>()

// Composables
const { t } = useI18n()

// Handle card click
const handleClick = (): void => {
  emit('click', props.article.id)
}
</script>

<template>
  <article class="blog-card" @click="handleClick">
    <div class="card-cover" :class="article.cover">
      <span class="card-tag" :class="tagClassMap[article.category]">
        {{ t('blog.categories.' + article.category) }}
      </span>
    </div>
    <div class="card-body">
      <div class="card-date">{{ article.date }}</div>
      <h3 class="card-title">{{ article.title }}</h3>
      <p class="card-excerpt">{{ article.excerpt }}</p>
      <div class="card-footer">
        <span class="card-readmore">
          {{ t('blog.readMore') }}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </span>
      </div>
    </div>
  </article>
</template>

<style lang="less" scoped>
.blog-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  transition: all 0.25s ease-in-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    border-color: rgba(255, 255, 255, 0.15);
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.4);
  }
}

.card-cover {
  width: 100%;
  aspect-ratio: 16 / 9;
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.15), rgba(0, 255, 183, 0.08));
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  position: relative;

  &.tech {
    background: linear-gradient(135deg, #0066ff22, #00b4ff11);
  }

  &.case {
    background: linear-gradient(135deg, #00ffb715, #0066ff10);
  }

  &.deep {
    background: linear-gradient(135deg, #6c3bff18, #0066ff12);
  }

  &.oss {
    background: linear-gradient(135deg, #ff660015, #ffcc0010);
  }
}

.card-tag {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 3px 10px;
  border-radius: 20px;
  font-size: 11px;
  font-weight: 600;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);

  &.tag-tech {
    background: rgba(0, 102, 255, 0.25);
    color: #6ab0ff;
  }

  &.tag-case {
    background: rgba(0, 255, 183, 0.18);
    color: #5dffc5;
  }

  &.tag-deep {
    background: rgba(108, 59, 255, 0.22);
    color: #b49aff;
  }

  &.tag-oss {
    background: rgba(255, 170, 0, 0.2);
    color: #ffd076;
  }
}

.card-body {
  padding: 20px;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.card-date {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-bottom: 8px;
}

.card-title {
  font-size: 17px;
  font-weight: 600;
  color: #ffffff;
  line-height: 1.4;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card-excerpt {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.card-footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.card-readmore {
  font-size: 12px;
  color: #197dff;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: color 0.15s ease;

  svg {
    width: 14px;
    height: 14px;
  }
}

.blog-card:hover .card-readmore {
  color: #4d9fff;
}

@media (max-width: 480px) {
  .card-body {
    padding: 16px;
  }

  .card-title {
    font-size: 15px;
  }

  .card-excerpt {
    font-size: 13px;
    -webkit-line-clamp: 2;
  }
}
</style>
