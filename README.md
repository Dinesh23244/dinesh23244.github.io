# Deployment Guide: GitHub Pages

## Only 3 Steps to Online!

Since this is a static website (HTML/CSS/JS), deploying it is extremely simple.

### Step 1: Create a Repository
1. Go to [GitHub.com](https://github.com/new).
2. Create a new repository (e.g., `my-portfolio`).
3. **Do not** initialize with a README (since we already have files).

### Step 2: Push Your Code
Open your terminal in this folder (`/Users/dinesh/Downloads/Google_Antgravity_workspace`) and run:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/my-portfolio.git
git push -u origin main
```
*(Replace `YOUR_USERNAME` and `my-portfolio` with your actual details)*

### Step 3: Enable Pages
1. Go to your repository **Settings** tab.
2. Click on **Pages** in the left sidebar.
3. Under **Build and deployment > Source**, select **Deploy from a branch**.
4. Under **Branch**, select **main** and folder **/(root)**.
5. Click **Save**.

Wait about 1-2 minutes, and GitHub will provide you with your live URL (usually `https://your-username.github.io/my-portfolio/`).
