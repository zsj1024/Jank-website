import React, { useEffect, useState, useMemo, useRef } from "react";
import { Link } from "react-scroll";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn";

type Heading = {
  id: string;
  text: string;
  level: number;
  children?: Heading[];
};

type TableOfContentsProps = {
  contentRef: React.RefObject<HTMLElement>;
};

const TableOfContents: React.FC<TableOfContentsProps> = ({ contentRef }) => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  // 点击标题来展开/折叠该层级下的目录项
  const handleToggle = (id: string) => {
    setExpanded((prev) => {
      const newExpanded = new Set(prev);
      if (newExpanded.has(id)) {
        newExpanded.delete(id);
      } else {
        newExpanded.add(id);
      }
      return newExpanded;
    });
  };

  // 提取标题（h1-h6）和有序列表（ol > li），忽略代码块中的内容
  const parseContent = (content: HTMLElement): Heading[] => {
    const elements = content.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, ol > li"
    );
    const headingElements: Heading[] = [];

    elements.forEach((element) => {
      if (element.closest("pre, code")) return;

      const level = element.tagName.startsWith("H")
        ? parseInt(element.tagName.substring(1), 10)
        : 7;
      const id =
        element.id ||
        `${element.textContent?.toLowerCase().replace(/\s+/g, "-")}`;
      headingElements.push({
        id,
        text: element.textContent || "",
        level,
      });
    });

    // 构建层级结构
    const buildHierarchy = (headings: Heading[]) => {
      const result: Heading[] = [];
      const stack: Heading[] = [];
      headings.forEach((heading) => {
        while (stack.length && stack[stack.length - 1].level >= heading.level) {
          stack.pop();
        }
        if (stack.length) {
          const parent = stack[stack.length - 1];
          parent.children = parent.children || [];
          parent.children.push(heading);
        } else {
          result.push(heading);
        }
        stack.push(heading);
      });
      return result;
    };

    return buildHierarchy(headingElements);
  };

  useEffect(() => {
    if (!contentRef.current) return;

    const hierarchicalHeadings = parseContent(contentRef.current);
    setHeadings(hierarchicalHeadings);

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);

            const parentId = entry.target.id;
            setExpanded((prev) => {
              const newExpanded = new Set(prev);
              newExpanded.add(parentId);
              return newExpanded;
            });
          }
        });
      },
      { rootMargin: "-100px 0px -80% 0px", threshold: 0.1 }
    );

    const elements = contentRef.current.querySelectorAll(
      "h1, h2, h3, h4, h5, h6, ol > li"
    );
    elements.forEach((element) => observerRef.current?.observe(element));

    return () => {
      if (observerRef.current) {
        elements.forEach((element) => observerRef.current?.unobserve(element));
      }
    };
  }, [contentRef]);

  // 渲染标题
  const renderHeadings = useMemo(() => {
    const render = (heading: Heading) => {
      const indentClass = `pl-${Math.min(8, (heading.level - 1) * 2)}`;

      return (
        <li key={heading.id} className={indentClass}>
          <Link
            to={heading.id}
            smooth
            duration={500}
            className={`block py-1 text-sm hover:text-foreground transition-colors ${
              activeId === heading.id
                ? "text-foreground font-medium"
                : "text-foreground/60"
            }`}
            onClick={() => handleToggle(heading.id)}
          >
            {heading.text}
          </Link>
          {/* 渲染子标题 */}
          {heading.children && heading.children.length > 0 && (
            <ul
              className={`space-y-1 ${
                expanded.has(heading.id) ? "block" : "hidden"
              }`}
            >
              {heading.children.map(render)}
            </ul>
          )}
        </li>
      );
    };

    return <ul className="space-y-1">{headings.map(render)}</ul>;
  }, [headings, activeId, expanded]);

  return (
    <Card className="sticky top-20 max-h-[calc(100vh-120px)] overflow-auto will-change-transform">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">目录</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {headings.length > 0 ? (
          <nav>{renderHeadings}</nav>
        ) : (
          <p className="text-sm text-foreground/60 italic">暂无目录</p>
        )}
      </CardContent>
    </Card>
  );
};

export { TableOfContents };
