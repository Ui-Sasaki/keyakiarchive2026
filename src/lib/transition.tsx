"use client";

import type { Route } from "next";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useLayoutEffect, useRef } from "react";

// document.startViewTransitionに対応していないブラウザでの実行時は、単純にフォールバックする
const safeStartViewTransition = (callback: () => Promise<void> | void) => {
  if (!document.startViewTransition) {
    return void callback();
  }
  document.startViewTransition(callback);
};

export const useViewTransitionRouter = (): ReturnType<typeof useRouter> => {
  const router = useRouter();
  const pathname = usePathname();

  // ナビゲーション操作をPromiseで扱うためのrefオブジェクト。後述
  const promiseCallbacks = useRef<Record<
    "resolve" | "reject",
    () => void
  > | null>(null);

  // pathnameが変更されたときにPromiseをresolveする。後述
  useLayoutEffect(() => {
    return () => {
      if (promiseCallbacks.current) {
        promiseCallbacks.current.resolve();
        promiseCallbacks.current = null;
      }
    };
  }, [pathname]);

  // safeStartViewTransitionでラップする
  return {
    ...router,
    push: (href: Route) => {
      safeStartViewTransition(
        () =>
          new Promise((resolve, reject) => {
            promiseCallbacks.current = { resolve, reject };
            router.push(href);
          }),
      );
    },
    back: () => {
      safeStartViewTransition(
        () =>
          new Promise((resolve, reject) => {
            promiseCallbacks.current = { resolve, reject };
            router.back();
          }),
      );
    },
  };
};

export function TransitionLink({
  children,
  href,
  backIfHistory,
  ...props
}: Parameters<typeof Link>[0] & {
  children: React.ReactNode;
  backIfHistory?: boolean;
}) {
  const router = useViewTransitionRouter();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    if (backIfHistory && window.history.length > 1) {
      router.back();
    } else {
      router.push(href.toString());
    }
  };

  return (
    <Link {...props} href={href} onClick={handleLinkClick}>
      {children}
    </Link>
  );
}
