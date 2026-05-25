from sandbox.cart import cart_total


def test_single_item_uses_quantity():
    assert cart_total([{"name": "a", "price": 10.0, "qty": 3}]) == 30.0


def test_percent_discount():
    # $50.00 with 10% off should be $45.00 (NOT $40.00 — discount is percent, not absolute)
    assert cart_total(
        [{"name": "a", "price": 50.0, "qty": 1}],
        discount_percent=10,
    ) == 45.0


def test_combined_qty_and_discount():
    # 10*3 + 5*2 = 40 subtotal, minus 20% = 32.00
    assert cart_total(
        [
            {"name": "a", "price": 10.0, "qty": 3},
            {"name": "b", "price": 5.0, "qty": 2},
        ],
        discount_percent=20,
    ) == 32.0


def test_zero_discount_default():
    assert cart_total([{"name": "a", "price": 10.0, "qty": 1}]) == 10.0


def test_empty_cart():
    assert cart_total([]) == 0.0
