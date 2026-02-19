# Frontend Data Setup

To enable the local data mode without a backend, follow these steps:

1. **Move Data Files**:
   - Place your `girls.csv` file directly into the `public/` folder of this project.
   - If you have images, place them in `public/` or `public/images/`.

2. **Image Paths in CSV**:
   - Ensure the `image` or `image_url` column in your CSV points to the correct path.
   - Example: If your image is at `public/images/dress1.jpg`, the CSV should contain `/images/dress1.jpg` (or just `images/dress1.jpg`).

3. **Running the App**:
   - Run `npm run dev`.
   - The "AI Recommendations" page will automatically detect `girls.csv` and use it.
   - If the file is missing, it will fallback to the built-in mock demonstration data.

## CSV Structure expected
Your CSV should ideally have these columns (or similar):
- `id`
- `product_title` or `name`
- `category` or `gender`
- `price`
- `image_url` or `image`
- `rating`
- `description`
- `usage` (comma separated, e.g. "Casual, Party")
- `body_type` (comma separated)
