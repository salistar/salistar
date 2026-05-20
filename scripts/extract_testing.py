# -*- coding: utf-8 -*-
"""Extrait les 50 articles de Testing.tsx vers app/lib/testing-articles.json."""
import re, json, os, html

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "app", "components", "Testing.tsx")
OUT = os.path.join(HERE, "..", "app", "lib", "testing-articles.json")

txt = open(SRC, encoding="utf-8").read()
# Locate the ARTICLES record start to skip META
start = txt.find("ARTICLES: Record<Category, Article[]> = {")
body = txt[start:] if start >= 0 else txt
cat_starts = []
for cat in ("general", "robot", "cypress", "selenium", "playwright"):
    m = re.search(rf"\n  {cat}: \[\n", body)
    if m:
        cat_starts.append((m.start(), cat))
cat_starts.sort()

items = []
for i, (pos, cat) in enumerate(cat_starts):
    end = cat_starts[i + 1][0] if i + 1 < len(cat_starts) else len(body)
    blk = body[pos:end]
    for it in re.finditer(
        r"\{\s*n:\s*(\d+)\s*,\s*title:\s*'((?:[^'\\]|\\.)*)'\s*,\s*summary:\s*'((?:[^'\\]|\\.)*)'",
        blk):
        items.append({
            "n": int(it.group(1)),
            "category": cat,
            "title": html.unescape(it.group(2)).replace("\\'", "'"),
            "summary": html.unescape(it.group(3)).replace("\\'", "'"),
        })

items.sort(key=lambda x: (x["category"], x["n"]))
open(OUT, "w", encoding="utf-8").write(json.dumps(items, ensure_ascii=False, indent=1))
print("OK", len(items), "testing articles ->", OUT)
