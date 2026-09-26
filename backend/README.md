# Backend — Laravel 12 API

Scaffold for the portfolio API. These files are source of truth for the API the
React frontend already speaks (see `API_CONTRACT.md`). They are not executed by
the Lovable preview — copy this folder into a Laravel 12 application.

```
backend/
├── API_CONTRACT.md
├── routes/api.php
├── app/Http/Controllers/Api/
│   ├── AuthController.php
│   ├── PortfolioController.php
│   ├── ProjectController.php
│   ├── ContactController.php
│   └── Admin/AdminProjectController.php
├── app/Http/Requests/
│   ├── StoreContactMessageRequest.php
│   └── StoreProjectRequest.php
├── app/Http/Resources/
│   ├── ProjectResource.php
│   └── SkillResource.php
├── app/Models/{Project,Skill,Testimonial,ContactMessage}.php
├── app/Jobs/SendContactNotification.php
└── database/migrations/2025_01_01_000000_create_portfolio_tables.php
```

## Setup

```bash
composer create-project laravel/laravel portfolio-api
cd portfolio-api
composer require laravel/sanctum predis/predis
cp -R ../backend/{app,routes,database} .
php artisan migrate
php artisan queue:work redis --queue=payments,notifications,reports
```

`.env` essentials:

```
DB_CONNECTION=mysql
CACHE_STORE=redis
QUEUE_CONNECTION=redis
SESSION_DRIVER=redis
SANCTUM_STATEFUL_DOMAINS=pandatechs.co.ke
FRONTEND_URL=https://pandatechs.co.ke
```

## Connecting the frontend

1. Deploy the API.
2. Set `VITE_API_URL=https://api.pandatechs.co.ke/api` in the frontend.
3. Flip `USE_API` to `true` in `src/lib/api.ts`.
