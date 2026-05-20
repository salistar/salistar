# -*- coding: utf-8 -*-
"""Telecharge les logos reels depuis Wikimedia Commons -> public/logos/."""
import os, json, urllib.request, urllib.parse, ssl

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.abspath(os.path.join(HERE, "..", "public", "logos"))
os.makedirs(OUT, exist_ok=True)

UA = "Mozilla/5.0 (salistar-portfolio script)"

# slug -> Commons File:<name>
FILES = {
    "alten": "ALTEN-Logo.svg",
    "worldline": "Logo Worldline - 2021.svg",
    "saham": "Saham-bank-logo.svg",
    "viseo": "Viseo logo.svg",
    "rocher": "LOGO DU GROUPE ROCHER.png",
    "sylob": "Logo Sylob.gif",
    "orangebusiness": "Orange Business Services logo (left).svg",
    "lafarge": "Lafarge (Unternehmen) logo.svg",
    "uir": "LOGO UIR.jpg",
    "ecam": "Logo ECAM Rennes.png",
    "efrei": "Efrei Logo 2026.svg",
}


def http_get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    return urllib.request.urlopen(req, timeout=15).read()


def thumb_url(filename, width=320):
    """Resolve a Commons File: to a rasterized thumb URL via imageinfo."""
    api = ("https://commons.wikimedia.org/w/api.php?action=query&format=json"
           "&prop=imageinfo&iiprop=url&iiurlwidth=%d&titles=%s"
           % (width, urllib.parse.quote("File:" + filename)))
    data = json.loads(http_get(api).decode("utf-8"))
    for p in data["query"]["pages"].values():
        ii = (p.get("imageinfo") or [{}])[0]
        return ii.get("thumburl") or ii.get("url")
    return None


for slug, fn in FILES.items():
    try:
        url = thumb_url(fn, 320)
        if not url:
            print(slug, "no url")
            continue
        ext = ".png" if "thumb" in url else os.path.splitext(url)[1]
        if not ext or len(ext) > 5:
            ext = ".png"
        out = os.path.join(OUT, slug + ext)
        data = http_get(url)
        open(out, "wb").write(data)
        print(slug, "->", os.path.basename(out), len(data), "bytes")
    except Exception as e:
        print(slug, "ERR", e)
