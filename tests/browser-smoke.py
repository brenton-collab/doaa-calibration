"""DOAA browser smoke gate. Run against a locally served rebuild or isolated preview.

Requires Python Playwright and Chromium. Never targets production by default.
Usage: DOAA_SMOKE_URL=http://127.0.0.1:8787 python tests/browser-smoke.py
"""
import os
import sys
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright

base = os.environ.get("DOAA_SMOKE_URL", "http://127.0.0.1:8787").rstrip("/")
host = urlparse(base).hostname
if not host or (host not in ("127.0.0.1", "localhost", "::1") and
                os.environ.get("DOAA_ALLOW_REMOTE_SMOKE") != "yes"):
    sys.exit("Refusing remote smoke target without DOAA_ALLOW_REMOTE_SMOKE=yes")

failures = []
with sync_playwright() as playwright:
    browser = playwright.chromium.launch(headless=True, args=["--no-sandbox"])
    for label, viewport in (("desktop", {"width": 1440, "height": 900}),
                            ("mobile", {"width": 390, "height": 844})):
        page = browser.new_page(viewport=viewport)
        errors = []
        page.on("pageerror", lambda error: errors.append(str(error)))
        try:
            response = page.goto(base + "/", wait_until="domcontentloaded", timeout=20000)
            assert response and response.status < 400, "index did not load"
            assert page.title().startswith("DOAA"), "unexpected page title"
            for selector in ("#sky", "#rack", "#detail", "#detailbody", "#primary-tabs"):
                assert page.locator(selector).count() == 1, f"missing {selector}"
            assert page.locator('[data-primary="SKY"]').count() == 1, "SKY tab missing"
            page.wait_for_function("window.DOAAReady !== undefined", timeout=10000)
            page.evaluate("() => Promise.race([window.DOAAReady, new Promise((_, reject) => setTimeout(() => reject(new Error('DOAA initialization timeout')), 12000))])")
            page.wait_for_timeout(500)
            assert page.locator("#detailbody").count() == 1
            assert page.locator('[data-primary="SKY"]').is_visible(), "SKY control hidden"
            if errors:
                failures.append(f"{label}: page errors: {errors[:3]}")
            print(f"{label}: initial shell passed")
        except Exception as error:
            failures.append(f"{label}: {error}")
        finally:
            page.close()
    browser.close()
if failures:
    print("\n".join(failures), file=sys.stderr)
    sys.exit(1)
print("Initial-shell browser smoke passed. Contact/Airframe/Flight journey remains a separate gate.")
