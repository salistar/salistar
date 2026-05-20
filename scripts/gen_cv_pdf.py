# -*- coding: utf-8 -*-
"""Genere les 3 CV PDF (FR/EN/AR) dans public/ a partir de cv_i18n.CV_I18N."""
import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_LEFT, TA_RIGHT, TA_JUSTIFY
from reportlab.platypus import (SimpleDocTemplate, Paragraph, Spacer, Table,
                                TableStyle, HRFlowable)
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import arabic_reshaper
from bidi.algorithm import get_display

from cv_i18n import CV_I18N

HERE = os.path.dirname(os.path.abspath(__file__))
PUB = os.path.abspath(os.path.join(HERE, "..", "public"))

pdfmetrics.registerFont(TTFont("CV", r"C:\Windows\Fonts\arial.ttf"))
pdfmetrics.registerFont(TTFont("CV-B", r"C:\Windows\Fonts\arialbd.ttf"))

NAVY = colors.HexColor("#0A1F44")
GOLD = colors.HexColor("#B8860B")
BLUE = colors.HexColor("#2563EB")
GREY = colors.HexColor("#444444")


def shape(txt, lang):
    if lang != "ar":
        return txt
    return get_display(arabic_reshaper.reshape(txt))


def build(lang):
    cv = CV_I18N[lang]
    rtl = lang == "ar"
    align = TA_RIGHT if rtl else TA_LEFT
    out = os.path.join(PUB, "cv-idriss-kriouile-%s.pdf" % lang)
    doc = SimpleDocTemplate(out, pagesize=A4,
                            leftMargin=16 * mm, rightMargin=16 * mm,
                            topMargin=14 * mm, bottomMargin=14 * mm,
                            title="CV - %s" % cv["name"], author=cv["name"])

    H1 = ParagraphStyle("H1", fontName="CV-B", fontSize=20, textColor=NAVY,
                         alignment=align, spaceAfter=2, leading=24)
    SUB = ParagraphStyle("SUB", fontName="CV", fontSize=10.5, textColor=GOLD,
                          alignment=align, spaceAfter=4, leading=14)
    META = ParagraphStyle("META", fontName="CV", fontSize=8, textColor=GREY,
                           alignment=align, spaceAfter=2, leading=11)
    SEC = ParagraphStyle("SEC", fontName="CV-B", fontSize=12, textColor=BLUE,
                          alignment=align, spaceBefore=10, spaceAfter=4,
                          leading=15)
    BODY = ParagraphStyle("BODY", fontName="CV", fontSize=9, textColor=GREY,
                           alignment=TA_JUSTIFY if not rtl else TA_RIGHT,
                           leading=13, spaceAfter=3)
    ITEM = ParagraphStyle("ITEM", fontName="CV", fontSize=8.5, textColor=GREY,
                           alignment=align, leading=12, spaceAfter=1)
    ROLE = ParagraphStyle("ROLE", fontName="CV-B", fontSize=9.5,
                           textColor=NAVY, alignment=align, leading=13)
    PERIOD = ParagraphStyle("PERIOD", fontName="CV", fontSize=8,
                            textColor=GOLD, alignment=align, leading=11)

    def P(t, s):
        return Paragraph(shape(t, lang).replace("&", "&amp;"), s)

    el = []
    el.append(P(cv["name"], H1))
    el.append(P(cv["title"], SUB))
    c = cv["contact"]
    el.append(P("%s  ·  %s  ·  %s" % (c["email"], c["phone"], c["location"]), META))
    el.append(P("%s  ·  %s  ·  %s" % (c["linkedin"], c["github"], c["site"]), META))
    el.append(P("%s : %s" % (cv["labels"]["status"], cv["status"]), META))
    el.append(Spacer(1, 4))
    el.append(HRFlowable(width="100%", thickness=1, color=GOLD))

    el.append(P(cv["labels"]["profile"], SEC))
    el.append(P(cv["profile"], BODY))

    el.append(P(cv["labels"]["skills"], SEC))
    rows = []
    sk = cv["skills"]
    for i in range(0, len(sk), 2):
        left = "<b>%s :</b> %s" % (sk[i]["cat"], sk[i]["items"])
        cell_l = P(left, ITEM)
        if i + 1 < len(sk):
            right = "<b>%s :</b> %s" % (sk[i + 1]["cat"], sk[i + 1]["items"])
            cell_r = P(right, ITEM)
        else:
            cell_r = P("", ITEM)
        rows.append([cell_r, cell_l] if rtl else [cell_l, cell_r])
    t = Table(rows, colWidths=[88 * mm, 88 * mm])
    t.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                            ("LEFTPADDING", (0, 0), (-1, -1), 0),
                            ("RIGHTPADDING", (0, 0), (-1, -1), 6),
                            ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))
    el.append(t)

    el.append(P(cv["labels"]["experience"], SEC))
    for e in cv["experience"]:
        hdr = Table(
            [[P(e["company"], ROLE), P(e["period"], PERIOD)]]
            if not rtl else
            [[P(e["period"], PERIOD), P(e["company"], ROLE)]],
            colWidths=[120 * mm, 56 * mm])
        hdr.setStyle(TableStyle([("LEFTPADDING", (0, 0), (-1, -1), 0),
                                 ("RIGHTPADDING", (0, 0), (-1, -1), 0),
                                 ("BOTTOMPADDING", (0, 0), (-1, -1), 1),
                                 ("VALIGN", (0, 0), (-1, -1), "MIDDLE")]))
        el.append(hdr)
        el.append(P(e["role"], ParagraphStyle("r", parent=ITEM,
                    textColor=GOLD, fontName="CV-B")))
        bullet = "‏• " if rtl else "• "
        for b in e["bullets"]:
            el.append(P(bullet + b, ITEM))
        el.append(Spacer(1, 4))

    two = []
    edu = "<b>%s</b><br/>%s" % (cv["labels"]["education"],
                                "<br/>".join(cv["education"]))
    lng = "<b>%s</b><br/>%s" % (cv["labels"]["languages"], cv["languages"])
    cell_e, cell_l = P(edu, ITEM), P(lng, ITEM)
    two.append([cell_l, cell_e] if rtl else [cell_e, cell_l])
    tt = Table(two, colWidths=[110 * mm, 66 * mm])
    tt.setStyle(TableStyle([("VALIGN", (0, 0), (-1, -1), "TOP"),
                            ("LEFTPADDING", (0, 0), (-1, -1), 0),
                            ("TOPPADDING", (0, 0), (-1, -1), 6)]))
    el.append(HRFlowable(width="100%", thickness=0.5, color=GOLD,
                         spaceBefore=8, spaceAfter=6))
    el.append(tt)

    doc.build(el)
    return out, os.path.getsize(out)


if __name__ == "__main__":
    for lg in ("fr", "en", "ar"):
        p, s = build(lg)
        print("OK", os.path.basename(p), s, "bytes")
