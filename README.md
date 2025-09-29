# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/d00c53d2-bf35-44b9-999c-9e642076891d

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/d00c53d2-bf35-44b9-999c-9e642076891d) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables for AWS Cognito
cp .env.example .env
# Edit .env file with your AWS Cognito credentials

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

## Authentication Setup

This application uses AWS Cognito for authentication. To set up authentication:

1. **Create AWS Cognito User Pool**:
   - Go to AWS Console > Cognito > User Pools
   - Create a new User Pool with your preferred settings
   - Note down the User Pool ID

2. **Create App Client**:
   - In your User Pool, go to "App integration" > "App clients"
   - Create a new App client
   - Note down the Client ID
   - Ensure "Generate client secret" is **disabled**

3. **Configure Environment Variables**:
   ```bash
   # Copy the example file
   cp .env.example .env
   
   # Edit .env with your values:
   VITE_AWS_REGION=us-east-1
   VITE_AWS_USER_POOL_ID=us-east-1_XXXXXXXXX
   VITE_AWS_USER_POOL_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. **Create Test Users**:
   - In AWS Console, go to your User Pool > Users
   - Create test users or use the sign-up flow (if enabled)

5. **Restart Development Server**:
   ```bash
   npm run dev
   ```

## Password Management

The application supports various password scenarios:

### New Password Required
- When an admin creates a user with a temporary password, Cognito will require the user to set a new password on first login
- The application automatically detects this and shows a "New Password Required" form
- Users must set a password that meets the security requirements

### Change Password
- Authenticated users can change their password from the user menu in the header
- Click on the user avatar → "Change Password"
- Requires current password and new password confirmation

### Password Requirements
- Minimum 8 characters
- Must contain uppercase letter (A-Z)
- Must contain lowercase letter (a-z)  
- Must contain number (0-9)
- Must contain special character (@$!%*?&)

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
- AWS Amplify (for Cognito authentication)
- React Query (for state management)
- React Flow (for workflow visualization)

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/d00c53d2-bf35-44b9-999c-9e642076891d) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
