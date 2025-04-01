/**
 * SEO配置接口
 * 定义网站的搜索引擎优化相关配置
 */
declare interface SEOConfig {
    additionalMetaTags?: Array<{   // 额外的元标签配置
        content: string;           // 元标签内容
        name: string;              // 元标签名称
    }>;
    alternateLocales?: Array<{     // 多语言备选链接
        href: string;              // 对应语言版本的URL
        hrefLang: string;          // 语言代码，如"zh-CN"、"en"
    }>;
    author: string;                // 网站作者名称
    canonicalUrlPrefix?: string;   // 规范URL前缀，用于避免重复内容问题
    defaultTitle: string;          // 默认标题，当没有指定页面标题时使用
    description: string;           // 网站描述，用于搜索引擎结果和社交媒体分享
    keywords: string[];            // 关键词列表，帮助搜索引擎索引
    language?: string;             // 网站主要语言，如"zh-CN"
    openGraph?: {                  // Open Graph协议配置，优化社交媒体分享效果
        description?: string;      // Open Graph专用描述
        images?: Array<{           // 分享预览图片配置
            alt?: string;          // 图片替代文本
            height?: number;       // 图片高度（像素）
            url: string;           // 图片URL
            width?: number;        // 图片宽度（像素）
        }>;
        locale?: string;           // 内容地区，如"zh-CN"
        siteName?: string;         // 网站名称
        title?: string;            // Open Graph专用标题
        type?: string;             // 内容类型，如"website"、"article"等
        url?: string;              // 内容URL
    };
    performance?: {                // 性能优化相关配置
        dnsPreconnect?: string[];  // DNS预解析的域名列表
        preconnectOrigins?: string[];  // 预连接的第三方资源域名
        preloadAssets?: Array<{    // 预加载的关键资源列表
            as: string;            // 资源类型（如image、font、script等）
            crossOrigin?: string;  // 跨域设置
            href: string;          // 资源URL
            type?: string;         // 资源MIME类型
        }>;
        preloadFonts?: boolean;    // 是否预加载字体资源
    };
    structuredData?: {             // 结构化数据（JSON-LD），提升搜索结果展示
        [key: string]: Record<string, any> | undefined;  // 其他自定义结构
        organization?: Record<string, any>;  // 组织/公司信息结构
        website?: Record<string, any>;       // 网站信息结构
    };
    title: string;                 // 网站标题，显示在浏览器标签页
    titleTemplate: string;         // 标题模板，用于拼接页面标题，如"%s | 网站名"
    twitter?: {                    // Twitter卡片配置
        cardType?: string;         // 卡片类型，如"summary"、"summary_large_image"等
        description?: string;      // Twitter专用描述
        handle?: string;           // 作者Twitter账号
        site?: string;             // 网站Twitter账号，格式如"@account"
        title?: string;            // Twitter专用标题
    };
} 