import { useEffect, useState } from "react";
import { canonicalSection, SECTION_IDS } from "@/data/sections";

/** Keep manual scrolling, smooth navigation and browser history on one section state. */
export function useSectionNavigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    let frame = 0,
      pending: string | null = null,
      expiry = 0;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const setHash = (id: string, push = false) => {
      if (window.location.hash === `#${id}`) return;
      const url = new URL(window.location.href);
      url.hash = id;
      if (push) history.pushState(history.state, "", url);
      else history.replaceState(history.state, "", url);
    };
    const update = () => {
      frame = 0;
      const marker =
        (document.querySelector(".navbar")?.getBoundingClientRect().height ??
          80) + 24;
      setScrolled(window.scrollY > 24);
      if (pending) {
        const element = document.getElementById(pending);
        const top = element?.getBoundingClientRect().top ?? Infinity;
        const atBottom =
          window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 3;
        if (
          Math.abs(top - marker) < 4 ||
          (pending === "home" && window.scrollY < 3) ||
          (atBottom && pending === "contact") ||
          performance.now() > expiry
        )
          pending = null;
        else {
          setActiveSection(pending);
          return;
        }
      }
      const atBottom =
        window.scrollY > 24 &&
        window.scrollY + window.innerHeight >=
          document.documentElement.scrollHeight - 3;
      const current = atBottom
        ? "contact"
        : ([...SECTION_IDS].reverse().find(id => {
            const element = document.getElementById(id);
            return element && element.getBoundingClientRect().top <= marker + 4;
          }) ?? "home");
      setActiveSection(current);
      // Leave a pristine landing URL alone until the visitor actually scrolls.
      if (
        window.scrollY > 24 ||
        (window.location.hash &&
          SECTION_IDS.includes(canonicalSection(window.location.hash.slice(1))))
      )
        setHash(current);
    };
    const queue = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const navigate = (raw: string, push: boolean, initial = false) => {
      const id = canonicalSection(raw);
      if (!SECTION_IDS.includes(id)) return false;
      const element = document.getElementById(id);
      if (!element) return false;
      pending = id;
      expiry = performance.now() + 2500;
      setHash(id, push);
      setActiveSection(id);
      element.scrollIntoView({
        behavior: initial || reduced.matches ? "instant" : "smooth",
        block: "start",
      });
      queue();
      return true;
    };
    const click = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const anchor = (event.target as Element)?.closest(
        "a[href]"
      ) as HTMLAnchorElement | null;
      if (
        !anchor ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download")
      )
        return;
      const url = new URL(anchor.href, location.href);
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.hash &&
        navigate(decodeURIComponent(url.hash.slice(1)), true)
      )
        event.preventDefault();
    };
    const hashChange = () => {
      if (!navigate(window.location.hash.slice(1), false)) {
        pending = null;
        queue();
      }
    };
    const interrupt = () => {
      pending = null;
      queue();
    };
    const keyInterrupt = (event: KeyboardEvent) => {
      if (
        [
          "PageUp",
          "PageDown",
          "Home",
          "End",
          "ArrowUp",
          "ArrowDown",
          " ",
        ].includes(event.key) &&
        !(event.target as Element)?.closest('input,textarea,[role="grid"]')
      )
        interrupt();
    };
    const resize = new ResizeObserver(queue);
    const main = document.getElementById("main-content");
    if (main) resize.observe(main);
    document.addEventListener("click", click);
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("hashchange", hashChange);
    window.addEventListener("popstate", hashChange);
    window.addEventListener("wheel", interrupt, { passive: true });
    window.addEventListener("touchstart", interrupt, { passive: true });
    window.addEventListener("keydown", keyInterrupt);
    if (window.location.hash)
      navigate(window.location.hash.slice(1), false, true);
    else update();
    return () => {
      cancelAnimationFrame(frame);
      resize.disconnect();
      document.removeEventListener("click", click);
      window.removeEventListener("scroll", queue);
      window.removeEventListener("hashchange", hashChange);
      window.removeEventListener("popstate", hashChange);
      window.removeEventListener("wheel", interrupt);
      window.removeEventListener("touchstart", interrupt);
      window.removeEventListener("keydown", keyInterrupt);
    };
  }, []);
  return { activeSection, scrolled };
}
