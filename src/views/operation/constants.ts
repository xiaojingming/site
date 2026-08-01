/** Card 1 - 注册有礼：跳转链接 */
export const CARD1_URL = 'https://zgsm.sangfor.com/credit/manager/login'

/** Card 2 - 邀请有礼：跳转链接 */
export const CARD2_URL = 'https://zgsm.sangfor.com/credit/manager/?tab=activity'

/** Card 3 - 开源贡献激励：GitHub 仓库链接 */
export const CARD3_URL = 'https://github.com/zgsm-ai/costrict'

/** 历史活动 1 - 校园挑战赛：详情链接 */
export const HISTORY1_URL = 'https://competition.costrict.ai/'

/** CCF × CoStrict AI 原生创新大赛：内部路由 */
export const CCF_COMPETITION_PATH = '/operation/ccf-competition'

/** CoStrict 8月开发者福利月：独立详情页 */
export const AUGUST_DEVELOPER_MONTH_PATH = '/operation/august-developer-month'

/** Card 2 引导步骤序号列表 */
export const CARD2_HINT_STEPS = [1, 2, 3] as const

// ---- 贡献表格相关常量 ----

/** 贡献行高亮 CSS class（添加到 NDataTable row-class-name） */
export const CONTRIB_ROW_HIGHLIGHT_CLASS = 'contrib-row-highlight'

/** 贡献行 action 列高亮渲染 class */
export const CONTRIB_ACTION_HIGHLIGHT_CLASS = 'contrib-action-highlight'

/** 贡献行 action 列高亮星标 class */
export const CONTRIB_STAR_CLASS = 'contrib-star'

/** 贡献行 action 列普通文字 class */
export const CONTRIB_ACTION_NORMAL_CLASS = 'text-white/70'

/** 贡献行 credits 列基础 class 列表 */
export const CONTRIB_CREDITS_BASE_CLASSES = [
  'font-bold',
  'text-[#00ffb7]',
  'whitespace-nowrap',
] as const

/** 贡献行 credits 列高亮发光 class */
export const CONTRIB_CREDITS_GLOW_CLASS = 'credits-glow'

/**
 * 贡献行高亮标志配置：索引对应 contrib1~contrib5，true 表示高亮
 * 高亮行在表格中展示背景色与星标
 */
export const CONTRIB_ROW_HIGHLIGHTS = [true, true, false, false, false] as const
