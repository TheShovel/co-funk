#!/bin/bash
# This shit was written by claude because
# i cant be bothered to update this game
# lmao
#
# Co-Funk Electron Build Script
# This script downloads the latest Electron releases for Linux and Windows,
# sets up the project structure, and creates distribution packages.

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to show usage information
show_usage() {
    echo "Co-Funk Electron Build Script"
    echo ""
    echo "Usage:"
    echo "  $0                 Build all packages (Linux ZIP, Windows ZIP, AppImage)"
    echo "  $0 release         Create GitHub release with existing build files"
    echo "  $0 help            Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0                 # Full build process"
    echo "  $0 release         # Create GitHub release only"
    echo ""
    echo "Requirements:"
    echo "  - curl, jq, unzip, zip (required)"
    echo "  - appimagetool (optional, for AppImage)"
    echo "  - magick (optional, for Windows .ico conversion)"
    echo "  - gh (optional, for GitHub releases)"
    exit 0
}

# Check if required commands are available
check_dependencies() {
    print_status "Checking dependencies..."

    local missing_deps=()

    if ! command -v curl &> /dev/null; then
        missing_deps+=("curl")
    fi

    if ! command -v jq &> /dev/null; then
        missing_deps+=("jq")
    fi

    if ! command -v unzip &> /dev/null; then
        missing_deps+=("unzip")
    fi

    if ! command -v zip &> /dev/null; then
        missing_deps+=("zip")
    fi

    # Check for ImageMagick magick (optional, for Windows icon conversion)
    local imagemagick_available=true
    if ! command -v magick &> /dev/null; then
        imagemagick_available=false
    fi

    # AppImage tool is optional - only warn if building AppImage
    local appimage_available=true
    if ! command -v appimagetool &> /dev/null; then
        appimage_available=false
    fi

    # Check for GitHub CLI (optional, for release creation)
    local gh_available=true
    if ! command -v gh &> /dev/null; then
        gh_available=false
    fi

    if [ ${#missing_deps[@]} -ne 0 ]; then
        print_error "Missing required dependencies: ${missing_deps[*]}"
        print_error "Please install them and try again."
        exit 1
    fi

    print_success "All dependencies found"

    if [ "$imagemagick_available" = false ]; then
        print_warning "ImageMagick 'magick' command not found - Windows .ico conversion will be skipped"
    fi

    if [ "$appimage_available" = false ]; then
        print_warning "appimagetool not found - AppImage will be skipped"
    fi

    if [ "$gh_available" = false ]; then
        print_warning "GitHub CLI not found - release creation will be skipped"
    fi
}

# Function to get the latest Electron version from GitHub API
get_latest_electron_version() {
    print_status "Fetching latest Electron version..." >&2

    local version=$(curl -s https://api.github.com/repos/electron/electron/releases/latest | jq -r '.tag_name')

    if [ "$version" == "null" ] || [ -z "$version" ]; then
        print_error "Failed to fetch latest Electron version"
        exit 1
    fi

    echo "$version"
}

# Function to download and extract Electron
download_electron() {
    local platform=$1
    local version=$2
    local filename="electron-${version}-${platform}.zip"
    local url="https://github.com/electron/electron/releases/download/${version}/${filename}"
    local extract_dir="builds/electron-${platform}"

    print_status "Downloading Electron for ${platform}..."

    # Download
    if ! curl -L -o "$filename" "$url"; then
        print_error "Failed to download Electron for ${platform}"
        return 1
    fi

    print_success "Downloaded ${filename}"

    # Extract
    print_status "Extracting ${filename}..."
    mkdir -p "$extract_dir"

    if ! unzip -q "$filename" -d "$extract_dir"; then
        print_error "Failed to extract ${filename}"
        return 1
    fi

    # Clean up zip file
    rm "$filename"

    print_success "Extracted Electron for ${platform}"
}

# Function to set up the app structure
setup_app_structure() {
    local platform=$1
    local electron_dir="builds/electron-${platform}"
    local app_dir=""

    # Set the correct app directory name based on platform
    if [ "$platform" == "linux-x64" ]; then
        app_dir="builds/cofunk-linux"
    elif [ "$platform" == "win32-x64" ]; then
        app_dir="builds/cofunk-windows"
    else
        print_error "Unknown platform: $platform"
        return 1
    fi

    print_status "Setting up app structure for ${platform}..."

    # Rename electron directory
    if [ -d "$electron_dir" ]; then
        mv "$electron_dir" "$app_dir"
    else
        print_error "Electron directory not found: $electron_dir"
        return 1
    fi

    # Remove default app and create resources/app directory
    if [ -f "$app_dir/resources/default_app.asar" ]; then
        rm -f "$app_dir/resources/default_app.asar"
        print_success "Removed default Electron app"
    fi

    local resources_app_dir="$app_dir/resources/app"
    mkdir -p "$resources_app_dir"

    # Extract PenguinFunkSalad.pmp to resources/app/assets/
    if [ -f "PenguinFunkSalad.pmp" ]; then
        mkdir -p "$resources_app_dir/assets"
        if ! unzip -q "PenguinFunkSalad.pmp" -d "$resources_app_dir/assets/"; then
            print_error "Failed to extract PenguinFunkSalad.pmp"
            return 1
        fi
        print_success "Extracted PenguinFunkSalad.pmp to assets/"
    else
        print_error "PenguinFunkSalad.pmp not found!"
        return 1
    fi

    # Copy contents of buildAssets/gameBase to resources/app/
    if [ -d "buildAssets/gameBase" ]; then
        cp -r buildAssets/gameBase/* "$resources_app_dir/"
        print_success "Copied gameBase contents"
    else
        print_error "buildAssets/gameBase directory not found!"
        return 1
    fi

    # Copy gameAssets to resources/app/
    if [ -d "gameAssets" ]; then
        cp -r gameAssets "$resources_app_dir/"
        print_success "Copied gameAssets"
    else
        print_error "gameAssets directory not found!"
        return 1
    fi

    # Copy custom icon to replace default Electron icon
    local icon_source="buildAssets/cofunk.AppDir/icon.png"
    if [ -f "$icon_source" ]; then
        # For Linux, copy to various common icon locations
        if [ "$platform" == "linux-x64" ]; then
            cp "$icon_source" "$app_dir/resources/app/icon.png"
            # Also copy to root for AppImage compatibility
            cp "$icon_source" "$app_dir/icon.png"
            print_success "Copied custom icon for Linux"
        # For Windows, copy as both PNG and try to create ICO
        elif [ "$platform" == "win32-x64" ]; then
            cp "$icon_source" "$app_dir/resources/app/icon.png"

            # Try to create .ico file for better Windows integration
            if command -v magick &> /dev/null; then
                if magick "$icon_source" "$app_dir/resources/app/icon.ico" 2>/dev/null; then
                    print_success "Created icon.ico for Windows"
                else
                    print_warning "Failed to create .ico file, using PNG"
                fi
            fi

            # Also copy to executable directory for taskbar icon
            cp "$icon_source" "$app_dir/icon.png"
            print_success "Copied custom icon for Windows"
        fi
    else
        print_warning "Custom icon not found at $icon_source - using default"
    fi

    # Rename main executable to cofunk
    if [ "$platform" == "linux-x64" ]; then
        if [ -f "$app_dir/electron" ]; then
            mv "$app_dir/electron" "$app_dir/cofunk"
            print_success "Renamed executable to cofunk"
        fi
    elif [ "$platform" == "win32-x64" ]; then
        if [ -f "$app_dir/electron.exe" ]; then
            mv "$app_dir/electron.exe" "$app_dir/cofunk.exe"
            print_success "Renamed executable to cofunk.exe"
        fi
    fi

    print_success "App structure set up for ${platform}"
}

# Function to create zip package
create_package() {
    local platform=$1
    local app_dir_name=""
    local zip_name=""

    # Set the correct directory and zip names based on platform
    if [ "$platform" == "linux-x64" ]; then
        app_dir_name="cofunk-linux"
        zip_name="cofunk-linux.zip"
    elif [ "$platform" == "win32-x64" ]; then
        app_dir_name="cofunk-windows"
        zip_name="cofunk-windows.zip"
    else
        print_error "Unknown platform: $platform"
        return 1
    fi

    print_status "Creating package for ${platform}..."

    # Navigate to builds directory to avoid including full path in zip
    cd builds

    if [ -d "$app_dir_name" ]; then
        zip -r "${zip_name}" "$app_dir_name"
        print_success "Created builds/${zip_name}"
    else
        print_error "App directory not found: $app_dir_name"
        cd ..
        return 1
    fi

    cd ..
}

# Function to create GitHub release
create_github_release() {
    print_status "GitHub Release Creation"

    # Check if GitHub CLI is available
    if ! command -v gh &> /dev/null; then
        print_warning "GitHub CLI not found - cannot create release"
        return 0
    fi

    # Check if we're in a git repository
    if ! git rev-parse --git-dir &> /dev/null; then
        print_warning "Not in a git repository - cannot create release"
        return 0
    fi

    # Prompt user for release creation
    echo ""
    read -p "Do you want to create a GitHub release? (y/N): " create_release
    if [[ ! "$create_release" =~ ^[Yy]$ ]]; then
        print_status "Skipping GitHub release creation"
        return 0
    fi

    # Get tag name from user
    echo ""
    read -p "Enter tag name (e.g., v1.0.0): " tag_name
    if [ -z "$tag_name" ]; then
        print_error "Tag name cannot be empty"
        return 1
    fi

    # Get release title from user
    echo ""
    read -p "Enter release title (e.g., \"Co-Funk Version 1.0.0 - Major Update\"): " release_title
    if [ -z "$release_title" ]; then
        # Default to tag name if no title provided
        release_title="$tag_name"
        print_status "Using tag name as release title: $release_title"
    fi

    # Get recent commits for description
    print_status "Generating release description from recent commits..."
    local commit_log=$(git log --oneline -10 --pretty=format:"- %s" 2>/dev/null || echo "- Initial release")

    # Create temporary description file
    local desc_file=$(mktemp)
    cat > "$desc_file" << EOF
## What's Changed
$commit_log

## Downloads
This release includes:
- **cofunk-linux.zip** - Linux Electron package
- **cofunk-windows.zip** - Windows Electron package
- **cofunk-linux.AppImage** - Portable Linux AppImage

## Installation
### Linux (ZIP)
1. Extract cofunk-linux.zip
2. Run \`./cofunk\`

### Linux (AppImage)
1. Download cofunk-linux.AppImage
2. Make executable: \`chmod +x cofunk-linux.AppImage\`
3. Run: \`./cofunk-linux.AppImage\`

### Windows
1. Extract cofunk-windows.zip
2. Run \`cofunk.exe\`
EOF

    # Show description and ask for confirmation
    echo ""
    print_status "Release description preview:"
    echo "----------------------------------------"
    cat "$desc_file"
    echo "----------------------------------------"
    echo ""

    read -p "Create release with this description? (y/N): " confirm_release
    if [[ ! "$confirm_release" =~ ^[Yy]$ ]]; then
        rm "$desc_file"
        print_status "Release creation cancelled"
        return 0
    fi

    # Create the release
    print_status "Creating GitHub release..."
    local assets=()

    # Add assets if they exist
    if [ -f "builds/cofunk-linux.zip" ]; then
        assets+=("builds/cofunk-linux.zip")
    fi
    if [ -f "builds/cofunk-windows.zip" ]; then
        assets+=("builds/cofunk-windows.zip")
    fi
    if [ -f "builds/cofunk-linux.AppImage" ]; then
        assets+=("builds/cofunk-linux.AppImage")
    fi

    # Create release with assets
    if gh release create "$tag_name" "${assets[@]}" \
        --title "$release_title" \
        --notes-file "$desc_file"; then
        print_success "GitHub release created successfully!"
        print_success "Release URL: $(gh release view "$tag_name" --json url -q .url)"
    else
        print_error "Failed to create GitHub release"
        rm "$desc_file"
        return 1
    fi

    # Clean up
    rm "$desc_file"
}

# Function to create AppImage package (Linux only)
create_appimage() {
    local app_dir="builds/cofunk-linux"
    local appdir_source="buildAssets/cofunk.AppDir"
    local appdir_build="builds/cofunk-linux.AppDir"

    print_status "Creating AppImage package..."

    # Check if appimagetool is available
    if ! command -v appimagetool &> /dev/null; then
        print_warning "appimagetool not found - skipping AppImage creation"
        return 0
    fi

    # Check if source AppDir exists
    if [ ! -d "$appdir_source" ]; then
        print_warning "cofunk.AppDir not found in buildAssets - skipping AppImage creation"
        return 0
    fi

    # Copy AppDir template
    cp -r "$appdir_source" "$appdir_build"

    # Create game directory and copy the Linux build
    mkdir -p "$appdir_build/game"
    cp -r "$app_dir"/* "$appdir_build/game/"

    # Update AppRun to use the renamed executable
    cat > "$appdir_build/AppRun" << 'EOF'
#!/bin/bash
cd "$(dirname "$0")"
./game/cofunk
EOF
    chmod +x "$appdir_build/AppRun"

    # Create the AppImage
    cd builds
    if appimagetool cofunk-linux.AppDir cofunk-linux.AppImage; then
        print_success "Created cofunk-linux.AppImage"
        # Clean up the temporary AppDir
        rm -rf cofunk-linux.AppDir
    else
        print_error "Failed to create AppImage"
        return 1
    fi
    cd ..
}

# Function to cleanup build directories (but keep zip and AppImage files)
cleanup() {
    print_status "Cleaning up temporary files..."

    if [ -d "builds" ]; then
        # Remove the app directories but keep the zip and AppImage files
        rm -rf builds/cofunk-linux builds/cofunk-windows builds/cofunk-linux.AppDir
        print_success "Cleaned up temporary directories"
    fi
}

# Function to handle release-only mode
release_only_mode() {
    print_status "GitHub Release Mode - skipping build process"

    # Check if build files exist
    local missing_files=()

    if [ ! -f "builds/cofunk-linux.zip" ]; then
        missing_files+=("builds/cofunk-linux.zip")
    fi
    if [ ! -f "builds/cofunk-windows.zip" ]; then
        missing_files+=("builds/cofunk-windows.zip")
    fi
    if [ ! -f "builds/cofunk-linux.AppImage" ]; then
        missing_files+=("builds/cofunk-linux.AppImage")
    fi

    if [ ${#missing_files[@]} -ne 0 ]; then
        print_warning "Some build files are missing:"
        for file in "${missing_files[@]}"; do
            print_warning "  - $file"
        done
        print_warning "Consider running the full build first: ./build-electron.sh"
        echo ""
    fi

    # Show available files
    print_status "Available build files:"
    if [ -f "builds/cofunk-linux.zip" ]; then
        print_success "  ✓ builds/cofunk-linux.zip"
    fi
    if [ -f "builds/cofunk-windows.zip" ]; then
        print_success "  ✓ builds/cofunk-windows.zip"
    fi
    if [ -f "builds/cofunk-linux.AppImage" ]; then
        print_success "  ✓ builds/cofunk-linux.AppImage"
    fi

    # Create GitHub release
    create_github_release
}

# Main execution
main() {
    # Check for command line arguments
    case "$1" in
        "release")
            release_only_mode
            exit 0
            ;;
        "help"|"--help"|"-h")
            show_usage
            ;;
        "")
            # Continue with normal build
            ;;
        *)
            print_error "Unknown argument: $1"
            show_usage
            ;;
    esac

    print_status "Starting Co-Funk Electron build process..."

    # Check if we're in the right directory
    if [ ! -f "PenguinFunkSalad.pmp" ] || [ ! -d "buildAssets" ] || [ ! -d "gameAssets" ]; then
        print_error "This script must be run from the co-funk project root directory"
        print_error "Make sure PenguinFunkSalad.pmp, buildAssets, and gameAssets are present"
        exit 1
    fi

    # Check dependencies
    check_dependencies

    # Get latest Electron version
    ELECTRON_VERSION=$(get_latest_electron_version)
    print_success "Latest Electron version: ${ELECTRON_VERSION}"

    # Clean up and create builds directory
    if [ -d "builds" ]; then
        print_status "Cleaning up existing builds directory..."
        rm -rf builds
    fi
    mkdir -p builds

    # Download and extract Electron for both platforms
    download_electron "linux-x64" "$ELECTRON_VERSION"
    download_electron "win32-x64" "$ELECTRON_VERSION"

    # Set up app structure for both platforms
    setup_app_structure "linux-x64"
    setup_app_structure "win32-x64"

    # Create packages
    create_package "linux-x64"
    create_package "win32-x64"

    # Create AppImage (Linux only)
    create_appimage

    # Clean up
    cleanup

    print_success "Build process completed!"
    print_success "Packages created in builds/ directory:"
    print_success "  - builds/cofunk-linux.zip"
    print_success "  - builds/cofunk-windows.zip"
    if [ -f "builds/cofunk-linux.AppImage" ]; then
        print_success "  - builds/cofunk-linux.AppImage"
    fi

    # Offer to create GitHub release
    create_github_release
}

# Run main function
main "$@"
