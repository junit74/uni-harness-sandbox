from sandbox.web import SAMPLE_CART, SAMPLE_DISCOUNT, render


def test_title_plural_for_sample_cart():
    html = render(SAMPLE_CART, SAMPLE_DISCOUNT)
    assert "<title>Hello, World! — Cart (2 items)</title>" in html


def test_title_singular_for_one_item():
    one_item = [{"name": "apple", "price": 10.0, "qty": 1}]
    html = render(one_item, 0)
    assert "<title>Hello, World! — Cart (1 item)</title>" in html
