<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useBlogData } from './useBlogData'
import { tagClassMap, tagNameMap } from './useBlogData'

defineOptions({ name: 'BlogDetailPage' })

const router = useRouter()
const route = useRoute()
const { getArticleById, getRelatedArticles, formatDate } = useBlogData()

const articleId = computed(() => Number(route.params.id))
const article = computed(() => getArticleById(articleId.value))
const relatedArticles = computed(() => getRelatedArticles(articleId.value, 3))

const goBack = (): void => {
  router.push({ name: 'blog' })
}

const goToArticle = (id: number): void => {
  router.push({ name: 'blogDetail', params: { id } })
}

const renderMarkdown = (md: string): string => {
  let html = md
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_: string, lang: string, code: string) => {
    const escaped = code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    return `<pre class="code-block"><code class="lang-${lang}">${escaped}</code></pre>`
  })
  html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>')
  html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>')
  html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>')
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>')
  html = html.replace(/`([^`]+)`/g, '<code class="inline-code">$1</code>')
  html = html.replace(
    /!\[([^\]]*)\]\(([^)]+)\)/g,
    '<img src="$2" alt="$1" class="article-image" />',
  )
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener">$1</a>',
  )
  html = html.replace(/^\|(.+)\|$/gm, (match: string) => {
    const cells = match
      .slice(1, -1)
      .split('|')
      .map((c: string) => c.trim())
    return '<tr>' + cells.map((c: string) => `<td>${c}</td>`).join('') + '</tr>'
  })
  html = html.replace(/(<tr>.*<\/tr>\n?)+/gs, (tableContent: string) => {
    const rows = tableContent.trim().split('\n')
    const headerRow = rows[0]
    const bodyRows = rows.slice(2)
    const header = headerRow.replace(/<td>/g, '<th>').replace(/<\/td>/g, '</th>')
    return `<table><thead>${header}</thead><tbody>${bodyRows.join('')}</tbody></table>`
  })
  html = html.replace(/^(- .+\n?)+/gm, (listBlock: string) => {
    const items = listBlock
      .trim()
      .split('\n')
      .map((line: string) => `<li>${line.replace(/^- /, '')}</li>`)
      .join('')
    return `<ul>${items}</ul>`
  })
  html = html.replace(/^\d+\. .+(\n\d+\. .+)*/gm, (listBlock: string) => {
    const items = listBlock
      .trim()
      .split('\n')
      .map((line: string) => `<li>${line.replace(/^\d+\. /, '')}</li>`)
      .join('')
    return `<ol>${items}</ol>`
  })
  html = html
    .split('\n\n')
    .map((block: string) => {
      if (
        block.startsWith('<h') ||
        block.startsWith('<ul') ||
        block.startsWith('<ol') ||
        block.startsWith('<pre') ||
        block.startsWith('<table') ||
        block.startsWith('<tr')
      ) {
        return block
      }
      const trimmed = block.trim()
      if (!trimmed) return ''
      return `<p>${trimmed}</p>`
    })
    .join('\n')
  return html
}

const articleContent = computed(() => {
  if (!article.value) return ''
  const md = article.value.content || article.value.excerpt
  return renderMarkdown(md)
})
</script>

<template>
  <div class="detail-page">
    <div v-if="!article" class="not-found">
      <p>文章不存在</p>
      <button class="back-btn" @click="goBack">返回博客列表</button>
    </div>

    <template v-else>
      <!-- Cover Banner -->
      <div class="cover-banner" :class="article.cover">
        <div class="cover-inner">
          <button class="back-link" @click="goBack">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            返回博客
          </button>
          <div class="cover-meta">
            <span class="cover-tag" :class="tagClassMap[article.category]">
              {{ tagNameMap[article.category] }}
            </span>
          </div>
          <h1 class="cover-title">{{ article.title }}</h1>
          <div class="cover-info">
            <span class="author-avatar">{{ article.authorInitial }}</span>
            <span class="author-name">{{ article.author }}</span>
            <span class="divider">·</span>
            <span class="article-date">{{ formatDate(article.date) }}</span>
            <span v-if="article.readTime" class="divider">·</span>
            <span v-if="article.readTime" class="read-time"
              >约 {{ article.readTime }} 分钟阅读</span
            >
          </div>
        </div>
      </div>

      <!-- Article Body -->
      <div class="article-layout">
        <article class="article-body">
          <p class="article-lead">{{ article.excerpt }}</p>
          <div class="article-content" v-html="articleContent" />
        </article>

        <!-- Sidebar: Related Articles -->
        <aside v-if="relatedArticles.length > 0" class="related-sidebar">
          <div class="related-title">相关文章</div>
          <div class="related-list">
            <div
              v-for="related in relatedArticles"
              :key="related.id"
              class="related-item"
              @click="goToArticle(related.id)"
            >
              <div class="related-cover" :class="related.cover" />
              <div class="related-info">
                <div class="related-date">{{ related.date }}</div>
                <div class="related-item-title">{{ related.title }}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <!-- Mobile Related Articles -->
      <div v-if="relatedArticles.length > 0" class="mobile-related">
        <div class="related-title">相关文章</div>
        <div class="mobile-related-list">
          <div
            v-for="related in relatedArticles"
            :key="related.id"
            class="mobile-related-item"
            @click="goToArticle(related.id)"
          >
            <div class="related-cover" :class="related.cover" />
            <div class="related-info">
              <div class="related-date">{{ related.date }}</div>
              <div class="related-item-title">{{ related.title }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Back Button -->
      <div class="bottom-nav">
        <button class="back-btn" @click="goBack">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          返回博客列表
        </button>
      </div>
    </template>
  </div>
</template>

<style lang="less" scoped>
.detail-page {
  padding-top: 64px;
  min-height: 100vh;
}

// ===== Cover Banner =====
.cover-banner {
  width: 100%;
  padding: 48px 0 40px;
  background: linear-gradient(160deg, rgba(0, 102, 255, 0.12), rgba(0, 255, 183, 0.05));
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);

  &.tech {
    background: linear-gradient(160deg, rgba(0, 102, 255, 0.14), rgba(0, 180, 255, 0.06));
  }

  &.case {
    background: linear-gradient(160deg, rgba(0, 255, 183, 0.1), rgba(0, 102, 255, 0.06));
  }

  &.deep {
    background: linear-gradient(160deg, rgba(108, 59, 255, 0.14), rgba(0, 102, 255, 0.06));
  }

  &.oss {
    background: linear-gradient(160deg, rgba(255, 102, 0, 0.1), rgba(255, 204, 0, 0.06));
  }
}

.cover-inner {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-bottom: 24px;
  transition: color 0.15s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    color: #ffffff;
  }
}

.cover-meta {
  margin-bottom: 16px;
}

.cover-tag {
  display: inline-block;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;

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

.cover-title {
  font-size: 32px;
  font-weight: 700;
  color: #ffffff;
  line-height: 1.35;
  margin-bottom: 20px;
}

.cover-info {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
}

.author-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(0, 102, 255, 0.3);
  color: #6ab0ff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
  font-weight: 600;
  flex-shrink: 0;
}

.author-name {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 500;
}

.divider {
  color: rgba(255, 255, 255, 0.3);
  font-size: 14px;
}

.article-date,
.read-time {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.5);
}

// ===== Article Layout =====
.article-layout {
  display: flex;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  gap: 40px;
  align-items: flex-start;
}

.article-body {
  flex: 1;
  min-width: 0;
}

.article-lead {
  font-size: 17px;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  border-left: 3px solid rgba(0, 102, 255, 0.6);
  padding-left: 20px;
  margin-bottom: 36px;
  font-style: italic;
}

.article-content {
  font-size: 15px;
  color: rgba(255, 255, 255, 0.82);
  line-height: 1.8;

  :deep(h2) {
    font-size: 22px;
    font-weight: 700;
    color: #ffffff;
    margin: 40px 0 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  :deep(h3) {
    font-size: 18px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin: 28px 0 12px;
  }

  :deep(h4) {
    font-size: 16px;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.85);
    margin: 20px 0 10px;
  }

  :deep(p) {
    margin-bottom: 16px;
  }

  :deep(strong) {
    color: #ffffff;
    font-weight: 600;
  }

  :deep(em) {
    color: rgba(255, 255, 255, 0.7);
    font-style: italic;
  }

  :deep(ul),
  :deep(ol) {
    margin: 16px 0;
    padding-left: 24px;

    li {
      margin-bottom: 8px;
      color: rgba(255, 255, 255, 0.8);
    }
  }

  :deep(ul) {
    list-style: disc;
  }

  :deep(ol) {
    list-style: decimal;
  }

  :deep(.code-block) {
    background: rgba(0, 0, 0, 0.4);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 10px;
    padding: 20px;
    overflow-x: auto;
    margin: 20px 0;
    font-family: 'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace;
    font-size: 13px;
    line-height: 1.6;

    code {
      color: #a8d8a8;
      background: none;
      padding: 0;
      border-radius: 0;
      font-size: inherit;
    }
  }

  :deep(.inline-code) {
    background: rgba(0, 102, 255, 0.15);
    color: #6ab0ff;
    padding: 2px 6px;
    border-radius: 4px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 13px;
  }

  :deep(a) {
    color: #4d9fff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 20px 0;
    font-size: 14px;
    overflow-x: auto;
    display: block;

    th,
    td {
      padding: 10px 16px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      text-align: left;
    }

    th {
      background: rgba(0, 102, 255, 0.12);
      color: rgba(255, 255, 255, 0.9);
      font-weight: 600;
    }

    tr:nth-child(even) td {
      background: rgba(255, 255, 255, 0.02);
    }
  }

  :deep(.article-image) {
    width: 680px;
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin: 16px 0;
    border: 1px solid rgba(255, 255, 255, 0.1);
    display: block;
  }
}

// ===== Related Sidebar =====
.related-sidebar {
  width: 260px;
  flex-shrink: 0;
  position: sticky;
  top: 96px;
  align-self: flex-start;
}

.related-title {
  font-size: 12px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  margin-bottom: 16px;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.related-item {
  display: flex;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid transparent;
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    border-color: rgba(255, 255, 255, 0.08);
  }
}

.related-cover {
  width: 64px;
  height: 48px;
  border-radius: 6px;
  flex-shrink: 0;
  background: linear-gradient(135deg, rgba(0, 102, 255, 0.2), rgba(0, 255, 183, 0.1));

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

.related-info {
  flex: 1;
  min-width: 0;
}

.related-date {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 4px;
}

.related-item-title {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

// ===== Bottom Nav =====
.bottom-nav {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 48px;
}

.back-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  cursor: pointer;
  transition: all 0.15s ease;

  svg {
    width: 16px;
    height: 16px;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: #ffffff;
  }
}

.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  gap: 20px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 16px;
}

// ===== Mobile Related (shown only on mobile) =====
.mobile-related {
  display: none;
  max-width: 900px;
  margin: 0 auto;
  padding: 0 24px 32px;
}

.mobile-related-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mobile-related-item {
  display: flex;
  gap: 12px;
  cursor: pointer;
  padding: 12px;
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  transition: all 0.15s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
}

// ===== Responsive =====
@media (min-width: 769px) and (max-width: 968px) {
  .article-layout {
    padding: 32px 20px;
    gap: 24px;
  }

  .related-sidebar {
    width: 200px;
  }

  .cover-title {
    font-size: 26px;
  }
}

@media (max-width: 900px) {
  .article-layout {
    flex-direction: column;
    padding: 32px 20px;
    gap: 0;
  }

  .related-sidebar {
    display: none;
  }

  .mobile-related {
    display: block;
  }

  .cover-title {
    font-size: 26px;
  }

  .bottom-nav {
    padding: 0 20px 40px;
  }
}

@media (max-width: 600px) {
  .cover-banner {
    padding: 32px 0 28px;
  }

  .cover-inner {
    padding: 0 16px;
  }

  .cover-title {
    font-size: 22px;
  }

  .article-layout {
    padding: 24px 16px;
  }

  .article-lead {
    font-size: 15px;
    padding-left: 14px;
    margin-bottom: 28px;
  }

  .article-content {
    font-size: 14px;

    :deep(h2) {
      font-size: 19px;
    }

    :deep(h3) {
      font-size: 16px;
    }

    :deep(.code-block) {
      padding: 14px;
      font-size: 12px;
    }
  }

  .mobile-related {
    padding: 0 16px 28px;
  }

  .bottom-nav {
    padding: 0 16px 36px;
  }
}
</style>
