"""Tiny WSGI app — Playwright QA target.

Renders greeting() + cart_total(...) so Playwright assertions can
catch backend regressions. Started by qa-executor before each run.
"""

from __future__ import annotations

from wsgiref.simple_server import make_server

from sandbox import greeting
from sandbox.cart import cart_total

HOST = "127.0.0.1"
PORT = 8765

SAMPLE_CART = [
    {"name": "apple", "price": 10.0, "qty": 3},
    {"name": "bread", "price": 5.0, "qty": 2},
]
SAMPLE_DISCOUNT = 20

HTML = (
    "<!doctype html>\n"
    '<html lang="en">\n'
    '<head><meta charset="utf-8"><title>{title}</title></head>\n'
    "<body>\n"
    '<h1 id="greeting">{greeting}</h1>\n'
    '<p id="cart-total" data-total="{total}">Cart total: {total}</p>\n'
    "</body>\n"
    "</html>\n"
)


def render(cart: list[dict], discount_percent: float) -> str:
    msg = greeting("World")
    total = cart_total(cart, discount_percent=discount_percent)
    count = len(cart)
    noun = "item" if count == 1 else "items"
    title = f"{msg} — Cart ({count} {noun})"
    return HTML.format(title=title, greeting=msg, total=total)


def app(environ, start_response):
    body = render(SAMPLE_CART, SAMPLE_DISCOUNT).encode("utf-8")
    start_response(
        "200 OK",
        [
            ("Content-Type", "text/html; charset=utf-8"),
            ("Content-Length", str(len(body))),
        ],
    )
    return [body]


def main() -> None:
    with make_server(HOST, PORT, app) as srv:
        srv.serve_forever()


if __name__ == "__main__":
    main()
