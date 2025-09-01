"use strict";
const { app, BrowserWindow, Menu, shell, screen, dialog } = require("electron");
const path = require("path");

const isWindows = process.platform === "win32";
const isMac = process.platform === "darwin";
const isLinux = process.platform === "linux";

// Function to get the best icon for the platform
const getIconPath = () => {
  if (isWindows) {
    // Try .ico first, fallback to .png
    const icoPath = path.resolve(__dirname, "icon.ico");
    const pngPath = path.resolve(__dirname, "icon.png");
    try {
      require("fs").accessSync(icoPath);
      return icoPath;
    } catch {
      return pngPath;
    }
  }
  return path.resolve(__dirname, "icon.png");
};

if (isMac) {
  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      { role: "appMenu" },
      { role: "fileMenu" },
      { role: "editMenu" },
      { role: "windowMenu" },
      { role: "help" },
    ]),
  );
} else {
  Menu.setApplicationMenu(null);
}

const resourcesURL = Object.assign(new URL("file://"), {
  pathname: path.join(__dirname, "/"),
}).href;
const defaultProjectURL = new URL("./index.html", resourcesURL).href;

const createWindow = (windowOptions) => {
  const options = {
    title: "Co-Funk",
    icon: getIconPath(),
    useContentSize: true,
    webPreferences: {
      sandbox: false,
      contextIsolation: false,
      nodeIntegration: true,
      webSecurity: false,
    },
    show: true,
    width: 480,
    height: 360,
    ...windowOptions,
  };

  const activeScreen = screen.getDisplayNearestPoint(
    screen.getCursorScreenPoint(),
  );
  const bounds = activeScreen.workArea;
  options.x = bounds.x + (bounds.width - options.width) / 2;
  options.y = bounds.y + (bounds.height - options.height) / 2;

  const window = new BrowserWindow(options);
  return window;
};

const createProjectWindow = (url) => {
  const windowMode = "window";
  const options = {
    show: false,
    backgroundColor: "#000000",
    width: 640,
    height: 360,
    minWidth: 50,
    minHeight: 50,
  };
  // fullscreen === false disables fullscreen on macOS so only set this property when it's true
  if (windowMode === "fullscreen") {
    options.fullscreen = true;
  }
  const window = createWindow(options);
  if (windowMode === "maximize") {
    window.maximize();
  }
  window.loadURL(url);
  window.show();
};

const createDataWindow = (dataURI) => {
  const window = createWindow({});
  window.loadURL(dataURI);
};

const isResourceURL = (url) => {
  try {
    const parsedUrl = new URL(url);
    return (
      parsedUrl.protocol === "file:" && parsedUrl.href.startsWith(resourcesURL)
    );
  } catch (e) {
    // ignore
  }
  return false;
};

const SAFE_PROTOCOLS = ["https:", "http:", "mailto:"];

const isSafeOpenExternal = (url) => {
  try {
    const parsedUrl = new URL(url);
    return SAFE_PROTOCOLS.includes(parsedUrl.protocol);
  } catch (e) {
    // ignore
  }
  return false;
};

const isDataURL = (url) => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "data:";
  } catch (e) {
    // ignore
  }
  return false;
};

const openLink = (url) => {
  if (isDataURL(url)) {
    createDataWindow(url);
  } else if (isResourceURL(url)) {
    createProjectWindow(url);
  } else if (isSafeOpenExternal(url)) {
    shell.openExternal(url);
  }
};

app.on("render-process-gone", (event, webContents, details) => {
  const window = BrowserWindow.fromWebContents(webContents);
  dialog.showMessageBoxSync(window, {
    type: "error",
    title: "Error",
    message:
      "Renderer process crashed: " +
      details.reason +
      " (" +
      details.exitCode +
      ")",
  });
});

app.on("child-process-gone", (event, details) => {
  dialog.showMessageBoxSync({
    type: "error",
    title: "Error",
    message:
      details.type +
      " child process crashed: " +
      details.reason +
      " (" +
      details.exitCode +
      ")",
  });
});

app.on("web-contents-created", (event, contents) => {
  contents.setWindowOpenHandler((details) => {
    setImmediate(() => {
      openLink(details.url);
    });
    return { action: "deny" };
  });
  contents.on("will-navigate", (e, url) => {
    if (!isResourceURL(url)) {
      e.preventDefault();
      openLink(url);
    }
  });
  contents.on("before-input-event", (e, input) => {
    const window = BrowserWindow.fromWebContents(contents);
    if (!window || input.type !== "keyDown") return;
    if (input.key === "F11" || (input.key === "Enter" && input.alt)) {
      window.setFullScreen(!window.isFullScreen());
    } else if (input.key === "Escape" && window.isFullScreen()) {
      window.setFullScreen(false);
    }
  });
});

app.on("session-created", (session) => {
  session.webRequest.onBeforeRequest(
    {
      urls: ["file://*"],
    },
    (details, callback) => {
      callback({
        cancel: !details.url.startsWith(resourcesURL),
      });
    },
  );
});

app.on("window-all-closed", () => {
  app.quit();
});

app.whenReady().then(() => {
  createProjectWindow(defaultProjectURL);
});
