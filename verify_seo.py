#!/usr/bin/env python3
import json
import sys
import re
import os

filepath = "index.html"

with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

errors = []
warnings = []

# 1. Check exactly one h1
h1_count = len(re.findall(r'<h1[ >]', content, re.IGNORECASE))
if h1_count != 1:
    errors.append(f"Expected exactly 1 <h1>, found {h1_count}")

# 2. Check target="_blank" has rel="noopener noreferrer"
for m in re.finditer(r'<a[^>]*target=["\']_blank["\'][^>]*>', content, re.IGNORECASE):
    tag = m.group(0)
    if 'rel=' not in tag.lower():
        errors.append(f"Missing rel on target=_blank link: {tag[:80]}...")
    elif 'noopener' not in tag or 'noreferrer' not in tag:
        warnings.append(f"rel may be incomplete on: {tag[:80]}...")

# 3. Check for Twitter Cards
twitter_tags = ["twitter:card", "twitter:title", "twitter:description", "twitter:site", "twitter:creator"]
for tag in twitter_tags:
    if tag not in content:
        errors.append(f"Missing Twitter Card meta: {tag}")

# 4. Check theme-color
if "theme-color" not in content:
    errors.append("Missing theme-color meta")

# 5. Check canonical
if 'rel="canonical"' not in content:
    errors.append("Missing canonical link")

# 6. Check JSON-LD schemas
jsonld_blocks = re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
found_profilepage = False
found_person = False
found_faqpage = False
for block in jsonld_blocks:
    try:
        data = json.loads(block.strip())
    except json.JSONDecodeError as e:
        errors.append(f"JSON-LD parse error: {e}")
        continue
    text = json.dumps(data)
    if "ProfilePage" in text:
        found_profilepage = True
    if "Person" in text:
        found_person = True
    if "FAQPage" in text:
        found_faqpage = True

if not found_profilepage:
    errors.append("Missing ProfilePage schema")
if not found_person:
    errors.append("Missing Person schema")
if not found_faqpage:
    errors.append("Missing FAQPage schema")

# 7. Check robots meta
if 'name="robots"' not in content:
    warnings.append("Missing robots meta tag")

# 8. Check robots.txt and sitemap.xml exist
if not os.path.exists("robots.txt"):
    errors.append("robots.txt not found")
if not os.path.exists("sitemap.xml"):
    errors.append("sitemap.xml not found")

# 9. Check for FAQ section HTML
if 'id="faq"' not in content:
    errors.append("Missing visible FAQ section HTML")

# 10. Check for favicon link
if 'rel="icon"' not in content:
    errors.append("Missing favicon link")

print("=== SEO / AEO / GEO Verification Results ===")
if errors:
    print(f"\nERRORS ({len(errors)}):")
    for e in errors:
        print(f"  [FAIL] {e}")
else:
    print("\nNo errors found.")

if warnings:
    print(f"\nWARNINGS ({len(warnings)}):")
    for w in warnings:
        print(f"  [WARN] {w}")
else:
    print("No warnings.")

sys.exit(1 if errors else 0)
