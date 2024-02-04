# How to set up this project

1. Install Node.js and Git using following command in PowerShell as admin:
   ```
   winget install OpenJS.NodeJS.LTS Git.Git
   ```
2. Clone this repository
   ```
    git clone https://github.com/mahbd/simple-exam.git
   cd simple-exam
   ```
3. Run the following commands to finish setting up the project:
   ```bash
   npm install
   npx prisma db push
   npm run build
   ```

# How to use this as server

## Using mobile hotspot

1. Open the terminal in the project folder.
2. Run the following commands:
   ```bash
   $Env:ADMIN_USERNAME="admin"; $Env:ADMIN_PASSWORD="secPass"; npm start
   ```
3. Turn on Mobile Hotspot on your computer.
4. Connect other devices to the hotspot.
5. Go to "http://192.168.137.1:3000" on the other devices.

## Using existing router

1. Make sure given desired port is open on the router.
2. Open the terminal in the project folder.
3. Run the following command to get the ip address of the computer.:
   ```bash
   ipconfig
   ```
4. Run the following commands:
   ```bash
   $Env:ADMIN_USERNAME="admin"; $Env:ADMIN_PASSWORD="secPass"; npx next start -- -H ip_address
   ```
5. Go to "http://ip_address:3000" on the other devices.
