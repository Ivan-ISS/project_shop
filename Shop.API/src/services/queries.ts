export const COMMENT_DUPLICATE_QUERY =  `
    SELECT * FROM comments c
    WHERE LOWER(c.email) = ?
    AND LOWER(c.name) = ?
    AND LOWER(c.body) = ?
    AND c.product_id = ?
`;

export const INSERT_COMMENT_QUERY = `
    INSERT INTO comments
    (comment_id, email, name, body, product_id)
    VALUES
    (?, ?, ?, ?, ?)
`;

export const INSERT_PRODUCT_QUERY = `
    INSERT INTO products
    (product_id, title, description, price)
    VALUES
    (?, ?, ?, ?)
`;

export const INSERT_IMAGE_QUERY = `
    INSERT INTO images
    (image_id, product_id, main, url)
    VALUES ?
`;

export const DELETE_IMAGES_QUERY = `
  DELETE FROM images 
  WHERE image_id IN ?
`;

export const REPLACE_PRODUCT_THUMBNAIL = `
    UPDATE images
    SET main = CASE
        WHEN image_id = ? THEN 0
        WHEN image_id = ? THEN 1
        ELSE main
    END
    WHERE image_id IN (?, ?)
;`

export const UPDATE_PRODUCT_FIELDS = `
    UPDATE products 
    SET title = ?, description = ?, price = ? 
    WHERE product_id = ?
`;


//===========================================================================
//====================== ИТОГОВОЕ ПРАКТИЧЕСКОЕ ЗАДАНИЕ ======================

export const INSERT_SIMILAR_PRODUCT_QUERY = `
    INSERT INTO similar_products
    (id, first_product, second_product)
    VALUES ?
`;

export const DELETE_SIMILAR_PRODUCTS = `
    DELETE FROM similar_products 
    WHERE first_product IN (?)
    OR second_product IN (?)
`;

export const DELETE_SIMILAR_PRODUCTS_QUERY = `
    DELETE FROM similar_products 
    WHERE (first_product = ? AND second_product IN (?))
`;

export const DELETE_SIMILAR_PRODUCTS_QUERY_REVERSE = `
    DELETE FROM similar_products 
    WHERE (second_product = ? AND first_product IN (?))
`;