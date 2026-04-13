export interface BlogArticle {
  id: number
  category: string
  date: string
  title: string
  excerpt: string
  author: string
  authorInitial: string
  cover: string
  readTime?: number
  content?: string
}

export interface BlogCategory {
  id: string
  name: string
  icon: string
  desc: string
}

export const tagClassMap: Record<string, string> = {
  tech: 'tag-tech',
  case: 'tag-case',
  deep: 'tag-deep',
  oss: 'tag-oss',
}

import deepCover from '@/assets/blog/cover/deep_dive.webp'
import caseCover from '@/assets/blog/cover/parctical_case.webp'
import techCover from '@/assets/blog/cover/tech_progress.webp'
import ossCover from '@/assets/blog/cover/open_source.webp'

export const coverImageMap: Record<string, string> = {
  deep: deepCover,
  case: caseCover,
  tech: techCover,
  oss: ossCover,
}

const blogImageModules = import.meta.glob('@/assets/blog/**/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
})

export const blogImageMap: Record<string, string> = Object.fromEntries(
  Object.entries(blogImageModules).map(([path, url]) => {
    const key = path.replace(/.*assets\/blog\//, '/blog-images/').replace('.webp', '.png')
    return [key, url as string]
  }),
)

export const tagNameMap: Record<string, string> = {
  tech: '技术进展',
  case: '实践案例',
  deep: '深度解析',
  oss: '开源社区',
}

export const categories: BlogCategory[] = [
  { id: 'all', name: '最新文章', icon: '📄', desc: '探索 AI 辅助编程领域的前沿技术与最佳实践' },
  // { id: 'tech', name: '技术进展', icon: '🚀', desc: '产品更新、版本发布与技术架构演进' },
  { id: 'case', name: '实践案例', icon: '💡', desc: '真实用户故事、落地场景与最佳实践分享' },
  { id: 'deep', name: '深度解析', icon: '🔬', desc: 'AI 编程原理、技术深潜与前沿研究探讨' },
  // { id: 'oss', name: '开源社区', icon: '🌐', desc: '开源贡献、社区动态与生态合作' },
]

export const articles: BlogArticle[] = [
  {
    id: 1,
    category: 'deep',
    date: '2026-04-03',
    title: '单任务稳定运行1000+ Steps，CoStrict 的 Harness Engineering 实战',
    excerpt:
      '近期，Anthropic、OpenAI、Cursor 和Stripe 等团队在技术文章提到了同一个概念——Harness（约束）。本文将具体拆解CoStrict实践Harness Engineering提升编码能力的具体做法。',
    author: 'CoStrict 团队',
    authorInitial: 'C',
    cover: 'deep',
    readTime: 20,
    content: `近期，Anthropic、OpenAI、Cursor 和Stripe 等团队在技术文章提到了同一个概念——**Harness（约束）**，并从不同角度形成了近似共识：**模型本身的能力已不再是核心瓶颈，围绕模型构建的工程系统才是决定 Agent 实际表现的关键因素。**

CoStrict是一款开源的企业级 AI 编程助手，致力于帮助开发团队完成从需求理解到编码交付的完整闭环。自去年发布严肃编程Strict模式以来，我们沉淀的诸多实践与Harness 理念契合，本文将具体拆解CoStrict实践Harness Engineering提升编码能力的具体做法，并展示相关效果，欢迎大家在评论区讨论交流。

在正式介绍前，我们先介绍Harness。

## 什么是 Harness Engineering？

Harness（束具、驾驭）一词源自缰绳、马鞍、马衔等马术装备，用于引导一匹强大但不可预测的动物朝着正确方向前进。想象你骑着一匹烈马。马跑得快，但不知道该往哪儿跑，也不知道什么时候该停。你需要缰绳、马鞍、马衔等，这些统称为 Harness。

对应到 AI Agent：

- **马** = AI 模型，能力强但方向不确定
- **束具** = 基础设施，包括约束、护栏和反馈回路
- **骑手** = 人类工程师，提供方向和监督

Harness Engineering 就是为AI Agent设计这套束具的工程，它的目标是**构建一套完整的约束、引导和验证机制，使 Agent 在复杂任务中保持正确的方向和稳定的表现。**

### 为什么需要Harness？

大语言模型（LLM）有三个"硬伤"：

**1. 记忆有限**——上下文窗口是稀缺资源，装不下所有信息。

**2. 输出不确定**——同一个问题可能得到不同回答，长任务中容易跑偏。

**3. 任务拆解弱**——面对大型项目，不知道从何下手。

Prompt Engineering 解决不了这些问题。你可以在提示词里写"请高质量完成"，但 Agent 该跑偏还是跑偏，我们需要的是系统性的工程手段。

## Harness Engineering的三大支柱

Context Engineering（上下文工程）、Architectural Constraints（架构约束）和 Entropy Management（熵管理）构成了 Harness Engineering 的核心框架。Context Engineering 确保 Agent 在每个决策时刻都拥有精确且充分的信息；Architectural Constraints 通过结构化的边界将 Agent 行为限定在可控范围内；Entropy Management 则通过反馈回路和防御机制持续对抗系统熵增，维持长程任务的秩序与稳定。

### 1. Context Engineering（上下文工程）

核心问题：Agent 在正确的时间能看到正确的信息吗？

对 Agent 而言，不在上下文窗口里的信息等于不存在。上下文工程要解决的问题分两类：静态上下文（规范文档、配置文件、知识库链接）和动态上下文（日志、监控、任务状态、工作空间结构）。关键不是"塞进去就行"，而是精准、相关、及时。

### 2. Architectural Constraints（架构约束）

核心问题：Agent 被允许做什么？

传统做法是在 Prompt 里写"请按 JSON 格式输出"。Harness 做法是定义严格的 JSON Schema 加自动校验器，不合格直接打回重来。

约束的价值在于：当 Agent 面对无限可能时，它会消耗大量 token 探索各种路径；当 Harness 划定边界后，Agent 能更快收敛到正确答案。

### 3. Entropy Management（熵管理）

核心问题：上下文会不会越来越"脏"？

随着任务推进，上下文会积累熵：文档和实际代码对不上、命名风格在不同模块间分裂、过时信息悄然堆积。熵管理不是事后清理，而是每次写入时同步验证——新内容是否与已有规范冲突？被替代的旧信息是否已清理？交叉引用是否仍然有效？

## CoStrict 的 Harness 实践

CoStrict 是一款开源的企业级 AI 编程助手，在生产环境中的实测数据：单次任务稳定运行 1000+ Steps，端到端执行无中断、不跑偏，万级文件项目困难任务在一小时内完成，工具调用成功率 95.7% 以上，长程任务中几乎不触发上下文压缩。以下将围绕 Harness Engineering 的三大支柱逐一展示CoStrict的系统设计实践，并在最后通过实际运行数据验证这些设计的有效性。

### Context Engineering 实践

#### 1.上下文压缩作为最后防线

很多系统把上下文压缩当常规操作。在 Harness Engineering 的视角下，上下文压缩本质上意味着信息损失。因此，CoStrict把压缩定位为兜底机制，只有在实在塞不下时才触发。我们的做法是在上游把上下文管理做得足够精细，让压缩几乎用不上。实测 1000+ Step 的任务中，压缩机制几乎从未触发。

![上下文压缩](/blog-images/harness/image1.png)

![压缩机制](/blog-images/harness/image2.png)

#### 2. Agent-Git 上下文共享

多 Agent 协作有个难题：后面的 Agent 怎么知道前面的干了什么？

CoStrict 的做法是给 Agent 建一个独立的 Git 仓库（.agent-git），与项目原始的 Git 仓库完全隔离。

Agent 启动时，系统会为当前代码状态创建一个初始快照作为基准。此后，每个 Agent 通过唯一的 author 标识提交自己的工作历史，后续 Agent 可通过 agent-git log 查看完整的提交记录链。

这一设计如同真实开发团队的协作方式：**新成员加入项目时，可以通过 commit log 快速了解项目的变更历史，必要时再深入查看某次提交的具体 diff。** 所有 Agent 的修改记录与项目真实的 Git 历史完全隔离，不会污染版本记录。同时，系统支持 revert 操作，确保代码变更的安全性和可追溯性。

![Agent-Git](/blog-images/harness/image3.png)

![Git历史](/blog-images/harness/image4.png)

#### 3. Memory Bank 经验共享

在多 Agent 架构中，子 Agent 运行在隔离上下文中，这意味着前序Agent踩过的坑，后续 Agent可能还会再踩。

Memory Bank 的作用是把可复用的经验抽离出来，变成项目级知识资产。某个 Agent 解决了一个棘手问题，写入 Memory Bank，后续 Agent 自动获得这份经验。个体经验沉淀为共享知识，系统越用越顺手。

![Memory Bank](/blog-images/harness/image5.png)

#### 4. 工具结果拦截

上下文窗口是 Agent 最宝贵的资源之一。如果一次不当的搜索操作返回了数万行无用结果，不仅浪费上下文空间，还可能直接触发压缩兜底，造成前序有价值信息的丢失。CoStrict采用了一种 **"入口防御"策略**，在低价值信息进入上下文之前就进行拦截。

具体而言，系统会在工具执行前后进行多级检查：判断搜索结果的行数和 token 数是否超过合理范围，检测搜索关键词是否过于宽泛（如 def、class 等几乎会匹配所有代码的关键词）。对于不满足质量标准的搜索请求，系统会及早拦截工具执行或屏蔽返回结果，同时给出更精确的搜索建议引导 Agent 重新搜索。

这一机制的价值是双重的：它既保护了上下文的信噪比，避免偶发性的超长工具结果一次性消耗大量上下文空间；也提升了每次搜索操作的精确性，引导 Agent 形成更高效的信息检索习惯。

![工具拦截](/blog-images/harness/image6.png)

### Architectural Constraints 实践

#### 1. 主/子 Agent 分离架构

CoStrict 把**规划**和**执行**分开：

| **Agent 角色**  | **职责**             | **能否改代码**           |
| --------------- | -------------------- | ------------------------ |
| Proposal Agent  | 需求分析、任务规划   | 禁止                     |
| TaskCheck Agent | 验证任务清单可执行性 | 禁止                     |
| Coding Agent    | 编码阶段管理         | 禁止（只拆分任务）       |
| SubCoding Agent | 唯一的代码修改者     | 独占                     |
| Fix Agent       | 后处理修复           | 禁止（委托给 SubCoding） |

这种设计职责清晰，规划者不能越权执行；上下文隔离，主 Agent 不被子任务细节干扰；过程可追溯，每一步都有明确责任归属。

![Agent架构](/blog-images/harness/image7.png)

#### 2. 预算控制机制

无约束的 Agent 会陷入"过度探索"——反复调工具、钻牛角尖、停不下来。CoStrict 的做法是给每个 Agent 分配工具调用预算，每次调用后告知剩余次数，使其具备资源意识。当预算耗尽时，系统直接拦截后续工具执行并屏蔽工具列表，强制要求 Agent 基于已获取的信息进行总结并结束任务。这种做法从根本上杜绝了 Agent 无限制运行的可能性，引导 Agent 行为逐渐收敛。

![预算控制](/blog-images/harness/image8.png)

![预算机制](/blog-images/harness/image9.png)

#### 3. 工作流阶段约束

CoStrict将完整的开发流程拆成多个结构化、可验证的阶段，每个阶段有明确的输入输出规范，阶段之间通过结构化产物形成契约关系。

![工作流](/blog-images/harness/image10.png)

这种设计使得每个阶段都有明确的质量门禁，结构化产物充当阶段间的契约。整个工作流支持迭代收敛而非一次性完成——如果某个阶段的产出不满足下游要求，系统可以精确地回溯到该阶段进行修正。

### Entropy Management 实践

#### 1. 原地重试与消息清理

LLM 偶尔会出错：返回空内容、只说话不执行、参数格式错误。如果这些无效输出留在上下文里，会持续干扰后续推理。CoStrict 的处理方式是，检测到无效回复后原地重试，重试前保存快照，失败回复不进入历史记录，直到获得有效输出。

![重试机制](/blog-images/harness/image11.png)

#### 2. 死循环预防

Agent 陷入死循环是常见的失效模式：反复用相同参数调相同工具。

CoStrict 设了两级防御来应对这一问题。第一级是重复工具监测：检测到连续相同调用就拒绝执行，并给出告警。第二级是强制反思机制：检测到 Agent 无法自行跳出循环时，屏蔽所有工具，只保留"Sequential Thinking"思考工具，强制 Agent 停下来回顾历史行为。实测中，经过一轮强制反思，Agent 通常能找到替代方案并跳出循环。

![死循环预防](/blog-images/harness/image12.png)

#### 3. 测试驱动迭代收敛

Harness Engineering 强调 Agent 的行为应当向收敛方向发展，而非无限制迭代。CoStrict 实现了三层测试反馈和最多两轮 CI 反馈循环，防止边际收益递减。

| **层级**      | **内容**                          | **耗时** |
| ------------- | --------------------------------- | -------- |
| 本地快速测试  | lint + 单元测试                   | < 5 秒   |
| CI 选择性测试 | 从 300 万+ 用例中智能选择相关子集 | 按需     |
| 自动修复      | 预设常见失败场景的修复方案        | 即时     |

CoStrict 引入了Agentic TDD（基于智能体的测试驱动开发）工作流，将Agent与传统软件工程流水线深度结合，实现一个无需人工干预的闭环开发过程。**代码必须依次通过以下三个阶段的检验，才能最终完成开发。**

**第一阶段：LSP 语法检查（静态分析）**

代码生成后，首先进入基于语言服务协议（LSP）的静态分析环节。这一阶段主要负责排查基础的语法错误、变量未定义或类型不匹配等语义诊断问题。如果检查通过，代码将进入下一阶段；如果发现语法错误，系统会立即将错误信息发送给 Fix Agent，由其生成修正代码并重新注入该环节，直到语法完全合规。

**第二阶段：项目编译（构建与依赖解析）**

通过语法检查的代码随后进入完整的项目编译流程。这一阶段旨在解决更宏观的系统级问题，如依赖包缺失、环境约束冲突或链接错误。一旦发生编译错误，Fix Agent 会接管编译日志，分析并输出修正代码或编译配置修复方案，反复尝试直至项目成功构建。

**第三阶段：测试验证（动态逻辑校验）**

编译成功的项目将运行单元测试与接口测试。这是最核心的业务逻辑验证环节。如果出现断言失败，说明代码虽然能跑通，但行为不符合预期。此时，Fix Agent 会根据详细的测试失败报告，精准定位缺陷并修正业务逻辑。只有当所有测试用例全部通过时，整个 TDD 流程才宣告圆满结束。

![TDD流程](/blog-images/harness/image13.png)

## 实测数据

为了验证上述 Harness Engineering 实践的有效性，我们在两个不同规模的代码仓库上进行了端到端的任务执行测试。APEX-feat1 是一个中小型项目，VT-feat3 则是一个万级文件规模的企业级项目。

两个任务均在约 40 分钟内完成了从需求理解到编码交付的完整闭环。APEX-feat1 的总 Step 数超过 1100，VT-feat3 超过 1300，两者的工具调用成功率均达到 95.7% 以上。Fix 迭代轮数方面，APEX-feat1 经历了 3 轮迭代，VT-feat3 仅需 1 轮。这组数据表明，即使面对规模差异显著的项目，系统的多 Agent 协作工作流都能稳定运行，并在可预期的时间和步数范围内完成任务。

| **指标**       | **APEX-feat1（中小项目）** | **VT-feat3（万级文件项目）** |
| -------------- | -------------------------- | ---------------------------- |
| 任务耗时       | 约 40 分钟                 | 约 40 分钟                   |
| 总 Step 数     | 1100+                      | 1300+                        |
| Fix 迭代轮数   | 3 轮                       | 1 轮                         |
| 工具调用成功率 | 95.7%+                     | 95.7%+                       |

同时，我们对共计 35,133 次 Bash 命令调用的执行耗时进行了统计分析。结果显示，89.5% 的命令在 0.5 秒内完成，98.4% 在 2 秒内完成，中位耗时仅为 0.05 秒。这组数据表明 Bash 工具的执行表现高度稳定，绝大多数调用能够提供快速且一致的响应，执行耗时的可预期性很强。少量超过 10 秒的调用经排查与编译大型项目、下载外部依赖、大段文件写入等特定操作相关，并非工具本身的性能波动。

![Bash耗时](/blog-images/harness/image14.png)

各 Agent 的耗时分布揭示了系统的一些有趣特征。Proposal Agent 在两个项目上的耗时差异最为显著——APEX-feat1 仅用 7.87 分钟，而 VT-feat3 则花费了 21.19 分钟。这一差异忠实地反映了两个项目在代码规模和复杂度上的差距，说明 Proposal Agent 的需求分析深度能够自适应地匹配项目复杂度。TaskCheck Agent 在两个案例中的耗时分别为 3.12 分钟和 2.84 分钟，仅占总耗时的 7% 至 12%，表明这一质量检查环节以极小的时间成本换取了任务清单质量的显著提升。Coding Agent 和 Fix Agent 在两个项目上的表现则相当稳定，耗时波动不大，分别在 10--11 分钟和 6--8 分钟的区间内。

![Agent耗时1](/blog-images/harness/image15.png)

![Agent耗时2](/blog-images/harness/image16.png)

## 关键结论

通过实测，我们通过以下四点验证了 **Harness 机制**在**Costrict**中的有效性：

- **长程任务稳定性：** 1000+ Step 的执行验证了 Harness 机制的有效性，Agent 能够稳定运行而不崩溃或跑偏。
- **迭代收敛能力：** Fix 迭代轮数少（1-3 轮），表明任务规划质量高，子 Agent 执行准确。
- **工具链可靠性：** 95.7%+ 的成功率支撑自动化工作流，子 Agent 工具调用成功率接近 100%。
- **上下文管理有效性：** 长程任务几乎不触发上下文压缩兜底，表明上下文工程机制设计合理。

## 我们的观察

### 工程师的新角色

Harness Engineering 也将改变软件工程师的日常工作内涵。在传统开发模式下，工程师的核心工作是编写代码，调试对象是代码逻辑，评审重点是实现方案，测试工作围绕用例编写展开，文档则主要服务于人类读者的理解。而在 Harness Engineering 模式下，工程师的核心工作变为**设计 Agent 的运行环境**，调试对象变为 Agent 的行为模式，评审重点转向 Agent 输出质量与 Harness 机制的有效性，测试工作演变为设计测试策略供 Agent 自动化执行，文档维护则升级为构建机器可读的上下文基础设施。

工程师的工作分化为两个相互交织的层面——构建环境与管理 Agent。前者关注的是如何打造一套高质量的 Harness 基础设施，后者则关注如何在运行时观测、引导和修正 Agent 的行为。

| **维度** | **传统模式** | **Harness 模式**             |
| -------- | ------------ | ---------------------------- |
| 核心工作 | 编写代码     | 设计 Agent 运行环境          |
| 调试对象 | 代码逻辑     | Agent 行为模式               |
| 评审重点 | 实现方案     | Agent 输出质量               |
| 测试工作 | 编写用例     | 设计自动化测试策略           |
| 文档维护 | 给人看       | 构建机器可读的上下文基础设施 |

### Harness可能成为护城河

AI 编程工具正在从"能用"走向"好用"，从实验室中的原型走向生产环境中的工具。在这一演进过程中，Harness Engineering 将成为区分玩具与产品的关键分水岭。原始模型能力的差距正在缩小，而 Harness 质量的差距才刚刚开始显现。因此，**那些率先构建起高质量 Harness 体系的团队，将在工程效率上获得难以复制的结构性优势。**

Harness Engineering 汲取了软件架构中关于模块化、关注点分离和防御性设计的经验，借鉴了团队管理中关于职责划分、流程约束和反馈机制的智慧，同时融入了上下文工程这一全新领域的创新。随着 Agent 能力的持续增强和应用场景的不断扩展，Harness Engineering 的重要性只会与日俱增。因为**越强大的 Agent，越需要精心设计的缰绳来确保其力量被可靠地引向正确的方向。**`,
  },
  {
    id: 2,
    category: 'case',
    date: '2026-04-02',
    title: '自制Skill，搭配CoStrict CLI使用，工作效率 up up!',
    excerpt:
      '大家好！我是Connie，一个不写代码的CoStrict运营。最近我用CoStrict写了一个给公众号文章排版的skill，见识到AI在改善非程序员群体工作效率方面的巨大潜力。',
    author: 'Connie',
    authorInitial: 'C',
    cover: 'case',
    readTime: 10,
    content: `大家好！我是Connie，一个不写代码的CoStrict运营。最近我用CoStrict写了一个给公众号文章排版的skill，并将该skill用到了上周发布的文章《斯坦福推荐阅读：高质量规范是新型源代码|他山之石》之中，完成了"**skill创建——安装——使用——调优**"的全过程。

以下是详细使用过程。这个skill让我在深度体验CoStrict产品能力之余，见识到**AI在改善非程序员群体工作效率方面的巨大潜力**。

如果你是一位CoStrict新用户，可通过如下内容**了解CoStrict Skill创建和使用方式。** 如果你是CoStrict重度用户，欢迎给我们投稿，**分享改善工作的宝藏skill和工作流，** 我们将给每位认真分享的投稿者发放5000 Credits。（具体规则详见文末）

### 从自身需求出发，创建专属skill

一直以来，运营都需要在公众号文章排版上花费不少时间。大标题小标题、引文、字体、行间距、字间距、图片版式......一篇排版细致的公众号需要考虑很多，这些东西既费时间，又看不见产出。虽然市面上有不少第三方编辑器，但它们常常只能解决一部分问题，无法解决全部。遇到结构复杂、图文、代码片段夹杂的技术类文章，只能唉声长叹，然后一头扎进文档堆里。

GitHub上也有不少开源的公众号文章排版skills，但他们多半基于程序员更爱的markdown格式来做排版，而不是广大运营常用的在线文档、word等格式，对运营不够友好，上手成本高。

基于上述原因，我决定用AI Coding工具CoStrict自建运营视角的排版Skill，在解决自身需求的同时，也记录产品的真实使用体验。

#### Step1 把word文档给到CoStrict，生成适合微信公众号阅读的html

![排版效果](/blog-images/skill-case/image1.png)

- 我没有直接让CoStrict生成skill，而是先让它把文章排版，让我看看效果。这样做的好处是，当我们脑子并没有"一个好用的skill应该长啥样"的画像时，可以先把最终效果想象出来，让AI逐步实现。

几分钟内，CoStrict完成了这篇4000多字的长文排版。

![排版结果](/blog-images/skill-case/image2.png)

- 初始效果并未令人满意。由于我并未指定专属配色和边框样式，AI发挥的余地太大，页面有黄色、绿色、蓝色、灰色，花花绿绿，不符合我们的品牌配色。通过几轮对话，我让CoStrict继续修改，直到满意为止。

![修改后效果](/blog-images/skill-case/image3.png)

（图：排版截图）

#### Step2 将文章的版式规范沉淀为skill

- 我继续通过对话的方式向CoStrict提出需求：**请帮我把上述排版信息转化为一个通用的skill.md，以便后续使用。**

其实到这一步时，我并不确定CoStrict有没有生成skill的能力，但在看过多个skills之后，我发现skill其实只是一个markdown文档，本质仍是提示词。既然是文本信息，那就有了我操作的空间。

![skill生成](/blog-images/skill-case/image4.png)

- 参考官方文档中Skill的编写要求（https://docs.costrict.ai/cli/config/skills），我给CoStrict复制了skill的格式和规则信息，并给CoStrict提供了一个skill示例作为参考，要求它写出合格的skill。

![官方文档](/blog-images/skill-case/image5.png)

这是CoStrict生成的skill结果，看起来很规范。

![skill结果](/blog-images/skill-case/image6.png)

到这里，skill创建工作已经完成。值得一提的是，由于我更熟悉VS Code插件端的图形化界面，所以上述skill全程在插件端完成。事实上，CLI端也完全支持skill编写。

### 向先进团队学习，到CoStrict CLI中使用自建Skill

CoStrict CLI是我们最新推出的命令行工具，兼容适配Claude Code、OpenCode的各种skills。专业人士都在CLI端使用skills，我决定向他们学习，到CLI使用skills。如果刚刚创建的skill可以在CoStrict CLI 跑通，也意味着它也有机会反向输出给Claude Code、OpenCode用户，还能起到传播推广的作用。

#### Step1 到文件目录中配置全局可用Skill

配置skill的方式很简单，在安装目录下找到.config/costrict文件，新建skills文件夹，再新建了一个wechat-article-formatter文件夹（**注：文件夹名称，需与此前在插件端生成的skill.md文档中name保持一致。**）

![配置目录](/blog-images/skill-case/image7.png)

进入文件夹，将此前生成的skill文档（.md格式）复制到此处，并将文档名称修改为SKILL。

![修改文件名](/blog-images/skill-case/image8.png)

需要提醒的是，如果发现某个 skill 没有按预期出现在可用列表中，可以从以下几个方面进行排查：

- **文件名检查：** 确保文件名是 SKILL.md，**全大写。**
- **Frontmatter检查：** 确认SKILL.md 文件中包含了必需的name和description字段。
- **名称唯一性：** 检查所有扫描路径下是否存在同名的skill。skill名称必须是唯一的，如果出现冲突，加载行为可能不确定。
- **权限检查：** 检查 costrict.json 中的权限配置，deny 规则会直接将 skill从列表中隐藏。

通过这些检查，通常可以快速定位并解决skill 加载失败的问题。

#### Step2 检查skill是否加载成功

- CoStrict CLI启动时，它会自动扫描所有预定路径，发现可用的skill。只需要在**CoStrict CLI对话框中输入"skill"**，CoStrict会自动告诉我它有哪些skills可用。可以看到，wechat-article-formatter这个skill已经成功加载。

![加载成功](/blog-images/skill-case/image9.png)

- 告诉CoStrict文档标题是什么，让它进行排版。

![排版](/blog-images/skill-case/image10.png)

- 接下来，在打开的html网页中，通过ctrl+A和ctrl+C即可把排版后的文章复制到微信公众号编辑器里。由于微信公众号编辑器有自己的一套"规则"，会对粘贴进来的内容进行"清洗"和"改造"，我们粘贴到公众号编辑器里可能会出现样式丢失问题。为了避免这一情况，我们需要提前告诉CoStrict微信公众号的特点，创建微信兼容的版本。可以看到，下方排版保留了样式信息。

![微信兼容](/blog-images/skill-case/image11.png)

#### Step3 好用的Skill需要多次打磨与反复沉淀

创造skill的过程也像创造一个新的产品：需求要足够明确，规范要足够准确（如字号多少、什么颜色、用什么字体，兼容什么编辑器），创造它的过程仍少不了反复的调试与修改。

不过，这些调试是值得的。一次创造，多次使用，如果你也对这个skill感兴趣，在github搜索zgsm-ai/costrict并收藏，我们正在打造CoStrict Skill Market，后续也会分享更多精选的知识合集。

### 心态第一：Don't be Afraid of Coding

吴恩达在他的"How to Build Your Career in AI"一书中提到，几百年以前，社会并未将识字作为一项必备的生存技能，如今，我们默认人们能读会写。也许未来有一天，人们也会把使用AI写代码当做一种基本素养。**Coding AI is the new literacy（AI编程是一种新素养）。**

无论是程序员还是非程序员，敢于直面AI带来的变化就已经赢了一半。当写代码成了一种基本素养，懂代码的程序员赢在了起跑线上，而不懂代码的非程序员也无需担忧，工具总会朝着更有利于使用的方向进化。大模型并非凭空出现，依旧是为了服务人类，AI很强，我们也不弱，当我们把心态切换到驾驭AI之上，Skill也好，小龙虾（OpenClaw)也罢，都只是AI进程中的产物，是为我们所用的工具罢了。

（完）

**🎁 有奖征集 | 分享你的Skill，赢5000 Credits！**

你在使用CoStrict, Claude Code或OpenCode时，是否写过特别好用的Skill？或是总结了一套独家的实践心得？

现在，分享你的Skils，并把你的实践整理成文章，投稿至 zgsm@sangfor.com.cn。一旦被采纳，你的作品将发布在 CoStrict 公众号上，让更多人看见，同时你将获得 5000 Credits（有效期3个月）作为奖励！期待你的分享，    一起让 CoStrict 正在建设的 Skills Market 更强大`,
  },
  {
    id: 3,
    category: 'case',
    date: '2026-04-08',
    title: '2小时搞定数据可视化！我用CoStrict让监控平台拥有"数据之眼"',
    excerpt:
      'DFX测试人员杨龙用AI工具CoStrict，2小时搞定了一个专业级数据可视化功能，直接让测试平台的易用性拉满。几句指令交给CoStrict，一个可视化、交互性和体验感俱佳的新功能就火速上线。',
    author: '杨龙（YL）',
    authorInitial: 'Y',
    cover: 'case',
    readTime: 8,
    content: `本期案例由 **杨龙（YL）** 贡献。

不得不感慨，AI Coding时代人均程序员，DFX的测试人员杨龙用AI工具CoStrict，2小时搞定了一个专业级数据可视化功能，直接让测试平台的易用性拉满。原来，他发现DFX稳定性测试平台缺少数据趋势图查看功能，于是几句指令交给CoStrict，一个可视化、交互性和体验感俱佳的新功能就火速上线。

快来围观他的高效秘籍！

### 1、案例背景

在我们的DFX稳定性测试平台中，需要添加一个数据趋势图查看功能，让用户能够直观地查看监控数据的变化趋势。原始问题是平台已有监控功能，但缺乏数据可视化展示，用户无法直观地了解监控指标的历史变化情况。我们需要基于现有的LayuiUI框架，集成ECharts图表库，实现一个数据趋势图查看页面。

### 2、案例实操

#### 2.1 提供的上下文

AI在开始任务前，先了解了项目的整体结构：

- 项目是基于Flask的Web应用，前端使用LayuiUI框架
- 已有监控相关的页面和功能，如监控项管理、监控主机管理等
- 项目已集成ECharts图表库，在console.js中有使用示例

然后AI根据任务检索并查看了以下关键文件来了解项目结构：

- \`web/static/html/index.html\` — 主页面，了解菜单结构
- \`web/static/html/monitor/monitor_item_list.html\` — 监控项列表页面，了解现有监控功能的实现
- \`web/static/layuiadmin/modules/console.js\` — 控制台模块，了解ECharts的使用方式
- \`web/static/html/home/console.html\` — 控制台页面，了解页面布局

#### 2.2 提示词

我的提示词非常简单：

**"我想用layuiUI编码支持数据趋势图查看"**

#### 2.3 具体操作步骤

**创建前端页面：**

- 创建了 \`web/static/html/monitor/data_trend_chart.html\` 文件
- 设计了包含搜索条件区域、图表展示区域和数据表格区域的页面布局
- 使用LayuiUI的表单组件实现监控主机、监控项和时间范围的选择
- 集成ECharts图表库，实现数据趋势图的展示
- 添加了刷新和导出功能按钮

**创建后端API：**

- 创建了 \`controller/monitorconfig/chartdata.py\` 文件
- 实现了三个API接口：\`/chartdata/host/list\`（获取监控主机列表）、\`/chartdata/item/list\`（获取监控项列表）、\`/chartdata/data/trend\`（获取数据趋势数据）
- 在API中生成了模拟数据，包括CPU使用率、内存使用率、网络流量和磁盘IO等指标

**注册API路由：**

- 修改了 \`web/web.py\` 文件
- 导入新创建的 \`chartdata_bp\`
- 注册了蓝图路由，设置URL前缀为 \`/chartdata\`

**更新前端API调用：**

- 修改了 \`web/static/html/monitor/data_trend_chart.html\` 中的API URL
- 将API路径调整为正确的后端路径

**添加菜单项：**

- 修改了 \`web/static/html/index.html\` 文件
- 在"监控与告警"菜单下添加了"数据趋势"菜单项

### 3、案例效果

![数据趋势图效果展示](/blog-images/data-viz/image1.png)

#### 3.1 功能完成情况

任务完成后，实现了以下功能：

- **用户可以通过主菜单访问数据趋势图页面**
- **可以选择监控主机和监控项进行数据查看**
- **支持自定义时间范围查询**
- **提供了多指标数据可视化展示（CPU使用率、内存使用率、网络流量、磁盘IO）**
- **支持图表缩放、数据点查看、图表导出等功能**
- **包含详细数据表格，方便查看具体数值**

#### 3.2 相比之前的改进

之前平台只有基础的监控功能，用户无法直观地查看数据变化趋势。现在：

- **可视化提升：** 从纯数据列表变为直观的图表展示
- **交互性增强：** 支持时间范围选择、数据缩放等交互操作
- **功能完善：** 增加了数据导出功能，方便用户进行进一步分析
- **用户体验优化：** 页面布局合理，操作流程简单直观

### 4、案例总结

通过这个案例，我深刻体会到AI辅助编程的效率和优势。AI能够快速理解项目结构，生成符合项目规范的代码，大大减少了开发时间。特别是在处理复杂的前端页面和后端API时，AI能够提供完整的解决方案，包括错误处理和边界条件考虑。

AI辅助编程不仅提高了开发效率，还能帮助开发者学习新的技术和最佳实践。通过与AI的交互，我能够快速了解LayuiUI和ECharts的使用方法，并将其应用到实际项目中。

希望大家能够积极尝试AI辅助编程，将其应用到日常开发工作中。在使用过程中，要注意提供清晰的上下文和需求描述，这样AI才能更好地理解我们的意图，提供更准确的解决方案。同时，也欢迎大家分享自己的AI辅助编程案例，让我们一起学习和进步，共同提高开发效率和代码质量。

记住，AI是我们的助手，而不是替代者。在使用AI生成代码后，我们仍然需要进行代码审查和测试，确保代码的质量和安全性。让我们善用AI工具，提升开发效率，创造更多价值！

如果你也有好的使用案例，欢迎分享出来，让我们一起探索AI辅助编程的最佳实践，共同提升团队的开发效率和代码质量。我们也会赠送额外的2000 Credits，供你体验更加丰富的模型资源哦~

投稿邮箱：zgsm@sangfor.com.cn`,
  },
  {
    id: 4,
    category: 'case',
    date: '2026-04-08',
    title: '告别手动测试，用Costrict工具快速实现DFX平台VDC性能测试集成',
    excerpt:
      '在某企业的DFX性能测试平台中，VDC新建性能测试能力一直未被集成。引入Costrict工具辅助开发后，原本需要1到2天的数据库、前后端代码实现、调试和联动，现在仅需0.5天即可完成全栈联通。',
    author: 'ChaoLi03',
    authorInitial: 'C',
    cover: 'case',
    readTime: 8,
    content: `本期案例由ChaoLi03贡献。

### 一、案例背景：从手动到自动的效能提升

在某企业的DFX性能测试平台中，VDC（虚拟数据中心）的新建性能测试能力一直未被集成进来。测试工程师每次执行vdc-benchmark测试脚本，都需要登录后台执行机手动运行，再人工分析结果。这种方式不仅效率低下，也难以与平台其他功能联动，整体集成度较差。

为了提高测试效率和平台一体化水平，我们决定将VDC新建性能测试能力集成到DFX平台中，并引入Costrict工具辅助开发，显著提升了开发速度和代码质量。

### 二、案例实操：快速实现数据库与前后端集成

**1. 数据库设计自动化**

我们首先设计了两个新的数据库表：**VDC表和测试任务表。** 在定义好字段后，通过Costrict工具直接读取本地已有的数据库设计案例，自动生成建表语句和ORM代码，无需手动编写重复的CRUD操作。我们设计好数据库字段后，在代码中添加了数据库描述，内容如下：

![数据库字段设计](/blog-images/vdc-test/image1.png)

**2. 后端控制层快速搭建**

Costrict可以自动读取本地相关联的代码（无需复制出来），并根据数据库结构自动生成了对应的实体类、DAO层和服务层代码，风格与平台现有模块保持一致。此时我们可以让Costrict在了解参数含义后，对照之前的数据库案例，快速构建数据库并实现基本的增删改查功能，让控制层可以直接调用。

![后端控制层代码生成](/blog-images/vdc-test/image2.png)

![服务层代码生成](/blog-images/vdc-test/image3.png)

**3. 前端页面自动生成**

前端页面同样借鉴了平台已有模块的设计风格。我们可以让Costrict根据数据库字段和交互需求，自动生成符合平台规范的页面组件，并支持与后端接口联动调试，大大减少了前端开发时间。输入的提示词如下：

![前端生成提示词](/blog-images/vdc-test/image4.png)

### 三、案例效果：大幅提升测试开发效率

**1. 生成的代码可直接运行**

生成的数据库代码会完全仿照我们已有的工程结构实现，无需调整即可集成运行：

![代码运行效果1](/blog-images/vdc-test/image5.png)

![代码运行效果2](/blog-images/vdc-test/image6.png)

![代码运行效果3](/blog-images/vdc-test/image7.png)

**2. 页面风格统一，交互流畅**

通过Costrict快速生成的前端页面与平台整体风格一致，支持完整的增删改查和测试任务触发功能，能够快速和后台的控制层发起联动，效果如下：

![前端页面效果1](/blog-images/vdc-test/image8.png)

![前端页面效果2](/blog-images/vdc-test/image9.png)

**3. 效率显著提升**

原本需要1到2天的数据库、前后端代码实现、调试和联动，现在仅需0.5天即可完成全栈联通，测试平台功能的迭代效率有显著提升。

### 总结：Costrict的三大价值

#### 显著提升测试工具/平台的开发效率

通过Costrict工具，数据库表结构的代码生成、前后端页面开发均可基于现有工程模板和设计规范自动完成，无需从零编写重复性代码。例如，新建VDC表和测试任务表时，工具直接仿照既有工程结构生成可运行代码，节省了传统手动编写与调试的大量时间，使功能快速落地。

#### 降低开发与维护成本

工具通过将数据库字段定义与前端页面组件、后端控制层逻辑自动绑定，减少了代码耦合和人工错误风险。同时，代码风格与平台原有模块高度一致，避免因风格差异导致的维护难度增加，保障了系统整体的可维护性。

#### 加速DFX测试平台前后端的协同开发

前端页面的生成能够直接适配平台设计规范，且后端控制层可直接调用工具生成的数据库接口，实现了前后端的无缝联动。测试开发过程中，无需单独开发前端页面或进行大量调试适配，缩短了开发周期，提升了协作效率。`,
  },
  {
    id: 5,
    category: 'case',
    date: '2026-04-08',
    title: '用Costrict做代码审查和问题定位，3天工作2小时完成',
    excerpt:
      '桌面云产品研发部赵心爱利用Costrict，定位多平台采集器Pagent的句柄泄露问题，将原本需要2-3天的代码审查工作压缩到2小时内完成，且没有遗漏任何潜在风险点。',
    author: '赵心爱（ZXA）',
    authorInitial: 'Z',
    cover: 'case',
    readTime: 8,
    content: `本期案例由**赵心爱**（ZXA）贡献。

近日，来自桌面云产品研发部的同事赵心爱，利用AI辅助编程工具Costrict，定位多平台的采集器Pagent的句柄泄露问题，将原本人工操作需要2-3天的代码审查工作，压缩到只需要2小时内完成。同时，Costrict检查了所有相关的句柄操作，没有遗漏任何潜在风险点；并准确识别出了最严重的进程句柄处理问题——这是人工审查容易忽略的细节。

来看他的用例分享。

## 1、案例背景

桌面云产品研发部维护的pagent项目是一个多平台的系统监控采集器，用于采集CPU、内存、进程、线程等系统数据并上报到iom平台。最近内部在Windows平台上发现了严重的句柄泄漏问题，导致进程长时间运行后句柄数量持续增长，最终影响系统性能和稳定性。

传统的排查方式需要开发人员手动分析大量代码，重点关注Windows API调用（如windows.CloseHandle等），耗时耗力且容易遗漏。面对这个复杂的问题，我们希望借助AI辅助编程工具来提高排查效率。

## 2、案例实操

**操作步骤：**

**第一步：提供项目背景和问题描述**

首先，我给AI提供了一段背景信息：

> 这个项目是一个多平台的采集器pagent，用来采集cpu、内存，进程，线程等数据，上报到iom平台，但是这个进程在运行时发现了一些句柄泄露问题，尤其是windows端，泄漏非常明显，帮我分析代码，看看哪里有可能出现句柄泄漏

**第二步：引导AI了解项目结构**

其次，我让AI查看项目根目录，了解整体结构：

\`\`\`xml
<list_files>
  <path>.</path>
  <recursive>false</recursive>
</list_files>
\`\`\`

**第三步：逐步深入分析关键代码**

接下来，引导AI从主程序开始，逐步分析Windows相关的关键模块：

- 查看主程序文件，了解Windows特定的初始化和清理逻辑
- 分析Windows采集器的核心文件
- 重点查看DLL相关的初始化和清理代码
- 深入分析进程信息采集相关的代码
- 检查性能计数器相关的句柄管理

**第四步：提供具体的分析方向**

当我发现AI过于关注panic处理时，我及时调整了分析重点：

> 主要关注一下windows.CloseHandle的时候，是不是会有些句柄没有释放，panic的情况比较极端，不用过多考虑

**第五步：让AI重点关注具体的技术细节**

我引导AI重点关注以下几个方面的句柄操作：

- windows.OpenProcess 和 windows.CloseHandle 的配对使用

- PDH性能计数器句柄的创建和释放

- 进程快照句柄的管理

- 事件句柄和注册表句柄的处理

## 3、案例效果

**1. 全面的问题识别**

AI成功识别出了6个主要的句柄泄漏风险点，包括：

- 进程快照句柄泄漏

- 进程句柄处理不当（最严重）

- PDH查询句柄泄漏（高风险）

- 证书验证句柄泄漏

- 事件句柄泄漏

- 注册表句柄泄漏

**2. 具体的代码定位**

AI不仅发现了问题，还精确定位到了具体的代码行和函数，例如：

- agent/collector/windows/process.go:484-494 中的进程句柄处理

- agent/collector/windows/process.go:617-668 中的PDH查询句柄管理

- common/utils/utils_windows.go:295-300 中的事件句柄处理

**3. 实用的修复建议**

AI提供了具体的代码修复示例，包括：

- 句柄有效性检查机制

- 改进的defer使用方式

- 错误处理优化策略

相比之前的效果提升：

- **效率提升：** 原本需要2-3天的代码审查工作，在2小时内完成

- **覆盖度提升：** AI检查了所有相关的句柄操作，没有遗漏任何潜在风险点

- **准确性提升：** AI准确识别出了最严重的进程句柄处理问题，这是人工审查容易忽略的细节

## 4、经验总结

这次AI辅助编程的实践让我深刻体会到，AI工具在代码审查和问题排查方面具有明显优势。它能够快速理解项目结构，系统性分析代码逻辑，准确识别潜在问题，并提供实用的解决方案。

**关键的成功因素包括：**

- **清晰的问题描述：** 明确告诉AI要解决什么问题；

- **逐步引导：** 从整体到局部，引导AI深入分析；

- **及时调整：** 根据AI的分析结果，及时调整分析重点；

- **技术细节聚焦：** 引导AI关注具体的技术实现细节。

AI并不是要替代开发人员，而是成为我们强大的助手。它能够处理大量重复性的分析工作，让开发人员能够专注于更复杂的设计和架构问题。希望大家在实际工作中多尝试使用AI辅助编程工具，把它融入到日常的开发流程中。

如果你也有好的使用案例，欢迎分享出来，让我们一起探索AI辅助编程的最佳实践，共同提升团队的开发效率和代码质量。我们也会赠送额外的600 Credits，供你体验更加丰富的模型资源哦~

投稿邮箱：zgsm@sangfor.com.cn`,
  },
]

articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
