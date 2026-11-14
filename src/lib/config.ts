/**
 * Master switch for selling. While false:
 *  - /shop shows "Coming Soon" instead of the catalogue
 *  - the home page swaps the product previews for a "Coming Soon" band
 *  - the cart icon and cart drawer are hidden, so there are no "Add to cart" buttons
 * Flip to true when products are ready to sell. All the shop code is still in place.
 */
export const SHOP_OPEN = false;
