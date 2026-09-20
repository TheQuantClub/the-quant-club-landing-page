@echo off
set "PATH=C:\Users\abhin\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;C:\Users\abhin\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback;%PATH%"
cd /d "%~dp0"
if not exist node_modules call pnpm.cmd install
call pnpm.cmd dev
