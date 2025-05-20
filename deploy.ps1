# Create deployment package
$deployDir = "deploy"
if (Test-Path $deployDir) {
    Remove-Item -Recurse -Force $deployDir
}
New-Item -ItemType Directory -Path $deployDir

# Copy necessary files
Copy-Item "package.json" $deployDir
Copy-Item "package-lock.json" $deployDir
Copy-Item "src" $deployDir -Recurse
Copy-Item ".ebextensions" $deployDir -Recurse
Copy-Item "Procfile" $deployDir

# Create zip file
Compress-Archive -Path "$deployDir\*" -DestinationPath "backend-deploy.zip" -Force

# Clean up
Remove-Item -Recurse -Force $deployDir

Write-Host "Deployment package created: backend-deploy.zip" 