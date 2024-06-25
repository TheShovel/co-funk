# Create a temporary directory
$tmpDir = "./tmp"
if (-not (Test-Path -Path $tmpDir)) {
    New-Item -ItemType Directory -Path $tmpDir
    Write-Output "Created temporary directory $tmpDir"
}

# Move right{1 to 10}.png to the temporary directory
for ($i = 1; $i -le 10; $i++) {
    $filePath = "./right$i.png"
    if (Test-Path -Path $filePath) {
        Move-Item -Path $filePath -Destination $tmpDir
        Write-Output "Moved $filePath to $tmpDir"
    }
}

# Rename left{1 to 8}.png to right{1 to 8}.png
for ($i = 1; $i -le 8; $i++) {
    $filePath = "./left$i.png"
    $newPath = "./right$i.png"
    if (Test-Path -Path $filePath) {
        Rename-Item -Path $filePath -NewName $newPath
        Write-Output "Renamed $filePath to $newPath"
    }
}

# Rename files in the temporary directory to left{1 to 10}.png and move them back
for ($i = 1; $i -le 10; $i++) {
    $filePath = "$tmpDir/right$i.png"
    $newPath = "./left$i.png"
    if (Test-Path -Path $filePath) {
        Move-Item -Path $filePath -Destination $newPath
        Write-Output "Moved $filePath to $newPath"
    }
}

# Remove the temporary directory
Remove-Item -Path $tmpDir -Recurse
Write-Output "Removed temporary directory $tmpDir"
