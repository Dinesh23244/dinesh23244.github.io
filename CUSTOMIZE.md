# How to Customize Your Portfolio

All the content is located in **`index.html`**. You can open this file in any text editor (like VS Code, Notepad, TextEdit).

## 1. Personal Info (Hero Section)
Search for `<!-- Hero Section -->` around line 40.
- **Name**: Change `Dinesh` to your name.
- **Title**: Change `Creative Developer` to your job title.
- **Tagline**: Update the text in the `<p>` tag ("I build accessible...").

### Adjusting Your Photo
If your face is still cut off:
1. Open **`style.css`**.
2. Search for `.profile-placeholder img` (around line 220).
3. Change `object-position: top center;` to one of these:
   - `center center;` (if your face is right in the middle)
   - `center 20%;` (to fine-tune how far down to look)

## 2. About Me
Search for `<!-- About Section -->` around line 60.
- Update the text inside `<p>` tags to tell your story.
- **Stats**: Update the numbers in the `<h3>` tags (e.g., "3+", "50+").

## 3. Skills
Search for `<!-- Skills Section -->` around line 85.
- Change the text inside `<span>` tags (e.g., `<span>React</span>`) to match your skills.
- You can add more `<span>` lines if needed.

## 4. Projects
Search for `<!-- Projects Section -->` around line 115.
- **Title**: Update `<h3>E-Commerce Dashboard</h3>` etc.
- **Description**: Update the `<p>`.
- **Tech Stack**: Update the `<span>` tags.
- **Links**: Change `href="#"` to your actual GitHub path or live URL:
  ```html
  <a href="https://github.com/yourusername/project" target="_blank">...</a>
  ```
- **Images**: To use a real image instead of the colored placeholder:
  1. Save your image (e.g., `project1.jpg`) in the same folder.
  2. Replace the `<div class="img-placeholder">...</div>` part with:
     ```html
     <img src="project1.jpg" alt="Project Name">
     ```
  *(I've already updated the CSS to make these images look great automatically!)*

## 5. Contact & Socials
Search for `<!-- Contact Section -->` around line 165.
- **Email Button**: Change `mailto:hello@example.com` to your email.
- **Social Icons**: Change `href="https://github.com"` to your profile URLs.

## 6. Changing Colors
If you want to change the color theme (like the green accent color), open **`style.css`** and change the variables at the very top:

```css
:root {
    /* Change this hex code to your favorite color */
    --accent: #64ffda; 
    ...
}
```
