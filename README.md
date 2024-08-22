# Storyku

## <a name="introduction"></a> Introduction :

This project reflects on storing stories and chapters. Unfortunately, I didn't use my time enough to create the front-end. 
So enjoy this half broken app because you cant really access it from the client side. The server side works fine tho.


## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Libraries](#libraries)
- [Project Structure](#project-structures)
- [APK Link](#apk-link)

## <a name="features"></a> Features :

This section lists the main features of the project, divided into client and server components.

### Client

| Feature         | Route                                      |
|-----------------|--------------------------------------------|
| Create Story    | `/dashboard/story/create`                  | 
| Edit Story      | `/dashboard/story/edit/:id`                | 
| Delete Story    | `/dashboard/story/`                        | 
| Create Chapter  | `/dashboard/story/chapter/create`          | 

### Server

| HTTP Method | Route                                | Feature Name             |
|-------------|--------------------------------------|--------------------------|
| GET         | `/`                                  | Get all stories          |
| GET         | `/:id`                               | Get story by ID          |
| POST        | `/`                                  | Create a new story       |
| PUT         | `/:id`                               | Update a story by ID     |
| DELETE      | `/:id`                               | Delete a story by ID     |
| GET         | `/:story_id/chapters`                | Get all chapters for a story |
| GET         | `/:story_id/chapter/:id`             | Get a chapter by ID      |
| POST        | `/:story_id/chapter`                 | Create a new chapter     |
| PUT         | `/:story_id/chapter/:id`             | Update a chapter by ID   |
| DELETE      | `/:story_id/chapter/:id`             | Delete a chapter by ID   |

## <a name="libraries"></a> Libraries :

This project utilizes several libraries for both the client-side and server-side to handle various functionalities:

### Client Libraries

- **ReactJS**: ^18.3.1
- **react-router-dom**: ^6.26.1
- **react-hook-form**: ^7.52.2
- **@radix-ui/react-dialog**: ^1.1.1
- **@radix-ui/react-dropdown-menu**: ^2.1.1
- **@radix-ui/react-popover**: ^1.1.1
- **@radix-ui/react-select**: ^2.1.1
- **@radix-ui/react-slot**: ^1.1.0
- **@radix-ui/react-toast**: ^1.2.1
- **@tanstack/react-table**: ^8.20.1
- **class-variance-authority**: ^0.7.0
- **clsx**: ^2.1.1
- **date-fns**: ^3.6.0
- **lodash**: ^4.17.21
- **lucide-react**: ^0.428.0
- **quill**: ^2.0.2
- **react-day-picker**: ^8.10.1
- **react-dropzone**: ^14.2.3
- **react-quill**: ^2.0.0
- **sonner**: ^1.5.0
- **tailwind-merge**: ^2.5.2
- **tailwindcss-animate**: ^1.0.7

### Server Libraries

- **ExpressJS**: ^4.19.2
- **@prisma/client**: ^5.18.0
- **cors**: ^2.8.5
- **zod**: ^3.23.8
- **module-alias**: ^2.2.3
- **@faker-js/faker**: ^8.4.1
- **@ngneat/falso**: ^7.2.0

### Development Tools

- **typescript**: ^5.5.3
- **vite**: ^5.4.1
- **eslint**: ^9.9.0
- **tailwindcss**: ^3.4.10
- **@vitejs/plugin-react**: ^4.3.1
- **typescript-eslint**: ^8.0.1
- **autoprefixer**: ^10.4.20
- **postcss**: ^8.4.41
- **nodemon**: ^3.1.4


## <a name="project-structures"></a> Project Structure :
```
│   App.css
│   App.tsx
│   index.css
│   main.tsx
│   vite-env.d.ts
│
├───assets
│       react.svg
│
├───components
│   │   index.tsx
│   │
│   ├───breadcrumb
│   │       index.tsx
│   │
│   ├───date-picker
│   │       date-time-picker.tsx  
│   │
│   ├───dialog
│   │       index.tsx
│   │
│   ├───input-field
│   │       index.tsx
│   │
│   ├───pagination
│   │       index.tsx
│   │
│   ├───select-field
│   │       index.tsx
│   │
│   ├───sidebar
│   │       index.tsx
│   │
│   ├───tag
│   │       index.tsx
│   │
│   ├───text-area
│   │       index.tsx
│   │
│   └───ui
│           breadcrumb.tsx        
│           button.tsx
│           calendar.tsx
│           data-table.tsx        
│           dialog.tsx
│           dropdown-menu.tsx     
│           input.tsx
│           loading.tsx
│           pagination.tsx        
│           popover.tsx
│           select.tsx
│           table.tsx
│           textarea.tsx
│           toast.tsx
│           toaster.tsx
│           use-toast.ts
│
├───lib
│       utils.ts
│
├───models
│   │   index.ts
│   │
│   ├───chapter
│   │       index.ts
│   │
│   ├───dropdown
│   │       index.tsx
│   │
│   └───story
│           index.ts
│
├───pages
│   │   index.tsx
│   │
│   ├───dashboard
│   │   │   index.tsx
│   │   │
│   │   └───story
│   │       │   columns.tsx       
│   │       │   index.tsx
│   │       │
│   │       ├───chapter
│   │       │   └───create        
│   │       │           index.tsx 
│   │       │
│   │       ├───create
│   │       │       index.tsx     
│   │       │
│   │       └───edit
│   │               index.tsx     
│   │
│   └───not-found
│           index.tsx
│
├───utils
│   │   index.ts
│   │
│   └───api
│           index.ts
│
└───viewmodel
    │   index.tsx
    │
    ├───chapter
    └───story
            CreateStory.tsx       
            EditStory.tsx
            StoryManagement.tsx
```

```
│   app.ts
│   index.ts
│
├───.vercel
│   └───cache
├───controllers
│       ChapterController.ts
│       index.ts
│       StoryController.ts        
│
├───models
│       Chapter.ts
│       index.ts
│       Story.ts
│
├───prisma
│       index.ts
│
├───routes
│       route.ts
│
└───utils
        validation.ts
        wrap.ts

```

## <a name="apk-link"></a> Website URL :
Attach the link of your deployed project or youtube link here
https://youtu.be/1PDaKmnGygE