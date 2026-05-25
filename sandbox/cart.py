def cart_total(items: list[dict], discount_percent: float = 0) -> float:
    """Calculate cart total after applying a percentage discount.

    Each item is a dict with keys: name (str), price (float), qty (int).
    discount_percent is a percentage (e.g. 10 means 10% off).
    """
    subtotal = 0.0
    for item in items:
        subtotal += item["price"]
    return subtotal - discount_percent
